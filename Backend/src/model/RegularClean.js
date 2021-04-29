const mongoose = require('mongoose');
const UserTable = require('./User')
const EmployeeTable = require('./Employee')
const RegularSchema = new mongoose.Schema(
    {
        taskID: {
            type: Number,
            unique: true,
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: "RC",
        },
        status: {
            type: String,
            required: true,
            enum: ['confirmed','in-progress','finished','cancelled'],
            default: 'confirmed', 
            index: true,
        },
        address:{
            address1:{
                type: String,
                required: true,
            },
            address2: {
                type: String,
            }, 
            suburb: {
                type: String,
            },
            state: {
                type: String,
                required: true,
            },
            postcode: {
                type: Number,
                min: 1000,
                max: 9999,
            }
        }, 
        currentLocation: {
            lat: {
                type:Number,
                default: -33.865143,
            },
            lng: {
                type:Number,
                default: 151.209900,
            }
        },
        bedroomNum: {
            type: Number,
            required: true,
            min: 0,
        },
        bathroomNum: {
            type: Number,
            required: true,
            min: 0,
        },
        propertyType: {
            type: String,
            enum: ['unit','apartment','house','unknown'],
            default: 'unknown',
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date, 
        },
        cabinets: {
            type: Number,
            min: 0,
            default: 0,
        },
        fridge: {
            type: Number,
            min: 0,
            default: 0,
        },
        oven: {
            type: Number,
            min: 0,
            default: 0,
        },
        interiorWindows: {
            type: Number,
            min: 0,
            default: 0,
        },
        review: {
            type: String,
            default: "",
        },
        reviewStatus: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        userID: {
            type: Number,
            min: 0,
        },
        userDetail:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: UserTable,
        }],
        employeeID: {
            type: Number,
            min: 0,
        },
        employeeDetail:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: EmployeeTable,
        }],
        deleted:{
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
});



const RegularTable = mongoose.model('Regular-table', RegularSchema);
module.exports = RegularTable;
