import api from "../api/axios";

// Get All Calls
export const getAllCalls = () => {
    return api.get("/call/all");
};

// Add Call
export const addCall = (call) => {
    return api.post("/call/save", call);
};

// Update Call
export const updateCall = (id, call) => {
    return api.put(`/call/update/${id}`, call);
};

// Delete Call
export const deleteCall = (id) => {
    return api.delete(`/call/delete/${id}`);
};

// Search Call
export const searchCalls = (keyword) => {
    return api.get(`/call/search?keyword=${keyword}`);
};