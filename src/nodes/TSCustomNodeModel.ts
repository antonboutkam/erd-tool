import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import {Table} from '../models/Table';
import {Field} from '../models/Field';
import {PortModel} from "../../../react-diagrams/packages/react-diagrams-core/src";

export interface TSCustomNodeModelOptions extends BaseModelOptions {
	color?: string;
	table? : Table
}
let portRegister = {};

export class TSCustomNodeModel extends NodeModel {
	color: string;
	table: Table;


	static makePortName(table:string, field:string, direction:string):string
	{
		return table + '_' + field + '_' + direction;
	}

	static getPortName(table:Table, field:Field, direction:string):string
	{
		return this.makePortName(table.name, field.name, direction);
	}

	static getPortFromRegister(portName):PortModel
	{
		return portRegister[portName];
	}
	constructor(options: TSCustomNodeModelOptions = {}) {
		super({
			...options,
			type: 'ts-custom-node'
		});
		this.color = options.color || 'red';
		this.table = options.table || new Table();

		let currentModel = this;
		this.table.fields.forEach((field) => {

			let portName = TSCustomNodeModel.getPortName(this.table, field, 'in');

			// setup an in and out port
			portRegister[portName] = {};
			portRegister[portName] = currentModel.addPort(
				new DefaultPortModel({
					in: true,
					name: portName
				})
			);
		});

		this.table.fields.forEach((field) => {
			let portName = TSCustomNodeModel.getPortName(this.table, field, 'out');

			console.log("Add out port " + portName);
			// setup an in and out port
			portRegister[portName] = {};
			portRegister[portName] = currentModel.addPort(
				new DefaultPortModel({
					in: false,
					name: portName
				})
			);
		});

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
