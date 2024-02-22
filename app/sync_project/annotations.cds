using CatalogService as service from '../../srv/cat-service';

annotate service.SourcingProjectID with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },]
);
annotate service.SourcingProjectID with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Project ID',
            ID : 'ProjectID',
            Target : '@UI.FieldGroup#ProjectID',
        },]
);
annotate service.SourcingProjectID with @(
    UI.FieldGroup #ProjectID : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : ID,
                Label : 'ID',
            },],
    }
);
