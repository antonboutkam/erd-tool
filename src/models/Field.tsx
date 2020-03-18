export class Field {

    name : string;
    label : string;
    icon : string;
    form_type : string;
    type : string;
    required : boolean;
    primary : boolean;
    is_foreign_key : boolean;
    auto_increment : boolean;

    static getShortCode(type : string):string
    {
        if(type == 'INTEGER')
        {
            return 'I';
        }
        else if(type == 'VARCHAR')
        {
            return 'S';
        }
        return '?';
    }
}
