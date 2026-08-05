import api from "../api/axios";

// Get All Courses
export const getAllCourses = () => {
    return api.get("/course/all");
};

// Save Course
export const addCourse = (course) => {
    return api.post("/course/save", course);
};

// Update Course
export const updateCourse = (id, course) => {
    return api.put(`/course/update/${id}`, course);
};

// Delete Course
export const deleteCourse = (id) => {
    return api.delete(`/course/delete/${id}`);
};

// Search Course
export const searchCourses = (keyword) => {
    return api.get(`/course/search?keyword=${keyword}`);
};