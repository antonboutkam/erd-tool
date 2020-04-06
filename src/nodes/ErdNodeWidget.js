import * as React from 'react';
import { PortWidget } from "@projectstorm/react-diagrams-core/src/entities/port/PortWidget";
import { Field } from "../models/Field";
import { Messenger } from "../helpers/Messenger";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export class ErdNodeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const table = this.props.node.table;
        let fields = table.fields.map((field, index) => {
            let basePortName = table.name + '_' + field.name;
            let fieldTypeClasses = 'field-type ' + field.type;
            let handleEditFieldClick = () => {
                console.log('handleEditFieldClick()');
                field.table_name = table.name;
                console.log("\t", field);
                Messenger.send('edit_property', field);
            };
            const property_id = table.name + '_' + field.name;
            return (React.createElement("div", { key: index, id: property_id, className: "field-container" },
                React.createElement("div", { className: "connector-in" },
                    React.createElement(PortWidget, { engine: this.props.engine, port: this.props.node.getPort(basePortName + '_in') },
                        React.createElement("div", { className: "bar" }))),
                React.createElement("div", { className: "field", onClick: handleEditFieldClick }, field.name),
                React.createElement("div", { className: fieldTypeClasses }, Field.getShortCode(field.type)),
                React.createElement("div", { className: "connector-out" },
                    React.createElement(PortWidget, { engine: this.props.engine, port: this.props.node.getPort(basePortName + '_out') },
                        React.createElement("div", { className: "bar" })))));
        });
        const sendEditModelNotification = () => {
            Messenger.send('edit_model', table);
        };
        const addIcon = (React.createElement(FontAwesomeIcon, { icon: faPlusCircle }));
        let emitAddProperty = () => {
            Messenger.send('add_property', { table_name: table.name });
        };
        return (React.createElement("div", { className: "custom-node" },
            React.createElement("div", { className: "label-container", onClick: sendEditModelNotification },
                React.createElement("h3", { className: "list-heading" }, table.name)),
            fields,
            React.createElement("div", { className: "add-property-container" },
                React.createElement("div", { className: "field", onClick: emitAddProperty },
                    React.createElement("label", null, "Add property"),
                    addIcon))));
    }
}
