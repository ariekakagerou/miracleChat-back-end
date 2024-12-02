// app/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/usercontroller');
const router = express.Router();

// Endpoint untuk mengambil semua pengguna
router.get('/users', userController.getAllUsers);

// Endpoint untuk membuat pengguna
router.post('/users', userController.createUser);

// Endpoint untuk mengambil pengguna berdasarkan ID
router.get('/users/:id', userController.getUserById);

// Endpoint untuk memeriksa nomor telepon
router.post('/check-phone', userController.checkPhone);

// Endpoint untuk menghapus pengguna
router.delete('/users/:id', userController.deleteUser);

// Rute untuk registrasi pengguna
router.post('/register', userController.createUser);

// Tambahkan endpoint untuk mendapatkan ID penerima default
router.get('/users/default_receiver_id', userController.getDefaultReceiverId);

module.exports = router;