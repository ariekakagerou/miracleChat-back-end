const Message = require('../models/message');
const User = require('../models/user');

// Service untuk memeriksa apakah pengguna ada
const checkUserExists = async(userId) => {
    const user = await User.getUserById(userId);
    return !!user;
};

// Service untuk mendapatkan semua pesan
const getAllMessages = async() => {
    return await Message.getAll();
};

// Service untuk membuat pesan baru
const createMessage = async(messageData) => {
    return await Message.create(messageData);
};

// Service untuk menghapus pesan
const deleteMessage = async(id) => {
    return await Message.delete(id);
};

// Service untuk mendapatkan pesan berdasarkan ID
const getMessageById = async(id) => {
    return await Message.getById(id);
};

module.exports = {
    getAllMessages,
    createMessage,
    deleteMessage,
    getMessageById,
    checkUserExists,
};