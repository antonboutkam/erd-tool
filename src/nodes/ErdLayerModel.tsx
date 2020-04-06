import {
    BaseModel,
    BaseModelListener,
    CanvasEngine,
    CanvasModel,
    LayerModel,
    LayerModelGenerics
} from "@projectstorm/react-canvas-core";
import {LayerModelOptions} from "@projectstorm/react-canvas-core/src/entities/layer/LayerModel";
import {ErdNodeModel} from "./ErdNodeModel";

export class ErdLayerModelGenerics implements LayerModelGenerics{
    OPTIONS: LayerModelOptions;
    PARENT: CanvasModel;
    CHILDREN: BaseModel;
    ENGINE: CanvasEngine;
    LISTENER: BaseModelListener;
}
export abstract class ErdLayerModel<G extends LayerModelGenerics = ErdLayerModelGenerics> extends LayerModel<G> {

    
    getModels() {
        return this.models;
    }

}
