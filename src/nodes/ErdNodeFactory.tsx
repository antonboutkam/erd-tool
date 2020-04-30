import * as React from 'react';
import {ErdNodeModel, ErdNodeModelGenerics} from './ErdNodeModel';
import { ErdNodeWidget } from './ErdNodeWidget';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core/';
import {GenerateModelEvent} from '@projectstorm/react-canvas-core/';
import { DiagramEngine } from '@projectstorm/react-diagrams-core/';
import {BaseModel} from "@projectstorm/react-canvas-core/";
import {BaseModelGenerics} from "@projectstorm/react-canvas-core/";
import {CanvasEngine} from "@projectstorm/react-canvas-core/";

export class ErdNodeFactory extends AbstractReactFactory<ErdNodeModel, DiagramEngine> {

	constructor() {
		super('ts-custom-node');
	}

	generateModel(event : GenerateModelEvent):ErdNodeModel<ErdNodeModelGenerics> {
		return new ErdNodeModel();
	}

	generateReactWidget(event): JSX.Element {
		return <ErdNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}

}
