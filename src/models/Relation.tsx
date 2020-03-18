export interface Relation {

    from_model : string;
    from_field : string;
    to_model : string;
    to_field : string;
    on_delete : string;
    on_update : string;

}
