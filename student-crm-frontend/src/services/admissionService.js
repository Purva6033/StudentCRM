import api from "../api/axios";

// Get All Admissions
export const getAllAdmissions = () => {
    return api.get("/admission/all");
};

// Get Admission By Id
export const getAdmissionById = (id) => {
    return api.get(`/admission/${id}`);
};

// Save Admission
export const saveAdmission = (admission) => {
    return api.post("/admission/save", admission);
};

// Update Admission
export const updateAdmission = (id, admission) => {
    return api.put(`/admission/update/${id}`, admission);
};

// Delete Admission
export const deleteAdmission = (id) => {
    return api.delete(`/admission/delete/${id}`);
};

// Search Admissions
export const searchAdmissions = (keyword) => {
    return api.get(`/admission/search?keyword=${keyword}`);
};