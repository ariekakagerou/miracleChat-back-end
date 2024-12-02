const express = require('express');
const router = express.Router();
const callController = require('../controllers/callcontroller');

// GET all calls
router.get('/calls', callController.getAllCalls);

// GET call by ID
router.get('/calls/:id', callController.getCallById);

// UPDATE a call by ID
router.put('/calls/:id', callController.updateCall);

// DELETE a call by ID
router.delete('/calls/:id', callController.deleteCall);

module.exports = router;