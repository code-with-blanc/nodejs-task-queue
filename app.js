const express = require('express');


var app = express();
port = 3000;

//start servet
app.listen(port, () => {
  console.log(`Server up on port ${port}!`);
});
