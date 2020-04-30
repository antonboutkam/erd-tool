import {DiagramModel, DiagramModelGenerics} from "@projectstorm/react-diagrams-core/";
import {Field} from "../models/Field";
import {ErdNodeModel} from "./ErdNodeModel";
import * as _ from 'lodash';
import {
    BaseModel,
    CanvasModel,
    DeserializeEvent,
    DiagramModelOptions,
    LayerModel
} from "@projectstorm/react-canvas-core/";
import {ErdLayerModel} from "./ErdLayerModel";
import {ErdNodeLayerModel} from "./ErdNodeLayerModel";
import {ErdDiagramListener} from "./ErdDiagramListener";
import {NodeLayerModel} from "@projectstorm/react-diagrams-core/src/entities/node-layer/NodeLayerModel";
import {LinkLayerModel} from "@projectstorm/react-diagrams-core/src/entities/link-layer/LinkLayerModel";
import {ErdLinkLayerModel} from "./ErdLinkLayerModel";
import {ErdLinkModel} from "./ErdLinkModel";
import {NodeModel} from "@projectstorm/react-diagrams-core/src/entities/node/NodeModel";


export class ErdDiagramModelGenerics implements DiagramModelGenerics{
    LISTENER: ErdDiagramListener;
    OPTIONS: DiagramModelOptions;
    LAYER: ErdLayerModel
}
export class ErdDiagramModel<G extends ErdDiagramModelGenerics = ErdDiagramModelGenerics> extends CanvasModel<G>
{
    protected layers: G['LAYER'][];

    protected activeNodeLayer: ErdNodeLayerModel;
    protected activeLinkLayer: ErdLinkLayerModel;


    constructor(options: G['OPTIONS'] = {}) {
        super(options);
        this.addLayer(new LinkLayerModel());
        this.addLayer(new NodeLayerModel());
    }


    addNode(node: ErdNodeModel): ErdNodeModel {
        this.getActiveNodeLayer().addModel(node);
        this.fireEvent({ node, isCreated: true }, 'nodesUpdated');
        return node;
    }

    deserialize(event: DeserializeEvent<this>) {
        this.layers = [];
        super.deserialize(event);
    }

    addLayer(layer: LayerModel): void {
        super.addLayer(layer);
        if (layer instanceof ErdNodeLayerModel) {
            this.activeNodeLayer = layer;
        }
        if (layer instanceof ErdLinkLayerModel) {
            this.activeLinkLayer = layer;
        }
    }

    getLinkLayers(): ErdLinkLayerModel[] {
        return _.filter(this.layers, layer => {
            return layer instanceof ErdLinkLayerModel;
        }) as ErdLinkLayerModel[];
    }

    getNodeLayers(): ErdNodeLayerModel[] {
        return _.filter(this.layers, layer => {
            return layer instanceof ErdNodeLayerModel;
        }) as ErdNodeLayerModel[];
    }

    getActiveNodeLayer(): ErdNodeLayerModel {
        if (!this.activeNodeLayer) {
            const layers = this.getNodeLayers();
            if (layers.length === 0) {
                this.addLayer(new ErdNodeLayerModel());
            } else {
                this.activeNodeLayer = layers[0];
            }
        }
        return this.activeNodeLayer;
    }

    getActiveLinkLayer(): ErdLinkLayerModel {
        if (!this.activeLinkLayer) {
            const layers = this.getLinkLayers();
            if (layers.length === 0) {
                this.addLayer(new ErdLinkLayerModel());
            } else {
                this.activeLinkLayer = layers[0];
            }
        }
        return this.activeLinkLayer;
    }

    getNode(node: string): ErdNodeModel {
        console.log('ErdDiagramModel.getNode(' + node + ')');
        console.log("Layers ", typeof this.getLayers(), this.getLayers());
        console.log("Node Layers ", typeof this.getLayers(), this.getNodeLayers());
        for (const layer of this.getNodeLayers()) {
            console.log("\t", "layer", layer);
            const model = layer.getModel(node);
            console.log("\t", "model", model);
            if (model) {
                return model;
            }
        }
    }


    getLink(link: string): ErdLinkModel {
        for (const layer of this.getLinkLayers()) {
            const model = layer.getModel(link);
            if (model) {
                return model;
            }
        }
    }

    addAll(...models: BaseModel[]): BaseModel[] {
        _.forEach(models, model => {
            if (model instanceof ErdLinkModel) {
                this.addLink(model);
            } else if (model instanceof ErdNodeModel) {
                this.addNode(model);
            }
        });
        return models;
    }

    addLink(link: ErdLinkModel): ErdLinkModel {
        this.getActiveLinkLayer().addModel(link);
        this.fireEvent(
            {
                link,
                isCreated: true
            },
            'linksUpdated'
        );
        return link;
    }



    removeLink(link: ErdLinkModel) {
        const removed = _.some(this.getLinkLayers(), layer => {
            return layer.removeModel(link);
        });
        if (removed) {
            this.fireEvent({ link, isCreated: false }, 'linksUpdated');
        }
    }

    removeNode(node: ErdNodeModel) {
        const removed = _.some(this.getNodeLayers(), layer => {
            return layer.removeModel(node);
        });
        if (removed) {
            this.fireEvent({ node, isCreated: false }, 'nodesUpdated');
        }
    }

    getLinks(): ErdLinkModel[] {
        return _.flatMap(this.getLinkLayers(), layer => {
            return _.values(layer.getModels());
        });
    }

    getNodes(): ErdNodeModel[] {
        return _.flatMap(this.getNodeLayers(), layer => {
            return _.values(layer.getModels());
        });
    }
    findNode(field : Field):ErdNodeModel
    {
        const nodes:ErdNodeModel[] = this.getNodes();
        let result:ErdNodeModel = null;

        nodes.forEach((node: ErdNodeModel) => {
            if(node.table.name == field.table_name)
            {
                node.table.fields.forEach((compareField : Field) => {
                    if(field.name == compareField.name)
                    {
                        result = node;
                    }
                })
            }
        });
        return result;
    }

}
