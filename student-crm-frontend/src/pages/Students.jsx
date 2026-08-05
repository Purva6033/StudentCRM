import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StudentForm from "../components/StudentForm";

import {
    getAllStudents,
    saveStudent,
    updateStudent,
    deleteStudent
} from "../services/studentService";

function Students() {

    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {

            const response = await getAllStudents();

            if (Array.isArray(response.data)) {
                setStudents(response.data);
            } else if (Array.isArray(response.data.content)) {
                setStudents(response.data.content);
            } else {
                setStudents([]);
            }

        } catch (error) {
            console.error(error);
            setStudents([]);
        }
    };

    const handleSave = async (student) => {

        try {

            if (selectedStudent) {

                await updateStudent(selectedStudent.studentId, student);

                toast.info("Student Updated Successfully");

            } else {

                await saveStudent(student);

                toast.info("Student Added Successfully");

            }

            loadStudents();
            setShowForm(false);
            setSelectedStudent(null);

        } catch (error) {
            console.error(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Operation Failed"
            );
        }

    };

    const handleEdit = (student) => {

        setSelectedStudent(student);

        setShowForm(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await deleteStudent(id);

            toast.info("Student Deleted Successfully");

            loadStudents();

        } catch (error) {

            console.error(error);

            toast.info("Delete Failed");

        }

    };

    const handleCancel = () => {

        setSelectedStudent(null);

        setShowForm(false);

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Student Management</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            setSelectedStudent(null);

                            setShowForm(true);

                        }}
                    >
                        + Add Student
                    </button>

                </div>

                {showForm && (

                    <StudentForm
                        onSave={handleSave}
                        selectedStudent={selectedStudent}
                        onCancel={handleCancel}
                    />

                )}

                <div className="table-responsive">

                    <table className="table table-bordered table-hover shadow">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Course</th>
                                <th>Status</th>
                                <th width="170">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {students.length > 0 ? (

                                students.map((student) => (

                                    <tr key={student.studentId}>

                                        <td>{student.studentId}</td>
                                        <td>{student.studentCode}</td>
                                        <td>{student.studentName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.address}</td>

                                        <td>
                                            {student.course
                                                ? student.course.courseName
                                                : "N/A"}
                                        </td>


                                        <td>{student.status}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(student)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(student.studentId)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center"
                                    >
                                        No Students Found
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

export default Students;