const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagecontroller');

// GET semua pesan
router.get('/messages', messageController.getAllMessages);

// POST untuk membuat pesan baru
router.post('/messages', messageController.createMessage);

// DELETE pesan berdasarkan ID
router.delete('/messages/:id', messageController.deleteMessage);

// GET pesan berdasarkan ID
router.get('/messages/:id', messageController.getMessageById);

module.exports = router;