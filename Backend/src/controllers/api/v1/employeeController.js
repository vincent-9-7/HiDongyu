const EmployeeTable = require('../../../model/Employee');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const encryptor = require('../../../utils/encryptor');
const passport = require("koa-passport");
const {validateRegisterInput} = require("../../../utils/employeeRegisterValidator");
const { updateValidation } = require('../../../utils/Validation');
const hash = require('../../../utils/hash');
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../../config/keys");
const validateLoginInput = require("../../../utils/loginValidator");
const EndOfLeaseTable = require('../../../model/EndOfLease');
const RegularTable = require('../../../model/RegularClean');
const e = require('cors');
const UserTable = require('../../../model/User');

exports.index = async(ctx) =>{
  const getAllEmployees = await EmployeeTable.find({"deleted": false}).sort( { "ID": 1 } );
  if (getAllEmployees.length > 0) {
    ctx.body = getAllEmployees;
} else {
    ctx.status = 404;
    ctx.body = { errors: "There are no users!"}
  }
}

exports.getTotalTask = async (ctx) => {
  const num= await EndOfLeaseTable.aggregate([
    { $unionWith: { coll: "regular-tables"} },
    {$match:{deleted:false}},
    {$match: {employeeDetail: mongoose.Types.ObjectId(ctx.params.id)}},
    {$match: { 
      'status': { 
        $in: ['in-progress','finished'] 
      }}}]).count('status')
    if(num.length<=0){
      ctx.body =0,
      ctx.status=404;
    }else{
      totalNum = num[0].status
      ctx.body = totalNum
    }
  }

exports.registration = async(ctx) =>{
  const { errors, isValid } = validateRegisterInput(ctx.request.body); 
  if (!isValid) {
      ctx.status = 400;
      ctx.body = errors;
      return;
  }
  const checkEmployeeExistResult = await EmployeeTable.find({});
  if(checkEmployeeExistResult.length === 0){
      const {password, email} = ctx.request.body;
      let newUser = new EmployeeTable({
          ID: 0,
          email: email,
          password: encryptor.enbcrypt(password),
      });
      await newUser.save().then(user => {
          ctx.body = user;
      }).catch((err) => {
      });
      ctx.body = newUser;
  } else {
      const checkEmployeesExistResult = await EmployeeTable.find({email: ctx.request.body.email});
      if (checkEmployeesExistResult.length > 0) {
          ctx.status = 500;
          ctx.body = { email: 'This email is already exist!'};
      }
      else {
          const employeeID = (await EmployeeTable.find().sort({ ID: -1 }).limit(1))[0].ID + 1
          const {password,email} = ctx.request.body;
          let newUser = new EmployeeTable({
              ID: employeeID,
              email: email,
              password:hash.enbcrypt(ctx.request.body.password)
          });
              await newUser.save().then(user => {
                  ctx.body = user;
              }).catch((err) => {
              });
          }
      }
}



exports.login = async ctx => {
  const { errors, isValid } = validateLoginInput(ctx.request.body);

  if (!isValid) {
      ctx.status = 400;
      ctx.body = errors;
      return;
  }
  const findEmployeeEmail = await EmployeeTable.find(
    {email:ctx.request.body.email},
  );
 
  
  const password = ctx.request.body.password;
  const employeeEmailInformation = findEmployeeEmail[0];

  if(findEmployeeEmail.length === 0){
    ctx.status = 500;
    ctx.body = {error: "This email or password have issues!"}
  }
  else if(employeeEmailInformation.deleted === true){
    ctx.status = 500;
    ctx.body = {error: "This email has been blocked by admin. Please contact admin"}
  }

  
  else {
      var result = await bcrypt.compareSync(password, employeeEmailInformation.password)
      if (result) {
        ctx.status = 200;
        const employeeInfo = await EmployeeTable.findOne({email: employeeEmailInformation.email});
        const objectID = employeeInfo._id;
        const lastName = employeeInfo.name.lastName
        const ID = employeeInfo.ID 
        const payload = {email: employeeEmailInformation.email,id:objectID,ID:ID}
        const token = jwt.sign(payload, secretOrKey.secretOrKey, {expiresIn: 3600})
        ctx.body = {success: true, token: "Bearer " + token, objectID,lastName,ID}
      } else {
          ctx.status = 400
          ctx.body = {error: "Password is wrong!"}
      }
    }
  }
  
