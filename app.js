const express    = require('express');
const bodyParser = require('body-parser');

const math    = require('./api/math.js');
const results = require('./api/tasks.js');
const runner  = require('./runner.js');

var app = express();
var port = 3000;

const {Task} = require('./models/task.js');

Task.remove().then(() => {
  t1 = new Task({
    op_id: 1,
    status: 'Created'
  })

  t2 = new Task({
    op_id: 2,
    status: 'Created'
  })

  return Promise.all([t1.save(), t2.save()])
})
.then(() => {
  runner.run();
})


//serve the public folder
app.use(express.static(__dirname + '/public'));

//Use body parser (creates req.body object on POST, PATCH, etc)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config APIs
app.use(math.router);
app.use(results.router);

//start servet
app.listen(port, () => {
  console.log(`Server up on port ${port}!`);
});
