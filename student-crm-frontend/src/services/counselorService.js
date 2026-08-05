import api from "../api/axios";

export const getCounselors = () => {
    return api.get("/users/counselors");
};