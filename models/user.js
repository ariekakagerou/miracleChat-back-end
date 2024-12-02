// app/models/userModel.js
const pool = require('../config/database');

async function createUser(data) {
    // Validasi input
    if (!data.no_telepon || !data.username) {
        throw new Error('Nomor telepon dan username diperlukan.');
    }

    // Cek apakah nomor telepon sudah ada
    const existingUser = await getUserByPhoneNumber(data.no_telepon);
    if (existingUser) {
        throw new Error('Nomor telepon sudah terdaftar.');
    }

    const [result] = await pool.query(
        `INSERT INTO user (username, profile, no_telepon, status) VALUES (?, ?, ?, ?)`, [data.username, data.profile, data.no_telepon, data.status]
    );
    return result.insertId;
}

const getUserById = async(userId) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM user WHERE id_user = ?`, [userId]);
        return rows[0]; // Mengembalikan pengguna jika ditemukan
    } catch (error) {
        throw new Error(error.message); // Menangani kesalahan
    }
};

const getUserByIdController = async(req, res) => {
    const userId = req.params.id; // Ambil userId dari parameter
    try {
        const user = await getUserById(userId); // Panggil fungsi getUserById
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

async function getUserByPhoneNumber(phone_number) {
    const [rows] = await pool.query(`SELECT * FROM user WHERE no_telepon = ?`, [phone_number]);
    return rows[0];
}

async function deleteUser(id) {
    await pool.query(`DELETE FROM user WHERE id_user = ?`, [id]);
    return id;
}

async function getAllUsers() {
    const [rows] = await pool.query(`SELECT * FROM user`);
    return rows;
}

async function getUserByPhone(no_telepon) {
    const [rows] = await pool.query(`SELECT * FROM user WHERE no_telepon = ?`, [no_telepon]);
    return rows[0];
}

async function checkPhone(phone_number) {
    const [rows] = await pool.query(`SELECT * FROM user WHERE no_telepon = ?`, [phone_number]);
    return rows.length > 0; // Mengembalikan true jika nomor telepon ada
}

// Ekspor fungsi yang diperlukan
module.exports = {
    createUser,
    getUserById,
    getUserByIdController,
    getUserByPhoneNumber,
    deleteUser,
    getAllUsers,
    getUserByPhone,
    checkPhone
};