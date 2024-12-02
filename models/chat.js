// app/models/chatModel.js
const pool = require('../config/database');

async function createChat(data) {
    const [result] = await pool.query(
        `INSERT INTO chat (user1_id, user2_id) VALUES (?, ?)`, [data.user1_id, data.user2_id]
    );
    return result.insertId;
}

async function getAllChats() {
    const [rows] = await pool.query(`SELECT * FROM chat`);
    return rows;
}

async function deleteChat(id) {
    await pool.query(`DELETE FROM chat WHERE id = ?`, [id]);
    return id;
}

module.exports = { createChat, getAllChats, deleteChat };