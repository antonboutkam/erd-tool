import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createEngine, { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { ErdNodeFactory } from './nodes/ErdNodeFactory';
import { ErdNodeModel } from './nodes/ErdNodeModel';
import { WorkspaceContainer } from "./WorkspaceContainer";
import { eventHandler } from "./nodes/EventHandler";
const engine = createEngine();
engine.getNodeFactories().registerFactory(new ErdNodeFactory());
export class Renderer {
    static redistribute(model) {
        WorkspaceContainer.getEngine().redistribute(model);
    }
    static realRender(model, engine) {
        ReactDOM.render(React.createElement(WorkspaceContainer, { model: model, engine: engine }), document.querySelector('#application'));
        Renderer.redistribute(model);
    }
    static render(model) {
        engine.setModel(model);
        document.addEventListener('DOMContentLoaded', () => {
            Renderer.domContentLoaded = true;
            Renderer.realRender(model, engine);
        });
    }
    static removeField(diagramModel, field) {
        /*
            1. Verwijder de property zelf.
            2. Verwijder de "in" en "out" ports.
            3. Verwijder spook links
         */
        let model = diagramModel.findNode(field);
        model.removePortByName(field.name + '_in');
        model.removePortByName(field.name + '_out');
        model.table.removeField(field);
        return diagramModel;
        /*
        
                console.log('ERD', 'Renderer.removeField()', field);
        
                const oSerializeHelper = new SerializeHelper(diagramModel);
        
                oSerializeHelper.removeField(field);
        
        
                const oLinks = oSerializeHelper.getLinks();
                console.log('ERD', 'Models:', "\t", oModels);
        
                let newLinks:Link[] = [];
        
                // Loop over alle links
                for(let sLinkKey in oLinks)
                {
                    let table = oLinks[sLinkKey].table;
                    let fields = table.fields;
        
                    for(let i = 0; i < fields.length; i++) {
                        if (table.name != field.table_name) {
                            continue;
                        }
        
                        if (fields[i].name == field.name && table.name == field.table_name) {
                            continue;
                        }
        
                        newLinks.push();
                        if (oLinks.hasOwnProperty(sLinkKey)) {
                            if (oLinks[sLinkKey].table.name == field.table_name) {
        
                            }
        
                        }
                    }
                }
        
                // engine = newEngine();
                console.log('ERD', "\t", "Create new model");
                console.log('ERD', "\t", oSerializeHelper.getSerialized());
                console.log('ERD', "\t", "De-serialize", oSerializeHelper.getSerialized());
        
                const model2 = new ErdDiagramModel();
                console.log('DESERIALIZE');
                console.log('Previous', diagramModel.serialize());
                console.log('Current',oSerializeHelper.getSerialized());
        
        
                model2.deserializeModel(oSerializeHelper.getSerialized(), engine);
        
                console.log('DESERIALIZED');
                engine.setModel(model2);
                console.log('SETTED MODEL');
                engine.repaintCanvas();
                console.log('REAL_RENDER');
                Renderer.realRender(diagramModel, engine);
        
        
                setTimeout(() => {
                    Renderer.realRender(diagramModel, engine);
                }, 100);
        
                return diagramModel;
                // model.serialize().layers.forEach()
        
        */
    }
    static addProperty(model, field) {
        console.log('ERD', 'Renderer.addProperty()', field);
        model.getNodes().forEach((NodeModel) => {
            console.log('ERD', 'Renderer.addProperty()', NodeModel.table.name, field.table_name, NodeModel, field);
            if (NodeModel.table.name == field.table_name) {
                console.log('ERD', 'Renderer.addProperty() ---> ', field);
                NodeModel.addProperty(field);
            }
        });
    }
    static addNode(model, table, index) {
        console.log('ERD', 'Renderer.addNode()', table, index);
        const nodeX = new ErdNodeModel({ color: 'rgb(0,192,255)', table: table });
        nodeX.setPosition(index * 70, 50);
        model.addNode(nodeX);
        model.registerListener({
            eventDidFire: eventHandler('edit_model')
        });
    }
    /**
     * Een link is een verbinding tussen 2 poorten.
     *
     * @param model
     * @param tableFrom
     * @param fieldFrom
     * @param tableTo
     * @param fieldTo
     */
    static addLink(model, tableFrom, fieldFrom, tableTo, fieldTo) {
        console.log('ERD', 'Renderer.addLink()', tableFrom, fieldFrom, tableTo, fieldTo);
        const portOut = ErdNodeModel.getPortFromRegister(ErdNodeModel.makePortName(tableFrom, fieldFrom, 'out'));
        const portTo = ErdNodeModel.getPortFromRegister(ErdNodeModel.makePortName(tableTo, fieldTo, 'in'));
        const link = new DefaultLinkModel();
        link.setSourcePort(portOut);
        link.setTargetPort(portTo);
        model.addLink(link);
    }
    static done(model) {
        console.log('ERD', 'Renderer.done()', model);
        engine.setModel(model);
    }
    static clear(model) {
        console.log('ERD', 'Renderer.clear()');
        model.getLinks().forEach((LinkModel) => { model.removeLink(LinkModel); });
        model.getNodes().forEach((NodeModel) => { model.removeNode(NodeModel); });
        engine.setModel(model);
    }
}
Renderer.domContentLoaded = false;
Renderer.nodeIndex = 0;
