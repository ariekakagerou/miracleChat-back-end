const Status = require('../models/status');

// Service untuk mendapatkan semua status
const getAllStatuses = async() => {
    return await Status.getAll();
};

// Service untuk mendapatkan status berdasarkan ID
const getStatusById = async(id) => {
    return await Status.getById(id);
};

// Service untuk membuat status baru
const createStatus = async(statusData) => {
    console.log("Mencoba membuat status dengan data:", statusData);
    return await Status.create(statusData);
};

// Service untuk menghapus status
const deleteStatus = async(id) => {
    return await Status.delete(id);
};

// Service untuk mengupdate status
const updateStatus = async(id, statusData) => {
    return await Status.update(id, statusData);
};

module.exports = {
    getAllStatuses,
    getStatusById,
    createStatus,
    deleteStatus,
    updateStatus,
};