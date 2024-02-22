using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity SourcingProjectID as projection on my.SourcingProjectID;
    
    @odata.draft.enabled
    entity PAN_DATES as projection on my.PAN_DATES;

    function postUserDataDate(userName:String,fromDate:String,toDate:String) returns String;
    function postProjectID(ID:String) returns String;
}
