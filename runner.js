// This files implements a function that checks for new
// tasks, runs a function on them and registers the task as completed

const {Task} = require('./models/task.js');
const {Sum}  = require('./models/sum.js');

//The app must call this function to start checking for new tasks
const run = function() {
  const checkTasksInterval = 1000;  //time in ms between checking for new tasks

  //TODO: check for tasks left as 'Processing' by a crashed instance and
  //      set them as 'Created'

  setInterval(checkTasks, checkTasksInterval);
}

var checkTaskRunning = false;  //we will use this variable to ensure
//the main loop (inside setInterval) only
//runs if the last call has ended

const checkTasks = function() {
    if(checkTaskRunning) {
      debug('checkTasks cant run because last call is not ended')
      return;
    }
    checkTaskRunning = true;
    saveTaskPromises = [];
    debug('0 : checkTasks begins')

    //Find tasks on which work has not begun
    Task.find({'status' : 'Created'})
    .then((tasks) => {
      tasks.forEach((task) => {
          task.status = 'Processing';

          debug(`1 : Save task ${task.op_id} as 'Processing'`);

          s = task.save()  //save processing status
          .then((task) => {
            debug(`3 : Begin taskFn for task ${task.op_id}`);
            taskFn(task)  //begin process task (this is an async call)
            .then( (taskObj) => {   //save the result
              debug(`5 : Saving task ${task.op_id} as 'Completed'`);
              taskObj.status = 'Completed';
              taskObj.save();
            }).catch( (err) => {
              //taskFn encountered an error. Save this as a failed task.
              task.status = 'Failed';
              console.log(`taskFn: failed at task ${task.op_id}`);
              console.log(err.message);
              task.save();
            });

            //code reaches this point as soon as taskFn is started and does
            //not need to wait for it to finish. Therefore task.save() ends
            //very quickly
          })

          //We put all save promisses into an array to wait for all tasks
          //to be saved as 'Processing' before setting checkTaskRunning to false
          //and enabling the function to search for new tasks
          debug(`2 : Push save for task ${task.op_id} into saveTaskPromises`);
          saveTaskPromises.push(s);
      })  // <--- for each task

    })
    .then(() => {
      //wait so that all tasks are saved as 'Processing'. taskFn may still
      //be checkTaskRunning but that is ok.
      Promise.all(saveTaskPromises).then(() => {
        debug(`4 :  All tasks saved as 'Processing' checkTasks may run again!`);
        checkTaskRunning = false;
      })
    })
  }

//This Promise is called on a new task. It receives the
//task (a mongoose document) and should resolve with the document
//with the result and changed fields manipulated appropriately
//The document should not be saved, this will happen outside taskFn.
const taskFn = function(task) {
  return new Promise(function(resolve, reject) {
    debug(`T1: Entering taskFn for task ${task.op_id}`);

    Sum.findOne({'id' : task.op_id}).then((doc) => {
        if(!doc) {
          reject(Error(`Task specifies Sum id ${task.op_id} but none found.`));
        }

        try {
          task.result = Number(doc.a) + Number(doc.b);
        } catch (e) { reject(e); }

        //spend 2 to 7 seconds before resolving the task
        waitMs = 2000 + (Math.random() * 5000)

        setTimeout(() => {
          debug(`T2: Resolving taskFn for task ${task.op_id}`);
          resolve(task);
        }, waitMs);
    })
    .catch((e) => { reject(e); } )
  })
}

const debug = function(msg) {
  //prints debug messages
  if(false) { console.log(msg)}
}

//
module.exports = {
  run
}
