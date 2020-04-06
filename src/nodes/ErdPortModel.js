import { PortModel } from "@projectstorm/react-diagrams-core/src/entities/port/PortModel";
export class ErdPortModel extends PortModel {
    removeLinks() {
        for (let linksKey in this.links) {
            this.removeLink(this.links[linksKey]);
        }
    }
}
