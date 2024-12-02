// app/controllers/userController.js
const userService = require('../services/userservices');

async function createUser(req, res) {
    try {
        const { no_telepon, username, profile, status } = req.body;

        // Validasi input
        if (!no_telepon || !username) {
            return res.status(400).json({ message: 'Nomor telepon dan username diperlukan.' });
        }

        const userId = await userService.createUser({ no_telepon, username, profile, status });
        res.status(201).json({ id: userId, message: 'User created successfully.' });
    } catch (error) {
        console.error(error);
        if (error.message === 'Nomor telepon sudah terdaftar.') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

async function getUserById(req, res) {
    const userId = req.params.id;

    // Validasi untuk memastikan userId tidak undefined
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function getUserByPhoneNumber(req, res) {
    try {
        const { no_telepon } = req.body;
        if (!no_telepon) {
            return res.status(400).json({ message: 'Nomor telepon diperlukan.' });
        }
        const user = await userService.getUserByPhoneNumber(no_telepon);
        if (user) {
            res.json({ exists: true, userId: user.id });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = parseInt(req.params.id);
        await userService.deleteUser(userId);
        res.json({ message: `User with ID ${userId} deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const filter = req.query.filter || {};
        const user = await userService.getAllUsers(filter);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function checkPhone(req, res) {
    try {
        const { no_telepon } = req.body;
        if (!no_telepon) {
            return res.status(400).json({ message: 'Nomor telepon diperlukan.' });
        }

        const user = await userService.getUserByPhoneNumber(no_telepon);
        if (user) {
            res.json({ exists: true, userId: user.id_user });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getDefaultReceiverId(_req, res) {
    console.log('getDefaultReceiverId called');
    try {
        const defaultReceiverId = 16; // Ganti dengan logika yang sesuai
        res.json({ default_receiver_id: defaultReceiverId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// Ekspor fungsi
module.exports = { createUser, getUserById, getUserByPhoneNumber, deleteUser, getAllUsers, checkPhone, getDefaultReceiverId };