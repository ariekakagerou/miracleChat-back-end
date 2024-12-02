const eventService = require('../services/eventService');

const getEvents = async(req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
};

const addEvent = async(req, res) => {
    const { title, date } = req.body;
    try {
        const newEvent = await eventService.createEvent(title, date);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error adding event' });
    }
};

const removeEvent = async(req, res) => {
    const { id } = req.params;
    try {
        await eventService.deleteEvent(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event' });
    }
};

module.exports = {
    getEvents,
    addEvent,
    removeEvent,
};