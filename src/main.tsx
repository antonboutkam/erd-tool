
import './main.css';
import {Renderer} from './renderer';
const http = require('http');
const fetch = require('node-fetch');
import {Promise} from "bluebird";
import {Table} from "./models/Table";
import {Relation} from "./models/Relation";

fetch.Promise = Promise;

Renderer.render();

console.log("starting");

fetch('http://api.overheid.demo.novum.nuidev.nl/v2/schema.json')
	.then(res => res.json())
	.then(
		(json) => {

			json.tables.forEach((table : Table, index) => {
				console.dir(table);

				Renderer.addNode(table, index);
			});

			json.relations.forEach((relation: Relation, index) => {

				Renderer.addLink(relation.from_model, relation.from_field, relation.to_model, relation.to_field);
			});

		}

	);
