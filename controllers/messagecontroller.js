const messageServices = require('../services/messagesservices');

// GET semua pesan
exports.getAllMessages = async(_req, res) => {
    try {
        const messages = await messageServices.getAllMessages();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST untuk membuat pesan baru
exports.createMessage = async(req, res) => {
    const messageData = req.body;

    console.log("Sender ID:", messageData.sender_id);
    console.log("Receiver ID:", messageData.receiver_id);
    console.log("Content:", messageData.content);

    // Tambahkan validasi sederhana
    if (!messageData.sender_id || !messageData.receiver_id || !messageData.content) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    // Validasi sender_id dan receiver_id
    try {
        const senderExists = await messageServices.checkUserExists(messageData.sender_id);
        const receiverExists = await messageServices.checkUserExists(messageData.receiver_id);

        if (!senderExists || !receiverExists) {
            return res.status(400).json({ error: 'Sender atau Receiver tidak valid' });
        }

        try {
            const newMessage = await messageServices.createMessage(messageData);
            res.status(201).json(newMessage);
        } catch (err) {
            console.error(err); // Tambahkan log kesalahan
            res.status(500).json({ error: err.message });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// DELETE pesan berdasarkan ID
exports.deleteMessage = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await messageServices.deleteMessage(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pesan tidak ditemukan' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET pesan berdasarkan ID
exports.getMessageById = async(req, res) => {
    const { id } = req.params;
    try {
        const message = await messageServices.getMessageById(id);
        if (!message) {
            return res.status(404).json({ message: 'Pesan tidak ditemukan' });
        }
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};