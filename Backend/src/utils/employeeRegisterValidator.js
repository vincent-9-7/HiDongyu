const Validator = require('validator');
const isEmpty = require('./isEmptyValidator');

function validateRegisterInput(data) {
    let errors = {};

    
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.password)) {
        errors.password = "The password can not be empty!"
    }
   
    
    if (!Validator.isEmail(data.email)) {
        errors.email = "The email having issues!"
    }
   
    if (!Validator.isLength(data.password, {min: 6, max: 60})) {
        errors.password = "The length of password should be more than 6 and less than 30!"
    }
  


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = {
  validateRegisterInput
};
