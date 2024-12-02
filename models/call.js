const db = require("../config/database");

// Model untuk panggilan
const Call = {
    getAll: async() => {
        const query = `
            SELECT c.*, u1.username AS caller_name, u2.username AS receiver_name 
            FROM calls c 
            JOIN user u1 ON c.caller_id = u1.id_user 
            JOIN user u2 ON c.receiver_id = u2.id_user`;
        const [results] = await db.query(query);
        return results;
    },

    getById: async(id) => {
        const query = "SELECT * FROM calls WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result[0];
    },

    update: async(id, callData) => {
        const query =
            "UPDATE calls SET caller_id = ?, receiver_id = ?, call_time = ?, duration = ?, call_type = ? WHERE id = ?";
        const [result] = await db.query(query, [
            callData.caller_id,
            callData.receiver_id,
            callData.call_time,
            callData.duration,
            callData.call_type,
            id,
        ]);
        return result;
    },

    delete: async(id) => {
        const query = "DELETE FROM calls WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result;
    },
};

module.exports = Call;