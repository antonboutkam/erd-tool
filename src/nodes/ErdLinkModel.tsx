import {
    LinkModel,
    LinkModelGenerics,
    LinkModelListener
} from "@projectstorm/react-diagrams-core/src/entities/link/LinkModel";
import {BaseModelOptions} from "@projectstorm/react-canvas-core/src/core-models/BaseModel";
import {DiagramModel} from "@projectstorm/react-diagrams-core/src/models/DiagramModel";

export class ErdLinkModelGenerics implements LinkModelGenerics{
    LISTENER: LinkModelListener;
    PARENT: DiagramModel;
    OPTIONS : BaseModelOptions
}

class ErdLinkModel<G extends LinkModelGenerics = ErdLinkModelGenerics> extends LinkModel<G> {

}
