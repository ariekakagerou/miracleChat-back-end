// app/services/userServices.js
const User = require('../models/user'); // Pastikan model User diimpor dengan benar

async function createUser({ no_telepon, username, profile, status }) {
    // Cek apakah nomor telepon sudah ada
    const existingUser = await User.getUserByPhoneNumber(no_telepon);
    if (existingUser) {
        throw new Error('Nomor telepon sudah terdaftar.');
    }

    const newUser = {
        no_telepon,
        username,
        profile,
        status
    };

    const userId = await User.createUser(newUser); // Panggil fungsi createUser dari model
    return userId; // Kembalikan ID pengguna yang baru dibuat
}

async function getUserById(userId) {
    return await User.getUserById(userId);
}

async function getUserByPhoneNumber(no_telepon) {
    return await User.getUserByPhoneNumber(no_telepon);
}

async function deleteUser(userId) {
    await User.deleteUser(userId);
}

async function getAllUsers() {
    return await User.getAllUsers(); // Panggil fungsi getAllUsers dari model
}

async function getUserByPhone(no_telepon) {
    return await User.getUserByPhone(no_telepon); // Pastikan fungsi ini ada di model
}

// Ekspor fungsi
module.exports = { createUser, getUserById, getUserByPhoneNumber, deleteUser, getAllUsers, getUserByPhone };