exports.show = async(ctx) =>{
  const { id } = ctx.params;
  const employeeInfo = await EmployeeTable.findOne({_id: id, "deleted": false});
  if (!employeeInfo) {
    ctx.status = 404;
    ctx.body = 'Employee does not find';
  } else {
    ctx.body = employeeInfo;
  } 
}


exports.update= async(ctx) =>{
  const { id } = ctx.params;
  const { body } = ctx.request;
  const { errors, isValid } = updateValidation(body); 
  if (!isValid) {
    ctx.status = 401;
    ctx.body = errors;
    return;
  }
  if (body.password) {
    body.password = hash.enbcrypt(body.password);
  }
  const updateStatus = await EmployeeTable.findOneAndUpdate({ _id: id,"deleted": false }, body, function (err, result) {
    if (err) {
      ctx.message = err;
      ctx.status = 500;
      return err;
    }
    return result;
  });
  if (updateStatus) ctx.body = `User ObjectId(${id}) updated.`;
}

exports.delete = async (ctx) => {
  const { id } = ctx.params
  const deletedUsers={deleted:true}
  const updateStatus = await EmployeeTable.findOneAndUpdate({ _id: id }, deletedUsers, function (err, result) {
    if (err) { 
      ctx.status = 500;
      ctx.message = err;
      return err};
  });
  if (updateStatus) ctx.body = `user objectId(${id}) deleted.`;
}

exports.getAllTask = async (ctx) => {
    const allTask= await EndOfLeaseTable.aggregate([
       { $unionWith: { coll: "regular-tables"} },
       {$match:{deleted:false,
        employeeDetail: mongoose.Types.ObjectId(ctx.params.id),
      }},
       {
         $project: {
           _id: 1,
           taskID:1,
           type:1,
           status:1,
           price:1,
           date:1,
           bedroomNum:1,
           bathroomNum:1,
           startTime:1,
           firstName:1,
           lastName:1,
           createdAt:1,
           userDetail:1,
           userID:1,
           deleted:1,
           employee:1, 
           employeeDetail:1,
           reviewStatus:1,
         }
       },{ $sort: {type: 1}},
     ],() =>{})
   if(allTask.length<1){
       ctx.body = "no related information"
       ctx.status = 404
   }else{
       ctx.body=allTask;
   }
  }


exports.listUser = async(ctx) => {
  let { page, pageSize} = ctx.query;
  page = +page;
  pageSize = +pageSize;
  const skip = pageSize * (page - 1);
  const result = await EmployeeTable.find({deleted:false,_id: { $nin: ["6076e5b9ce902928b4f10e0e"] }}).skip(skip).limit(pageSize);
  const count = await EmployeeTable.find({deleted:false,_id: { $nin: ["6076e5b9ce902928b4f10e0e"] }}).countDocuments();
  ctx.body = {
    result: result,
    count: count,
  }
}

exports.getInfoNumber = async(ctx)=>{
  const totalResult = await EmployeeTable.aggregate([
      {$match:{deleted:false}},
      {$group: {
          _id: "",
          numberOfOnGoingOrder: {$sum: '$numberOfOnGoingOrder'},
          numberOfOrderFinished:{$sum: '$numberOfOrderFinished'},
      }}
  ])
  const {numberOfOnGoingOrder,numberOfOrderFinished} = totalResult[0]
  const totalOrders = numberOfOnGoingOrder+numberOfOrderFinished
  const confirmedResult = await RegularTable.aggregate([
    { $unionWith: { coll: 'endoflease-tables' } },
    { $match: { status: 'confirmed', deleted: false } }
  ]).count("taskID");
  const totalConfirmed = confirmedResult[0]?confirmedResult[0].taskID:0
  const actEmployees = await EmployeeTable.aggregate([
    {$match:{deleted:false,employmentStatus:'available'}}]).count("ID")
  const totalEmployees = actEmployees[0]?actEmployees[0].ID-1:0
  const userResult = await UserTable.aggregate([
    {$match:{deleted:false}}]).count("ID")
  const totalUsers = userResult[0]?userResult[0].ID:0
  ctx.body={
    "Total Orders":totalOrders,
    "Total Confirmed":totalConfirmed,
    "Total Employees":totalEmployees,
    "Total Users":totalUsers
  }
}


exports.passport = passport.authenticate('employee-rule', { session: false });
exports.passport2 = passport.authenticate('rule', { session: false });
