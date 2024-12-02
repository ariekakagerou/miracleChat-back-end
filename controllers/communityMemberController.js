// controllers/communityMemberController.js
const communityMemberServices = require('../services/communityMemberServices');

// POST untuk bergabung dengan komunitas
exports.joinCommunity = async(req, res) => {
    const memberData = req.body;
    try {
        const newMember = await communityMemberServices.joinCommunity(memberData);
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET anggota komunitas berdasarkan ID komunitas
exports.getMembersByCommunityId = async(req, res) => {
    const { id } = req.params;
    try {
        const members = await communityMemberServices.getMembersByCommunityId(id);
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE anggota komunitas berdasarkan ID
exports.leaveCommunity = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await communityMemberServices.leaveCommunity(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Anggota komunitas tidak ditemukan' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};