// app/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

// Endpoint GET untuk mengambil semua chat
router.get('/chats', ChatController.getAll);

// Endpoint POST untuk membuat chat baru
router.post('/chats', ChatController.createChat);

// Endpoint DELETE untuk menghapus chat
router.delete('/chats/:id', ChatController.deleteChat);

module.exports = router;