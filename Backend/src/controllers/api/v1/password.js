const UserTable = require("../../../model/User");
const EmployeeTable = require('../../../model/Employee');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const hash = require('../../../utils/hash');
const bcrypt = require("bcryptjs");
const encryptor = require('../../../utils/encryptor');
const {userValidateRegisterInput,resetPasswordValidator}= require('../../../utils/userRegisterValidator')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.recover = async(ctx) => {
    const checkUserExistResult =  await UserTable.find({email:ctx.request.body.email})
    if(checkUserExistResult.length==0){
        ctx.status = 500;
        ctx.body = {error: 'This email is NOT exist!'};
    }
    else{
           const resetPasswordToken = crypto.randomBytes(20).toString('hex');
           const resetPasswordExpires = Date.now() + 3600000;
            const updateStatus = await UserTable.findOneAndUpdate(
                {email:ctx.request.body.email}, 
                {
                    resetPasswordToken:resetPasswordToken,
                    resetPasswordExpires:resetPasswordExpires
                },

                function (err, result) {
                if (err) {
                ctx.message = err;
                ctx.status = 500;
                return err;
                }
                return result;
            });
            if (updateStatus) ctx.body = `User information updated.`
            let link = "https://" + "hidongyu.com"  + "/forgetpassword/resetpassword";
            const mailOptions = {
                to: ctx.request.body.email,
                from: process.env.FROM_EMAIL,
                subject: "Password change request",
                text: `Hi ${ctx.request.body.email} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n
            Remember !!! Your key is ${resetPasswordToken}`,
            };
            
            sgMail
            .send(mailOptions)
            .then(() => {}, error => {
                console.error(error);
                if (error.response) {
                console.error(error.response.body)
                }
            }
            ,ctx.body = {result:"sent verification email successfully，please checkyour email address for verfication"});
            }
        }
exports.recoverEmployee = async(ctx) => {
    const checkUserExistResult =  await EmployeeTable.find({email:ctx.request.body.email})
    if(checkUserExistResult.length==0){
        ctx.status = 500;
        ctx.body = {error: 'This email is NOT exist!'};
    }
    else{
            const resetPasswordToken = crypto.randomBytes(20).toString('hex');
            const resetPasswordExpires = Date.now() + 3600000;
            const updateStatus = await EmployeeTable.findOneAndUpdate(
                {email:ctx.request.body.email}, 
                {
                    resetPasswordToken:resetPasswordToken,
                    resetPasswordExpires:resetPasswordExpires
                },

                function (err, result) {
                if (err) {
                ctx.message = err;
                ctx.status = 500;
                return err;
                }
                return result;
            });
            if (updateStatus) ctx.body = `User information updated.`
            let link = "https://" + "hidongyu.com"  + "/forgetpassword/resetpassword";
            const mailOptions = {
                to: ctx.request.body.email,
                from: process.env.FROM_EMAIL,
                subject: "Password change request",
                text: `Hi ${ctx.request.body.email} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n
            Remember !!! Your key is ${resetPasswordToken}`,
            };
            
            sgMail
            .send(mailOptions)
            .then(() => {}, error => {
                console.error(error);
                if (error.response) {
                console.error(error.response.body)
                }
            }
            ,ctx.body = {result:"sent verification email successfully，please checkyour email address for verfication"});
            }
        }
               
exports.resetPassword = async(ctx) => {

    const { errors, isValid } = resetPasswordValidator(ctx.request.body);
    if (!isValid) {
        ctx.status = 500;
        ctx.body = errors;
        return;
    }
    const resetPasswordToken = ctx.request.body.resetPasswordToken
    const password = ctx.request.body.password
    const confirmationPassword = ctx.request.body.confirmationPassword

    if(password === confirmationPassword){
        const updatedPassword = hash.enbcrypt(password)
        const getObjId = await UserTable.findOne({resetPasswordToken: ctx.request.body.resetPasswordToken})
        if( getObjId === null){
            ctx.status = 500;
            ctx.body = { error: 'Your token is invalid. Please resubmit request and get a new token'};
          
        }
        else{
            const ObjId = getObjId._id
            const timeNow = {$gt: Date.now()}
            const checkTokenExistResult = await UserTable.find({_id: ObjId,resetPasswordExpires:timeNow})
            if(checkTokenExistResult.length == 0){
                ctx.status = 500;
                ctx.body = { error: 'Your token is expired. Please resubmit request and get a new token'};
            }
            else{
                await UserTable.findOneAndUpdate(
                    {resetPasswordToken:resetPasswordToken }, 
                    {
                        password:updatedPassword
                    },
                    ctx.body = {message:"updated successfully"}
                    
                  );
            }
        }
    }
    else{
        ctx.status = 500;
        ctx.body = {error:"please check your password"}
    }
   
};

exports.resetPasswordEmployee = async(ctx) => {

    const { errors, isValid } = resetPasswordValidator(ctx.request.body);
    if (!isValid) {
        ctx.status = 500;
        ctx.body = errors;
        return;
    }
    const resetPasswordToken = ctx.request.body.resetPasswordToken
    const password = ctx.request.body.password
    const confirmationPassword = ctx.request.body.confirmationPassword

    if(password === confirmationPassword){
        const updatedPassword = hash.enbcrypt(password)
        const getObjId = await EmployeeTable.findOne({resetPasswordToken: ctx.request.body.resetPasswordToken})
        if( getObjId === null){
            ctx.status = 500;
            ctx.body = { error: 'Your token is invalid. Please resubmit request and get a new token'};
          
        }
        else{
            const ObjId = getObjId._id
            const timeNow = {$gt: Date.now()}
            const checkTokenExistResult = await EmployeeTable.find({_id: ObjId,resetPasswordExpires:timeNow})
            if(checkTokenExistResult.length == 0){
                ctx.status = 500;
                ctx.body = { error: 'Your token is expired. Please resubmit request and get a new token'};
            }
            else{
                await EmployeeTable.findOneAndUpdate(
                    {resetPasswordToken:resetPasswordToken }, 
                    {
                        password:updatedPassword
                    },
                    ctx.body = {message:"updated successfully"}
                    
                  );
            }
        }
    }
    else{
        ctx.status = 500;
        ctx.body = {error:"please check your password"}
    }
   
};