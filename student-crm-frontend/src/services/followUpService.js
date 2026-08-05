import api from "../api/axios";

// Get All FollowUps
export const getAllFollowUps = () => {
    return api.get("/followup/all");
};

// Save FollowUp
export const addFollowUp = (followUp) => {
    return api.post("/followup/save", followUp);
};

// Update FollowUp
export const updateFollowUp = (id, followUp) => {
    return api.put(`/followup/update/${id}`, followUp);
};

// Delete FollowUp
export const deleteFollowUp = (id) => {
    return api.delete(`/followup/delete/${id}`);
};