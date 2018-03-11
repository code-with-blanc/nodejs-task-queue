//this file just setups mongoose
const mongoose = require('mongoose');

process.env.MONGODB_URI = 'mongodb://localhost:27017/task-queue';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
        .catch((e) => {console.log(e)});

module.exports = { mongoose:mongoose };
