import { useEffect, useState } from "react";
import CourseForm from "../components/CourseForm";
import {
    getAllCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    searchCourses
} from "../services/courseService";
import MainLayout from "../layouts/MainLayout";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {

        try {

            const response = await getAllCourses();
            setCourses(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSave = async (course) => {

        try {

            if (selectedCourse) {

                await updateCourse(selectedCourse.courseId, course);
                toast.info("Course Updated Successfully");

            } else {

                await addCourse(course);
                toast.info("Course Added Successfully");

            }

            setSelectedCourse(null);
            setShowForm(false);
            loadCourses();

        } catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (course) => {

        setSelectedCourse(course);
        setShowForm(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this course?"))
            return;

        try {

            await deleteCourse(id);
            toast.info("Course Deleted Successfully");
            loadCourses();

        } catch (error) {

            console.error(error);

        }

    };

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadCourses();
            return;

        }

        try {

            const response = await searchCourses(keyword);
            setCourses(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleCancel = () => {

        setShowForm(false);
        setSelectedCourse(null);

    };

    return (
        <MainLayout>
            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Course Management</h2>

                    <button
                        className="btn btn-success"
                        onClick={() => {
                            setSelectedCourse(null);
                            setShowForm(true);
                        }}
                    >
                        Add Course
                    </button>

                </div>

                {showForm && (

                    <CourseForm
                        onSave={handleSave}
                        selectedCourse={selectedCourse}
                        onCancel={handleCancel}
                    />

                )}

                <div className="row mb-3">

                    <div className="col-md-8">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Course..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <button
                            className="btn btn-primary me-2"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={loadCourses}
                        >
                            Reset
                        </button>

                    </div>

                </div>
                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Duration</th>
                            <th>Fees</th>
                            <th>Description</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {courses.length > 0 ? (

                            courses.map((course) => (

                                <tr key={course.courseId}>

                                    <td>{course.courseId}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.duration}</td>
                                    <td>₹ {course.fees}</td>
                                    <td>{course.description}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(course)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(course.courseId)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center text-danger"
                                >
                                    No Courses Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>
        </MainLayout>

    );

}

export default Courses;