//Mongoose model of a math operation request

const {mongoose} = require('./../mongoose.js');

//Create the model
const Task = mongoose.model('Math', {
  id : {
    type : String,
    required : true
  },

  a : {
    type : String,
    required : true
  },

  b : {
    type : String,
    required : true
  }
})

// exports
module.exports = { Task };
