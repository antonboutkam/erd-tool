import * as React from 'react';
import { ErdNodeModel } from './ErdNodeModel';
import { ErdNodeWidget } from './ErdNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core/src/DiagramEngine';

export class ErdNodeFactory extends AbstractReactFactory<ErdNodeModel, DiagramEngine> {
	constructor() {
		super('ts-custom-node');
	}

	generateModel(initialConfig) {
		return new ErdNodeModel();
	}

	generateReactWidget(event): JSX.Element {
		return <ErdNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
