const mysql = require('mysql2/promise');
const dbConfig = require('../config/database'); // Sesuaikan dengan konfigurasi database Anda

const pool = mysql.createPool(dbConfig);

class Event {
    constructor(id, title, date, createdAt) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.createdAt = createdAt;
    }

    static async getAllEvents() {
        const [rows] = await pool.query('SELECT * FROM event');
        return rows.map(row => new Event(row.id, row.title, row.date, row.created_at));
    }

    static async createEvent(title, date) {
        const [result] = await pool.query('INSERT INTO event (title, date) VALUES (?, ?)', [title, date]);
        return new Event(result.insertId, title, date, new Date());
    }

    static async deleteEvent(id) {
        await pool.query('DELETE FROM event WHERE id = ?', [id]);
    }
}

module.exports = Event;