//register your operations with this API

const express = require('express');
const mongoose = require('mongoose');

const {Sum} = require('../models/sum.js');
const {Task}      = require('../models/task.js');

var router = express.Router();

//Get the specified result
router.get('/results/:id', (req, res) => {

})

//Get a list of all registered tasks ids and their status
router.get('/tasks', (req, res) => {
  Task.find().then( (docs) => {
    var list = [];
    for(i = 0; i < docs.length; i++) {
      d = docs[i];
      list.push({
        id : d.op_id,
        status : d.status
      })
    }

    res.status(200).send(list)
  })
  .catch( (err) => {
    res.status(500).send(err);
  })
});

router.get('/tasks/delete-all', (req, res) => {
  Task.remove().then(() => {
    res.status(200).send("Deleted all tasks!  o_o")
  })
});

//
module.exports.router = router;
