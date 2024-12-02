const statusServices = require('../services/statusservices');

// Fungsi untuk mendapatkan semua status
exports.getAllStatuses = async(_req, res) => {
    try {
        const statuses = await statusServices.getAllStatuses();
        res.status(200).json(statuses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fungsi untuk mendapatkan status berdasarkan ID
exports.getStatusById = async(req, res) => {
    const { id } = req.params;
    try {
        const status = await statusServices.getStatusById(id);
        if (!status) return res.status(404).json({ message: 'Status not found' });
        res.status(200).json(status);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fungsi untuk membuat status baru
exports.createStatus = async(req, res) => {
    const statusData = req.body;
    console.log("Data yang diterima untuk membuat status:", statusData);
    if (!statusData.user_id || !statusData.content) {
        return res.status(400).json({ error: 'user_id dan content harus diisi' });
    }

    try {
        const newStatus = await statusServices.createStatus(statusData);
        res.status(201).json(newStatus);
    } catch (err) {
        console.error("Error saat membuat status:", err);
        res.status(500).json({ error: err.message });
    }
};

// Fungsi untuk menghapus status berdasarkan ID
exports.deleteStatus = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await statusServices.deleteStatus(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Status not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fungsi untuk memperbarui status
exports.updateStatus = async(req, res) => {
    const { id } = req.params;
    const statusData = req.body;
    try {
        const result = await statusServices.updateStatus(id, statusData);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Status not found' });
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fungsi untuk mengunggah gambar status
exports.uploadImageStatus = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Gambar harus diunggah' });
    }

    // Lanjutkan dengan logika penyimpanan atau proses lainnya
    res.status(200).json({ message: 'Gambar diunggah', file: req.file });
};