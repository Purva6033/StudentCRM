import api from "../api/axios";

export const getCounselorDashboard = (email) => {
    return api.get(`/counselor/dashboard?email=${email}`);
};