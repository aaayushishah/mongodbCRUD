const config = require('../config/config.json');
const mongoose = require('mongoose');
const connectionprop = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionprop);
mongoose.Promise = global.Promise;
module.exports = {
    User: require('../modals/User')
}