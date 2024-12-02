const db = require("../config/database");

// Model untuk pesan
const Message = {
    create: async(messageData) => {
        const query = "INSERT INTO message (sender_id, receiver_id, content, is_read, timestamp) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.query(query, [
            messageData.sender_id,
            messageData.receiver_id,
            messageData.content,
            messageData.is_read || 0,
            new Date()
        ]);
        return { id: result.insertId, ...messageData, timestamp: new Date() };
    },

    getAll: async() => {
        const query = "SELECT * FROM message";
        const [results] = await db.query(query);
        return results;
    },

    getById: async(id) => {
        const query = "SELECT * FROM message WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result[0];
    },

    delete: async(id) => {
        const query = "DELETE FROM message WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result;
    },
};

module.exports = Message;