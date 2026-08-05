import api from "../api/axios";

// Get All Leads
export const getAllLeads = () => {
    return api.get("/lead/all");
};

// Add Lead
export const addLead = (lead) => {
    return api.post("/lead/save", lead);
};

// Update Lead
export const updateLead = (id, lead) => {
    return api.put(`/lead/update/${id}`, lead);
};

// Delete Lead
export const deleteLead = (id) => {
    return api.delete(`/lead/delete/${id}`);
};

// Search Lead
export const searchLeads = (keyword) => {
    return api.get(`/lead/search?keyword=${keyword}`);
};

// Import Excel
export const importExcel = (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post("/lead/import", formData, {

        headers: {

            "Content-Type": "multipart/form-data"

        }

    });

};