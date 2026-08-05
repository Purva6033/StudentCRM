import api from "../api/axios";

export const loginUser = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

// Generate OTP
export const generateOtp = (data) =>
    api.post("/auth/generate-otp", data);

// Verify OTP
export const verifyOtp = (data) =>
    api.post("/auth/verify-otp", data);

// Reset Password
export const resetPassword = (data) =>
    api.post("/auth/reset-password", data);