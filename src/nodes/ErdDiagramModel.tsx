import {DiagramModel, DiagramModelGenerics} from "@projectstorm/react-diagrams-core/src/models/DiagramModel";
import {Field} from "../models/Field";
import {ErdNodeModel} from "./ErdNodeModel";
import * as _ from 'lodash';
import {DiagramListener} from "@projectstorm/react-canvas-core";
import {DiagramModelOptions} from "@projectstorm/react-canvas-core/src/entities/canvas/CanvasModel";
import {ErdLayerModel} from "./ErdLayerModel";
import {ErdNodeLayerModel} from "./ErdNodeLayerModel";


class ErdDiagramModelGenerics implements DiagramModelGenerics{
    LISTENER: DiagramListener;
    OPTIONS: DiagramModelOptions;
    LAYER: ErdLayerModel
}
export class ErdDiagramModel<G extends DiagramModelGenerics = ErdDiagramModelGenerics> extends DiagramModel<G>
{

    getNodeLayers(): ErdNodeLayerModel[] {
        return _.filter(this.layers, layer => {
            return layer instanceof ErdNodeLayerModel;
        }) as ErdNodeLayerModel[];
    }
    getNodes(): ErdNodeModel[] {
        return _.flatMap(this.getNodeLayers(), layer => {
            return _.values(layer.getModels());
        });
    }


    findModel(field : Field)
    {
        for (let nodeKey in this.getNodes()) {

        }

    }

}
