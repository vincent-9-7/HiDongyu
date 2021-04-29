const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys.js");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
const mongoose = require("mongoose");
const EmployeeTable = require("../model/Employee")
const UserTable = require('../model/User')

module.exports = passport => {
    passport.use('user-rule',
        new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await UserTable.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else{
            return done(null, false);
        }
    }));
    passport.use('employee-rule',
        new JwtStrategy(opts, async function(jwt_payload, done) {
        const employee = await EmployeeTable.findById(jwt_payload.id);
        if(employee){
            return done(null, employee)
        } else{
            return done(null, false);
        }
    }));
    passport.use('rule',
    new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await UserTable.findById(jwt_payload.id);
        const employee = await EmployeeTable.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } 
        else if(employee){
            return done(null, employee)
        } else{
            return done(null, false);
        }
    }));
}

