/* eslint-disable new-parens */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
function H5sPlayerWS(t) {
    this.sourceBuffer, this.buffer = [], this.t, this.s, this.i, this.o, this.h, this.l = 0, this.u = 0, this.S = 0, this.v = !1, this.k = !1, this.p = !1, this.H, this.P = t, console.log('Websocket Conf:', t),
        this.W = t.videoid, this.C = t.token, void 0 === this.W ? (this.I = t.videodom, console.log(t.token, 'use dom directly')) : (this.I = document.getElementById(this.W), console.log(t.token, 'use videoid')),
        this.s = this.I
    var s = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'api/v1/GetImage?token=' + this.C + '&session=' + this.P.session
    this.I.setAttribute('poster', s)
}

function H5sPlayerHls(t) {
    this.i, this.h, this.P = t, this.W = t.videoid, this.C = t.token, this.R, this.m = t.hlsver,
        void 0 === this.W ? (this.I = t.videodom, console.log(t.token, 'use dom directly')) : (this.I = document.getElementById(this.W), console.log(t.token, 'use videoid')),
        this.A = this.I, this.A.type = 'application/x-mpegURL', this.T = 0, this.M = 0
    var s = this.P.protocol + '//' + window.location.host + '/api/v1/GetImage?token=' + this.C + '&session=' + this.P.session
    this.I.setAttribute('poster', s)
}

function H5sPlayerRTC(t) {
    this.i, this.o, this.h, this.l = 0, this.u = 0, this.S = 0, this.v = !1, this.k = !1, this.P = t, this.W = t.videoid, this.C = t.token,
        void 0 === this.W ? (this.I = t.videodom, console.log(t.token, 'use dom directly')) : (this.I = document.getElementById(this.W),
            console.log(t.token, 'use videoid')),
        this.s = this.I, this.O = null,
        this.J = {
            optional: [{ DtlsSrtpKeyAgreement: !0 }]
        },
        this.N = {
            mandatory: {
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !0
            }
        }, this.g = { B: [] }, this.L = []
    var s = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'api/v1/GetImage?token=' + this.C + '&session=' + this.P.session
    this.I.setAttribute('poster', s)
}

function createRTCSessionDescription(t) { return console.log('createRTCSessionDescription '), new RTCSessionDescription(t) }

function H5sPlayerAudio(t) {
    this.buffer = [], this.i, this.v = !1, this.k = !1, this.P = t, console.log('Aduio Player Conf:', t), this.C = t.token, this.D = new AudioContext
}

function H5sPlayerAudBack(t) {
    this.buffer = [], this.i, this.v = !1, this.k = !1, this.P = t, this.U = 0, console.log('Aduio Back Conf:', t), this.C = t.token, this.D = new AudioContext
}

function float32ToInt16(t) {
    for (l = t.length, buf = new Int16Array(l); l--;) buf[l] = 32767 * Math.min(1, t[l]);
    return buf
}

