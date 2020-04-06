import { NodeModel } from '@projectstorm/react-diagrams-core/src/entities/node/NodeModel';
import { PortModel } from '@projectstorm/react-diagrams-core/src/entities/port/PortModel';
import { Table } from '../models/Table';
let portRegister = {};
export class ErdNodeModel extends NodeModel {
    constructor(options = {}) {
        super(Object.assign({}, options, { type: 'ts-custom-node' }));
        this.color = options.color || 'red';
        this.table = options.table || new Table();
        let currentModel = this;
        this.table.fields.forEach((field) => {
            let portName = ErdNodeModel.getPortName(this.table, field, 'in');
            // setup an in and out port
            portRegister[portName] = {};
            const portModelOptions = {
                in: true,
                name: portName
            };
            portRegister[portName] = currentModel.addPort(new PortModel(portModelOptions));
        });
        this.table.fields.forEach((field) => {
            let portName = ErdNodeModel.getPortName(this.table, field, 'out');
            // setup an in and out port
            portRegister[portName] = {};
            const portModelOptions = {
                in: false,
                name: portName
            };
            portRegister[portName] = currentModel.addPort(new PortModel(portModelOptions));
        });
    }
    removePortByName(name) {
        let ports = this.getPorts();
        for (let portsKey in ports) {
            if (ports.hasOwnProperty(portsKey)) {
                let port;
                if (port.getName() === name) {
                    port.removeLinks();
                    this.removePort(port);
                }
            }
        }
    }
    addProperty(field) {
        this.table.fields.push(field);
    }
    getPorts() {
        return this.ports;
    }
    static makePortName(table, field, direction) {
        return table + '_' + field + '_' + direction;
    }
    static getPortName(table, field, direction) {
        return this.makePortName(table.name, field.name, direction);
    }
    static getPortFromRegister(portName) {
        return portRegister[portName];
    }
    serialize() {
        return Object.assign({}, super.serialize(), { color: this.color, table: this.table });
    }
    deserialize(event) {
        super.deserialize(event);
        this.color = event.data.color;
        this.table = event.data.table;
    }
}
