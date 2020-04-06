export interface Message<T> {
    topic: string;
    content: T
}

export interface MessageContentGenerics {
}

type MessageReceiver = (payload: Message<MessageContentGenerics>) => void;

export class Messenger {

    private static isListening: boolean;
    private static aListeners: MessageReceiver[] = [];

    private static startListener() {
        console.log('ERD', 'Messenger.startListener()');
        Messenger.isListening = true;

        // addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            console.log("\t", element, eventName, eventHandler);

            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }

        // Listen to messages from parent window
        bindEvent(window, 'message', (rawMessage: MessageEvent) => {
            console.log('ERD', 'Messenger.messageEvent()', rawMessage.data);
            if (typeof rawMessage.data !== "undefined") {
                try {
                    if (typeof rawMessage.data == 'string') {
                        let message: Message<MessageContentGenerics> = JSON.parse(rawMessage.data);
                        if (typeof (Messenger.aListeners[message.topic]) != 'undefined') {
                            Messenger.aListeners[message.topic](message);
                        }
                    }
                } catch (e) {
                    // Webpack also sends messages, these can be ignored here.
                }
            }
        });
    }
    static send(topic: string, data: any) {
        console.log('ERD', 'Messenger.send(topic, data)', topic, data);

        let oMessage = {
            topic: topic,
            data: data
        };
        // Make sure you are sending a string, and to stringify JSON
        window.parent.postMessage(JSON.stringify(oMessage), '*');
    }
    static onReceive(topic :string, callback: MessageReceiver) {
        console.log('ERD', 'Messenger.send(topic, data)', topic, callback);
        Messenger.aListeners[topic] = callback;
        if (!Messenger.isListening) {
            Messenger.startListener();
        }
        console.log("\t", 'Register ' + topic + ' listener in ERD editor');
    }
}
