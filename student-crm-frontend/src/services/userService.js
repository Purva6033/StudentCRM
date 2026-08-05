import api from "../api/axios";

// ================= USERS =================

// Get All Users
export const getAllUsers = () => {
    return api.get("/users/all");
};

// Get All Counselors
export const getAllCounselors = () => {
    return api.get("/users/counselors");
};

// Change Password
export const changePassword = (data) => {
    return api.put("/users/change-password", data);
};

// ================= PENDING REGISTRATIONS =================

// Get Pending Students
export const getPendingStudents = () => {
    return api.get("/auth/pending");
};

// Approve Student
export const approveStudent = (id) => {
    return api.put(`/auth/approve/${id}`);
};

// Reject Student
export const rejectStudent = (id) => {
    return api.put(`/auth/reject/${id}`);
};