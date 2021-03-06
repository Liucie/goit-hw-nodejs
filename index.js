const chalk = require('chalk')
const { Command } = require('commander');
const {listContacts, 
    getContactById,
    removeContact,
    addContact} = require('./contacts.js')

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
  
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break

    case 'get':
      const contactById = await getContactById(id)
      if(contactById){
          console.log(chalk. blue('Contact is found'))
          console.log(contactById)
          return
      }
          console.log(chalk.magenta('Contact is not found'))
      break

    case 'add':
      const result = await addContact(name, email, phone)
      console.log(chalk.blue('New contact is added'))
      console.log (result)
      break;

    case 'remove':
      const removedContact = await removeContact(id)
      console.log(chalk.yellowBright('Contact is removed'))
      console.table(removedContact)
      break;

    default:
      console.warn(chalk.redBright('Unknown action type!'));
  }
}

invokeAction(argv).then(()=>console.log(chalk.cyanBright('Operation success')))