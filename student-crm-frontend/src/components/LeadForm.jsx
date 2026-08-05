import { useEffect, useState } from "react";
import { getCounselors } from "../services/counselorService";

function LeadForm({ onSave, selectedLead, onCancel }) {

    const [lead, setLead] = useState({
        studentName: "",
        email: "",
        phone: "",
        courseInterested: "",
        source: "",
        status: "",
        counselorId: ""
    });

    const [counselors, setCounselors] = useState([]);

    useEffect(() => {

        loadCounselors();

        if (selectedLead) {

            setLead({
                studentName: selectedLead.studentName || "",
                email: selectedLead.email || "",
                phone: selectedLead.phone || "",
                courseInterested: selectedLead.courseInterested || "",
                source: selectedLead.source || "",
                status: selectedLead.status || "",
                counselorId: selectedLead.counselor?.userId || ""
            });

        } else {

            setLead({
                studentName: "",
                email: "",
                phone: "",
                courseInterested: "",
                source: "",
                status: "",
                counselorId: ""
            });

        }

    }, [selectedLead]);

    const loadCounselors = async () => {

        try {

            const response = await getCounselors();
            setCounselors(response.data);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Lead already exists."
            );

        }

    };

    const handleChange = (e) => {

        setLead({
            ...lead,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        try {
            onSave(lead);
        } catch (error) {
            alert(error.response?.data?.message || "Unable to save lead");
        }

    };

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>
                    {selectedLead ? "Update Lead" : "Add Lead"}
                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Student Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="studentName"
                            value={lead.studentName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={lead.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Phone
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={lead.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Course Interested
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="courseInterested"
                            value={lead.courseInterested}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Source
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="source"
                            value={lead.source}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Status
                        </label>

                        <select
                            className="form-select"
                            name="status"
                            value={lead.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>

                            <option value="NEW_ENQUIRY">
                                New Enquiry
                            </option>

                            <option value="CONTACTED">
                                Contacted
                            </option>

                            <option value="INTERESTED">
                                Interested
                            </option>

                            <option value="DEMO_SCHEDULED">
                                Demo Scheduled
                            </option>

                            <option value="FOLLOW_UP">
                                Follow Up
                            </option>

                            <option value="ADMISSION_CONFIRMED">
                                Admission Confirmed
                            </option>

                            <option value="FEES_PAID">
                                Fees Paid
                            </option>

                            <option value="STUDENT_ENROLLED">
                                Student Enrolled
                            </option>

                            <option value="NOT_INTERESTED">
                                Not Interested
                            </option>
                        </select>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Assign Counselor
                        </label>

                        <select
                            className="form-select"
                            name="counselorId"
                            value={lead.counselorId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Counselor
                            </option>

                            {counselors.map((counselor) => (

                                <option
                                    key={counselor.userId}
                                    value={counselor.userId}
                                >
                                    {counselor.fullName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        {selectedLead ? "Update" : "Save"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>

    );

}

export default LeadForm;