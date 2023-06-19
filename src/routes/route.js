const express = require('express');
const router = express.Router();

const { createContact } = require('../controllers/contactController');
const { createAdmin, getContactDetails } = require('../controllers/adminController');





router.post("/createContact", createContact)

router.post("/createAdmin",createAdmin  )

router.post("/getContacts", getContactDetails)

module.exports = router
