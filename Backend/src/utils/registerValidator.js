const Validator = require('validator');
const isEmpty = require('./isEmptyValidator');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isLength(data.name, { min:2, max: 30 })) {
        errors.name = "The length of name should be more than 2 and less than 30!"
    } 

    if (Validator.isEmpty(data.name)) {
        errors.name = "The name can not be empty!"
    }

    if (!Validator.isEmail(data.email)) {
        errors.name = "Your email is invalid!"
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "The length of password should be more than 6 and less than 30!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}
