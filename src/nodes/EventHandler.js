export class EventHandler {
    static trigger(model) {
        return '';
    }
}
export function eventHandler(name, options) {
    return function (...args) {
        const skipMessages = ['offsetUpdated', 'nodesUpdated', 'zoomUpdated', 'linksUpdated'];
        const messageType = args[0].function;
        if (skipMessages.indexOf(messageType) < 0) {
            console.log('handle:' + messageType + ' ' + skipMessages.indexOf(messageType));
            console.log(args);
        }
    };
}
