const mongoose = require('mongoose');
const EndOfLeaseTable = require('../../../model/EndOfLease');
const EmployeeTable= require('../../../model/Employee');
const UserTable = require("../../../model/User");
const { model } = require('mongoose');

exports.index = async (ctx) => {
  const getAllEndOrder = await EndOfLeaseTable.find({deleted: false},{}).sort({"taskID":1})
  .populate({path:"userDetail",model:UserTable}).populate({path:"employeeDetail",model:EmployeeTable})
  if (getAllEndOrder.length > 0) {
    ctx.body = getAllEndOrder;
} else {
    ctx.status = 404;
    ctx.body = { errors: "There are no endOfLease order!"}
  }
}

exports.showById = async(ctx) =>{
  const { id } = ctx.params;
  const getOneEndOrder = await EndOfLeaseTable.find({_id:id,deleted:false},{})
  .populate({path:"userDetail",model:UserTable}).populate({path:"employeeDetail",model:EmployeeTable})
  if(getOneEndOrder.length < 1) { 
      ctx.body = `Can't find this order by objectID: ${id}`; 
      ctx.status = 404;
  } else {
      ctx.body = getOneEndOrder[0]
  }
}

exports.store = async (ctx) => {
  const {body} = ctx.request;
  const {userDetail} = body
  let newTaskId = (await EndOfLeaseTable.find().sort({ taskID: -1 }).limit(1))[0].taskID + 1
  const endClean = new EndOfLeaseTable(body);
  endClean.taskID = newTaskId;
  try {
      const info = await endClean.save();
      await UserTable.findOneAndUpdate({_id:userDetail},{$inc:{numberOfOnGoingOrder:1}},{})
      ctx.body = info;
  } catch (e) {
      ctx.body = e
      ctx.status = 500
  }
}

exports.assignToEmployee= async(ctx) =>{
  const { id } = ctx.params;
  const { body } = ctx.request;
  
  const {employeeID,employeeDetail} = body;
  const searchResult = await EndOfLeaseTable.find({ _id: id, deleted:false },{})
  if (searchResult.length>=1) {
    const {status} = searchResult[0]
    if (status === "confirmed" && !searchResult[0].employeeDetail[0]){
          const taskDetail = {"employeeID":employeeID,"employeeDetail":employeeDetail,"status":"in-progress"}
          const assign= await EndOfLeaseTable.findOneAndUpdate({_id: id, deleted:false }, taskDetail, {})
          const updateEmployee=await EmployeeTable.findOneAndUpdate({_id:employeeDetail},{$inc:{numberOfOnGoingOrder:1}},{})
          if (assign,updateEmployee) {
            ctx.body = `Order ID(${updateEmployee},${id}) updated.`
          } else {
            ctx.status = 404;
            ctx.body = "Order is not found"
          }
    }
    else {
      ctx.status = 404
      ctx.body = "Order status does not match "
    }
} 
else {
  ctx.status = 404
  ctx.body = `Can't find this order by objectID: ${id}`
}
}

exports.comments= async(ctx) =>{
  const { id } = ctx.params;
  const{ review,rating } = ctx.request.body;
  const updateEnd = await EndOfLeaseTable.findOneAndUpdate({
      _id: id, deleted:false,reviewStatus:false
  }, {
      $set: {
          review: `${review}`,
          rating: `${rating}`,
          reviewStatus:true
      }
  });
  if(updateEnd.length===0){
      ctx.body = "post comment failed"
      ctx.status = 404
  }else{
      ctx.body= "post comment successfully";
  }

  const{employeeDetail}=updateEnd;
  const searchResult = await EmployeeTable.find({_id:employeeDetail,deleted:false});
  let {totalRating} = searchResult[0];
  totalRating+=rating;
  let {numberOfOrderRated} = searchResult[0];
  numberOfOrderRated+=1;
  const avg = (totalRating/numberOfOrderRated).toFixed(1);
  
  await EmployeeTable.findOneAndUpdate({
    _id:employeeDetail,deleted:false
  }, {
      $set: {
          numberOfOrderRated: numberOfOrderRated,
          totalRating:totalRating,
          averageRating:`${avg}`

      }
  });
  
}

exports.update= async(ctx) =>{
  const { id } = ctx.params;
  const { body } = ctx.request;
  const {status} = body
  let ongoing = 0
  let finish = 0 
  if(status==="finished"){
    ongoing = -1
    finish = 1
    const endInfo = await EndOfLeaseTable.find({_id:id},{})
    const {startTime}= endInfo[0]
    const date = new Date()
    date.setHours(date.getHours() + 10);
    Object.assign(body, {endTime: date});
    if(startTime.getTime()>date.getTime()){
      return(
      ctx.body = "cannot finish",
      ctx.status= 304)
    }
  }else if(status==="cancelled"){
    ongoing = -1
  }
  const updateStatus = await EndOfLeaseTable.findOneAndUpdate({ _id: id, deleted:false }, body, {});
  const userID = updateStatus.userDetail
  const employeeID = updateStatus.employeeDetail
  if(employeeID.length>0){
    await EmployeeTable.findOneAndUpdate({_id:employeeID},{$inc:{numberOfOnGoingOrder:ongoing,numberOfOrderFinished:finish}})
    await UserTable.findOneAndUpdate({_id:userID},{$inc:{numberOfOnGoingOrder:ongoing,numberOfOrderFinished:finish}})
  }else{
    await UserTable.findOneAndUpdate({_id:userID},{$inc:{numberOfOnGoingOrder:ongoing,numberOfOrderFinished:finish}})
  }
  if (updateStatus) {
    ctx.body = `Order ID(${id}) updated.`
  } else {
    ctx.status = 404;
    ctx.body = "Order is not found"
  } 
  
}

exports.delete = async(ctx) =>{
  const { id } = ctx.params;
  const result = await EndOfLeaseTable.findOneAndUpdate({
    _id:id
    }, {$set:{deleted : true}},{returnOriginal: false})
    if (result === 0) {
      ctx.body = `${id} not found!`
      ctx.status = 404;
    } else {
      ctx.body = `${id} deleted!`
    }
}

exports.cancelByAdmin = async(ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const searchResult = await EndOfLeaseTable.find({_id:id,deleted:'false'},{})
  const {employeeDetail,status} = searchResult[0]
  if(status==="in-progress"){
    await EndOfLeaseTable.findOneAndUpdate({_id:id,deleted:'false'}, { status:'confirmed',$set: { employeeDetail: [null], employeeID: null } },{})
    await EmployeeTable.findOneAndUpdate({_id:employeeDetail},{$inc:{numberOfOnGoingOrder:-1}},{})
    ctx.body = "cancel order successfully!"
  } else{
    ctx.status = 404
    ctx.body='Order status is wrong!'
  }
}

