### GSTREAMER
``` 
brew search gstreamer
brew search gst-plugins [install all ugly, good, bad, etc]

brew install gstreamer
brew install gst-plugins-bad 
brew install gst-plugins-good 
brew install gst-plugins-ugly 
brew install gst-plugins-bad --with-x264

gst-launch-1.0 -v avfvideosrc capture-screen=true ! video/x-raw,framerate=20/1 ! videoscale ! videoconvert ! x264enc tune=zerolatency bitrate=500 speed-preset=superfast ! rtph264pay ! udpsink host=192.168.1.3 port=5000

Setting pipeline to PAUSED ...
Pipeline is live and does not need PREROLL ...
Setting pipeline to PLAYING ...
New clock: GstSystemClock
/GstPipeline:pipeline0/GstAVFVideoSrc:avfvideosrc0.GstPad:src: caps = video/x-raw, width=(int)1366, height=(int)768, format=(string)UYVY, framerate=(fraction)20/1
/GstPipeline:pipeline0/GstCapsFilter:capsfilter0.GstPad:src: caps = video/x-raw, width=(int)1366, height=(int)768, format=(string)UYVY, framerate=(fraction)20/1
/GstPipeline:pipeline0/GstVideoScale:videoscale0.GstPad:src: caps = video/x-raw, width=(int)1366, height=(int)768, format=(string)UYVY, framerate=(fraction)20/1
/GstPipeline:pipeline0/GstVideoConvert:videoconvert0.GstPad:src: caps = video/x-raw, width=(int)1366, height=(int)768, framerate=(fraction)20/1, format=(string)Y42B
Redistribute latency...
/GstPipeline:pipeline0/GstX264Enc:x264enc0.GstPad:sink: caps = video/x-raw, width=(int)1366, height=(int)768, framerate=(fraction)20/1, format=(string)Y42B
/GstPipeline:pipeline0/GstVideoConvert:videoconvert0.GstPad:sink: caps = video/x-raw, width=(int)1366, height=(int)768, format=(string)UYVY, framerate=(fraction)20/1
/GstPipeline:pipeline0/GstVideoScale:videoscale0.GstPad:sink: caps = video/x-raw, width=(int)1366, height=(int)768, format=(string)UYVY, framerate=(fraction)20/1
/GstPipeline:pipeline0/GstCapsFilter:capsfilter0.GstPad:sink: caps = video/x-raw, width=(int)1366, height=(int)768, format=(string)UYVY, framerate=(fraction)20/1
/GstPipeline:pipeline0/GstX264Enc:x264enc0.GstPad:src: caps = video/x-h264, codec_data=(buffer)017a0020ffe1001e677a0020bcb402b030f3780b50101014000003000400000300a23c60ca8001000468ef3cb0, stream-format=(string)avc, alignment=(string)au, level=(string)3.2, profile=(string)high-4:2:2, width=(int)1366, height=(int)768, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)20/1, interlace-mode=(string)progressive, colorimetry=(string)bt709, chroma-site=(string)mpeg2
/GstPipeline:pipeline0/GstRtpH264Pay:rtph264pay0.GstPad:src: caps = application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, packetization-mode=(string)1, profile-level-id=(string)7a0020, sprop-parameter-sets=(string)"Z3oAILy0ArAw83gLUBAQFAAAAwAEAAADAKI8YMqA\,aO88sA\=\=", payload=(int)96, ssrc=(uint)2369793409, timestamp-offset=(uint)3653345055, seqnum-offset=(uint)1125, a-framerate=(string)20
/GstPipeline:pipeline0/GstUDPSink:udpsink0.GstPad:sink: caps = application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264, packetization-mode=(string)1, profile-level-id=(string)7a0020, sprop-parameter-sets=(string)"Z3oAILy0ArAw83gLUBAQFAAAAwAEAAADAKI8YMqA\,aO88sA\=\=", payload=(int)96, ssrc=(uint)2369793409, timestamp-offset=(uint)3653345055, seqnum-offset=(uint)1125, a-framerate=(string)20
/GstPipeline:pipeline0/GstRtpH264Pay:rtph264pay0.GstPad:sink: caps = video/x-h264, codec_data=(buffer)017a0020ffe1001e677a0020bcb402b030f3780b50101014000003000400000300a23c60ca8001000468ef3cb0, stream-format=(string)avc, alignment=(string)au, level=(string)3.2, profile=(string)high-4:2:2, width=(int)1366, height=(int)768, pixel-aspect-ratio=(fraction)1/1, framerate=(fraction)20/1, interlace-mode=(string)progressive, colorimetry=(string)bt709, chroma-site=(string)mpeg2
/GstPipeline:pipeline0/GstRtpH264Pay:rtph264pay0: timestamp = 3653452433
/GstPipeline:pipeline0/GstRtpH264Pay:rtph264pay0: seqnum = 1125
```

