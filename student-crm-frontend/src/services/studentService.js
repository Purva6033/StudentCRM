import api from "../api/axios";

export const getStudentProfile = (email) => {
    return api.get(`/student/profile?email=${email}`);
};

export const updateProfile = (data) => {
    return api.put("/student/profile/update", data);
};

export const getAllStudents = () => {
    return api.get("/student/all");
};

export const saveStudent = (student) => {
    return api.post("/student/save", student);
};

export const updateStudent = (id, student) => {
    return api.put(`/student/update/${id}`, student);
};

export const deleteStudent = (id) => {
    return api.delete(`/student/delete/${id}`);
};

export const searchStudents = (keyword) => {
    return api.get(`/student/search?keyword=${keyword}`);
};