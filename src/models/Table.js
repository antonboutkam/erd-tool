export class Table {
    removeField(fieldToRemove) {
        let newFields = [];
        this.fields.forEach((someField, index) => {
            if (someField.name != fieldToRemove.name) {
                newFields.push(someField);
            }
        });
        this.fields = newFields;
    }
    static fromJson(tableJson) {
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
