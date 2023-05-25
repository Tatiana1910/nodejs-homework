const { HttpError } = require("../utils/HttpError");
const { Contact } = require("../models/contact");

const listContacts = async (page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const filter = {};
  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }

  const contacts = await Contact.find(filter, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit);
  return contacts;
};

const getContactById = async (contactId) => {
  const searchedContact = await Contact.findById(contactId);

  if (!searchedContact) {
    throw new HttpError(404, "Not found");
  }
  return searchedContact || null;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const editedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404, "Not found");
  }
  return editedContact;
};

const updateStatusContact = async (contactId, body) => {
  const editedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404, "Not found");
  }
  return editedContact;
};

const removeContact = async (contactId) => {
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw new HttpError(404, "Not found");
  }
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
