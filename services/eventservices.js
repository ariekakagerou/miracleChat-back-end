const Event = require('../models/event');

const getAllEvents = async() => {
    return await Event.getAllEvents();
};

const createEvent = async(title, date) => {
    return await Event.createEvent(title, date);
};

const deleteEvent = async(id) => {
    await Event.deleteEvent(id);
};

module.exports = {
    getAllEvents,
    createEvent,
    deleteEvent,
};