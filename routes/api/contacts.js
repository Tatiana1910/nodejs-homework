const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const { ContactSchema } = require("../../schemas/contactsSchemas");
const validateContact = require("../../decorators/validateContact");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validateContact(ContactSchema), contactsController.addContact);

router.put(
  "/:contactId",
  validateContact(ContactSchema),
  contactsController.updateContact
);

router.delete("/:contactId", contactsController.removeContact);

module.exports = router;
