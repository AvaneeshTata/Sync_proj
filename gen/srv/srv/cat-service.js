const cds = require('@sap/cds');
const decode = require('jwt-decode');
const axios = require('axios');


module.exports = cds.service.impl(async function(){
    let {SourcingProjectID} = this.entities;

    this.before("READ",SourcingProjectID, async(req,next)=>{
        // console.log(req);
        if(req?._params.length != 0){
            console.log(req?._params[0]);
            // let res = await SELECT.from(Books).where({ID:req?._params[0]});
            await DELETE.from(SourcingProjectID);
            // if (res.length == 0){
                await INSERT.into(SourcingProjectID).entries({ID:req?._params[0]})
            // }
        }
        
        // return next();
    })
    // this.on("READ",Books,(req)=>{
    //     // console.log(req.headers);
    //     // console.log(req.headers["x-username"]);
    //     let auth = req?.headers?.authorization;
    //     if (auth != undefined){
    //         // console.log(auth);
    //         let token = auth.split(" ");
    //         // console.log(token[1]);
    //         const decoded = decode.jwtDecode(token[1]);
    //         // console.log(decoded);
    //         console.log(decoded["user_name"]);
    //     }
        
    // });
    // this.on("READ",PAN_DATES, async (req) => {

    //     console.log(req?.data);
    //     let dataSend = await cds.connect.to("UserDataDate");
        
    //     let username = req?.data.userName;
    //     // let uri = "/User_data(user_id=" + username +")"
    //     let uri = "/User_data(user_id='Dummy')"
    //     let user_dat = await dataSend.get(uri);
    //     let bod = {
    //         user_id:req.data.userName,
    //         from_date:req.data.fromDate,
    //         to_date:req.data.toDate
    //     }

    //     // Call to pass dates and userInfo
        
    // })

    // this.on('postUserDataDate',async (req)=>{
    //     console.log(req?.data);
    //     let dataSend = await cds.connect.to("UserDataDate");
        

    //     try{
    //         if(req?.data != undefined){
    //             var uri = "/postUserDataDate(userName='"+ req.data.userName + "',fromDate='" + req.data.fromDate + "',toDate='"+ req.data.toDate + "')";
    //             // let user_dat = await dataSend.get(uri);
    //         }
    //         let url = "https://tata-projects-limited-btp-dev-0or0hi20-dev-space-pandemo-srv.cfapps.eu10-004.hana.ondemand.com/odata/v4/catalog" + uri;
    //         console.log(url);
    //         const res = await axios.get(url,{
    //             timeout:600000
    //         });
    //         console.log(res);
    //     } catch(err) {
    //         console.log(err);
    //         throw err
    //     }
    //     return "Username and Dates succesfully transferred";      
    // })

    this.on('postProjectID',async (req)=>{


        

        if(req?.data != undefined){
            if(req.data.ID.substring(0,2) == "WS"){
                
                var auth = req?.headers?.authorization;
                if (auth != undefined){

                    var token = auth.split(" ");

                    var decoded = decode.jwtDecode(token[1]);
                    console.log(decoded);
                    console.log(decoded["user_name"]);
                }
        
                // let dataSend = await cds.connect.to("UserDataDate");
                try{
                    if(decoded["user_name"] == "avaneeshk-v@tataprojects.com" || decoded["user_name"] == "harshvardhans-v@tataprojects.com" ){
                        var userpassed = "TPLBuyer";
                    } else {
                        var userpassed = decoded["user_name"];
                    }
                    
                    var uri = "/postUserDataDate(userName='"+ userpassed + "',projectid='" + req?.data.ID + "')";


        //////////////////////////////////////Dynamic srv url get////////////////////////////////////////////

        var vcap = JSON.parse(process.env.VCAP_SERVICES);
        var panformDest;
        let auth = req?.headers?.authorization;
        console.log(auth);
        vcap.destination.forEach((dest)=>{
            if (dest?.name != undefined && dest?.name == "PAN_Form_Data-destination-service"){
                panformDest = dest;
            }
        })
        // panformDest  = vcap.destination[0];


        var tokenurl = panformDest.credentials.url + "/oauth/token?grant_type=client_credentials";
        var basicAuth = panformDest.credentials.clientid + ":" + panformDest.credentials.clientsecret;
        var basicAuth = btoa(basicAuth);
        var basicStr = "Basic " + basicAuth;
         

        var axiosTokenResp = await axios.request({
            url: tokenurl,
            method: 'get',
            headers:{
                Authorization : basicStr
            }
        })
        var accesstoken = axiosTokenResp.data.access_token;
        
        var authDest = axiosTokenResp.data.token_type + " " + accesstoken;
        console.log(authDest);

        var destinationurl = panformDest.credentials.uri + "/destination-configuration/v1/destinations/PAN_Form_Data-srv-api"

        var destinationResp = await axios.request({
            url: destinationurl,
            method: 'get',
            headers:{
                Authorization : authDest
            }
        })

        var baseSrvUrl = destinationResp?.data?.destinationConfiguration?.URL;



        ///////////////////////////////////////////////////////////////////////////////////

                    
                    // let url = "https://tata-projects-limited-tpl-ariba-uat-dzu885iy-tpl-aruat-3e0f9ade.cfapps.eu10-004.hana.ondemand.com/odata/v4/pan-approval" + uri;
                    // let url = "https://tata-projects-limited-btp-dev-0or0hi20-dev-space-pan-fo3df293e9.cfapps.eu10-004.hana.ondemand.com/odata/v4/pan-approval" + uri;
                    let url = baseSrvUrl + "/odata/v4/pan-approval" + uri;
                    var res = await axios.get(url,{
                        timeout:180000
                    });
                } catch (e){
                    throw e;
                }
                
                // console.log(res);
                    // console.log(req?._params[0]);
                    // let res = await SELECT.from(Books).where({ID:req?._params[0]});
                    await DELETE.from(SourcingProjectID);
                    // if (res.length == 0){
                        await INSERT.into(SourcingProjectID).entries({ID:req?.data.ID})
                        console.log(res?.data);
                        return res?.data?.value;
                    // }
                } else {
                    var respons = req.data.ID + " does not contain any PAN form data.";
                    return respons;
                }
            }
        
        
    })
});