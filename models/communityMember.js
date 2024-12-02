const db = require("../config/database");

// Model untuk anggota komunitas
const CommunityMember = {
    joinCommunity: async(communityId, userId) => {
        const query = "INSERT INTO community_members (community_id, user_id, joined_at) VALUES (?, ?, ?)";
        const [result] = await db.query(query, [communityId, userId, new Date()]);
        return { id: result.insertId, community_id: communityId, user_id: userId };
    },

    getMembersByCommunityId: async(communityId) => {
        const query = "SELECT * FROM community_members WHERE community_id = ?";
        const [results] = await db.query(query, [communityId]);
        return results;
    },

    leaveCommunity: async(communityId, userId) => {
        const query = "DELETE FROM community_members WHERE community_id = ? AND user_id = ?";
        const [result] = await db.query(query, [communityId, userId]);
        return result;
    },
};

module.exports = CommunityMember;