import {NodeLayerModelGenerics} from "@projectstorm/react-diagrams-core/";
import {DiagramEngine} from "@projectstorm/react-diagrams-core/";
import {NodeLayerModel} from "@projectstorm/react-diagrams-core/";
import {ErdNodeModel} from "./ErdNodeModel";
import {NodeModel} from "@projectstorm/react-diagrams-core/src/entities/node/NodeModel";
import {DiagramModel} from "@projectstorm/react-diagrams-core/src/models/DiagramModel";
import {ErdDiagramModel} from "./ErdDiagramModel";


export interface ErdNodeLayerModelGenerics extends NodeLayerModelGenerics {
    CHILDREN: ErdNodeModel;
    ENGINE: DiagramEngine;
}

export class ErdNodeLayerModel<G extends ErdNodeLayerModelGenerics = ErdNodeLayerModelGenerics> extends NodeLayerModel<G>{

    constructor()
    {
        super();
    }
    getModels():{[id:string] : ErdNodeModel}
    {
        return this.models;
    }

    addModel(model: G['CHILDREN']): void {
        if (!(model instanceof ErdNodeModel)) {
            throw new Error('Can only add nodes to this layer');
        }
        model.registerListener({
            entityRemoved: () => {
                (this.getParent() as ErdDiagramModel).removeNode(model);
            }
        });
        super.addModel(model);
    }

    getChildModelFactoryBank(engine: G['ENGINE']) {
        return engine.getNodeFactories();
    }

    getNodes() {
        return this.getModels();
    }
}
