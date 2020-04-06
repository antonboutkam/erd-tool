export class Field {
    constructor() {
        this.table_name = null;
    }
    static fromJson(fieldJson) {
        console.log('Field.fromJson');
        console.log(fieldJson);
        const field = new Field();
        field.id = fieldJson.id;
        field.name = fieldJson.name;
        field.label = fieldJson.label;
        field.icon = fieldJson.icon;
        field.form_type = fieldJson.form_type;
        field.type = fieldJson.type;
        field.required = fieldJson.required;
        field.primary = fieldJson.primary;
        field.is_foreign_key = fieldJson.is_foreign_key;
        field.auto_increment = fieldJson.auto_increment;
        field.table_name = fieldJson.table_name;
        return field;
    }
    static getShortCode(type) {
        if (type == 'INTEGER') {
            return 'I';
        }
        else if (type == 'VARCHAR') {
            return 'S';
        }
        return '?';
    }
}
