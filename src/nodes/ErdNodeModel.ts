import {DefaultPortModelOptions} from '@projectstorm/react-diagrams';
import {NodeModel, NodeModelGenerics, NodeModelListener} from '@projectstorm/react-diagrams-core/';
import {DiagramModel} from '@projectstorm/react-diagrams-core/';

import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import {Table} from '../models/Table';
import {Field} from '../models/Field';
import {ErdPortModel} from "./ErdPortModel";

export interface ErdNodeModelOptions extends BaseModelOptions {
	color?: string;
	table? : Table
}
let portRegister = {};

export interface ErdNodeModelGenerics extends NodeModelGenerics {
	LISTENER: NodeModelListener;
	PARENT: DiagramModel;
}

export class ErdNodeModel<G extends ErdNodeModelGenerics = ErdNodeModelGenerics> extends NodeModel<G> {
	color: string;
	table: Table;
	protected ports: { [s: string]: ErdPortModel };

	constructor(options: ErdNodeModelOptions = {}) {
		super({
			...options,
			type: 'ts-custom-node'
		});
		this.color = options.color || 'red';
		this.table = options.table || new Table();

		let currentModel = this;
		this.table.fields.forEach((field) => {

			let portName = ErdNodeModel.getPortName(this.table, field, 'in');

			// setup an in and out port
			portRegister[portName] = {};
			const portModelOptions : DefaultPortModelOptions = {
				in: true,
				name: portName
			};
			portRegister[portName] = currentModel.addPort(
				new ErdPortModel(portModelOptions)
			);
		});

		this.table.fields.forEach((field) => {
			let portName = ErdNodeModel.getPortName(this.table, field, 'out');

			// setup an in and out port
			portRegister[portName] = {};
			const portModelOptions : DefaultPortModelOptions = {
				in: false,
				name: portName
			};
			portRegister[portName] = currentModel.addPort(
				new ErdPortModel(portModelOptions)
			);
		});

	}

	removePortByName(name : string):void
	{
		let ports : {[s:string] : ErdPortModel} = this.getPorts();
		for (let portsKey in ports) {
			if(ports.hasOwnProperty(portsKey))
			{
				let port : ErdPortModel = ports[portsKey];
				console.log(port.getName(), name);
				if(port.getName() === name)
				{
					console.log('REMOVE!');
					port.removeLinks();
					this.removePort(port);
				}
			}
		}
	}
	addProperty(field : Field)
	{
		this.table.fields.push(field);
	}
	getPorts(): { [s: string]: ErdPortModel } {
		return this.ports;
	}
	static makePortName(table:string, field:string, direction:string):string
	{
		return table + '_' + field + '_' + direction;
	}
	static getPortName(table:Table, field:Field, direction:string):string
	{
		return this.makePortName(table.name, field.name, direction);
	}
	static getPortFromRegister(portName):ErdPortModel
	{
		return portRegister[portName];
	}
	serialize() {
		return {
			...super.serialize(),
			color: this.color,
			table: this.table,
		};
	}
	deserialize(event): void {
		super.deserialize(event);
		this.color = event.data.color;
		this.table = event.data.table;
	}
}
