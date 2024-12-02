// config/upload.js
const multer = require('multer');
const path = require('path');

// Set storage untuk multer
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/'); // Pastikan folder 'uploads' sudah ada
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filter file berdasarkan jenis
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File format must be JPEG or PNG'), false);
    }
};

// Konfigurasi multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB max size
    fileFilter: fileFilter
});

module.exports = upload;