import * as React from 'react';
import { ErdNodeModel } from './ErdNodeModel';
import { ErdNodeWidget } from './ErdNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
export class ErdNodeFactory extends AbstractReactFactory {
    constructor() {
        super('ts-custom-node');
    }
    generateModel(initialConfig) {
        return new ErdNodeModel();
    }
    generateReactWidget(event) {
        return React.createElement(ErdNodeWidget, { engine: this.engine, node: event.model });
    }
}
