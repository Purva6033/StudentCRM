import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAllLeads } from "../services/leadService";
import { getAllCounselors } from "../services/userService";

function CallRecordForm({

    onSave,
    selectedCall,
    onCancel

}) {

    const [leads, setLeads] = useState([]);
    const [counselors, setCounselors] = useState([]);

    const [call, setCall] = useState({

        leadId: "",
        counselorId: "",
        callDate: "",
        callTime: "",
        callStatus: "ANSWERED",
        notes: "",
        nextFollowUpDate: ""

    });

    useEffect(() => {

        loadData();

    }, []);

    useEffect(() => {

        if (selectedCall) {

            setCall({

                leadId: selectedCall.lead?.leadId || "",
                counselorId: selectedCall.counselor?.userId || "",
                callDate: selectedCall.callDate,
                callTime: selectedCall.callTime,
                callStatus: selectedCall.callStatus,
                notes: selectedCall.notes,
                nextFollowUpDate: selectedCall.nextFollowUpDate

            });

        }

    }, [selectedCall]);

    const loadData = async () => {

        try {

            const leadResponse = await getAllLeads();
            setLeads(leadResponse.data);

            const counselorResponse = await getAllCounselors();
            setCounselors(counselorResponse.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setCall({

            ...call,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = () => {

        if (

            !call.leadId ||
            !call.counselorId ||
            !call.callDate ||
            !call.callTime

        ) {

            toast.warning("Please fill all required fields");
            return;

        }

        onSave(call);

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-primary text-white">

                <h5>

                    {selectedCall ? "Update Call Record" : "Add Call Record"}

                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Lead</label>

                        <select
                            className="form-select"
                            name="leadId"
                            value={call.leadId}
                            onChange={handleChange}
                        >

                            <option value="">

                                Select Lead

                            </option>

                            {

                                leads.map((lead) => (

                                    <option
                                        key={lead.leadId}
                                        value={lead.leadId}
                                    >

                                        {lead.studentName}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Counselor</label>

                        <select
                            className="form-select"
                            name="counselorId"
                            value={call.counselorId}
                            onChange={handleChange}
                        >

                            <option value="">

                                Select Counselor

                            </option>

                            {

                                counselors.map((c) => (

                                    <option
                                        key={c.userId}
                                        value={c.userId}
                                    >

                                        {c.fullName}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>Call Date</label>

                        <input
                            type="date"
                            className="form-control"
                            name="callDate"
                            value={call.callDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>Call Time</label>

                        <input
                            type="time"
                            className="form-control"
                            name="callTime"
                            value={call.callTime}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label>Status</label>

                        <select
                            className="form-select"
                            name="callStatus"
                            value={call.callStatus}
                            onChange={handleChange}
                        >

                            <option>ANSWERED</option>
                            <option>NO_ANSWER</option>
                            <option>BUSY</option>
                            <option>SWITCHED_OFF</option>
                            <option>INTERESTED</option>
                            <option>NOT_INTERESTED</option>
                            <option>CALL_BACK</option>

                        </select>

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Notes</label>

                        <textarea
                            className="form-control"
                            rows="3"
                            name="notes"
                            value={call.notes}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Next Follow-up Date</label>

                        <input
                            type="date"
                            className="form-control"
                            name="nextFollowUpDate"
                            value={call.nextFollowUpDate}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-success me-2"
                    onClick={handleSubmit}
                >

                    Save

                </button>

                <button
                    className="btn btn-secondary"
                    onClick={onCancel}
                >

                    Cancel

                </button>

            </div>

        </div>

    );

}

export default CallRecordForm;