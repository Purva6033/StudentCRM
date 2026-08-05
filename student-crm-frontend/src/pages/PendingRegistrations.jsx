import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import {
    getPendingStudents,
    approveStudent,
    rejectStudent
} from "../services/userService";

function PendingRegistrations() {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        loadPendingStudents();
    }, []);

    const loadPendingStudents = async () => {

        try {

            const response = await getPendingStudents();

            setStudents(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load pending registrations");

        }

    };

    const handleApprove = async (id) => {

        if (!window.confirm("Approve this student?"))
            return;

        try {

            const response = await approveStudent(id);

            toast.success(response.data);

            loadPendingStudents();

        } catch (error) {

            console.log(error);

            toast.error("Approval Failed");

        }

    };

    const handleReject = async (id) => {

        if (!window.confirm("Reject this student?"))
            return;

        try {

            const response = await rejectStudent(id);

            toast.success(response.data);

            loadPendingStudents();

        } catch (error) {

            console.log(error);

            toast.error("Reject Failed");

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Pending Student Registrations</h2>

                    <button
                        className="btn btn-secondary"
                        onClick={loadPendingStudents}
                    >
                        Refresh
                    </button>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Username</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Status</th>

                            <th>Details</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            students.length > 0 ?

                                students.map(student => (

                                    <tr key={student.userId}>

                                        <td>{student.userId}</td>

                                        <td>{student.username}</td>

                                        <td>{student.fullName}</td>

                                        <td>{student.email}</td>

                                        <td>{student.phone}</td>

                                        <td>

                                            <span className="badge bg-warning">

                                                {student.approvalStatus}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-info btn-sm"
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                View Details
                                            </button>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleApprove(student.userId)}
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleReject(student.userId)}
                                            >
                                                Reject
                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center"
                                    >

                                        No Pending Registrations

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>
                {

                    selectedStudent && (

                        <div
                            className="modal d-block"
                            style={{
                                background: "rgba(0,0,0,.5)"
                            }}
                        >

                            <div className="modal-dialog modal-lg">

                                <div className="modal-content">

                                    <div className="modal-header">

                                        <h4>

                                            Student Details

                                        </h4>

                                        <button
                                            className="btn-close"
                                            onClick={() => setSelectedStudent(null)}
                                        ></button>

                                    </div>

                                    <div className="modal-body">

                                        <div className="row">

                                            <div className="col-md-6">

                                                <p><b>Username :</b> {selectedStudent.username}</p>

                                                <p><b>Name :</b> {selectedStudent.fullName}</p>

                                                <p><b>Email :</b> {selectedStudent.email}</p>

                                                <p><b>Phone :</b> {selectedStudent.phone}</p>

                                                <p><b>Status :</b> {selectedStudent.approvalStatus}</p>

                                            </div>

                                            <div className="col-md-6">

                                                <p><b>Role :</b> {selectedStudent.role}</p>

                                                <p><b>Active :</b> {selectedStudent.isActive ? "Yes" : "No"}</p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="modal-footer">

                                        <button
                                            className="btn btn-success"
                                            onClick={() => {

                                                handleApprove(selectedStudent.userId);

                                                setSelectedStudent(null);

                                            }}
                                        >

                                            Approve

                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {

                                                handleReject(selectedStudent.userId);

                                                setSelectedStudent(null);

                                            }}
                                        >

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </MainLayout>

    );

}

export default PendingRegistrations;