import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import AdmissionForm from "../components/AdmissionForm";

import {
    getAllAdmissions,
    deleteAdmission,
    searchAdmissions
} from "../services/admissionService";

function Admissions() {

    const [admissions, setAdmissions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedAdmission, setSelectedAdmission] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAdmissions();
    }, []);

    const loadAdmissions = async () => {

        try {

            const response = await getAllAdmissions();

            if (Array.isArray(response.data)) {
                setAdmissions(response.data);
            } else {
                setAdmissions([]);
            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this admission?"))
            return;

        try {

            await deleteAdmission(id);

            toast.info("Admission Deleted Successfully");

            loadAdmissions();

        } catch (error) {

            console.error(error);

            toast.info("Delete Failed");

        }

    };

    const handleSearch = async (value) => {

        setSearch(value);

        if (value.trim() === "") {

            loadAdmissions();

            return;

        }

        try {

            const response = await searchAdmissions(value);

            setAdmissions(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (admission) => {

        setSelectedAdmission(admission);

        setShowForm(true);

    };

    const handleCancel = () => {

        setSelectedAdmission(null);

        setShowForm(false);

        loadAdmissions();

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Admission Management</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            setSelectedAdmission(null);

                            setShowForm(true);

                        }}
                    >
                        + Add Admission
                    </button>

                </div>

                {showForm && (

                    <AdmissionForm
                        selectedAdmission={selectedAdmission}
                        onCancel={handleCancel}
                        reloadAdmissions={loadAdmissions}
                    />

                )}

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Status..."
                            value={search}
                            onChange={(e) =>
                                handleSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover shadow">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Lead</th>

                                <th>Course</th>

                                <th>Counselor</th>

                                <th>Date</th>

                                <th>Status</th>

                                <th width="220">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>{admissions.length > 0 ? (

                            admissions.map((admission) => (

                                <tr key={admission.admissionId}>

                                    <td>{admission.admissionId}</td>

                                    <td>
                                        {admission.lead
                                            ? admission.lead.studentName
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {admission.course
                                            ? admission.course.courseName
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {admission.counselor
                                            ? admission.counselor.fullName
                                            : "N/A"}
                                    </td>

                                    <td>{admission.admissionDate}</td>

                                    <td>

                                        <span
                                            className={`badge ${admission.status === "ADMITTED"
                                                ? "bg-success"
                                                : admission.status === "PENDING"
                                                    ? "bg-warning text-dark"
                                                    : "bg-danger"
                                                }`}
                                        >
                                            {admission.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(admission)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() =>
                                                handleDelete(admission.admissionId)
                                            }
                                        >
                                            Delete
                                        </button>

                                        {admission.status === "ADMITTED" && (

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    toast.info(
                                                        "Enroll Student feature will be connected next."
                                                    )
                                                }
                                            >
                                                Enroll Student
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center"
                                >
                                    No Admissions Found
                                </td>

                            </tr>

                        )}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default Admissions;