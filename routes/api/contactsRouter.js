const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const {
  ContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsValidationSchemas");

const validateBody = require("../../decorators/validateBody");
const isValidId = require("../../decorators/isValidId");
const authenticate = require("../../decorators/authenticate");

const router = express.Router();

router.get("/", authenticate, contactsController.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(ContactSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(ContactSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsController.updateStatusContact
);
router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.removeContact
);

module.exports = {
  contactsRouter: router,
};
