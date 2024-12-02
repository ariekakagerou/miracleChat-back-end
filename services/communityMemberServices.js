// services/communityMemberServices.js
const CommunityMember = require('../models/communityMember');

// Service untuk bergabung dengan komunitas
const joinCommunity = async(memberData) => {
    return await CommunityMember.joinCommunity(memberData);
};

// Service untuk mendapatkan anggota komunitas
const getMembersByCommunityId = async(communityId) => {
    return await CommunityMember.getMembersByCommunityId(communityId);
};

// Service untuk meninggalkan komunitas
const leaveCommunity = async(id) => {
    return await CommunityMember.leaveCommunity(id);
};

module.exports = {
    joinCommunity,
    getMembersByCommunityId,
    leaveCommunity,
};