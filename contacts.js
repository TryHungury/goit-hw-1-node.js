const path = require("path");

const contactsPath = path.join("db","contacts.json");

module.exports = { contactsPath, listContacts, getContactById, removeContact, addContact };
// console.log(contactsPath)

const fs = require("fs").promises;
/**
 * Асинхронно зчитує дані з файлу за шляхом, зазначеним у глобальній змінній `contactsPath`,
 * @returns {void};
 * @param {null};
 */
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');

    // console.log(data);
    console.table(JSON.parse(data))

  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns {void}
 * @param {number} contactId; 
 */
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');

    const parseData = JSON.parse(data)

    // console.log(parseData.filter((user)=> user.id === contactId.toString()));
    console.table(parseData.filter((user)=> user.id === contactId.toString()))

  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns {void}
 * @param {number} contactId 
 */
async function removeContact(contactId) {
    try {
    const data = await fs.readFile(contactsPath, 'utf8');

    const parseData = JSON.parse(data)

    const readyParseData = parseData.filter((user)=> user.id !== contactId.toString())

    await fs.writeFile(contactsPath, JSON.stringify(readyParseData), "utf8", (err) =>{
      try {
        return;
      } catch (error) {
        console.error(err)
      }
    })

    // console.log(parseData.filter((user)=> user.id !== contactId.toString()));
    console.table(readyParseData)

    } catch (error) {
        console.error(error)
    }
}

/**
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 */
async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const parseData = JSON.parse(data)
        
        const maxId = Math.max(...parseData.map(user => user.id));

        const newContact = {
            id: `${Number(maxId) + 1}`,
            name,
            email,
            phone: phone,
        }

        parseData.push(newContact)

        // console.log(parseData)
        await fs.writeFile(contactsPath, JSON.stringify(parseData), "utf8", (err) =>{
        try {
          return;
        } catch (error) {
          console.error(err)
        }
        })  
        console.table(parseData)

    } catch (error) {
        
        console.error(error)
    }


}