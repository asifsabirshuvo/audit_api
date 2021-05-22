const momentTz = require("moment-timezone");
const Audit = require("../models/audit");
const uniqid = require('uniqid');

async function createAudit(body){
    console.log(body);
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

    console.log(updateBody)

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
            status: 200,
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

async function getSingleAudit(code){
  
    try{
        const data = await Audit.findOne({code:code}, { _id: 0,__v:0 });
        if(data==null){
            return {
                status: 400,
                success: false,
                message: 'Not found',
            };
    
        }
        return {
            status: 200,
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


async function deleteSingleAudit(code){
  
    try{
        const data = await Audit.deleteOne({code:code});
        if(data.n==0){
            return {
                status: 400,
                success: false,
                message: 'Unable to delete. Code not found.',
            };
    
        }
        return {
            status: 200,
            success: true,
            message: 'Successfully deleted.',
        };
    }catch(err){
        return {
            status: 400,
            success: false,
            message: 'failed to find from the database',
        };       
    }
}


module.exports = {createAudit, getAudits, updateAudit,getSingleAudit, deleteSingleAudit};

