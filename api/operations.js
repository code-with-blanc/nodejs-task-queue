//register your operations with this API

const express = require('express');
const mongoose = require('mongoose');

const {Operation} = require('../models/operation.js');
const {Task}      = require('../models/task.js');

var route = express.Router();

//Register an operation
router.get('/math/sum', (req, res) => {


})

//
module.exports.router = router;
