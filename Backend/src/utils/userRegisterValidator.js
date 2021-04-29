const Validator = require('validator');
const isEmpty = require('./isEmptyValidator');

function userValidateRegisterInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.error= "The email having issues"
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.error = "The length of password should be more than 6 and less than 30!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
function resetPasswordValidator(data) {
    let errors = {};
    data.resetPasswordToken = !isEmpty(data.resetPasswordToken) ? data.resetPasswordToken : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmationPassword = !isEmpty(data.confirmationPassword) ? data.confirmationPassword : "";
    
    if (Validator.isEmpty(data.resetPasswordToken)) {
        errors.error = "The token can not be empty!"
    }
    if (Validator.isEmpty(data.password)) {
        errors.error = "The password can not be empty!"
    }
    if (!Validator.isLength(data.password, {min: 6, max: 60})) {
        errors.error= "The length of password should be more than 6 and less than 30!"
    }
    if (Validator.isEmpty(data.confirmationPassword)) {
        errors.error = "The confirmation password can not be empty!"
    }
    if (!Validator.isLength(data.confirmationPassword, {min: 6, max: 60})) {
        errors.error= "The length of confirmation password should be more than 6 and less than 30!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = {userValidateRegisterInput,resetPasswordValidator}