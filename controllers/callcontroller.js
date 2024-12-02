const callServices = require('../services/callservices');

// GET all calls
exports.getAllCalls = async(_req, res) => {
    try {
        const calls = await callServices.getAllCalls();
        console.log(calls);
        res.status(200).json(calls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// GET call by ID
exports.getCallById = async(req, res) => {
    const { id } = req.params;
    try {
        const call = await callServices.getCallById(id);
        if (!call) return res.status(404).json({ message: 'Call not found' });
        res.status(200).json(call);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a call by ID
exports.updateCall = async(req, res) => {
    const { id } = req.params;
    const callData = req.body;
    try {
        const result = await callServices.updateCall(id, callData);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Call not found' });
        res.status(200).json({ message: 'Call updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a call by ID
exports.deleteCall = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await callServices.deleteCall(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Call not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};