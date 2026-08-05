import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { changePassword } from "../services/userService";

function ChangePassword() {

    const email = localStorage.getItem("email");

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {

        changePassword({

            email: email,

            oldPassword: form.oldPassword,

            newPassword: form.newPassword,

            confirmPassword: form.confirmPassword

        })
            .then((res) => {

                alert(res.data);

                setForm({

                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""

                });

            })
            .catch((err) => {

                alert(

                    err.response?.data ||

                    "Password change failed"

                );

            });

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header">

                        <h3>Change Password</h3>

                    </div>

                    <div className="card-body">

                        <div className="mb-3">

                            <label>Old Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="oldPassword"
                                value={form.oldPassword}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>New Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            className="btn btn-success"
                            onClick={handleSubmit}
                        >
                            Change Password
                        </button>

                    </div>

                </div>

            </div>

        </MainLayout>

    );
}

export default ChangePassword;