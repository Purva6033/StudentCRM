import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FollowUpForm from "../components/FollowUpForm";
import {
    getAllFollowUps,
    addFollowUp,
    updateFollowUp,
    deleteFollowUp
} from "../services/followUpService";

function FollowUps() {

    const [followUps, setFollowUps] = useState([]);
    const [selectedFollowUp, setSelectedFollowUp] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadFollowUps();
    }, []);

    const loadFollowUps = async () => {

        try {

            const response = await getAllFollowUps();
            setFollowUps(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSave = async (followUp) => {

        try {

            if (selectedFollowUp) {

                await updateFollowUp(
                    selectedFollowUp.followUpId,
                    followUp
                );

                toast.info("FollowUp Updated Successfully");

            } else {

                await addFollowUp(followUp);

                toast.info("FollowUp Added Successfully");

            }

            setSelectedFollowUp(null);
            setShowForm(false);

            loadFollowUps();

        } catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (followUp) => {

        setSelectedFollowUp(followUp);
        setShowForm(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this FollowUp?"))
            return;

        try {

            await deleteFollowUp(id);

            toast.info("FollowUp Deleted Successfully");

            loadFollowUps();

        } catch (error) {

            console.error(error);

        }

    };

    const handleCancel = () => {

        setSelectedFollowUp(null);
        setShowForm(false);

    };

    return (
        <MainLayout>
            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>FollowUp Management</h2>

                    <button
                        className="btn btn-success"
                        onClick={() => {

                            setSelectedFollowUp(null);
                            setShowForm(true);

                        }}
                    >
                        Add FollowUp
                    </button>

                </div>

                {showForm && (

                    <FollowUpForm
                        onSave={handleSave}
                        selectedFollowUp={selectedFollowUp}
                        onCancel={handleCancel}
                    />

                )}

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Lead</th>
                            <th>Remarks</th>
                            <th>FollowUp Date</th>
                            <th>Next FollowUp</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {followUps.length > 0 ? (

                            followUps.map((followUp) => (
                                <tr key={followUp.followUpId}>

                                    <td>{followUp.followUpId}</td>

                                    <td>
                                        {followUp.lead?.studentName}
                                    </td>

                                    <td>{followUp.remarks}</td>

                                    <td>{followUp.followUpDate}</td>

                                    <td>{followUp.nextFollowUpDate}</td>

                                    <td>{followUp.status}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(followUp)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(followUp.followUpId)
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
                                    colSpan="7"
                                    className="text-center text-danger"
                                >
                                    No FollowUps Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>
        </MainLayout>
    );

}

export default FollowUps;