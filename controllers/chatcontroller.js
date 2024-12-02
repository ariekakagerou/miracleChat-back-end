// app/controllers/chatController.js
const chatService = require('../services/chatservices');

async function getAll(req, res) {
    try {
        const filter = req.query.filter || {};
        const chats = await chatService.getAllChats(filter);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createChat(req, res) {
    try {
        const chatId = await chatService.addChat(req.body);
        res.status(201).json({ id: chatId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteChat(req, res) {
    try {
        const chatId = parseInt(req.params.id);
        const deletedId = await chatService.deleteChat(chatId);
        res.json({ message: `Chat with ID ${deletedId} deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAll, createChat, deleteChat };