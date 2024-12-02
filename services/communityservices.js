const Community = require('../models/community');
const CommunityMember = require('../models/communityMember');

// Service untuk mendapatkan semua komunitas
const getAllCommunities = async() => {
    return await Community.getAll();
};

// Service untuk membuat komunitas baru
const createCommunity = async(communityData) => {
    return await Community.create(communityData);
};

// Service untuk menghapus komunitas
const deleteCommunity = async(id) => {
    return await Community.delete(id);
};

// Service untuk bergabung ke komunitas
const joinCommunity = async(communityId, userId) => {
    return await CommunityMember.joinCommunity(communityId, userId);
};

// Service untuk keluar dari komunitas
const leaveCommunity = async(communityId, userId) => {
    return await CommunityMember.leaveCommunity(communityId, userId);
};

module.exports = {
    getAllCommunities,
    createCommunity,
    deleteCommunity,
    joinCommunity,
    leaveCommunity,
};