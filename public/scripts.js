const app = document.getElementById('root');

const newOp     = document.getElementById('newOp');
const taskInfo  = document.getElementById('taskInfo');
const taskTable = document.getElementById('taskTable');

$(document).ready( function(){
    var reqTasks = new XMLHttpRequest();
    var reqSum = new XMLHttpRequest();

    reqTasks.onload = function() {
      //fetch task list
      var array = JSON.parse(this.response);
      if(reqTasks.status != 200) {
        console.log("Could not get tasks list");
        return;
      }

      ////// update table
      tableHtml = '';
      $('#taskTable tr').not(':first').remove(); //clear preserving headers

      for (var i = 0; i < array.length; i++) {   //put the data into html
        item = array[i];

        try {
          id = item.op_id;
          status = item.status;
          result = item.result;
        } catch (e) {
          continue;
        }
        tableHtml += `<tr><td> ${id} </td><td> ${status} </td><td> ${result} </td></tr>`;
      }

      //append the html into the table element
      $('#taskTable tr').first().after(tableHtml);
    };

    //run getTasks request periodically
    var intervalID = setInterval(function() {
      reqTasks.open('GET', 'http://localhost:3000/tasks', true);
      reqTasks.send()
    }, 300);

    //setup a+b button callback
    $(document).on('click', '#btn-sum', function(){
      //create a POST request
      reqSum.open('POST', 'http://localhost:3000/math/sum', true);
      reqSum.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // reqSum.onload(function() {
      //   console.log('Sent POST to /math/sum')
      // })

      //send the POST request
      var op = {
        id: Math.floor(Math.random() * 1000000),
        a: $('#sum-a').val(),
        b: $('#sum-b').val()
      }
      console.log(op)
      reqSum.send(JSON.stringify(op));
    });
});
