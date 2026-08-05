import { useState, useEffect } from "react";

function CourseForm({ onSave, selectedCourse, onCancel }) {

    const emptyCourse = {
        courseName: "",
        duration: "",
        fees: "",
        description: ""
    };

    const [course, setCourse] = useState(emptyCourse);

    useEffect(() => {
        if (selectedCourse) {
            setCourse({
                courseName: selectedCourse.courseName,
                duration: selectedCourse.duration,
                fees: selectedCourse.fees,
                description: selectedCourse.description
            });
        } else {
            setCourse(emptyCourse);
        }
    }, [selectedCourse]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !course.courseName ||
            !course.duration ||
            !course.fees ||
            !course.description
        ) {
            alert("Please fill all fields");
            return;
        }

        onSave(course);
    };

    const handleReset = () => {
        if (selectedCourse) {
            setCourse({
                courseName: selectedCourse.courseName,
                duration: selectedCourse.duration,
                fees: selectedCourse.fees,
                description: selectedCourse.description
            });
        } else {
            setCourse(emptyCourse);
        }
    };

    return (

        <div className="card shadow p-4 mb-4">

            <h3>
                {selectedCourse ? "Update Course" : "Add Course"}
            </h3>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Course Name</label>

                    <input
                        type="text"
                        name="courseName"
                        className="form-control"
                        value={course.courseName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Duration</label>

                    <input
                        type="text"
                        name="duration"
                        className="form-control"
                        value={course.duration}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Fees</label>

                    <input
                        type="number"
                        name="fees"
                        className="form-control"
                        value={course.fees}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>

                    <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={course.description}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className={`btn ${selectedCourse ? "btn-warning" : "btn-success"
                        }`}
                    type="submit"
                >
                    {selectedCourse ? "Update" : "Save"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={handleReset}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </form>

        </div>

    );
}

export default CourseForm;