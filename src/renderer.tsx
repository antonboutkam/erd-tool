import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createEngine, {DefaultLinkModel, DiagramModel, DiagramEngine, DefaultPortModel} from '@projectstorm/react-diagrams';
import {TSCustomNodeFactory} from './nodes/TSCustomNodeFactory';
import {TSCustomNodeModel} from './nodes/TSCustomNodeModel';
import {BodyWidget} from './BodyWidget';
import {WorkspaceContainer} from "./WorkspaceContainer";
import {Table} from "./models/Table";
import {Field} from "./models/Field";

let count = 0;

function connectNodes(nodeFrom, nodeTo, engine: DiagramEngine) {
    //just to get id-like structure
    count++;
    const portOut = nodeFrom.addPort(new DefaultPortModel(true, `${nodeFrom.name}-out-${count}`, 'Out'));
    const portTo = nodeTo.addPort(new DefaultPortModel(false, `${nodeFrom.name}-to-${count}`, 'IN'));
    return portOut.link(portTo);

    // ################# UNCOMMENT THIS LINE FOR PATH FINDING #############################
    // return portOut.link(portTo, engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME));
    // #####################################################################################
}

const engine = createEngine();
const model = new DiagramModel();

engine.getNodeFactories().registerFactory(new TSCustomNodeFactory());

export class Renderer {
    static render(): void {

        engine.setModel(model);

        document.addEventListener('DOMContentLoaded', () => {
                ReactDOM.render(<WorkspaceContainer model={model} engine={engine}/>, document.querySelector('#application'));
            }
        );
    }
    static addNode(table : Table, index):void
    {
        const nodeX = new TSCustomNodeModel({color: 'rgb(0,192,255)', table : table});
        nodeX.setPosition(index * 70, 50);
        model.addNode(nodeX);
        engine.setModel(model);
    }
    static addLink(tableFrom:string, fieldFrom:string, tableTo:string, fieldTo:string):void
    {


        const portOut = TSCustomNodeModel.getPortFromRegister(TSCustomNodeModel.makePortName(tableFrom, fieldFrom, 'out'));
        const portTo = TSCustomNodeModel.getPortFromRegister(TSCustomNodeModel.makePortName(tableTo, fieldTo, 'in'));
        const link = new DefaultLinkModel();
        link.setSourcePort(portOut);
        link.setTargetPort(portTo);


        model.addLink(link);
    }
}

