//Mongoose model of a task

const {mongoose} = require('./../mongoose.js');

//Create the model
const Task = mongoose.model('Task', {
  op_id : {    //id of the operation that originated this task
    type : String,
    required : true
  },

  status : {
    type : String,
    required : true
  },

  result : {
    type : String
  },

  log : [String]   //register the history of this task (eg. created, completed)
})

// exports
module.exports = { Task };
