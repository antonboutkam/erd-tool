import {Field} from './Field';
import {MessageContentGenerics} from "../helpers/Messenger";

export interface ITable {
    name : string;
    title : string;
    api_description : string;
    is_persistent : boolean;
    fields : Field[];
}
export class Table implements MessageContentGenerics{

    name : string;
    title : string;
    api_description : string;
    is_persistent : boolean;
    fields : Field[];

    static removeField(fields : Field[], fieldToRemove : Field):Field[]
    {
        console.log('Table.removeField', fields);
        let newFields : Field[] = [];
        fields.forEach((someField : Field) => {
            console.log(someField);
            if(someField.name != fieldToRemove.name)
            {
                newFields.push(someField);
            }
            else
            {
                console.log('REMOVED', someField);
            }

        });
        return newFields;

    }
    static fromJson(tableJson : ITable):Table
    {
        console.log('tableJson');
        console.log(tableJson);
        const table = new Table();
        table.name = tableJson.name;
        table.title = tableJson.title;
        table.api_description = tableJson.api_description;
        table.is_persistent = tableJson.is_persistent;
        return table;
    }

}
