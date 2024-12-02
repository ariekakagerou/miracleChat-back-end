// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventcontroller');

router.get('/', eventController.getEvents);
router.post('/', eventController.addEvent);
router.delete('/:id', eventController.removeEvent);

module.exports = router;