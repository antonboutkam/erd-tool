import { PortModel } from "@projectstorm/react-diagrams-core/";
export class ErdPortModel extends PortModel {
    removeLinks() {
        for (let linksKey in this.links) {
            this.removeLink(this.links[linksKey]);
        }
    }
}
