//Mongoose model of a math operation request

const {mongoose} = require('./../mongoose.js');

//Create the model
const Sum = mongoose.model('Sum', {
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
module.exports = { Sum };
