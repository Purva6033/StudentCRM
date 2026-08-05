import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import CallRecordForm from "../components/CallRecordForm";

import {
    getAllCalls,
    addCall,
    updateCall,
    deleteCall,
    searchCalls
} from "../services/callRecordService";

function CallRecords() {

    const [calls, setCalls] = useState([]);
    const [selectedCall, setSelectedCall] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCalls();
    }, []);

    const loadCalls = async () => {

        try {

            const response = await getAllCalls();
            setCalls(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSave = async (call) => {

        try {

            if (selectedCall) {

                await updateCall(selectedCall.callId, call);

                toast.success("Call Record Updated Successfully");

            }

            else {

                await addCall(call);

                toast.success("Call Record Added Successfully");

            }

            setSelectedCall(null);
            setShowForm(false);

            loadCalls();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleEdit = (call) => {

        setSelectedCall(call);

        setShowForm(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Call Record?"))
            return;

        try {

            await deleteCall(id);

            toast.success("Deleted Successfully");

            loadCalls();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadCalls();

            return;

        }

        try {

            const response = await searchCalls(keyword);

            setCalls(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Call Records</h2>

                    <button
                        className="btn btn-success"
                        onClick={() => {

                            setSelectedCall(null);

                            setShowForm(true);

                        }}
                    >

                        Add Call

                    </button>

                </div>

                {

                    showForm && (

                        <CallRecordForm

                            onSave={handleSave}

                            selectedCall={selectedCall}

                            onCancel={() => {

                                setShowForm(false);

                                setSelectedCall(null);

                            }}

                        />

                    )

                }

                <div className="row mb-3">

                    <div className="col-md-8">

                        <input

                            className="form-control"

                            placeholder="Search Status..."

                            value={keyword}

                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }

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
                            onClick={loadCalls}
                        >

                            Reset

                        </button>

                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Lead</th>
                            <th>Counselor</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Next Follow-up</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            calls.length > 0 ?

                                calls.map(call => (

                                    <tr key={call.callId}>

                                        <td>{call.callId}</td>

                                        <td>{call.lead?.studentName}</td>

                                        <td>{call.counselor?.fullName}</td>

                                        <td>{call.callDate}</td>

                                        <td>{call.callTime}</td>

                                        <td>{call.callStatus}</td>

                                        <td>{call.nextFollowUpDate}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    handleEdit(call)
                                                }
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(call.callId)
                                                }
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >

                                        No Call Records Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}

export default CallRecords;