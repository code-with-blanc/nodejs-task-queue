//register your operations with this API

const express = require('express');
const mongoose = require('mongoose');

const {Sum} = require('../models/sum.js');
const {Task}      = require('../models/task.js');

var router = express.Router();

//Register an operation
router.post('/math/sum', (req, res) => {
  try {
    sum = new Sum(req.body);
  } catch (e) {
    console.log(e);
    req.status(500).send(e);
  }

  sum.save().then((doc) => { //sum created
    task = new Task({
      op_id : doc.id,
      status : 'Created',
    });

    task.save().catch((e) => { throw e; });

    return doc;  //should pass math as an argument to the next then call
  })
  .then((doc) => {
    //respond request
    res.status(200).send(doc);
  })
  .catch( (err) => {
    res.status(500).send(err);
  })
})

//
module.exports.router = router;