### JANUS

```
/usr/local/janus/etc/janus -> janus.plugin.streaming.cfg
    [h264-sample]
    type = rtp
    id = 10
    description = H.264 live stream coming from gstreamer
    audio = no
    video = yes
    videoport = 5000
    videopt = 126
    videortpmap = H264/90000
    videofmtp = profile-level-id=42e01f;packetization-mode=1

START JANUS: /usr/local/janus/bin/janus

Janus commit: not-a-git-repo
Compiled on:  Fri Sep 14 22:44:58 IST 2018

---------------------------------------------------
  Starting Meetecho Janus (WebRTC Server) v0.4.4
---------------------------------------------------

Checking command line arguments...
Debug/log level is 4
Debug/log timestamps are disabled
Debug/log colors are enabled
Adding 'vmnet' to the ICE ignore list...
Using 192.168.1.3 as local IP...
[WARN] Token based authentication disabled
Initializing recorder code
Initializing ICE stuff (Full mode, ICE-TCP candidates disabled, half-trickle, IPv6 support disabled)
TURN REST API backend: (disabled)
[WARN] Janus is deployed on a private address (192.168.1.3) but you didn't specify any STUN server! Expect trouble if this is supposed to work over the internet and not just in a LAN...
Crypto: OpenSSL pre-1.1.0
[WARN] The libsrtp installation does not support AES-GCM profiles
Fingerprint of our certificate: D2:B9:31:8F:DF:24:D8:0E:ED:D2:EF:25:9E:AF:6F:B8:34:AE:53:9C:E6:F3:8F:F2:64:15:FA:E8:7F:53:2D:38
[WARN] Event handlers support disabled
Joining Janus requests handler thread
Sessions watchdog started
Plugins folder: /usr/local/janus/lib/janus/plugins
Loading plugin 'libjanus_audiobridge.0.dylib'...
JANUS AudioBridge plugin initialized!
Loading plugin 'libjanus_echotest.0.dylib'...
JANUS EchoTest plugin initialized!
Loading plugin 'libjanus_nosip.0.dylib'...
JANUS NoSIP plugin initialized!
Loading plugin 'libjanus_recordplay.0.dylib'...
JANUS Record&Play plugin initialized!
Loading plugin 'libjanus_sip.0.dylib'...
JANUS SIP plugin initialized!
Loading plugin 'libjanus_streaming.0.dylib'...
JANUS Streaming plugin initialized!
Loading plugin 'libjanus_textroom.0.dylib'...
JANUS TextRoom plugin initialized!
Loading plugin 'libjanus_videocall.0.dylib'...
JANUS VideoCall plugin initialized!
Loading plugin 'libjanus_videoroom.0.dylib'...
JANUS VideoRoom plugin initialized!
Loading plugin 'libjanus_voicemail.0.dylib'...
[h264-sample] New video stream! (ssrc=2369793409, index 0)
[ERR] [plugins/janus_voicemail.c:janus_voicemail_init:345] Permission denied[WARN] The 'janus.plugin.voicemail' plugin could not be initialized
Transport plugins folder: /usr/local/janus/lib/janus/transports
Loading transport plugin 'libjanus_http.0.dylib'...
HTTP webserver started (port 8088, /janus path listener)...
[WARN] HTTPS webserver disabled
[WARN] Admin/monitor HTTP webserver disabled
[WARN] Admin/monitor HTTPS webserver disabled
JANUS REST (HTTP/HTTPS) transport plugin initialized!
Loading transport plugin 'libjanus_rabbitmq.0.dylib'...
RabbitMQ SSL support disabled
[WARN] RabbitMQ support disabled (Janus API)
[WARN] RabbitMQ support disabled (Admin API)
[WARN] RabbitMQ support disabled for both Janus and Admin API, giving up
[WARN] The 'janus.transport.rabbitmq' plugin could not be initialized
Loading transport plugin 'libjanus_websockets.0.dylib'...
libwebsockets logging: 0
WebSockets server started (port 8188)...
[WARN] Secure WebSockets server disabled
[WARN] Admin WebSockets server disabled
[WARN] Secure Admin WebSockets server disabled
JANUS WebSockets transport plugin initialized!
WebSockets thread started
Creating new session: 2854014903987541; 0x7f8ee670f9f0
Creating new handle in session 2854014903987541: 4893563947662976; 0x7f8ee670f9f0 0x7f8ee66062e0
[4893563947662976] Creating ICE agent (ICE Full mode, controlling)
[4893563947662976] The DTLS handshake has been completed
[janus.plugin.streaming-0x7f8ee6606490] WebRTC media is now available
[janus.plugin.streaming-0x7f8ee6606490] No WebRTC media anymore
[4893563947662976] WebRTC resources freed; 0x7f8ee66062e0 0x7f8ee670f9f0

```

