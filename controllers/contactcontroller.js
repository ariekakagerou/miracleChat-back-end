const pool = require('../config/database'); // Impor koneksi database
const contactService = require('../services/contactservices'); // Ganti dengan service

exports.addContact = async(req, res) => {
    const { id_user, id_contact } = req.body;

    try {
        // Validasi input
        if (!id_user || !id_contact) {
            return res.status(400).json({ message: 'ID pengguna dan ID kontak diperlukan.' });
        }

        // Menambahkan kontak baru
        const newContactId = await contactService.createContact({ id_user, id_contact });
        res.status(201).json({ message: 'Kontak berhasil ditambahkan', contactId: newContactId });
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ message: 'Error adding contact', error: error.message });
    }
};

exports.getContactById = async(req, res) => {
    const { id } = req.params;
    try {
        const contact = await contactService.getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Kontak tidak ditemukan.' });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ message: 'Error fetching contact', error: error.message });
    }
};

exports.deleteContact = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedId = await contactService.deleteContact(id);
        res.status(200).json({ message: 'Kontak berhasil dihapus', id: deletedId });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
};

exports.getAllContacts = async(req, res) => {
    try {
        const contacts = await contactService.getAllContacts(); // Ambil semua kontak
        console.log('Contacts found:', contacts); // Log hasil query
        if (contacts.length === 0) {
            return res.status(404).json({ message: 'Tidak ada kontak ditemukan.' });
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
};