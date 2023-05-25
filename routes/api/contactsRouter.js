const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const {
  ContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsValidationSchemas");
const validateBody = require("../../decorators/validateBody");
const isValidId = require("../../decorators/isValidId");
const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", validateBody(ContactSchema), contactsController.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(ContactSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsController.updateStatusContact
);
router.delete("/:contactId", isValidId, contactsController.removeContact);

module.exports = {
  contactsRouter: router,
};
