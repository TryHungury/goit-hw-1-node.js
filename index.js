const { contactsPath, listContacts, getContactById, removeContact, addContact } = require("./contacts")

const argv = require("yargs")
  .option("action", {
    describe: "Your action",
    type: "string",
    demandOption: true,
    choices: ["list", "get", "add", "remove"]
  })
  .option("name", {
    describe: "Your name",
    type: "string",
    demandOption: false
  })
    .option("id", {
    describe: "Your id",
    type: "number",
    demandOption: false
  })
    .option("phone", {
    describe: "Your phone",
    type: "string",
    demandOption: false
  })
    .option("email", {
    describe: "Your email",
    type: "string",
    demandOption: false
  })
  .argv;

// console.log(argv);

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      listContacts()
      //   console.log("list")
      break;

    case "get":
      // ... id
      getContactById(argv.id)
      //   console.log("get")
      break;

    case "add":
      // ... name email phone
      addContact(argv.name, argv.email, argv.phone)
      //   console.log("add")
      break;

    case "remove":
      // ... id
      removeContact(argv.id)
      //   console.log("remove")
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);


// console.log(contactsPath)


// npm start -- --action "remove"  --name "Alex" --email "rt@gmail.com" --phone 323324 --id 3 