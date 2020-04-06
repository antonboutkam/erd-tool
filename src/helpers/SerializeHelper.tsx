import {DiagramModel, DiagramModelGenerics, PortModel} from "@projectstorm/react-diagrams-core";
import {Table} from "../models/Table";
import {Link} from "../models/Link";
import {Field} from "../models/Field";
import {ErdNodeModel} from "../nodes/ErdNodeModel";
import {ErdPortModel} from "../nodes/ErdPortModel";

enum LayerType {
    Links = 'diagram-links',
    Node = 'diagram-nodes',
}

interface Layer<T extends ErdNodeModel> {
    id:string,
    type:LayerType,
    models:ModelCollection<T>
}

interface PortCollection{

}
interface Model {id :string, type:string}
interface ModelCollection<T extends ErdNodeModel> {[key:string] :T}

interface NodeModel extends Model{
    color: string,
    id : string,
    ports : PortCollection,
    table : Table

}
interface LinkModel extends Model{}


export class SerializeHelper {

    serialized;
    constructor(model : DiagramModel<DiagramModelGenerics>)
    {
        console.log('SerializeHelper.constructor()', model);
        this.serialized = model.serialize();
        console.log("\t", 'Serialized', this.serialized);


    }

    private findModel(field : Field):ErdNodeModel {
        const oModels = this.getModels();
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
    public setLinks(links:ModelCollection<LinkModel>)
    {
        console.log('SerializeHelper.setLinks()', links);
        this.serialized.layers[this.getLinkLayerIndex()] = links;
    }
    public getLinks():Link[]
    {
        console.log('SerializeHelper.getLinks()', this.getModelLayer().models);
        return this.getLinkLayer().models;
    }
    private setModels(collection : ModelCollection<NodeModel>)
    {
        console.log('SerializeHelper.setModels()', collection);
        this.serialized.layers[this.getModelLayerIndex()] = collection;
    }
    private getModels():ModelCollection<ErdNodeModel>
    {
        console.log('SerializeHelper.getModels()');
        console.log("\t", "layer type", LayerType.Node);
        console.log("\t", "model layer", this.getModelLayer());
        console.log("\t", "model layer moels", this.getModelLayer().models);
        return this.getModelLayer().models;
    }
    private getLayers<T extends Model>():Layer<T>[] {
        console.log('SerializeHelper.getLayers()', this.serialized.layers);
        return this.serialized.layers;
    }
    private getLinkLayer():Layer<LinkModel> {
        console.log('SerializeHelper.getLinksLayer()');
        return this.getLayers<LinkModel>()[this.getLinkLayerIndex()]
    }
    private getModelLayer():Layer<ErdNodeModel> {
        console.log('SerializeHelper.getModelLayer()');
        return this.getLayers<NodeModel>()[this.getModelLayerIndex()];
    }

    private getLinkLayerIndex():number {
        console.log('SerializeHelper.getLinkLayerIndex()');

        const aLayers = this.getLayers<LinkModel>();
        for (let i:number = 0; i < aLayers.length; i++)
        {
            if(aLayers[i].type == LayerType.Links)
            {
                return i;
            }
        }
    }
    private getModelLayerIndex():number {
        console.log('SerializeHelper.getModelLayerIndex()');

        const aLayers = this.getLayers<LinkModel>();
        for (let i:number = 0; i < aLayers.length; i++)
        {
            if(aLayers[i].type == LayerType.Node)
            {
                return i;
            }
        }
    }
}
