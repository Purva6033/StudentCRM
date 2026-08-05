import api from "../api/axios";

export const getActivityLogs = () => {

    return api.get("/activity/all");

};