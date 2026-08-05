import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getStudentProfile } from "../services/studentService";


function StudentDashboard() {

    const email = localStorage.getItem("email");

    const [student, setStudent] = useState({
        studentName: "",
        studentCode: "",
        course: "",
        admissionDate: "",
        status: "",
        counselor: "",
        phone: "",
        address: ""
    });

    useEffect(() => {

        getStudentProfile(email)
            .then((res) => {
                setStudent(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (

        <MainLayout>

            <div className="container">

                <h2 className="mb-4">My Dashboard</h2>

                <div className="card shadow">

                    <div className="card-header">

                        <h5>My Profile</h5>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered">

                            <tbody>

                                <tr>
                                    <th>Name</th>
                                    <td>{student.studentName}</td>
                                </tr>

                                <tr>
                                    <th>Student Code</th>
                                    <td>{student.studentCode}</td>
                                </tr>

                                <tr>
                                    <th>Email</th>
                                    <td>{email}</td>
                                </tr>

                                <tr>
                                    <th>Phone</th>
                                    <td>{student.phone}</td>
                                </tr>

                                <tr>
                                    <th>Address</th>
                                    <td>{student.address}</td>
                                </tr>

                                <tr>
                                    <th>Course</th>
                                    <td>{student.course}</td>
                                </tr>

                                <tr>
                                    <th>Admission Date</th>
                                    <td>{student.admissionDate}</td>
                                </tr>

                                <tr>
                                    <th>Status</th>
                                    <td>{student.status}</td>
                                </tr>

                                <tr>
                                    <th>Counselor</th>
                                    <td>{student.counselor}</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default StudentDashboard;