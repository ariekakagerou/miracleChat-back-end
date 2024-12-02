const communityServices = require('../services/communityservices');

// GET semua komunitas
exports.getAllCommunities = async(_req, res) => {
    try {
        const communities = await communityServices.getAllCommunities();
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST untuk membuat komunitas baru
exports.createCommunity = async(req, res) => {
    const communityData = req.body;
    try {
        const newCommunity = await communityServices.createCommunity(communityData);
        res.status(201).json(newCommunity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE komunitas berdasarkan ID
exports.deleteCommunity = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await communityServices.deleteCommunity(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Komunitas tidak ditemukan' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST untuk bergabung ke komunitas
exports.joinCommunity = async(req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Ambil userId dari body
    try {
        const newMember = await communityServices.joinCommunity(id, userId);
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE untuk keluar dari komunitas
exports.leaveCommunity = async(req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Ambil userId dari body
    try {
        const result = await communityServices.leaveCommunity(id, userId);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Anda tidak tergabung dalam komunitas ini' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};