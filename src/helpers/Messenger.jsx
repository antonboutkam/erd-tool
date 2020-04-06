"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messenger = /** @class */ (function () {
    function Messenger() {
    }
    Messenger.startListener = function () {
        Messenger.isListening = true;
        console.log('Start listening');
        // addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            }
            else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }
        // Listen to messages from parent window
        bindEvent(window, 'message', function (rawMessage) {
            if (typeof rawMessage.data !== "undefined") {
                try {
                    if (typeof rawMessage.data == 'string') {
                        var message = JSON.parse(rawMessage.data);
                        if (typeof (Messenger.aListeners[message.topic]) != 'undefined') {
                            Messenger.aListeners[message.topic](message);
                        }
                    }
                }
                catch (e) {
                    // Webpack also sends messages, these can be ignored here.
                }
            }
        });
    };
    Messenger.send = function (topic, content) {
        console.log('Sending ' + topic + ' message from Messenger');
        var oMessage = {
            topic: topic,
            content: content
        };
        // Make sure you are sending a string, and to stringify JSON
        window.parent.postMessage(JSON.stringify(oMessage), '*');
    };
    Messenger.onReceive = function (topic, callback) {
        Messenger.aListeners[topic] = callback;
        if (!Messenger.isListening) {
            Messenger.startListener();
        }
        console.log('Register ' + topic + ' listener in ERD editor');
    };
    Messenger.aListeners = [];
    return Messenger;
}());
exports.Messenger = Messenger;
