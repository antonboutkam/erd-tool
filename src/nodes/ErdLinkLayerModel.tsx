import {
    LinkLayerModel,
    LinkLayerModelGenerics
} from "@projectstorm/react-diagrams-core/";
import {DiagramEngine} from "@projectstorm/react-diagrams-core/";
import {ErdLinkModel} from "./ErdLinkModel";


export interface ErdLinkLayerModelGenerics extends LinkLayerModelGenerics {
    CHILDREN: ErdLinkModel;
    ENGINE: DiagramEngine;
}

export class ErdLinkLayerModel<G extends ErdLinkLayerModelGenerics = ErdLinkLayerModelGenerics> extends LinkLayerModel<G>{

    constructor()
    {
        super();
    }

    getModels():{[id:string] : ErdLinkModel}
    {
        return this.models;
    }
}
