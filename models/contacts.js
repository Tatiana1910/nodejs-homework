const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  return searchedContact || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contactsList[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