### IONIC LOGS
```
Angads-iMac:WebRTC-JanusApp mac$ ionic serve -r -c
Starting app-scripts server: --address 0.0.0.0 --port 8100 --livereload-port 35729 --dev-logger-port 53703 --consolelogs
--nobrowser - Ctrl+C to cancel
[16:42:59]  watch started ...
[16:42:59]  build dev started ...
[16:42:59]  clean started ...
[16:42:59]  clean finished in 3 ms
[16:42:59]  copy started ...
[16:42:59]  deeplinks started ...
[16:42:59]  deeplinks finished in 31 ms
[16:42:59]  transpile started ...
[16:43:03]  transpile finished in 3.85 s
[16:43:03]  preprocess started ...
[16:43:03]  preprocess finished in 1 ms
[16:43:03]  webpack started ...
[16:43:03]  copy finished in 4.09 s
[16:43:08]  webpack finished in 4.93 s
[16:43:08]  sass started ...
[16:43:09]  sass finished in 1.34 s
[16:43:09]  postprocess started ...
[16:43:09]  postprocess finished in 9 ms
[16:43:09]  lint started ...
[16:43:09]  build dev finished in 10.27 s
[16:43:09]  watch ready in 10.36 s
[16:43:09]  dev server running: http://localhost:8100/

[OK] Development server running!
    Local: http://localhost:8100
    External: http://192.168.1.3:8100
    DevApp: WebRTC-JanusApp@8100 on Angads-iMac.local

[16:43:11]  console.log: Angular is running in the development mode. Call enableProdMode() to enable the production
            mode.
[16:43:11]  console.log: Initializing library
[16:43:11]  console.log: Library initialized: true
[16:43:11]  console.log: Using REST API to contact Janus: http://localhost:8088/janus
[16:43:11]  console.log: Created session: 2584515937320394
[16:43:11]  console.log: janus initialization success
[16:43:11]  console.log: now connecting to streaming plugin
[16:43:11]  console.warn: Ionic Native: tried calling StatusBar.styleDefault, but Cordova is not available. Make sure to
            a) run in a real device or simulator and b) include cordova.js in your index.html
[16:43:11]  console.warn: Ionic Native: tried calling SplashScreen.hide, but Cordova is not available. Make sure to a)
            run in a real device or simulator and b) include cordova.js in your index.html
[16:43:11]  console.log: Created handle: 3164423420513520
[16:43:11]  console.log: Plugin attached! (janus.plugin.streaming, id=3164423420513520)
[16:43:11]  console.log: janus streaming plugin initialization success
[16:43:11]  console.log: Synchronous transaction successful (janus.plugin.streaming)
[16:43:11]  console.log: Got a list of available streams
[16:43:11]  console.log: janus streaming plugin initialization onmessage
[16:43:11]  console.log: Creating PeerConnection
[16:43:11]  console.log: Preparing local SDP and gathering candidates (trickle=true)
[16:43:11]  console.log: Remote description accepted!
[16:43:11]  console.log: Creating answer (iceDone=false)
[16:43:11]  console.log: Handling Remote Track
[16:43:11]  console.log: janus streaming plugin initialization onremotestream
[16:43:11]  console.log: Adding onended callback to track: [object Object]
[16:43:11]  console.log: Setting local description
[16:43:11]  console.log: End of candidates.
[16:43:11]  console.log: janus streaming plugin initialization onmessage
[16:43:12]  console.log: janus streaming plugin initialization onmessage
[16:43:12]  console.log: Starting bitrate timer (via getStats)
[16:43:12]  console.log: video bitrate: 0 kbits/sec
[16:43:13]  tslint: src/pages/home/home.ts, line: 8
            'bitrateTimer' is declared but its value is never read.

    L7:  var streaming = null;
    L8:  var bitrateTimer = null;
    L9:  var selectedStream = null;

[16:43:13]  lint finished in 3.81 s
[16:43:13]  console.log: video bitrate: 0 kbits/sec
[16:43:14]  console.log: video bitrate: 0 kbits/sec
[16:43:15]  console.log: video bitrate: 190 kbits/sec
[16:43:16]  console.log: video bitrate: 628 kbits/sec
[16:43:17]  console.log: video bitrate: 208 kbits/sec
[16:43:18]  console.log: video bitrate: 610 kbits/sec
[16:43:19]  console.log: video bitrate: 500 kbits/sec
[16:43:20]  console.log: video bitrate: 509 kbits/sec
[16:43:21]  console.log: video bitrate: 468 kbits/sec
[16:43:22]  console.log: video bitrate: 526 kbits/sec
[16:43:23]  console.log: video bitrate: 335 kbits/sec
[16:43:24]  console.log: video bitrate: 595 kbits/sec
[16:43:25]  console.log: video bitrate: 412 kbits/sec
[16:43:26]  console.log: video bitrate: 316 kbits/sec
[16:43:27]  console.log: video bitrate: 562 kbits/sec
[16:43:28]  console.log: video bitrate: 500 kbits/sec
[16:43:29]  console.log: video bitrate: 504 kbits/sec
[16:43:30]  console.log: video bitrate: 412 kbits/sec
[16:43:31]  console.log: video bitrate: 367 kbits/sec
[16:43:32]  console.log: video bitrate: 351 kbits/sec
[16:43:33]  console.log: video bitrate: 529 kbits/sec
[16:43:34]  console.log: video bitrate: 332 kbits/sec
[16:43:35]  console.log: video bitrate: 666 kbits/sec
[16:43:36]  console.log: video bitrate: 431 kbits/sec
[16:43:37]  console.log: video bitrate: 344 kbits/sec
[16:43:38]  console.log: video bitrate: 398 kbits/sec
[16:43:39]  console.log: video bitrate: 657 kbits/sec
[16:43:40]  console.log: video bitrate: 427 kbits/sec
[16:43:41]  console.log: video bitrate: 338 kbits/sec
[16:43:42]  console.log: video bitrate: 341 kbits/sec
[16:43:43]  console.log: video bitrate: 344 kbits/sec
[16:43:44]  console.log: video bitrate: 355 kbits/sec
[16:43:45]  console.log: video bitrate: 324 kbits/sec
[16:43:46]  console.log: video bitrate: 621 kbits/sec
[16:43:47]  console.log: video bitrate: 420 kbits/sec
[16:43:48]  console.log: video bitrate: 528 kbits/sec
[16:43:49]  console.log: video bitrate: 559 kbits/sec
[16:43:50]  console.log: video bitrate: 392 kbits/sec
[16:43:51]  console.log: video bitrate: 348 kbits/sec
[16:43:52]  console.log: video bitrate: 343 kbits/sec
[16:43:53]  console.log: video bitrate: 408 kbits/sec
[16:43:54]  console.log: video bitrate: 341 kbits/sec
[16:43:55]  console.log: video bitrate: 422 kbits/sec
[16:43:56]  console.log: video bitrate: 351 kbits/sec
[16:43:57]  console.log: video bitrate: 338 kbits/sec
[16:43:58]  console.log: video bitrate: 645 kbits/sec
[16:43:59]  console.log: video bitrate: 538 kbits/sec
[16:44:00]  console.log: video bitrate: 455 kbits/sec
[16:44:01]  console.log: video bitrate: 348 kbits/sec
[16:44:02]  console.log: video bitrate: 352 kbits/sec
[16:44:03]  console.log: video bitrate: 348 kbits/sec
[16:44:04]  console.log: video bitrate: 346 kbits/sec
[16:44:05]  console.log: video bitrate: 348 kbits/sec
[16:44:06]  console.log: video bitrate: 399 kbits/sec
[16:44:07]  console.log: video bitrate: 356 kbits/sec
[16:44:08]  console.log: video bitrate: 340 kbits/sec
[16:44:09]  console.log: video bitrate: 508 kbits/sec
[16:44:10]  console.log: video bitrate: 454 kbits/sec
[16:44:11]  console.log: video bitrate: 384 kbits/sec
[16:44:12]  console.log: video bitrate: 657 kbits/sec
[16:44:13]  console.log: video bitrate: 415 kbits/sec
[16:44:14]  console.log: video bitrate: 506 kbits/sec
[16:44:15]  console.log: video bitrate: 334 kbits/sec
[16:44:16]  console.log: video bitrate: 377 kbits/sec
[16:44:17]  console.log: video bitrate: 330 kbits/sec
[16:44:18]  console.log: video bitrate: 609 kbits/sec
[16:44:19]  console.log: video bitrate: 526 kbits/sec
[16:44:20]  console.log: video bitrate: 491 kbits/sec

defaults write com.google.Keystone.Agent checkInterval 0
```