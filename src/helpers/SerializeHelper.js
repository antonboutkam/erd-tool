var LayerType;
(function (LayerType) {
    LayerType["Links"] = "diagram-links";
    LayerType["Node"] = "diagram-nodes";
})(LayerType || (LayerType = {}));
export class SerializeHelper {
    constructor(model) {
        console.log('SerializeHelper.constructor()', model);
        this.serialized = model.serialize();
        console.log("\t", 'Serialized', this.serialized);
    }
    findModel(field) {
        const oModels = this.getModels();
        for (let sModelsKey in oModels) {
            let model = oModels[sModelsKey];
            if (model.table.name == field.table_name) {
                return model;
            }
        }
        throw new RangeError("The passed field was found in no models, has it been deleted?");
    }
    removeField(field) {
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
    getSerialized() {
        return this.serialized;
    }
    setLinks(links) {
        console.log('SerializeHelper.setLinks()', links);
        this.serialized.layers[this.getLinkLayerIndex()] = links;
    }
    getLinks() {
        console.log('SerializeHelper.getLinks()', this.getModelLayer().models);
        return this.getLinkLayer().models;
    }
    setModels(collection) {
        console.log('SerializeHelper.setModels()', collection);
        this.serialized.layers[this.getModelLayerIndex()] = collection;
    }
    getModels() {
        console.log('SerializeHelper.getModels()');
        console.log("\t", "layer type", LayerType.Node);
        console.log("\t", "model layer", this.getModelLayer());
        console.log("\t", "model layer moels", this.getModelLayer().models);
        return this.getModelLayer().models;
    }
    getLayers() {
        console.log('SerializeHelper.getLayers()', this.serialized.layers);
        return this.serialized.layers;
    }
    getLinkLayer() {
        console.log('SerializeHelper.getLinksLayer()');
        return this.getLayers()[this.getLinkLayerIndex()];
    }
    getModelLayer() {
        console.log('SerializeHelper.getModelLayer()');
        return this.getLayers()[this.getModelLayerIndex()];
    }
    getLinkLayerIndex() {
        console.log('SerializeHelper.getLinkLayerIndex()');
        const aLayers = this.getLayers();
        for (let i = 0; i < aLayers.length; i++) {
            if (aLayers[i].type == LayerType.Links) {
                return i;
            }
        }
    }
    getModelLayerIndex() {
        console.log('SerializeHelper.getModelLayerIndex()');
        const aLayers = this.getLayers();
        for (let i = 0; i < aLayers.length; i++) {
            if (aLayers[i].type == LayerType.Node) {
                return i;
            }
        }
    }
}
