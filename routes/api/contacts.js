const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContact);

router.post("/", contactsController.addNewContact);

router.put("/:contactId", contactsController.updateContact);

router.delete("/:contactId", contactsController.deleteContact);

module.exports = router;
