import {Field} from './Field';

export class Table {

    name : string;
    title : string;
    api_description : string;
    is_persistent : boolean;
    fields : Field[];

}
