import { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseService";

function StudentForm({
    onSave,
    selectedStudent,
    selectedAdmission,
    onCancel
}) {

    const [courses, setCourses] = useState([]);

    const emptyStudent = {
        studentName: "",
        email: "",
        phone: "",
        address: "",
        status: "ACTIVE",
        courseId: "",
        admissionId: ""
    };

    const [student, setStudent] = useState(emptyStudent);

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {

        if (selectedStudent) {

            setStudent({
                studentName: selectedStudent.studentName,
                email: selectedStudent.email,
                phone: selectedStudent.phone,
                address: selectedStudent.address,
                status: selectedStudent.status || "ACTIVE",
                courseId: selectedStudent.course?.courseId || "",
                admissionId: selectedStudent.admission?.admissionId || ""
            });

        } else if (selectedAdmission) {

            setStudent({
                studentName: selectedAdmission.lead?.studentName || "",
                email: "",
                phone: "",
                address: "",
                status: "ACTIVE",
                courseId: selectedAdmission.course?.courseId || "",
                admissionId: selectedAdmission.admissionId
            });

        } else {

            setStudent(emptyStudent);

        }

    }, [selectedStudent, selectedAdmission]);

    const loadCourses = async () => {

        try {

            const response = await getAllCourses();

            if (Array.isArray(response.data)) {
                setCourses(response.data);
            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudent(prev => ({
            ...prev,
            [name]:
                name === "courseId"
                    ? (value === "" ? "" : parseInt(value))
                    : value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !student.studentName ||
            !student.email ||
            !student.phone ||
            !student.address ||
            student.courseId === ""
        ) {

            alert("Please fill all fields");
            return;

        }

        onSave(student);

    };

    const handleReset = () => {

        if (selectedStudent) {

            setStudent({
                studentName: selectedStudent.studentName,
                email: selectedStudent.email,
                phone: selectedStudent.phone,
                address: selectedStudent.address,
                status: selectedStudent.status || "ACTIVE",
                courseId: selectedStudent.course?.courseId || "",
                admissionId: selectedStudent.admission?.admissionId || ""
            });

        } else {

            setStudent(emptyStudent);

        }

    };

    return (

        <div className="card shadow p-4 mb-4">

            <h3 className="mb-4">
                {selectedStudent ? "Update Student" : "Add Student"}
            </h3>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Student Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="studentName"
                            value={student.studentName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>

                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={student.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Address</label>

                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={student.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">Status</label>

                        <select
                            className="form-select"
                            name="status"
                            value={student.status}
                            onChange={handleChange}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">Course</label>

                        <select
                            className="form-select"
                            name="courseId"
                            value={student.courseId}
                            onChange={handleChange}
                        >

                            <option value="">Select Course</option>

                            {courses.map(course => (

                                <option
                                    key={course.courseId}
                                    value={course.courseId}
                                >
                                    {course.courseName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="mt-3 d-flex gap-2">

                        <button
                            type="submit"
                            className={`btn ${selectedStudent ? "btn-warning" : "btn-success"}`}
                        >
                            {selectedStudent ? "Update Student" : "Save Student"}
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

                </div>

            </form>

        </div>

    );

}

export default StudentForm;