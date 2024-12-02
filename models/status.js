const db = require("../config/database");

// Model untuk status
const Status = {
    create: async(statusData) => {
        console.log("Data yang akan dimasukkan:", statusData);
        const query =
            "INSERT INTO status (user_id, content, image_url, created_at) VALUES (?, ?, ?, ?)";
        const [result] = await db.query(query, [
            statusData.user_id,
            statusData.content,
            statusData.image_url,
            new Date(),
        ]);
        console.log("Hasil query:", result);
        if (result.affectedRows === 0) {
            console.error("Gagal memasukkan data ke database");
        }
        return { id: result.insertId, ...statusData };
    },

    getAll: async() => {
        const query = `
            SELECT s.*, u.username, u.profile 
            FROM status s 
            JOIN user u ON s.user_id = u.id_user
        `;
        const [results] = await db.query(query);
        return results;
    },

    getById: async(id) => {
        const query = "SELECT * FROM status WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result[0];
    },

    delete: async(id) => {
        const query = "DELETE FROM status WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result;
    },

    update: async(id, statusData) => {
        const query = "UPDATE status SET content = ?, image_url = ? WHERE id = ?";
        const [result] = await db.query(query, [statusData.content, statusData.image_url, id]);
        return result;
    },
};

module.exports = Status;