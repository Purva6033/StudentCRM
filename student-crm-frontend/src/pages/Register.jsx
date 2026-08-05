import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../api/axios";
import { register } from "../services/authService";

import "../styles/login.css";

function Register() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const [form, setForm] = useState({

        username: "",
        fullName: "",
        email: "",
        phone: "",

        dateOfBirth: "",
        gender: "",

        address: "",
        city: "",
        state: "",
        pinCode: "",

        qualification: "",
        passingYear: "",
        percentage: "",

        preferredCourse: "",
        mode: "",

        password: "",
        confirmPassword: ""

    });

    useEffect(() => {

        loadCourses();

    }, []);

    const loadCourses = async () => {

        try {

            const response = await api.get("/course/all");

            setCourses(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load courses");

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleRegister = async () => {

        if (

            !form.fullName ||
            !form.username ||
            !form.email ||
            !form.phone ||
            !form.password ||
            !form.confirmPassword

        ) {

            toast.warning("Please fill all mandatory fields");

            return;

        }

        if (form.password !== form.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            await register({

                username: form.username,
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,

                dateOfBirth: form.dateOfBirth,
                gender: form.gender,

                address: form.address,
                city: form.city,
                state: form.state,
                pinCode: form.pinCode,

                qualification: form.qualification,
                passingYear: Number(form.passingYear),
                percentage: Number(form.percentage),

                preferredCourse: form.preferredCourse,
                mode: form.mode,

                password: form.password

            });

            toast.success("Registration Successful!");

            localStorage.clear();

            setTimeout(() => {

                navigate("/");

            }, 1200);

        }

        catch (error) {

            if (error.response) {

                toast.error(error.response.data.message);

            }

            else {

                toast.error("Registration Failed");

            }

        }

    };
    return (

        <div className="login-page">

            <div
                className="card login-card"
                style={{
                    maxWidth: "900px",
                    width: "100%",
                    padding: "25px"
                }}
            >

                <div className="text-center mb-3">

                    <FaUserGraduate
                        className="login-icon"
                        style={{ fontSize: "45px" }}
                    />

                    <h2 className="login-title">

                        Student Registration

                    </h2>

                    <p className="text-muted">

                        Student Admission Management System

                    </p>

                </div>

                <hr />

                {/* Personal Information */}

                <h6 className="text-primary mb-2">

                    Personal Information

                </h6>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Full Name *</label>

                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Username *</label>

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Email *</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Phone *</label>

                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Date of Birth</label>

                        <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Gender</label>

                        <select
                            className="form-select"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                        >

                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>

                        </select>

                    </div>

                </div>

                {/* Address */}

                <h5 className="text-success mt-2 mb-3">

                    Address Information

                </h5>

                <div className="row">

                    <div className="col-12 mb-3">

                        <label>Address</label>

                        <textarea
                            className="form-control"
                            rows="2"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>City</label>

                        <input
                            className="form-control"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>State</label>

                        <input
                            className="form-control"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>PIN Code</label>

                        <input
                            className="form-control"
                            name="pinCode"
                            value={form.pinCode}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Academic */}

                <h5 className="text-warning mt-2 mb-3">

                    Academic Information

                </h5>

                <div className="row">

                    <div className="col-md-4 mb-3">

                        <label>Qualification</label>

                        <input
                            className="form-control"
                            name="qualification"
                            value={form.qualification}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>Passing Year</label>

                        <input
                            type="number"
                            className="form-control"
                            name="passingYear"
                            value={form.passingYear}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>Percentage / CGPA</label>

                        <input
                            type="number"
                            className="form-control"
                            name="percentage"
                            value={form.percentage}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Course */}

                <h5 className="text-info mt-2 mb-3">

                    Course Information

                </h5>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Preferred Course</label>

                        <select
                            className="form-select"
                            name="preferredCourse"
                            value={form.preferredCourse}
                            onChange={handleChange}
                        >

                            <option value="">

                                Select Course

                            </option>

                            {

                                courses.map(course => (

                                    <option
                                        key={course.courseId}
                                        value={course.courseName}
                                    >

                                        {course.courseName}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Mode</label>

                        <select
                            className="form-select"
                            name="mode"
                            value={form.mode}
                            onChange={handleChange}
                        >

                            <option value="">Select</option>

                            <option>Online</option>

                            <option>Offline</option>

                            <option>Hybrid</option>

                        </select>

                    </div>

                </div>

                {/* Password */}

                <h5 className="text-danger mt-2 mb-3">

                    Account Details

                </h5>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Password *</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Confirm Password *</label>

                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handleRegister}
                >

                    Register

                </button>

                <div className="text-center mt-3">

                    Already have an account?

                    <br />

                    <Link
                        to="/"
                        className="fw-bold text-decoration-none"
                    >

                        Login Here

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;