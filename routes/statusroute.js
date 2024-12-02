const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statuscontroller');
const upload = require('../config/upload'); // Import multer

// GET all statuses
router.get('/statuses', statusController.getAllStatuses);

// GET status by ID
router.get('/statuses/:id', statusController.getStatusById);

// POST a new status
router.post('/statuses', statusController.createStatus);

// DELETE a status by ID
router.delete('/statuses/:id', statusController.deleteStatus);

// PUT untuk mengupdate status
router.put('/statuses/:id', statusController.updateStatus);

// POST untuk mengupload gambar
router.post('/statuses/image', upload.single('image'), statusController.uploadImageStatus);

module.exports = router;