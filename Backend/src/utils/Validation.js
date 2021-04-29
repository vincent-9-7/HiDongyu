const Validator = require('validator');
const isEmpty = require('./isEmptyValidator');

function validateRegisterInput(data) {
    let errors = {};

    
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.ABN = !isEmpty(data.ABN) ? data.ABN : "";
    ABN = data.ABN.toString(); 
    data.ID = !isEmpty(data.ID) ? data.ID : "";
    ID = data.ID.toString();

    

    if (Validator.isEmpty(data.password)) {
        errors.error = "The password can not be empty!"
    }
    if (Validator.isEmpty(ABN)) {
        errors.error = "The ABN can not be empty!"
    }

    
    if (!Validator.isEmail(data.email)) {
        errors.error = "Your email is invalid!"
    }
    
   
    if (!Validator.isLength(data.password, {min: 6, max: 60})) {
        errors.error= "The length of password should be more than 2 and less than 30!"
    }
    if (!Validator.isLength(ABN, {min:11,max:11})) {
        errors.error = "The length of ABN should be only 11"
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}

function updateValidation(data) {
    let errors = {};
    data.name.firstname = !isEmpty(data.name.firstname) ? data.name.firstname : '';
    data.name.lastname = !isEmpty(data.name.lastname) ? data.name.lastname : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    if ( 'ABN' in data ) {
      data.ABN = !isEmpty(data.ABN) ? data.ABN : '';
      if (Validator.isEmpty(data.ABN)) {
        errors.error = 'The ABN cannot be empty.';
      } else {
          data.ABN = data.ABN.toString();
          if (!Validator.isLength(data.ABN, { min: 11, max: 11 })) {
            errors.error = 'The length of ABN should be only 11.';
          }
      }
    }

    if (Validator.isEmpty(data.name.firstName)) {
      errors.name.firstName = 'The first name cannot be empty.';
    }
    if (Validator.isEmpty(data.name.lastName)) {
      errors.name.lastName = 'The last name cannot be empty.';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'The phone cannot be empty.';
    } else {
        if (!Validator.isLength(data.phone, { min: 9, max: 12 })) {
            errors.phone = 'Incorrect phone number.';
        }
    }
    
    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = {
  validateRegisterInput,
  updateValidation,
};