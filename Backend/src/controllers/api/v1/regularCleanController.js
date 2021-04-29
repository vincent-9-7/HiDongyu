const RegularTable = require('../../../model/RegularClean');
const EmployeeTable = require('../../../model/Employee')
const UserTable = require("../../../model/User");
const { params } = require('../../../routes/v1');

exports.index = async (ctx) => {
  const searchResult = await RegularTable.find({deleted: false},{}).populate({path:"userDetail",model:UserTable}).populate({path:"employeeDetail",model:EmployeeTable})
  ctx.body = searchResult;
}

exports.show = async (ctx) => {
  const { id } = ctx.params;
  const searchResult = await RegularTable.find({_id: id, deleted:false}, {}).populate({path:"userDetail",model:UserTable}).populate({path:"employeeDetail",model:EmployeeTable})
  if (searchResult.length < 1) {
    ctx.body = `Can't find this order by ID: ${id}`;
    ctx.status = 404
  } else {
    ctx.body = searchResult[0]
  }
}


exports.store = async (ctx) => {
    const {body} = ctx.request;  
    const {userDetail} = body
    let newTaskId = (await RegularTable.find().sort({ taskID: -1 }).limit(1))[0].taskID + 1
    const regularClean = new RegularTable(body);
    regularClean.taskID = newTaskId
    try {
        const info = await regularClean.save();
        await UserTable.findOneAndUpdate({_id:userDetail},{$inc:{numberOfOnGoingOrder:1}},{})
        ctx.body =  info;
    } catch (e) {
        ctx.body = e;
        ctx.status = 500; 
    }
}

exports.delete = async(ctx) =>{
    const { id } = ctx.params;
    const result = await RegularTable.findOneAndUpdate({
      _id: `${id}`, deleted : false
      }, {$set:{deleted : true}},{returnOriginal: false})
      if (!result) {
        ctx.body = {
          message: `${id} not found!`,
        };
        ctx.status = 404;
      } else {
        ctx.body = {
          message: `${id} deleted!`,
        };
      }
    }

exports.assignToEmployee= async(ctx) =>{
  const { id } = ctx.params;
  const { body } = ctx.request;
  const {employeeID,employeeDetail} = body;
  const searchResult = await RegularTable.find({ _id: `${id}`, deleted : false }, () => {})
  if (searchResult.length>=1) {
    const {status} = searchResult[0]
    if (status === "confirmed" && !searchResult[0].employeeDetail[0]) {
        const taskDetail = {"employeeID":employeeID,"employeeDetail": employeeDetail, "status": "in-progress"}
        const assign= await RegularTable.findOneAndUpdate({_id: id,deleted:false }, taskDetail, {})
        const updateEmployee=await EmployeeTable.findOneAndUpdate({_id:employeeDetail},{$inc:{numberOfOnGoingOrder:1}},{})
        if (assign,updateEmployee) {
          ctx.body = `Order ID(${updateEmployee},${id}) updated.`
        } else {
          ctx.status = 404;
          ctx.body = "Order is not found"
        }
    } else {
      ctx.status = 404
      ctx.body = "Order status does not match "
    }
} 
  else {
    ctx.status = 404
    ctx.body = `Can't find this order by ID: ${id}`
  }
}

