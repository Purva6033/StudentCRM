import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    loginUser,
    generateOtp,
    verifyOtp,
    resetPassword
} from "../services/authService";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    // ================= LOGIN =================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ================= FORGOT PASSWORD =================

    const [showForgotModal, setShowForgotModal] = useState(false);

    const [forgotEmail, setForgotEmail] = useState("");

    const [generatedOtp, setGeneratedOtp] = useState("");

    const [enteredOtp, setEnteredOtp] = useState("");

    const [otpVerified, setOtpVerified] = useState(false);

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    // ================= LOGIN =================

    const handleLogin = async () => {

        if (!email || !password) {

            toast.warning("Please enter Email and Password");

            return;

        }

        try {

            const response = await loginUser({

                email,
                password

            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === "ADMIN") {

                navigate("/dashboard");

            }

            else if (response.data.role === "COUNSELOR") {

                navigate("/counselor-dashboard");

            }

            else if (response.data.role === "STUDENT") {

                navigate("/student-dashboard");

            }

            else {

                toast.error("Invalid User Role");

            }

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

    };

    // ================= GENERATE OTP =================

    const handleGenerateOtp = async () => {

        if (!forgotEmail) {

            toast.warning("Please Enter Email");

            return;

        }

        try {

            const response = await generateOtp({

                email: forgotEmail

            });

            setGeneratedOtp(response.data);

            toast.success("OTP Generated Successfully");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Generate OTP"

            );

        }

    };

    // ================= VERIFY OTP =================

    const handleVerifyOtp = async () => {

        if (!enteredOtp) {

            toast.warning("Enter OTP");

            return;

        }

        try {

            const response = await verifyOtp({

                email: forgotEmail,

                otp: enteredOtp

            });

            toast.success(response.data);

            setOtpVerified(true);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Invalid OTP"

            );

        }

    };

    // ================= RESET PASSWORD =================

    const handleResetPassword = async () => {

        if (!otpVerified) {

            toast.warning("Verify OTP First");

            return;

        }

        if (!newPassword || !confirmPassword) {

            toast.warning("Enter New Password");

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const response = await resetPassword({

                email: forgotEmail,

                newPassword: newPassword

            });

            toast.success(response.data);

            setShowForgotModal(false);

            setForgotEmail("");

            setGeneratedOtp("");

            setEnteredOtp("");

            setOtpVerified(false);

            setNewPassword("");

            setConfirmPassword("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password Reset Failed"

            );

        }

    };
    return (

        <>
            <div className="login-page">

                <div className="card login-card">

                    <div className="text-center mb-4">

                        <FaUserGraduate className="login-icon" />

                        <h1 className="login-title">
                            Student CRM
                        </h1>

                        <p className="text-secondary">
                            Student Admission Management System
                        </p>

                    </div>

                    <hr />

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="mb-2">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <div className="text-end mb-3">

                        <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none"
                            onClick={() => setShowForgotModal(true)}
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <button
                        className="btn btn-primary login-btn"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <div className="text-center mt-4">

                        <small className="text-muted">
                            New User?
                        </small>

                        <br />

                        <Link
                            to="/register"
                            className="text-decoration-none fw-bold"
                        >
                            Register Here
                        </Link>

                    </div>

                </div>

            </div>

            {
                showForgotModal && (

                    <div
                        className="modal d-block"
                        style={{
                            background: "rgba(0,0,0,.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h4 className="modal-title">
                                        Forgot Password
                                    </h4>

                                    <button
                                        className="btn-close"
                                        onClick={() => {

                                            setShowForgotModal(false);

                                            setForgotEmail("");

                                            setGeneratedOtp("");

                                            setEnteredOtp("");

                                            setOtpVerified(false);

                                            setNewPassword("");

                                            setConfirmPassword("");

                                        }}
                                    />

                                </div>

                                <div className="modal-body">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control mb-3"
                                        value={forgotEmail}
                                        onChange={(e) =>
                                            setForgotEmail(e.target.value)
                                        }
                                    />

                                    <button
                                        className="btn btn-primary w-100 mb-3"
                                        onClick={handleGenerateOtp}
                                    >
                                        Generate OTP
                                    </button>

                                    {
                                        generatedOtp && (

                                            <div className="alert alert-success">

                                                <b>Generated OTP :</b> {generatedOtp}

                                            </div>

                                        )
                                    }

                                    <label>Enter OTP</label>

                                    <input
                                        className="form-control mb-3"
                                        value={enteredOtp}
                                        onChange={(e) =>
                                            setEnteredOtp(e.target.value)
                                        }
                                    />

                                    <button
                                        className="btn btn-warning w-100 mb-3"
                                        onClick={handleVerifyOtp}
                                    >
                                        Verify OTP
                                    </button>

                                    {
                                        otpVerified && (

                                            <>

                                                <label>New Password</label>

                                                <input
                                                    type="password"
                                                    className="form-control mb-3"
                                                    value={newPassword}
                                                    onChange={(e) =>
                                                        setNewPassword(e.target.value)
                                                    }
                                                />

                                                <label>Confirm Password</label>

                                                <input
                                                    type="password"
                                                    className="form-control mb-3"
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(e.target.value)
                                                    }
                                                />

                                                <button
                                                    className="btn btn-success w-100"
                                                    onClick={handleResetPassword}
                                                >
                                                    Reset Password
                                                </button>

                                            </>

                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

        </>

    );

}

export default Login;