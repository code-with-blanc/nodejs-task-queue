const express    = require('express');
const bodyParser = require('body-parser');

const operations = require('./api/math.js');
const results    = require('./api/tasks.js');

var app = express();
var port = 3000;

//serve the public folder
app.use(express.static(__dirname + '/public'));

//Use body parser (creates req.body object on POST, PATCH, etc)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config APIs
app.use(operations.router);
app.use(results.router);

//start servet
app.listen(port, () => {
  console.log(`Server up on port ${port}!`);
});