H5sPlayerWS.prototype.G = function () {
    console.log('Try Reconnect...', this.v), !0 === this.v && (console.log('Reconnect...'), this._(this.C), this.v = !1), console.log('Try Reconnect...', this.v)
},
    H5sPlayerWS.prototype.K = function (t) {
        var s
        console.log('H5SWebSocketClient')
        try {
            'http:' == this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)),
                'https:' == this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)),
                console.log(this.P.host)
        } catch (t) {
            return void alert('error')
        }
        return s
    },
    H5sPlayerWS.prototype.V = function () {
        if (null !== this.sourceBuffer && void 0 !== this.sourceBuffer) {
            if (0 !== this.buffer.length && !this.sourceBuffer.updating) try {
                var t = this.buffer.shift(), s = new Uint8Array(t)
                this.sourceBuffer.appendBuffer(s)
            } catch (t) { console.log(t) }
        } else console.log(this.sourceBuffer, 'is null or undefined')
    },
    H5sPlayerWS.prototype.j = function () {
        try {
            var t = { cmd: 'H5_KEEPALIVE', nSpeed: '1.0', nTime: '0' }
            this.i.send(JSON.stringify(t))
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.q = function (t) {
        if (!0 !== this.k) return !1 === this.p ? (this.H = String.fromCharCode.apply(null, new Uint8Array(t.data)), this.F(this), void (this.p = !0)) : (this.buffer.push(t.data), void this.V())
    },
    H5sPlayerWS.prototype.F = function (t) {
        try {
            window.MediaSource = window.MediaSource || window.WebKitMediaSource, window.MediaSource || console.log('MediaSource API is not available')
            var s = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            'MediaSource' in window && MediaSource.isTypeSupported(s) ? console.log('MIME type or codec: ', s) : console.log('Unsupported MIME type or codec: ', s),
                t.t = new window.MediaSource, t.s.autoplay = !0, console.log(t.W)
            t.s.src = window.URL.createObjectURL(t.t), t.s.play(), t.t.addEventListener('sourceopen', t.X.bind(t), !1)
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.X = function () {
        console.log('Add SourceBuffer'),
            this.sourceBuffer = this.t.addSourceBuffer(this.H),
            this.t.duration = 1 / 0, this.t.removeEventListener('sourceopen', this.X, !1),
            this.sourceBuffer.addEventListener('updateend', this.V.bind(this), !1)
    },
    H5sPlayerWS.prototype._ = function (t) {
        this.s.autoplay = !0
        var s = 'api/v1/h5swsapi'
        s = this.P.rootpath + s + '?token=' + t + '&session=' + this.P.session, console.log(s),
            this.i = this.K(s), console.log('setupWebSocket', this.i),
            this.i.binaryType = 'arraybuffer', (this.i.Y = this).i.onmessage = this.q.bind(this), 
            this.i.onopen = function () {
                console.log('wsSocket.onopen', this.Y), this.Y.o = setInterval(this.Y.Z.bind(this.Y), 1e4), this.Y.h = setInterval(this.Y.j.bind(this.Y), 1e3)
            },
            this.i.onclose = function () {
                console.log('wsSocket.onclose', this.Y), !0 === this.Y.k ? console.log('wsSocket.onclose disconnect') : this.Y.v = !0, this.Y.$(this.Y), this.Y.tt(this.Y), this.Y.H = '', this.Y.p = !1
            }
    },
    H5sPlayerWS.prototype.$ = function (t) {
        console.log('Cleanup Source Buffer', t)
        try {
            t.sourceBuffer.removeEventListener('updateend', t.V, !1),
                t.sourceBuffer.abort(), document.documentMode || /Edge/.test(navigator.userAgent) ? console.log('IE or EDGE!') : t.t.removeSourceBuffer(t.sourceBuffer),
                t.sourceBuffer = null, t.t = null, t.buffer = []
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.tt = function (t) {
        console.log('CleanupWebSocket', t), clearInterval(t.h), clearInterval(t.o), t.l = 0, t.u = 0, t.S = 0
    },
    H5sPlayerWS.prototype.Z = function () {
        !0 === this.k && (console.log('CheckSourceBuffer has been disconnect', this), clearInterval(this.h), clearInterval(this.o), clearInterval(this.st))
        try {
            if (console.log('CheckSourceBuffer', this), this.sourceBuffer.buffered.length <= 0) {
                if (this.l++, 8 < this.l) return console.log('CheckSourceBuffer Close 1'), void this.i.close()
            } else {
                this.l = 0
                this.sourceBuffer.buffered.start(0)
                var t = this.sourceBuffer.buffered.end(0), s = t - this.s.currentTime
                if (5 < s || s < 0) return console.log('CheckSourceBuffer Close 2', s), void this.i.close()
                if (t == this.u) { if (this.S++, 3 < this.S) return console.log('CheckSourceBuffer Close 3'), void this.i.close() } else this.S = 0
                this.u = t
            }
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.connect = function () {
        this._(this.C), this.st = setInterval(this.G.bind(this), 3e3)
    },
    H5sPlayerWS.prototype.disconnect = function () {
        console.log('disconnect', this), this.k = !0, clearInterval(this.st), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this)
    },
    H5sPlayerWS.prototype.pause = function () {
        try {
            var t = {
                cmd: 'H5_PAUSE',
                nSpeed: '1.0',
                nTime: '0'
            }
            this.i.send(JSON.stringify(t))
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.resume = function () {
        try {
            var t = { cmd: 'H5_RESUME', nSpeed: '1.0', nTime: '0' }
            this.i.send(JSON.stringify(t))
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.seek = function (t) {
        try {
            var s = { cmd: 'H5_SEEK', nSpeed: '1.0' }
            s.nTime = t, this.i.send(JSON.stringify(s))
        } catch (t) { console.log(t) }
    },
    H5sPlayerWS.prototype.speed = function (t) {
        try {
            var s = { cmd: 'H5_SPEED' }
            s.nSpeed = t, s.nTime = 0, this.i.send(JSON.stringify(s))
        } catch (t) { console.log(t) }
    },
    H5sPlayerHls.prototype.K = function (t) {
        var s
        console.log('H5SWebSocketClient')
        try {
            'http:' == this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)),
                'https:' == this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)),
                console.log(this.P.host)
        } catch (t) {
            return void alert('error')
        }
        return s
    },
    H5sPlayerHls.prototype.j = function () {
        try {
            var t = { type: 'keepalive' }
            this.i.send(JSON.stringify(t))
        } catch (t) { console.log(t) }
    },
    H5sPlayerHls.prototype.q = function (t) { console.log('HLS received ', t.data) }, H5sPlayerHls.prototype._ = function (t) {
        var s = 'api/v1/h5swscmnapi'
        s = this.P.rootpath + s + '?token=' + t, console.log(s),
            this.i = this.K(s), console.log('setupWebSocket', this.i),
            this.i.binaryType = 'arraybuffer', (this.i.Y = this).i.onmessage = this.q.bind(this),
            this.i.onopen = function () { console.log('wsSocket.onopen', this.Y), this.Y.h = setInterval(this.Y.j.bind(this.Y), 1e3) },
            this.i.onclose = function () { console.log('wsSocket.onclose', this.Y), this.Y.tt(this.Y) }
    },
    H5sPlayerHls.prototype.tt = function (t) {
        console.log('H5sPlayerHls CleanupWebSocket', t), clearInterval(t.h)
    }, H5sPlayerHls.prototype.et = function () {
        console.log('HLS video.ended', this.A.ended), console.log('HLS video.currentTime', this.A.currentTime)
        var t = this.A.currentTime, s = t - this.T
        console.log('HLS diff', s), 0 === s && this.M++, this.T = t, 3 < this.M && (null != this.i && (this.i.close(), this.i = null), this._(this.C), console.log('HLS reconnect'),
            this.A.src = '', this.T = 0, this.M = 0, this.A.src = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'hls/' + this.m + '/' + this.C + '/hls.m3u8', this.A.play())
    },
    H5sPlayerHls.prototype.connect = function () {
        this._(this.C), this.T = 0, this.M = 0,
            this.A.onended = function (t) {
                console.log('The End')
            },
            this.A.onpause = function (t) {
                console.log('Pause')
            },
            this.A.onplaying = function (t) {
                console.log('Playing')
            },
            this.A.onseeking = function (t) {
                console.log('seeking')
            },
            this.A.onvolumechange = function (t) {
                console.log('volumechange')
            },
            this.A.src = this.P.protocol + '//' + this.P.host + this.P.rootpath + 'hls/' + this.m + '/' + this.C + '/hls.m3u8', this.A.play(), this.R = setInterval(this.et.bind(this), 3e3)
    },
    H5sPlayerHls.prototype.disconnect = function () {
        clearInterval(this.R), this.T = 0, this.M = 0, null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this)
    },
    H5sPlayerRTC.prototype.G = function () {
        console.log('Try Reconnect...', this.v), !0 === this.v && (console.log('Reconnect...'), this._(this.C), this.v = !1), console.log('Try Reconnect...', this.v)
    },
    H5sPlayerRTC.prototype.K = function (t) {
        var s
        console.log('H5SWebSocketClient')
        try {
            'http:' == this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)),
                'https:' == this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)),
                console.log(this.P.host)
        } catch (t) {
            return void alert('error')
        }
        return s
    },
    H5sPlayerRTC.prototype.j = function () {
        try {
            var t = { type: 'keepalive' }
            this.i.send(JSON.stringify(t))
        } catch (t) { console.log(t) }
    },
    H5sPlayerRTC.prototype.it = function (t) {
        if (t.candidate) {
            var s
            console.log('onIceCandidate currentice', t.candidate), s = t.candidate, console.log('onIceCandidate currentice', s, JSON.stringify(s))
            var e = JSON.parse(JSON.stringify(s))
            e.type = 'remoteice', console.log('onIceCandidate currentice new', e, JSON.stringify(e)), this.i.send(JSON.stringify(e))
        } else console.log('End of candidates.')
    },
    H5sPlayerRTC.prototype.ot = function (t) {
        var s
        console.log('Remote track added:' + JSON.stringify(t)), s = t.nt ? t.nt[0] : t.stream
        var e = this.I
        e.src = URL.createObjectURL(s), e.play()
    },
    H5sPlayerRTC.prototype.ct = function () {
        console.log('createPeerConnection  config: ' + JSON.stringify(this.g) + ' option:' + JSON.stringify(this.J))
        var s = new RTCPeerConnection(this.g, this.J), e = this
        return s.onicecandidate = function (t) {
            e.it.call(e, t)
        },
            void 0 !== s.ht ? s.ht = function (t) { e.ot.call(e, t) } : s.onaddstream = function (t) { e.ot.call(e, t) },
            s.oniceconnectionstatechange = function (t) {
                console.log('oniceconnectionstatechange  state: ' + s.iceConnectionState)
            },
            console.log('Created RTCPeerConnnection with config: ' + JSON.stringify(this.g) + 'option:' + JSON.stringify(this.J)), s
    },
    H5sPlayerRTC.prototype.rt = function (t) {
        console.log('ProcessRTCOffer', t)
        try {
            this.O = this.ct(), this.L.length = 0
            var s = this
            this.O.setRemoteDescription(createRTCSessionDescription(t)),
                this.O.createAnswer(this.N).then(function (t) {
                    console.log('Create answer:' + JSON.stringify(t)),
                        s.O.setLocalDescription(t, function () {
                            console.log('ProcessRTCOffer createAnswer', t), s.i.send(JSON.stringify(t))
                        }, function () { })
                }, function (t) { alert('Create awnser error:' + JSON.stringify(t)) })
        } catch (t) {
            this.disconnect(), alert('connect error: ' + t)
        }
    },
    H5sPlayerRTC.prototype.lt = function (t) {
        console.log('ProcessRemoteIce', t)
        try {
            var s = new RTCIceCandidate({ sdpMLineIndex: t.sdpMLineIndex, candidate: t.candidate })
            console.log('ProcessRemoteIce', s),
                console.log('Adding ICE candidate :' + JSON.stringify(s)),
                this.O.addIceCandidate(s, function () {
                    console.log('addIceCandidate OK')
                },
                    function (t) {
                        console.log('addIceCandidate error:' + JSON.stringify(t))
                    })
        } catch (t) {
            alert('connect ProcessRemoteIce error: ' + t)
        }
    },
    H5sPlayerRTC.prototype.q = function (t) {
        console.log('RTC received ', t.data)
        var s = JSON.parse(t.data)
        console.log('Get Message type ', s.type),
            'offer' === s.type && (console.log('Process Message type ', s.type), this.rt(s)),
            'remoteice' === s.type && (console.log('Process Message type ', s.type), this.lt(s))
    },
    H5sPlayerRTC.prototype._ = function (t) {
        this.s.autoplay = !0
        var s = 'api/v1/h5srtcapi'
        s = this.P.rootpath + s + '?token=' + t, console.log(s),
            this.i = this.K(s), console.log('setupWebSocket', this.i),
            this.i.binaryType = 'arraybuffer',
            (this.i.Y = this).i.onmessage = this.q.bind(this),
            this.i.onopen = function () {
                console.log('wsSocket.onopen', this.Y)
                var t = { type: 'open' }
                this.Y.i.send(JSON.stringify(t)), this.Y.h = setInterval(this.Y.j.bind(this.Y), 1e3)
            },
            this.i.onclose = function () {
                console.log('wsSocket.onclose', this.Y), !0 === this.Y.k ? console.log('wsSocket.onclose disconnect') : this.Y.v = !0, this.Y.tt(this.Y)
            }
    },
    H5sPlayerRTC.prototype.tt = function (t) {
        console.log('CleanupWebSocket', t), clearInterval(t.h), t.l = 0, t.u = 0, t.S = 0
    },
    H5sPlayerRTC.prototype.connect = function () {
        this._(this.C), this.st = setInterval(this.G.bind(this), 3e3)
    },
    H5sPlayerRTC.prototype.disconnect = function () {
        console.log('disconnect', this), this.k = !0, clearInterval(this.st), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this)
    },
    H5sPlayerAudio.prototype.K = function (t) {
        var s
        console.log('H5SWebSocketClient')
        try {
            'http:' == this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)),
                'https:' == this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)),
                console.log(this.P.host)
        } catch (t) {
            return void alert('error')
        }
        return s
    },
    H5sPlayerAudio.prototype.j = function () {
        try { this.i.send('keepalive') } catch (t) { console.log(t) }
    },
    H5sPlayerAudio.prototype.q = function (t) {
        for (var s = new Int16Array(t.data), e = s.length, i = this.D.createBuffer(1, e, 8e3), o = 0; o < 1; o++) for (var n = i.getChannelData(o), c = 0; c < e; c++) n[c] = s[c] / 16383.5
        var h = this.D.createBufferSource()
        h.buffer = i, h.connect(this.D.destination), h.start()
    },
    H5sPlayerAudio.prototype.tt = function (t) {
        console.log('CleanupWebSocket', t), clearInterval(t.h)
    },
    H5sPlayerAudio.prototype._ = function (t) {
        var s = 'api/v1/h5saudapi'
        s = this.P.rootpath + s + '?token=' + t + '&session=' + this.P.session, console.log(s),
            this.i = this.K(s), console.log('setupWebSocket for audio', this.i),
            this.i.binaryType = 'arraybuffer', (this.i.Y = this).i.onmessage = this.q.bind(this),
            this.i.onopen = function () {
                console.log('wsSocket.onopen', this.Y), this.Y.h = setInterval(this.Y.j.bind(this.Y), 1e3)
            },
            this.i.onclose = function () {
                console.log('wsSocket.onclose', this.Y), this.Y.tt(this.Y)
            }
    },
    H5sPlayerAudio.prototype.connect = function () {
        this._(this.C)
    },
    H5sPlayerAudio.prototype.disconnect = function () {
        console.log('disconnect', this), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this)
    },
    H5sPlayerAudBack.prototype.K = function (t) {
        var s
        console.log('H5SWebSocketClient')
        try {
            'http:' == this.P.protocol && (s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('ws://' + this.P.host + t) : new WebSocket('ws://' + this.P.host + t)),
                'https:' == this.P.protocol && (console.log(this.P.host), s = 'undefined' != typeof MozWebSocket ? new MozWebSocket('wss://' + this.P.host + t) : new WebSocket('wss://' + this.P.host + t)),
                console.log(this.P.host)
        } catch (t) {
            return void alert('error')
        }
        return s
    },
    H5sPlayerAudBack.prototype.j = function () {
        try {
            this.i.send('keepalive')
        } catch (t) {
            console.log(t)
        }
    },
    H5sPlayerAudBack.prototype.q = function (t) {

    },
    H5sPlayerAudBack.prototype.tt = function (t) {
        console.log('CleanupWebSocket', t), clearInterval(t.h)
    },
    H5sPlayerAudBack.prototype.at = function (t) {
        console.log('wsSocket.onopen', this)
        try {
            navigator.getUserMedia({
                s: !1,
                ut: !0
            }, this.dt.bind(this))
        } catch (t) { return void alert('Audio intecomm error', t) }
    },
    H5sPlayerAudBack.prototype._ = function (t) {
        var s = 'api/v1/h5saudbackapi'
        s = this.P.rootpath + s + '?token=' + t + '&session=' + this.P.session, console.log(s),
            this.i = this.K(s), console.log('setupWebSocket for audio back', this.i),
            this.i.binaryType = 'arraybuffer',
            (this.i.Y = this).i.onmessage = this.q.bind(this),
            this.i.onopen = this.at.bind(this),
            this.i.onclose = function () {
                console.log('wsSocket.onclose', this.Y), this.Y.tt(this.Y)
            }
    },
    H5sPlayerAudBack.prototype.ft = function (t) {
        var s = float32ToInt16(t.inputBuffer.getChannelData(0))
        this.i.send(s)
    },
    H5sPlayerAudBack.prototype.dt = function (t) {
        try {
            var s = this.D.createMediaStreamSource(t)
            console.log('sampleRate', this.D.sampleRate)
            var e = this.D.createScriptProcessor(256, 1, 1)
            s.connect(e), e.connect(this.D.destination), e.onaudioprocess = this.ft.bind(this)
        } catch (t) {
            return void alert('Audio intecomm error', t)
        }
    },
    H5sPlayerAudBack.prototype.connect = function () {
        this._(this.C)
    },
    H5sPlayerAudBack.prototype.disconnect = function () {
        console.log('disconnect', this), null != this.i && (this.i.close(), this.i = null), console.log('disconnect', this)
    }

export { H5sPlayerWS, H5sPlayerHls, H5sPlayerRTC }