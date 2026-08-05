import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCounselorDashboard } from "../services/counselorDashboardService";

function CounselorDashboard() {

    const email = localStorage.getItem("email");

    const [dashboard, setDashboard] = useState({
        myLeads: 0,
        pendingLeads: 0,
        admissions: 0,
        followUps: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getCounselorDashboard(email);

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="mb-4">

                    <h2>Counselor Dashboard</h2>

                    <p className="text-muted">

                        Welcome, {email}

                    </p>

                </div>

                <div className="row">

                    <div className="col-md-3 mb-4">

                        <div className="card shadow border-0 bg-primary text-white">

                            <div className="card-body text-center">

                                <h2>{dashboard.myLeads}</h2>

                                <h5>My Leads</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="card shadow border-0 bg-warning text-dark">

                            <div className="card-body text-center">

                                <h2>{dashboard.pendingLeads}</h2>

                                <h5>Pending Leads</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="card shadow border-0 bg-success text-white">

                            <div className="card-body text-center">

                                <h2>{dashboard.admissions}</h2>

                                <h5>Admissions</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="card shadow border-0 bg-info text-white">

                            <div className="card-body text-center">

                                <h2>{dashboard.followUps}</h2>

                                <h5>Follow Ups</h5>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default CounselorDashboard;