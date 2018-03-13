//register your operations with this API

const express = require('express');
const mongoose = require('mongoose');

const {Sum}  = require('../models/sum.js');
const {Task} = require('../models/task.js');

var router = express.Router();

//Get all registered tasks
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

    res.status(200).send(docs)
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
