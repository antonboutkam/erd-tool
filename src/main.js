import './main.css';
import { Renderer } from './renderer';
const fetch = require('node-fetch');
import { Promise } from "bluebird";
import { Table } from "./models/Table";
import { Messenger } from "./helpers/Messenger";
import { Field } from "./models/Field";
import { ErdDiagramModel } from "./nodes/ErdDiagramModel";
const queryString = require('query-string');
fetch.Promise = Promise;
console.log(location.search);
const getVariables = queryString.parse(location.search);
class ErdDiagramModelGenerics {
}
let model = new ErdDiagramModel();
Renderer.render(model);
// getVariables.schema points to the schema API, for instance 'http://api.overheid.demo.novum.nuidev.nl/v2/schema.json'
let loadNodes = () => {
    fetch(getVariables.schema)
        .then(res => res.json())
        .then((json) => {
        Renderer.clear(model);
        json.tables.forEach((table, index) => {
            Renderer.addNode(model, table, index);
            Renderer.nodeIndex = index;
        });
        json.relations.forEach((relation) => {
            Renderer.addLink(model, relation.from_model, relation.from_field, relation.to_model, relation.to_field);
        });
        setTimeout(() => {
            Renderer.redistribute(model);
            Renderer.done(model);
        }, 10);
    });
};
loadNodes();
console.log("Register model added listener");
Messenger.onReceive('model_added', (message) => {
    Renderer.nodeIndex++;
    Renderer.addNode(model, Table.fromJson(message.content), Renderer.nodeIndex);
});
console.log("Register property added listener");
Messenger.onReceive('property_added', (message) => {
    console.log("Messenger.onReceive().property_added");
    console.log("\t", JSON.stringify(message.content));
    console.log("erd-tool -> property_added -> " + JSON.stringify(message.content));
    Renderer.addProperty(model, Field.fromJson(message.content));
    Renderer.done(model);
});
Messenger.onReceive('property_deleted', (message) => {
    console.log("Messenger.onReceive().property_deleted");
    console.log("\t", JSON.stringify(message.content));
    // loadNodes();
    model = Renderer.removeField(model, Field.fromJson(message.content));
    Renderer.done(model);
});
