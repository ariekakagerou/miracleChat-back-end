const db = require("../config/database");

// Model untuk komunitas
const Community = {
    create: async(communityData) => {
        const query = "INSERT INTO communities (name, description, created_at) VALUES (?, ?, ?)";
        const [result] = await db.query(query, [
            communityData.name,
            communityData.description,
            new Date(),
        ]);
        return { id: result.insertId, ...communityData };
    },

    getAll: async() => {
        const query = "SELECT * FROM communities";
        const [results] = await db.query(query);
        return results;
    },

    getById: async(id) => {
        const query = "SELECT * FROM communities WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result[0];
    },

    delete: async(id) => {
        const query = "DELETE FROM communities WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result;
    },
};

module.exports = Community;