const mongoose = require('mongoose');

const validateEmail = function (email) {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailFormat.test(email)
};


const UsersModelSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
            required: true,
            min: 0,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            validate: [validateEmail, 'Please fill a valid email address. '],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        name: {
            firstName: {
                type: String,
                required: true,
                trim: true,
                default: 'First Name'
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
                default: 'Last Name'
            }
        },
        birthday: {
            type: Date,
            default: "1900-01-01",
        },
        phone: {
            type: Number,
            default:0000000000,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 60,
        },
        address: {
            address1:{
                type: String,
                default:'no address1'
            },
            address2: {
                type: String,
                default:'no address2'
            }, 
            suburb: {
                type: String,
                default:'no suburb'
            },
            state: {
                type: String,
                default:'no state'
            }, 
            postcode: {
                type: Number,
                min: 1000,
                max: 9999,
                default:1000
            }
        },
        numberOfOrderFinished: {
            type: Number,
            default: 0,
        },
        numberOfOrderRated: {
            type: Number,
            default: 0,
        },
        numberOfOnGoingOrder:{
            type:Number,
            default:0
        },
        deleted:{
            type: Boolean,
            require: true,
            default: false,
        },
        resetPasswordToken: {
            type: String,
            required: false
        },
        
        resetPasswordExpires: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true,
});



const UserTable = mongoose.model('User-table', UsersModelSchema);
module.exports = UserTable;

