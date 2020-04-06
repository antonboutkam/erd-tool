import { DiagramModel } from "@projectstorm/react-diagrams-core/src/models/DiagramModel";
import * as _ from 'lodash';
import { ErdNodeLayerModel } from "./ErdNodeLayerModel";
class ErdDiagramModelGenerics {
}
export class ErdDiagramModel extends DiagramModel {
    getNodeLayers() {
        return _.filter(this.layers, layer => {
            return layer instanceof ErdNodeLayerModel;
        });
    }
    getNodes() {
        return _.flatMap(this.getNodeLayers(), layer => {
            return _.values(layer.getModels());
        });
    }
    findModel(field) {
        for (let nodeKey in this.getNodes()) {
        }
    }
}
