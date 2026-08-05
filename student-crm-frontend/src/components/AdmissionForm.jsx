import { useEffect, useState } from "react";

import {
    saveAdmission,
    updateAdmission
} from "../services/admissionService";

import { getAllLeads } from "../services/leadService";
import { getAllCourses } from "../services/courseService";
import { getAllUsers } from "../services/userService";

function AdmissionForm({
    selectedAdmission,
    reloadAdmissions,
    onCancel
}) {

    const [leads, setLeads] = useState([]);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);

    const emptyAdmission = {
        leadId: "",
        courseId: "",
        counselorId: "",
        admissionDate: "",
        status: "PENDING"
    };

    const [admission, setAdmission] =
        useState(emptyAdmission);

    useEffect(() => {

        loadLeads();
        loadCourses();
        loadUsers();

    }, []);

    useEffect(() => {

        if (selectedAdmission) {

            setAdmission({

                leadId:
                    selectedAdmission.lead?.leadId || "",

                courseId:
                    selectedAdmission.course?.courseId || "",

                counselorId:
                    selectedAdmission.counselor?.userId || "",

                admissionDate:
                    selectedAdmission.admissionDate,

                status:
                    selectedAdmission.status

            });

        } else {

            setAdmission(emptyAdmission);

        }

    }, [selectedAdmission]);

    const loadLeads = async () => {

        try {

            const response =
                await getAllLeads();

            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadCourses = async () => {

        try {

            const response =
                await getAllCourses();

            setCourses(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadUsers = async () => {

        try {

            const response =
                await getAllUsers();

            setUsers(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAdmission(prev => ({

            ...prev,

            [name]:
                name === "leadId" ||
                    name === "courseId" ||
                    name === "counselorId"

                    ? (value === "" ? "" : parseInt(value))

                    : value

        }));

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            admission.leadId === "" ||
            admission.courseId === "" ||
            admission.counselorId === "" ||
            admission.admissionDate === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        try {

            if (selectedAdmission) {

                await updateAdmission(
                    selectedAdmission.admissionId,
                    admission
                );

                alert("Admission Updated Successfully");

            } else {

                await saveAdmission(admission);

                alert("Admission Added Successfully");

            }

            reloadAdmissions();

            setAdmission(emptyAdmission);

            onCancel();

        } catch (error) {

            console.error(error);

            alert("Operation Failed");

        }

    };

    const handleReset = () => {

        if (selectedAdmission) {

            setAdmission({

                leadId:
                    selectedAdmission.lead?.leadId || "",

                courseId:
                    selectedAdmission.course?.courseId || "",

                counselorId:
                    selectedAdmission.counselor?.userId || "",

                admissionDate:
                    selectedAdmission.admissionDate,

                status:
                    selectedAdmission.status

            });

        } else {

            setAdmission(emptyAdmission);

        }

    };

    return (

        <div className="card shadow p-4 mb-4">

            <h3 className="mb-4">

                {selectedAdmission
                    ? "Update Admission"
                    : "Add Admission"}

            </h3>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Lead
                        </label>

                        <select
                            className="form-select"
                            name="leadId"
                            value={admission.leadId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Lead
                            </option>

                            {leads.map((lead) => (

                                <option
                                    key={lead.leadId}
                                    value={lead.leadId}
                                >
                                    {lead.studentName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Course
                        </label>

                        <select
                            className="form-select"
                            name="courseId"
                            value={admission.courseId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Course
                            </option>

                            {courses.map((course) => (

                                <option
                                    key={course.courseId}
                                    value={course.courseId}
                                >
                                    {course.courseName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Counselor
                        </label>

                        <select
                            className="form-select"
                            name="counselorId"
                            value={admission.counselorId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Counselor
                            </option>

                            {users.map((user) => (

                                <option
                                    key={user.userId}
                                    value={user.userId}
                                >
                                    {user.fullName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Admission Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="admissionDate"
                            value={admission.admissionDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Status
                        </label>

                        <select
                            className="form-select"
                            name="status"
                            value={admission.status}
                            onChange={handleChange}
                        >

                            <option value="PENDING">
                                PENDING
                            </option>

                            <option value="ADMITTED">
                                ADMITTED
                            </option>

                            <option value="REJECTED">
                                REJECTED
                            </option>

                        </select>

                    </div>

                </div>

                <div className="mt-3 d-flex gap-2">

                    <button
                        type="submit"
                        className={`btn ${selectedAdmission
                                ? "btn-warning"
                                : "btn-success"
                            }`}
                    >
                        {selectedAdmission
                            ? "Update Admission"
                            : "Save Admission"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}

export default AdmissionForm;