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
  } else if (text.startsWith("check")) {
    check(text);
  } else if (text.startsWith("uncheck")) {
    unCheck(text);
  } else {
    unknownCommand(text);
  }
}
var saveFile
if(process.argv[2]==null){
  saveFile="database.json"
  console.log(process.argv[2])
}
else{
  saveFile=process.argv[2]
}
const fs = require("fs");
var arrayList;
try {
  data = fs.readFileSync(saveFile);
  var objList = JSON.parse(data);
} catch (err) {
  console.log(err)
  // Here you get the error when the file was not found,
  // but you also get any other error
}

if (objList !== undefined) {
  arrayList = objList.taskList;
} else {
  objList = { taskList: [] };
  arrayList = objList.taskList;
}

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

remove      : Removes a task from task-list by its number
              syntex: remove /task-number/

edit        : Edits a task in task-list by its number
              syntex to edit the last task    : edit /new-task/
              syntex to edit a task by number : edit /task-number/ /new-task/

check       : Checks a task by number
              syntex: check /task-number/

uncheck       : unchecks a task by number
              syntex: uncheck /task-number/

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
    arrayList.push(task.replace("add ", "[ ]").trim());
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
 * checks tasks in task-list
 *
 * @returns {void}
 */
function check(taskNum) {
  if (taskNum === "check\n") {
    console.log(
      `the correct syntex for check is:
                                to check a specific task-number  : check /task-number/`
    );
  } else {
    let index = taskNum.split(" ")[1] - 1;
    !parseInt(index)
      ? console.log(
          `${taskNum.split(" ")[1].trim()} is not a valid task-number`
        )
      : arrayList[index] !== undefined
      ? (arrayList[index] = arrayList[index].replace(` `, "✓").trim())
      : console.log(`No task with number ${index + 1}`);
  }
}
/**
 * unchecks tasks in task-list
 *
 * @returns {void}
 */
function unCheck(taskNum) {
  if (taskNum === "uncheck\n") {
    console.log(
      `the correct syntex for uncheck is:
                                to uncheck a specific task-number  : uncheck /task-number/`
    );
  } else {
    let index = taskNum.split(" ")[1] - 1;
    !parseInt(index)
      ? console.log(
          `${taskNum.split(" ")[1].trim()} is not a valid task-number`
        )
      : arrayList[index] !== undefined
      ? (arrayList[index] = arrayList[index].replace(`✓`, " ").trim())
      : console.log(`No task with number ${index + 1}`);
  }
}
/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  const fs = require("fs");
  const data = JSON.stringify(objList);
  try {
    fs.writeFileSync(saveFile, data);
  } catch (e) {
    console.error(e);
  }
  console.log("Quitting now, goodbye!");
  process.exit();
}

// The following line starts the application
startApp("Tareq El-Ali");
