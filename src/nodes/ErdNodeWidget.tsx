import * as React from 'react';
import {PortWidget} from "@projectstorm/react-diagrams-core/src/entities/port/PortWidget";
import {DiagramEngine} from '@projectstorm/react-diagrams-core/src/DiagramEngine';
import {ErdNodeModel} from './ErdNodeModel';
import {Field} from "../models/Field";
import {Messenger} from "../helpers/Messenger";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface TSCustomNodeWidgetProps {
    node: ErdNodeModel;
    engine: DiagramEngine;
}

export interface TSCustomNodeWidgetState {
}

export class ErdNodeWidget extends React.Component<TSCustomNodeWidgetProps, TSCustomNodeWidgetState> {
    constructor(props: TSCustomNodeWidgetProps) {
        super(props);

        this.state = {};
    }


    render() {

        const table = this.props.node.table;
        let fields = table.fields.map((field : Field, index) => {

                let basePortName = table.name + '_' + field.name;

                let fieldTypeClasses = 'field-type ' + field.type;

                let handleEditFieldClick = () => {
                    console.log('handleEditFieldClick()');
                    field.table_name = table.name;
                    console.log("\t", field);
                    Messenger.send('edit_property', field);
                };

            const property_id : string = table.name + '_' + field.name;

            return (
                    <div key={index} id={property_id} className="field-container">
                        <div className="connector-in">
                            <PortWidget engine={this.props.engine} port={this.props.node.getPort(basePortName + '_in')}>
                                <div className="bar"/>
                            </PortWidget>
                        </div>

                        <div className="field" onClick={handleEditFieldClick}>{field.name}</div>
                        <div className={fieldTypeClasses}>{Field.getShortCode(field.type)}</div>

                        <div className="connector-out">
                            <PortWidget engine={this.props.engine} port={this.props.node.getPort(basePortName + '_out')}>
                                <div className="bar"/>
                            </PortWidget>
                        </div>
                    </div>
                );
            }
        );

        const sendEditModelNotification = ():void =>
        {
            Messenger.send('edit_model', table);
        };

        const addIcon = (<FontAwesomeIcon icon={faPlusCircle} />);

        let emitAddProperty = () => {
            Messenger.send('add_property', {table_name : table.name});
        };

        return (
            <div className="custom-node">
                <div className="label-container" onClick={sendEditModelNotification}>
                    <h3 className="list-heading">{table.name}</h3>
                </div>
                {fields}
                <div className="add-property-container">
                    <div className="field" onClick={emitAddProperty}>
                        <label>Add property</label>
                        {addIcon}
                    </div>

                </div>
            </div>
        );
    }
}
