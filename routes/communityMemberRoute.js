// routes/communityMemberRoute.js
const express = require('express');
const router = express.Router();
const communityMemberController = require('../controllers/communityMemberController');

// POST untuk bergabung dengan komunitas
router.post('/community-members', communityMemberController.joinCommunity);

// GET anggota komunitas berdasarkan ID komunitas
router.get('/communities/:id/members', communityMemberController.getMembersByCommunityId);

// DELETE anggota komunitas berdasarkan ID
router.delete('/community-members/:id', communityMemberController.leaveCommunity);

module.exports = router;