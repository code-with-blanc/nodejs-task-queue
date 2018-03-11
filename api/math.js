//register your operations with this API

const express = require('express');
const mongoose = require('mongoose');

const {Operation} = require('../models/math.js');
const {Task}      = require('../models/task.js');

var router = express.Router();

//Register an operation
router.get('/math/sum', (req, res) => {
  math = new Math(req.body);

  math.save().then((math) => {
    res.status(200).send(math);
  })
  .catch( (err) => {
    res.status(500).send(err);
  })
})

//
module.exports.router = router;
