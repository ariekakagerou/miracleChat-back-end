const Call = require('../models/call');

// Service untuk mendapatkan semua panggilan
const getAllCalls = async() => {
    return await Call.getAll();
};

// Service untuk mendapatkan panggilan berdasarkan ID
const getCallById = async(id) => {
    return await Call.getById(id);
};

// Service untuk memperbarui panggilan
const updateCall = async(id, callData) => {
    return await Call.update(id, callData);
};

// Service untuk menghapus panggilan
const deleteCall = async(id) => {
    return await Call.delete(id);
};

module.exports = {
    getAllCalls,
    getCallById,
    updateCall,
    deleteCall,
};