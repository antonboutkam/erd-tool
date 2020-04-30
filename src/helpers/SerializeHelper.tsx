import {DiagramModel, DiagramModelGenerics} from "@projectstorm/react-diagrams-core";
import {Field} from "../models/Field";
import {ErdNodeModel} from "../nodes/ErdNodeModel";
import {ErdLinkModel} from "../nodes/ErdLinkModel";
import {ErdLayerModel} from "../nodes/ErdLayerModel";
import {ErdLinkLayerModel} from "../nodes/ErdLinkLayerModel";
import {ErdNodeLayerModel} from "../nodes/ErdNodeLayerModel";

enum LayerType {
    Links = 'diagram-links',
    Node = 'diagram-nodes',
}


export class SerializeHelper {

    serialized;
    constructor(model : DiagramModel<DiagramModelGenerics>)
    {
        console.log('SerializeHelper.constructor()', model);
        this.serialized = model.serialize();
        console.log("\t", 'Serialized', this.serialized);


    }

    private findModel(field : Field):ErdNodeModel {
        const oModels = this.getNodes();
        for (let sModelsKey in oModels) {
            let model : ErdNodeModel = oModels[sModelsKey];
            if(model.table.name == field.table_name)
            {
                return model;
            }
        }
        throw new RangeError("The passed field was found in no models, has it been deleted?");
    }
    public removeField(field : Field):boolean
    {
        let model = this.findModel(field);
        model.removePortByName(field.name + '_in');
        model.removePortByName(field.name + '_out');
        model.table.removeField(field);

        /*
        const oModels = this.getModels();
        let newFields:Field[] = [];

        // 1. Loop over alle tabellen.
        for (let sModelsKey in oModels) {


            let table =  oModels[sModelsKey].table;
            let fields = table.fields;

            for(let i = 0; i < fields.length; i++)
            {
                if(table.name != field.table_name)
                {
                    continue;
                }
                console.log('ERD', fields[i].name, ' == ', field.name, ' && ', table.name, ' == ', field.table_name);

                if(fields[i].name == field.name && table.name == field.table_name)
                {
                    console.log('FOUND!');
                    console.log('PORTS', oModels[sModelsKey].getPorts());

                    for (let portsKey in oModels[sModelsKey].getPorts())
                    {
                        if(oModels[sModelsKey].getPorts().hasOwnProperty(portsKey))
                        {
                            let portModel : PortModel = oModels[sModelsKey].getPorts()[portsKey];
                            console.log('Port model remove', portsKey, portModel);
                            console.log('portModel.getLinks()');
                            console.log(portModel);
                            console.log(portModel.links);

                            for (let linksKey in portModel.links) {
                                console.log("removed link");
                                portModel.removeLink(portModel.links[linksKey]);
                            }

                            console.log('Port model removed');

                        }
                    }
                    console.log('Continue');
                    continue;
                }
                newFields[i] = fields[i];
            }
            if(newFields.length === 0)
            {
                console.log('newFields.length', '0');

                // Delete the whole node, no more fields left.
                delete oModels[sModelsKey];
                continue;
            }

            oModels[sModelsKey].table.fields = newFields;
        }
        this.setModels(oModels);
        */
        return false;
    }
    public getSerialized()
    {
        return this.serialized;
    }
    public setLinks(links:{[id:string] : ErdLinkModel})
    {
        console.log('SerializeHelper.setLinks()', links);
        this.serialized.layers[this.getLinkLayerIndex()] = links;
    }
    public getLinks():{[id:string] : ErdLinkModel}
    {
        console.log('SerializeHelper.getLinks()', this.getLinkLayer().getModels());
        return this.getLinkLayer().getModels();
    }
    private setNodes(nodes : {[id:string] : ErdNodeModel})
    {
        console.log('SerializeHelper.setNodes()', nodes);
        this.serialized.layers[this.getNodeLayerIndex()] = nodes;
    }
    private getNodes():{[id:string] : ErdNodeModel}
    {
        console.log('SerializeHelper.getModels()');
        console.log("\t", "layer type", LayerType.Node);
        console.log("\t", "node layer", this.getNodeLayer());
        console.log("\t", "node layer models", this.getNodeLayer().getModels());

        return this.getNodeLayer().getModels();
    }
    private getLayers<t extends ErdLayerModel>():t[] {
        console.log('SerializeHelper.getLayers()', this.serialized.layers);
        return this.serialized.layers;
    }
    private getLinkLayer():ErdLinkLayerModel {
        console.log('SerializeHelper.getLinksLayer()');
        return this.getLayers<ErdLinkLayerModel>()[this.getLinkLayerIndex()]
    }
    private getNodeLayer():ErdNodeLayerModel {
        console.log('SerializeHelper.getModelLayer()');
        return this.getLayers<ErdNodeLayerModel>()[this.getNodeLayerIndex()];
    }

    private getLinkLayerIndex():number {
        console.log('SerializeHelper.getLinkLayerIndex()');

        const aLayers = this.getLayers();
        for (let i:number = 0; i < aLayers.length; i++)
        {
            if(aLayers[i].getOptions().type == LayerType.Links)
            {
                return i;
            }
        }
    }
    private getNodeLayerIndex():number {
        console.log('SerializeHelper.getNodeLayerIndex()');

        const aLayers = this.getLayers();
        for (let i:number = 0; i < aLayers.length; i++)
        {
            if(aLayers[i].getOptions().type == LayerType.Node)
            {
                return i;
            }
        }
    }
}
