// app/routes/contactRoutes.js
const express = require('express');
const contactController = require('../controllers/contactcontroller');
const router = express.Router();

// Endpoint POST untuk membuat kontak
router.post('/contacts', contactController.addContact);

// Endpoint GET untuk mengambil kontak berdasarkan ID
router.get('/contacts/:id', contactController.getContactById);

// Endpoint DELETE untuk menghapus kontak
router.delete('/contacts/:id', contactController.deleteContact);

// Endpoint GET untuk mengambil semua kontak berdasarkan id_user
router.get('/contacts/', contactController.getAllContacts);

module.exports = router;