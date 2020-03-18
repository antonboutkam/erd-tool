import * as React from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {TSCustomNodeModel} from './TSCustomNodeModel';
import {Field} from "../models/Field";

export interface TSCustomNodeWidgetProps {
    node: TSCustomNodeModel;
    engine: DiagramEngine;
}

export interface TSCustomNodeWidgetState {
}

export class TSCustomNodeWidget extends React.Component<TSCustomNodeWidgetProps, TSCustomNodeWidgetState> {
    constructor(props: TSCustomNodeWidgetProps) {
        super(props);

        this.state = {};
    }


    render() {

        let fields = this.props.node.table.fields.map((field : Field, index) => {

                let basePortName = this.props.node.table.name + '_' + field.name;

                let fieldTypeClasses = 'field-type ' + field.type;
                return (
                    <div key={index} className="field-container">
                        <div className="connector-in">
                            <PortWidget engine={this.props.engine} port={this.props.node.getPort(basePortName + '_in')}>
                                <div className="bar"/>
                            </PortWidget>
                        </div>

                        <div className="field">{field.name}</div>
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

        return (
            <div className="custom-node">
                <div className="label-container">
                    <h3 className="list-heading">{this.props.node.table.name}</h3>
                </div>

                {fields}
            </div>
        );
    }
}
