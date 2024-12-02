const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communitycontroller');

// GET semua komunitas
router.get('/communities', communityController.getAllCommunities);

// POST untuk membuat komunitas baru
router.post('/communities', communityController.createCommunity);

// DELETE komunitas berdasarkan ID
router.delete('/communities/:id', communityController.deleteCommunity);

// POST untuk bergabung ke komunitas
router.post('/communities/:id/join', communityController.joinCommunity);

// DELETE untuk keluar dari komunitas
router.delete('/communities/:id/leave', communityController.leaveCommunity);

module.exports = router;