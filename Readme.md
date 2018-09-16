[GSTREAMER]
    brew search gstreamer
    brew search gst-plugins [install all ugly, good, bad, etc]

    brew install gstreamer
    brew install gst-plugins-bad 
    brew install gst-plugins-good 
    brew install gst-plugins-ugly 
    brew install gst-plugins-bad --with-x264

    gst-launch-1.0 -v avfvideosrc capture-screen=true ! video/x-raw,framerate=20/1 ! videoscale ! videoconvert ! x264enc tune=zerolatency bitrate=500 speed-preset=superfast ! rtph264pay ! udpsink host=192.168.1.3 port=5000

[JANUS]
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

[IONIC LOGS]
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