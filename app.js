const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();
const port = 3000;

// Gunakan CORS
app.use(cors());

// Middleware
app.use(express.json());

// Log setiap permintaan
app.use((req, _res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next(); // Pastikan untuk memanggil next()
});

// Mengimpor semua rute
const userRoutes = require('./routes/userRoutes');
const callRoutes = require('./routes/callroute');
const chatRoutes = require('./routes/chatroute');
const statusRoutes = require('./routes/statusroute');
const contactRoutes = require('./routes/contactroute');
const messageRoutes = require('./routes/messageroute');
const communityRoutes = require('./routes/communityroute');
const communityMemberRoutes = require('./routes/communityMemberRoute');

// Menggunakan rute dengan prefiks
app.use('/api', userRoutes);
app.use('/api', callRoutes);
app.use('/api', chatRoutes);
app.use('/api', statusRoutes);
app.use('/api', contactRoutes);
app.use('/api', messageRoutes);
app.use('/api', communityRoutes);
app.use('/api', communityMemberRoutes);
app.use('/api', eventRoutes);
// Menangani permintaan yang tidak ditemukan
app.use((_req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Menangani kesalahan
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Menangani koneksi WebSocket
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        // Broadcast pesan ke semua klien
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Menjalankan server
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log('Aplikasi siap menerima permintaan!');
});