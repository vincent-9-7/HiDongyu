const mongoose = require('mongoose');
require('dotenv').config();
const mongoDBUser = process.env.REACT_APP_MONGODB_USER;

module.exports = async function () {
    const connection = await mongoose.connect(`mongodb+srv://${mongoDBUser}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    return connection.connection.db;
};