// app/services/contactservices.js
const pool = require('../config/database'); // Import koneksi database

/**
 * Menambahkan kontak baru
 * @param {Object} data - Objek yang berisi id_user dan id_contact
 * @returns {number} ID kontak yang baru ditambahkan
 */
exports.createContact = async({ id_user, id_contact }) => {
    // Cek apakah id_user ada di tabel pengguna
    const [userExists] = await pool.query('SELECT * FROM user WHERE id_user = ?', [id_user]);
    if (userExists.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    console.log('User ditemukan:', userExists[0]); // Log user yang ditemukan

    // Cek apakah kontak (no_telepon) ada di tabel pengguna
    const [contactExists] = await pool.query('SELECT * FROM user WHERE no_telepon = ?', [id_contact]);
    if (contactExists.length === 0) {
        throw new Error('Kontak tidak ditemukan');
    }

    const contactId = contactExists[0].id_user; // Ambil ID pengguna dari hasil query
    console.log('Kontak ditemukan:', contactExists[0]); // Log kontak yang ditemukan

    // Cek apakah kontak sudah ada untuk id_user ini
    const [existingContact] = await pool.query(
        'SELECT * FROM contacts WHERE id_user = ? AND id_contact = ?', [id_user, contactId]
    );
    if (existingContact.length > 0) {
        throw new Error('Kontak sudah ada');
    }

    // Tambahkan kontak ke tabel contacts
    const [result] = await pool.query(
        'INSERT INTO contacts (id_user, id_contact) VALUES (?, ?)', [id_user, contactId]
    );
    console.log('Kontak berhasil ditambahkan dengan ID:', result.insertId); // Log ID yang baru ditambahkan
    return result.insertId;
};

/**
 * Mengambil kontak berdasarkan ID kontak
 * @param {number} id - ID kontak
 * @returns {Object} Objek kontak yang ditemukan atau null jika tidak ada
 */
exports.getContactById = async(id) => {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    console.log('Hasil query getContactById:', rows); // Log hasil query
    return rows[0];
};

/**
 * Menghapus kontak berdasarkan ID kontak
 * @param {number} id - ID kontak
 * @returns {number} ID kontak yang dihapus
 */
exports.deleteContact = async(id) => {
    const [deleteResult] = await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    if (deleteResult.affectedRows === 0) {
        throw new Error('Kontak tidak ditemukan');
    }
    console.log('Kontak berhasil dihapus dengan ID:', id); // Log kontak yang dihapus
    return id;
};

/**
 * Mengambil semua kontak berdasarkan id_user
 * @param {number} id_user - ID pengguna
 * @returns {Array} Array kontak yang berisi informasi username dan no_telepon
 */
exports.getAllContacts = async() => {
    console.log('Fetching all contacts');
    const [rows] = await pool.query(`
        SELECT c.*, u.username, u.profile, u.no_telepon 
        FROM contacts c
        JOIN user u ON c.id_contact = u.id_user
    `); // Ambil semua kontak dengan informasi pengguna
    console.log('Hasil query getAllContacts:', rows); // Log hasil query
    return rows;
};