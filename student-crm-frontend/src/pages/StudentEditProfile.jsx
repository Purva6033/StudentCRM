import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
    getStudentProfile,
    updateProfile
} from "../services/studentService";

function StudentEditProfile() {

    const email = localStorage.getItem("email");

    const [student, setStudent] = useState({

        phone: "",
        address: ""

    });

    useEffect(() => {

        getStudentProfile(email)

            .then((res) => {

                setStudent({

                    phone: res.data.phone,

                    address: res.data.address

                });

            })

            .catch(console.log);

    }, []);

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = () => {

        updateProfile({

            email,

            phone: student.phone,

            address: student.address

        })

            .then(() => {

                alert("Profile Updated Successfully");

            })

            .catch(() => {

                alert("Update Failed");

            });

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header">

                        <h4>Edit Profile</h4>

                    </div>

                    <div className="card-body">

                        <div className="mb-3">

                            <label className="form-label">

                                Phone

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="phone"

                                value={student.phone}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Address

                            </label>

                            <textarea

                                className="form-control"

                                rows="4"

                                name="address"

                                value={student.address}

                                onChange={handleChange}

                            />

                        </div>

                        <button

                            className="btn btn-success"

                            onClick={saveProfile}

                        >

                            Save Changes

                        </button>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default StudentEditProfile;