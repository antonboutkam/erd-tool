import {
    LinkModel,
    LinkModelGenerics,
    LinkModelListener
} from "@projectstorm/react-diagrams-core/";
import {BaseModelOptions} from "@projectstorm/react-canvas-core/";
import {DiagramModel} from "@projectstorm/react-diagrams-core/";

export class ErdLinkModelGenerics implements LinkModelGenerics{
    LISTENER: LinkModelListener;
    PARENT: DiagramModel;
    OPTIONS : BaseModelOptions
}


export class ErdLinkModel<G extends LinkModelGenerics = ErdLinkModelGenerics> extends LinkModel<G> {

}
