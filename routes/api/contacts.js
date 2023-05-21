const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const {
  ContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchemas");
const validateContact = require("../../decorators/validateContact");
const isValidId = require("../../decorators/isValidId");
const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", validateContact(ContactSchema), contactsController.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateContact(ContactSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateContact(updateFavoriteSchema),
  contactsController.updateStatusContact
);
router.delete("/:contactId", isValidId, contactsController.removeContact);

module.exports = router;
