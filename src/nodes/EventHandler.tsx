import {DiagramModel} from "@projectstorm/react-diagrams-core";
import {BaseEvent} from "@projectstorm/react-canvas-core";

export class EventHandler implements BaseEvent{
    firing: boolean;
    stopPropagation: () => any;


    static trigger(model : DiagramModel):string
    {
        return '';
    }
}
export type HandlerFunction = (...args: any[]) => void;

export interface ActionOptions {
    depth?: number;
    clearOnStoryChange?: boolean;
    limit?: number;
    allowFunction?: boolean;
}


export function eventHandler(name: string, options?: ActionOptions) : HandlerFunction
{
    return function(...args: any[]):void {

        const skipMessages = ['offsetUpdated', 'nodesUpdated', 'zoomUpdated', 'linksUpdated'];
        const messageType = args[0].function;
        if(skipMessages.indexOf(messageType) < 0)
        {
            console.log('handle:' + messageType + ' ' + skipMessages.indexOf(messageType));
            console.log(args);
        }

    }
}

/**
 * Listeners are always in the form of an object that contains methods that take events
 */
export type BaseListener = {
    /**
     * Generic event that fires before a specific event was fired
     */
    eventWillFire?: (event: BaseEvent & { function: string }) => void;

    /**
     * Generic event that fires after a specific event was fired (even if it was consumed)
     */
    eventDidFire?: (event: BaseEvent & { function: string }) => void;
    /**
     * Type for other events that will fire
     */
    [key: string]: (event: BaseEvent) => any;
};
