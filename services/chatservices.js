// app/services/chatService.js
const { createChat, getAllChats: fetchAllChats, deleteChat: deleteChatFromModel } = require('../models/chat');

async function addChat(data) {
    return await createChat(data);
}

async function getAllChats() {
    return await fetchAllChats();
}

async function deleteChat(id) {
    return await deleteChatFromModel(id);
}

module.exports = { addChat, getAllChats, deleteChat };