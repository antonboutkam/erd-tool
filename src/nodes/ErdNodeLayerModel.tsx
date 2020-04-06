import {LayerModel, LayerModelGenerics} from "@projectstorm/react-canvas-core";
import {NodeLayerModelGenerics} from "@projectstorm/react-diagrams-core/src/entities/node-layer/NodeLayerModel";
import {DiagramEngine} from "@projectstorm/react-diagrams-core/src/DiagramEngine";
import {NodeModel} from "@projectstorm/react-diagrams-core/src/entities/node/NodeModel";
import {NodeLayerModel} from "@projectstorm/react-diagrams-core/src/entities/node-layer/NodeLayerModel";


export interface ErdNodeLayerModelGenerics extends NodeLayerModelGenerics {
    CHILDREN: NodeModel;
    ENGINE: DiagramEngine;
}

export class ErdNodeLayerModel<G extends NodeLayerModelGenerics = ErdNodeLayerModelGenerics> extends NodeLayerModel<G>{

}