exports.comments = async (ctx) => {
  const { id } = ctx.params;
  const { review, rating } = ctx.request.body;
  const updateRegular = await RegularTable.findOneAndUpdate({
    _id: id, deleted:false,reviewStatus:false
  }, {
    $set: {
      review: `${review}`,
      rating: `${rating}`,
      reviewStatus:true
    }
  });
  if (updateRegular.length === 0) {
    ctx.body = "post comment failed"
    ctx.status = 404
  } else {
    ctx.body= "post comment successfully";
  }

  const { employeeDetail } = updateRegular;
  const searchResult = await EmployeeTable.find({_id:employeeDetail,deleted:false});
  let { totalRating } = searchResult[0];
  totalRating += rating;
  let { numberOfOrderRated } = searchResult[0];
  numberOfOrderRated += 1;
  const avg = (totalRating / numberOfOrderRated).toFixed(1);

  await EmployeeTable.findOneAndUpdate({
    _id:employeeDetail,deleted:false
  }, {
    $set: {
      numberOfOrderRated: numberOfOrderRated,
      totalRating: totalRating,
      averageRating: `${avg}`

    }
  });

}
exports.allSortedOrder = async (ctx) => {
  let { page, pageSize, status, sort} = ctx.query;
  page = +page;
  pageSize = +pageSize;
  const skip = pageSize * (page - 1);
  let params = { 'deleted': false }
  if (status) params['status'] = status;
  let sorted = sort === "priceasc" ? {price: 1} : sort === "pricedesc" ? {price: -1} : sort === "dateasc" ? {startTime: 1} : sort ===  "datedesc" ? {startTime: -1} : { taskID: 1 }
  const result = await RegularTable.aggregate([
    { $unionWith: { coll: 'endoflease-tables' } },
    { $match: params },
    { $lookup: {
      "from": "user-tables",
      "localField": "userDetail",
      "foreignField": "_id",
      "as": "userDetail"
    }},
    { $lookup: {
      "from": "employee-tables",
      "localField": "employeeDetail",
      "foreignField": "_id",
      "as": "employeeDetail"
    }},
    { $sort: sorted}
  ]).skip(skip).limit(pageSize);
 
  const count = await RegularTable.aggregate([
    { $unionWith: { coll: 'endoflease-tables' } },
    { $match: params }
  ]).count("taskID");
  ctx.body = {
    result: result,
    count: count[0]?count[0].taskID:0,
  }
}

exports.allUnassignedOrderByTime = async (ctx) => {
  let { page, pageSize, status} = ctx.query;
  page = +page;
  pageSize = +pageSize;
  skip = pageSize * (page - 1);
  const result = await RegularTable.aggregate([
    { $unionWith: { coll: 'endoflease-tables' } },
    { $match: { status: 'confirmed', deleted: false } },
    { $sort: { startTime: 1 } }
  ]).skip(skip).limit(pageSize);
  const count = await RegularTable.aggregate([
    { $unionWith: { coll: 'endoflease-tables' } },
    { $match: { status: 'confirmed' } },
    { $sort: { startTime: 1 } }
  ]).count("taskID");
  ctx.body = {
    result: result,
    count: count[0].taskID,
  }
}

exports.allOrder = async (ctx) => {
  let { page, pageSize } = ctx.query;
  page = +page;
  pageSize = +pageSize;
  const skip = pageSize * (page - 1);
  const result = await RegularTable.aggregate([
    { $unionWith: { coll: 'endoflease-tables' } },
    { $match: { status: 'confirmed' } }
  ]).skip(skip).limit(pageSize);
  const count = await UserTable.count();
  ctx.body = {
    result: result,
    count: count,
  }
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
    const endInfo = await RegularTable.find({_id:id},{})
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
  const updateStatus = await RegularTable.findOneAndUpdate({ _id: id, deleted : false}, body, {});
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
  }  ;
}

exports.cancelByAdmin = async(ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const searchResult = await RegularTable.find({_id:id,deleted:'false'},{})
  const {employeeDetail,status} = searchResult[0]
  if(status==="in-progress"){
    await RegularTable.findOneAndUpdate({_id:id,deleted:'false'}, { status:'confirmed',$set: { employeeDetail: [null], employeeID: null } },{})
    await EmployeeTable.findOneAndUpdate({_id:employeeDetail},{$inc:{numberOfOnGoingOrder:-1}},{})
    ctx.body = "cancel order successfully!"
  } else{
    ctx.status = 404
    ctx.body='Order status is wrong!'
  }
}

