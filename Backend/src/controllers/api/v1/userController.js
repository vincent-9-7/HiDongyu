const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const encryptor = require('../../../utils/encryptor');
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../../config/keys");
const passport = require("koa-passport");
const { count } = require('../../../model/User');
const UserTable = require("../../../model/User");
const { updateValidation } = require('../../../utils/Validation');
const hash = require('../../../utils/hash');
const { userValidateRegisterInput }= require('../../../utils/userRegisterValidator')
const  validateLoginInput = require('../../../utils/loginValidator')
const EndOfLeaseTable = require('../../../model/EndOfLease');
const e = require('cors');

exports.index = async(ctx) =>{
    const getAllUsersResult = await UserTable.find({"deleted": false});
    if (getAllUsersResult.length > 0) {
        ctx.body = getAllUsersResult;
    } else {
        ctx.status = 500;
        ctx.body = { errors: "There are no users!"}
    }
}

exports.show = async(ctx) =>{
    const {id} = ctx.params
    await UserTable.find({_id:id, "deleted": false}, function(err,result){
        if (err) {
            ctx.status = 500;
            ctx.message = err;
            return err;
        } else {
            if (result.length === 0) {
                ctx.body = "Not found"
                ctx.status = 404
            } else {
                ctx.body = result;
            }
        }
    })
}
exports.getTotalTask = async (ctx) => {
  const num= await EndOfLeaseTable.aggregate([
    { $unionWith: { coll: "regular-tables"} },
    {$match:{deleted:false}},
    {$match: {userDetail: mongoose.Types.ObjectId(ctx.params.id)}},
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

exports.getAllTask = async (ctx) => {
    const allTask= await EndOfLeaseTable.aggregate([
      { $unionWith: { coll: "regular-tables"} },
      {$match:{deleted:false}},
      {$match: {userDetail: mongoose.Types.ObjectId(ctx.params.id)}},
      {$match: { 
        'status': { 
          $in: ['in-progress','confirmed','finished','cancelled'] 
        }}},
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
      },{ $sort: {type: 1}}
    ],function (err, result) {
        if(err){
            ctx.message = err;
            ctx.status = 500
            return err
        }
        return result
    })
    if(allTask.length<1){
        ctx.body="no related information"
        ctx.status=404
    }else{
        ctx.body=allTask;
    }
  }
exports.listUser = async(ctx) => {
    let { page, pageSize} = ctx.query;
    page = +page;
    pageSize = +pageSize;
    const skip = pageSize * (page - 1);
    const result = await UserTable.find({"deleted": false}).skip(skip).limit(pageSize);
    const count = await UserTable.find({"deleted": false}).countDocuments();
    ctx.body = {
        result: result,
        count: count,
    }
}
exports.registration = async(ctx) =>{
    const { errors, isValid } = userValidateRegisterInput(ctx.request.body);
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }
    const checkUserExistResult = await UserTable.find({});
    if(checkUserExistResult.length === 0){
        const {password, email, firstName, lastName} = ctx.request.body;
        let newUser = new UserTable({
            ID: 0,
            name: {
                firstName:firstName,
                lastName:lastName,
            },
            email: email,
            password: encryptor.enbcrypt(password),
        });
        await newUser.save().then(user => {
            ctx.body = user;
        }).catch((err) => {
        });
        ctx.body = newUser;
    } else {
        const checkUsersExistResult = await UserTable.find({email: ctx.request.body.email});
        if (checkUsersExistResult.length > 0) {
            ctx.status = 500;
            ctx.body = { error: 'This email is already exist!'}
        } else {
            const userID = (await UserTable.find().sort({ ID: -1 }).limit(1))[0].ID + 1
            const {password,email, firstName, lastName} = ctx.request.body;
            let newUser = new UserTable({
                ID: userID,
                name: {
                    firstName:firstName,
                    lastName:lastName,
                },
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
    const finduserEmail = await UserTable.find(
      {email:ctx.request.body.email},
    );

    const password = ctx.request.body.password;
    const userEmailInformation = finduserEmail[0];
    if(finduserEmail.length === 0){
        ctx.status = 500;
        ctx.body = {error: "This email or password have issues!"}
    }
    else if(userEmailInformation.deleted === true){
      ctx.status = 500;
      ctx.body = {error: "This email has been blocked by admin. Please contact admin"}
    }
    else{
      var result = await bcrypt.compareSync(password, userEmailInformation.password)
      if (result) {
        const userInfo = await UserTable.findOne({email: userEmailInformation.email});
        const objectID = userInfo._id;
        const lastName = userInfo.name.lastName
        const ID = userInfo.ID 
        const payload = {email: userEmailInformation.email,id:objectID,ID:ID}
        const token = jwt.sign(payload, secretOrKey.secretOrKey, {expiresIn: 3600})
        ctx.status = 200;
        ctx.body = {success: true, token: "Bearer " + token, objectID,lastName,ID}
      } else {
          ctx.status = 400
          ctx.body = {error: "Password is wrong!"}
      }
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
    const updateStatus = await UserTable.findOneAndUpdate({ _id: id,"deleted": false }, body, function (err, result) {
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
    const updateStatus = await UserTable.findOneAndUpdate({ _id: id }, deletedUsers, function (err, result) {
      if (err) { 
        ctx.status = 500;
        ctx.message = err;
        return err};
    });
    if (updateStatus) ctx.body = `user objectId(${id}) deleted.`;
  }

  exports.passport = passport.authenticate('user-rule', { session: false });
  exports.passport2 = passport.authenticate('rule', { session: false });

