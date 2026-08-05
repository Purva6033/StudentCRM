import { useEffect, useState } from "react";
import { getAllLeads } from "../services/leadService";

function FollowUpForm({ onSave, selectedFollowUp, onCancel }) {

    const [leads, setLeads] = useState([]);

    const [followUp, setFollowUp] = useState({
        leadId: "",
        remarks: "",
        followUpDate: "",
        nextFollowUpDate: "",
        status: ""
    });

    useEffect(() => {
        loadLeads();
    }, []);

    useEffect(() => {

        if (selectedFollowUp) {

            setFollowUp({
                leadId: selectedFollowUp.lead?.leadId || "",
                remarks: selectedFollowUp.remarks || "",
                followUpDate: selectedFollowUp.followUpDate || "",
                nextFollowUpDate: selectedFollowUp.nextFollowUpDate || "",
                status: selectedFollowUp.status || ""
            });

        }

    }, [selectedFollowUp]);

    const loadLeads = async () => {

        try {

            const response = await getAllLeads();
            setLeads(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFollowUp({
            ...followUp,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        onSave(followUp);

    };

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>

                    {selectedFollowUp ? "Update FollowUp" : "Add FollowUp"}

                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Lead
                        </label>

                        <select
                            className="form-select"
                            name="leadId"
                            value={followUp.leadId}
                            onChange={handleChange}
                            required
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

                    <div className="mb-3">

                        <label className="form-label">

                            Remarks

                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            name="remarks"
                            value={followUp.remarks}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="row">

                        <div className="col-md-6">

                            <label className="form-label">

                                FollowUp Date

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="followUpDate"
                                value={followUp.followUpDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">

                                Next FollowUp Date

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="nextFollowUpDate"
                                value={followUp.nextFollowUpDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="mt-3">

                        <label className="form-label">

                            Status

                        </label>

                        <select
                            className="form-select"
                            name="status"
                            value={followUp.status}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Rescheduled">
                                Rescheduled
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>

                    <div className="mt-4">

                        <button
                            className="btn btn-success me-2"
                            type="submit"
                        >
                            {selectedFollowUp ? "Update" : "Save"}
                        </button>

                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default FollowUpForm;