import { DiagramModel } from "@projectstorm/react-diagrams-core/";
import * as _ from 'lodash';
import { ErdNodeLayerModel } from "./ErdNodeLayerModel";
export class ErdDiagramModelGenerics {
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
    findNode(field) {
        const nodes = this.getNodes();
        let result = null;
        nodes.forEach((node) => {
            if (node.table.name == field.table_name) {
                node.table.fields.forEach((compareField, index2) => {
                    if (field.name == compareField.name) {
                        result = node;
                    }
                });
            }
        });
        return result;
    }
}
