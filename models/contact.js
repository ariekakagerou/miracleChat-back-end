// app/models/contact.js
const pool = require('../config/database');

async function createContact(data) {
    // Cek apakah id_user ada di tabel pengguna
    const [userExists] = await pool.query('SELECT * FROM user WHERE id_user = ?', [data.id_user]);
    if (userExists.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    // Cek apakah kontak (no_telepon) ada di tabel pengguna
    const [contactExists] = await pool.query('SELECT * FROM user WHERE no_telepon = ?', [data.id_contact]);
    if (contactExists.length === 0) {
        throw new Error('Kontak tidak ditemukan');
    }

    const [result] = await pool.query(
        `INSERT INTO contacts (id_user, id_contact) VALUES (?, ?)`, [data.id_user, data.id_contact]
    );
    return result.insertId;
}

async function getContactById(id) {
    const [rows] = await pool.query(`SELECT * FROM contacts WHERE id = ?`, [id]);
    return rows[0];
}

async function deleteContact(id) {
    await pool.query(`DELETE FROM contacts WHERE id = ?`, [id]);
    return id;
}

async function getAllContacts(userId) {
    console.log('Fetching contacts for userId:', userId);
    const [rows] = await pool.query(`
        SELECT c.*, u.username, u.profile 
        FROM contacts c
        JOIN user u ON c.id_contact = u.no_telepon
        WHERE c.id_user = ?
        ORDER BY u.username ASC
    `, [userId]);

    console.log('Query result:', rows);
    if (rows.length === 0) {
        console.log('No contacts found for userId:', userId);
    }

    return rows;
}

module.exports = { createContact, getContactById, deleteContact, getAllContacts };