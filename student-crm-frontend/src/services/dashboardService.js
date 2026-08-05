import api from "../api/axios";

export const getDashboardStats = async () => {
    return await api.get("/dashboard/stats");
};

export const getRecentAdmissions = async () => {
    return await api.get("/dashboard/recent-admissions");
};

export const getLeadStatusReport = () => {
    return api.get("/dashboard/lead-status");
};

export const getCourseReport = () => {
    return api.get("/dashboard/course-report");
};

export const getCounselorPerformance = () => {
    return api.get("/dashboard/counselor-performance");
};

export const getMonthlyAdmissions = () => {
    return api.get("/dashboard/monthly-admissions");
};

