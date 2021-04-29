const Validator = require('validator');
const isEmpty = require('./isEmptyValidator');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.ABN = !isEmpty(data.ABN) ? data.ABN : "";
    ABN = data.ABN.toString(); 
    data.ID = !isEmpty(data.ID) ? data.ID : "";
    ID = data.ID.toString();
    
    if (!Validator.isEmail(data.email)) {
        errors.error = "The email having issues!"
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.error = "The password can not be empty!"
    }
    if (!Validator.isLength(data.password, {min: 6, max: 60})) {
        errors.error= "The length of password should be more than 6 and less than 30!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}