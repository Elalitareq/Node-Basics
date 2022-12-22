/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text.startsWith("hello")) {
    hello(text);
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    list();
  } else if (text.startsWith("add")) {
    addTask(text);
  } else if (text.startsWith("remove")) {
    remove(text);
  } else if (text.startsWith("edit")) {
    edit(text);
  } else {
    unknownCommand(text);
  }
}

let arrayList = [];

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(anything) {
  console.log(`${anything.trim()}!`);
}

/**
 * return commands the user can use
 *
 * @returns {void}
 */
function help() {
  console.log(
    `hello /text/: Returns hello /text/!
              syntex: hello /text/

help        : Reutrns commands user can use
              syntex: help

list        : Lists the tasks in task-list
              syntex: list

add         : Adds a task to task-list
              syntex: add /task/

remove      : Removes a take from tast-list by its number
              syntex: remove /task-number/
              
exit or quit: Quits the application
              syntex: quit
                      exit
`
  );
}

/**
 * lists the items in the list according to number
 *
 * @returns {void}
 */
function list() {
  arrayList.map((element, index) => {
    console.log(`${index + 1}-${element}`);
  });
}
/**
 * adds items to the list
 *
 * @returns {void}
 */
function addTask(task) {
  if (task === "add\n") {
    console.log(
      `the correct syntex for add is:
                                add /task/`
    );
  } else {
    arrayList.push(task.replace("add ", "").trim());
  }
}
/**
 * removes a task from task-list
 *
 * @returns {void}
 */
function remove(taskNum) {
  if (taskNum === "remove\n") {
    console.log(
      `the correct syntex for remove is:
                                  remove /task-number/`
    );
  } else {
    let index = taskNum.replace("remove ", "").trim() - 1;
    arrayList[index] !== undefined
      ? arrayList.splice(index, 1)
      : console.log(`No task with number ${index + 1}`);
  }
}
/**
 * edits tasks in task-list
 *
 * @returns {void}
 */
function edit(taskNum) {
  if (taskNum === "edit\n") {
    console.log(
      `the correct syntex for edit is:
                                to edit a specific task-number  : edit /task-number/ /new tast/
                                to edit the last task           : edit /new task/`
    );
  } else {
    let index = taskNum.split(" ")[1] - 1;
    !parseInt(index)
      ? (arrayList[arrayList.length - 1] = taskNum.replace("edit ", "").trim())
      : arrayList[index] !== undefined
      ? (arrayList[index] = taskNum.replace(`edit ${index + 1}`, "").trim())
      : console.log(`No task with number ${index + 1}`);
  }
}
/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

// The following line starts the application
startApp("Tareq El-Ali");
