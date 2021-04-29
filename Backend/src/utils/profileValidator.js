const Validator = require('validator');
const isEmpty = require('./isEmptyValidator');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.phone = !isEmpty(data.phone) ? data.name : "";
    data.address1 = !isEmpty(data.address1) ? data.email : "";
    data.address2 = !isEmpty(data.address2) ? data.password : "";
    data.suburb = !isEmpty(data.suburb) ? data.password : "";
    data.state = !isEmpty(data.state) ? data.password : "";
    data.postcode = !isEmpty(data.postcode) ? data.password : "0000";


    if (!Validator.isLength(data.postcode, 4)) {
        errors.postcode = "The length of postcode is wrong!"
    } 

    if (!Validator.isLength(data.address1, 4)) {
        errors.address1 = "The length of address is wrong!"
    } 

    if (!Validator.isLength(data.address2, 4)) {
        errors.address2 = "The length of address is wrong!"
    } 

    if (!Validator.isLength(data.suburb, 4)) {
        errors.postcode = "The length of postcode is wrong!"
    } 

    if (!Validator.isLength(data.state, 4)) {
        errors.postcode = "The length of postcode is wrong!"
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    };
}