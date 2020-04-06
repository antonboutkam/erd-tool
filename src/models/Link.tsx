import {Table} from "./Table";
import {Port} from "./Port";
import {LinkModel} from "@projectstorm/react-diagrams-core";

export class Link extends LinkModel
{
    public id : string;
    public ports : Port[];
    public table : Table;
}
