const app = document.getElementById('root');

const newOp     = document.getElementById('newOp');
const taskInfo  = document.getElementById('taskInfo');
const taskTable = document.getElementById('taskTable');

var request = new XMLHttpRequest();

// const logo = document.createElement('img');
// logo.src = 'logo.png';
//
// const container = document.createElement('div');
// container.setAttribute('class', 'container');
//
// app.appendChild(logo);
// app.appendChild(container);



request.open('GET', 'htts://localhost:3000/tasks', true);
request.onload = function () {

  // // Begin accessing JSON data here
  // var data = JSON.parse(this.response);
  // if (request.status >= 200 && request.status < 400) {
  //   data.forEach(movie => {
  //     const card = document.createElement('div');
  //     card.setAttribute('class', 'card');
  //
  //     const h1 = document.createElement('h1');
  //     h1.textContent = movie.title;
  //
  //     const p = document.createElement('p');
  //     movie.description = movie.description.substring(0, 300);
  //     p.textContent = `${movie.description}...`;
  //
  //     container.appendChild(card);
  //     card.appendChild(h1);
  //     card.appendChild(p);
  //   });
  // } else {
  //   const errorMessage = document.createElement('marquee');
  //   errorMessage.textContent = `Gah, it's not working!`;
  //   app.appendChild(errorMessage);
  // }
}

// request.send();



$(document).ready( function(){
    var reqTasks = new XMLHttpRequest();


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
          id = item.id;
          status = item.status;
        } catch (e) {
          continue;
        }
        tableHtml += `<tr><td> ${id} </td><td> ${status} </td></tr>`;
      }

      //append the html into the table element
      $('#taskTable tr').first().after(tableHtml);
    };

    //run getTasks request periodically
    var intervalID = setInterval(function() {
      reqTasks.open('GET', 'http://localhost:3000/tasks', true);
      reqTasks.send()
    }, 1000);

    $(document).on('click', '#btn-sum', function(){
      alert("button");
    });
});
