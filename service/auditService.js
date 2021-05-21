const momentTz = require("moment-timezone");
const Audit = require("../models/audit");
const uniqid = require('uniqid');

async function createAudit(body){

    body.code  = uniqid();
    body.createdAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    body.updatedAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');
    var audit = new Audit(body);
    try{
        const data =  await audit.save();
        return {
            status: 201,
            success: true,
            message: 'successfully inserted!',
        };
    }catch(err){
        return {
            status: 400,
            success: false,
            message: 'failed to insert into the database',
        };       
    }
}


async function updateAudit(updateBody){

    console.log(updateAudit)

    updateBody.updatedAt = momentTz().tz("Asia/Dhaka").format('YYYY-MM-DD HH:mm:ss');


    try{
        const data = await Audit.updateOne(
            { code: updateBody.code},updateBody);
        
        return {
            status: 201,
            success: true,
            message: data,
        };
    }catch(err){
        return {
            status: 400,
            success: false,
            message: 'failed to update in database',
        };       
    }
}

async function getAudits(page,limit){
    var query = {};	
    query.skip = limit * (page - 1);
    query.limit = limit;
    query.sort = {"_id":-1};
  
    try{
        const data = await Audit.find({}, { _id: 0,__v:0 }, query);
        return {
            status: 201,
            success: true,
            message: data,
        };
    }catch(err){
        return {
            status: 400,
            success: false,
            message: 'failed to find from the database',
        };       
    }
}


module.exports = {createAudit, getAudits, updateAudit};

