import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import Janus from './../../janus';

var server:string = null;
var opaqueId = "streamingtest-"+Janus.randomString(12);
var streaming = null;
var bitrateTimer = null;
var selectedStream = null;

if(window.location.protocol === 'http:')
  server = "http://" + window.location.hostname + ":8088/janus";
else
  server = "https://" + window.location.hostname + ":8089/janus";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
      Janus.init({debug: "all", callback: () => {
        const janus = new Janus({server: server, success: ()=> {
          console.log("janus initialization success");
          console.log("now connecting to streaming plugin");
          janus.attach({plugin: "janus.plugin.streaming", opaqueId: opaqueId, success: (pluginHandler) => {
            streaming = pluginHandler;
            Janus.log("Plugin attached! (" + streaming.getPlugin() + ", id=" + streaming.getId() + ")");
            console.log("janus streaming plugin initialization success");
            this.onSuccessHandler();
          }, error: (error) => {
            Janus.error("  -- Error attaching plugin... ", error);
            console.log("janus streaming plugin initialization error");
          }, onmessage: (msg, jsep) => {
            Janus.debug(" ::: Got a message :::");
            Janus.debug(msg);
            console.log("janus streaming plugin initialization onmessage");
            this.onMessageHandler(msg, jsep);
          }, onremotestream: (stream) => {
            Janus.debug(" ::: Got a remote stream :::");
            Janus.debug(stream);
            console.log("janus streaming plugin initialization onremotestream");
            this.onRemoteStreamHandler(stream);
          }, oncleanup: () => {
            Janus.log(" ::: Got a cleanup notification :::");   
            console.log("janus streaming plugin initialization oncleanup");
          }})
        }, error: (error) => {
          console.log("janus initialization error: "+error);
        }, destroyed: () => {
          Janus.debug(" ::: Got to destroyed remote stream :::");
          console.log("Got to destroyed remote stream");
          window.location.reload();
        }})
      }})
  }

  onSuccessHandler = () => {
    var body = { "request": "list" };
    Janus.debug("Sending message (" + JSON.stringify(body) + ")");
    streaming.send({"message": body, success: (result) => {
      if(result["list"] !== undefined && result["list"] !== null) {
        var list = result["list"];
        Janus.log("Got a list of available streams");
        Janus.debug(list);
        for(var mp in list) {
          Janus.debug("  >> [" + list[mp]["id"] + "] " + list[mp]["description"] + " (" + list[mp]["type"] + ")");
          selectedStream = list[mp]["id"];
        }
        this.startStream();
      }
    }});
  }

  startStream = () => {
    var body = { "request": "watch", id: parseInt(selectedStream) };
    streaming.send({"message": body});
  }

  stopStream = () => {
    var body = { "request": "stop" };
    streaming.send({"message": body});
    streaming.hangup();
  }

  onMessageHandler = (msg, jsep) => {
    var result = msg["result"];
    if(result !== null && result !== undefined) {
      if(result["status"] !== undefined && result["status"] !== null) {

      } else if(msg["streaming"] === "event") {

      } 
    } else if(msg["error"] !== undefined && msg["error"] !== null) {
      console.log("error: "+msg['error']);
      this.stopStream();
      return;
    }

    if(jsep !== undefined && jsep !== null) {
      Janus.debug("Handling SDP as well...");
      Janus.debug(jsep);
      // Offer from the plugin, let's answer
      streaming.createAnswer({jsep: jsep,media: { audioSend: false, videoSend: false },	/* We want recvonly audio/video */ success: (jsep) => {
            Janus.debug("Got SDP!");
            Janus.debug(jsep);
            var body = { "request": "start" };
            streaming.send({"message": body, "jsep": jsep});
          }, error: (error) => {
            Janus.error("WebRTC error:", error);
            console.log("WebRTC error... " + JSON.stringify(error));
          }
        });
    }
  }

  onRemoteStreamHandler = (stream) => {
    var videoTracks = stream.getVideoTracks();
    Janus.attachMediaStream(document.querySelector('#remotevideo'), stream);
    if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
      // No remote video
      console.log("No remote video available")
    }

    if(videoTracks && videoTracks.length &&
      (Janus.webRTCAdapter.browserDetails.browser === "chrome" ||
        Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
        Janus.webRTCAdapter.browserDetails.browser === "safari")) {
        bitrateTimer = setInterval(() => {
          var remotevideo = document.querySelector('#remotevideo') as HTMLVideoElement;
          var width = remotevideo.width;
          var height = remotevideo.height;
          var bitrate = streaming.getBitrate();
          console.log("video bitrate: "+bitrate+", video resolution: "+width+"x"+height);
        }, 1000);
    }
  }
}
