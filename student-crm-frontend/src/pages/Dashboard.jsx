import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import {
    getDashboardStats,
    getRecentAdmissions
} from "../services/dashboardService";

function Dashboard() {

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalLeads: 0,
        totalCourses: 0,
        totalAdmissions: 0,
        totalCounselors: 0,
        totalFollowUps: 0
    });

    const [recentAdmissions, setRecentAdmissions] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const statsResponse = await getDashboardStats();
            setStats(statsResponse.data);

            const admissionResponse = await getRecentAdmissions();
            setRecentAdmissions(admissionResponse.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="mb-4">
                    <h2>Dashboard</h2>
                    <p className="text-muted mb-4">
                        Welcome to Student CRM Management System
                    </p>
                </div>

                <div className="row">

                    <DashboardCard
                        title="Students"
                        count={stats.totalStudents}
                        icon="👨‍🎓"
                        color="bg-primary"
                    />

                    <DashboardCard
                        title="Leads"
                        count={stats.totalLeads}
                        icon="📋"
                        color="bg-success"
                    />

                    <DashboardCard
                        title="Courses"
                        count={stats.totalCourses}
                        icon="📚"
                        color="bg-warning"
                    />

                    <DashboardCard
                        title="Admissions"
                        count={stats.totalAdmissions}
                        icon="📝"
                        color="bg-danger"
                    />

                    <DashboardCard
                        title="Counselors"
                        count={stats.totalCounselors}
                        icon="👨‍🏫"
                        color="bg-info"
                    />

                    <DashboardCard
                        title="Follow Ups"
                        count={stats.totalFollowUps}
                        icon="📞"
                        color="bg-secondary"
                    />

                    <DashboardCard
                        title="Today's Follow Ups"
                        count={stats.todayFollowUps}
                        icon="📅"
                        color="bg-dark"
                    />

                    <DashboardCard
                        title="Overdue Follow Ups"
                        count={stats.overdueFollowUps}
                        icon="⏰"
                        color="bg-danger"
                    />

                </div>

                <div className="card shadow mt-4">

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">

                            ⚡ Quick Actions

                        </h5>

                    </div>

                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-lg-3 col-md-6">

                                <Link
                                    to="/pending-registrations"
                                    className="btn btn-warning w-100 p-4 shadow-sm"
                                >
                                    ⏳ <br />
                                    <strong>Pending Registrations</strong>
                                </Link>

                            </div>

                            <div className="col-lg-3 col-md-6">

                                <Link
                                    to="/leads"
                                    className="btn btn-success w-100 p-4 shadow-sm"
                                >
                                    ➕ <br />
                                    <strong>Add Lead</strong>
                                </Link>

                            </div>

                            <div className="col-lg-3 col-md-6">

                                <Link
                                    to="/courses"
                                    className="btn btn-info text-white w-100 p-4 shadow-sm"
                                >
                                    📚 <br />
                                    <strong>Add Course</strong>
                                </Link>

                            </div>

                            <div className="col-lg-3 col-md-6">

                                <Link
                                    to="/counselors"
                                    className="btn btn-secondary w-100 p-4 shadow-sm"
                                >
                                    👨‍🏫 <br />
                                    <strong>Add Counselor</strong>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow mt-4">

                    <div className="card-header">
                        <h5 className="mb-0">Recent Admissions</h5>
                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Counselor</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {recentAdmissions.length > 0 ? (

                                    recentAdmissions.map((admission) => (

                                        <tr key={admission.admissionId}>

                                            <td className="text-center">
                                                {admission.admissionId}
                                            </td>

                                            <td>{admission.studentName}</td>

                                            <td>{admission.courseName}</td>

                                            <td>{admission.counselorName}</td>

                                            <td>
                                                <span
                                                    className={
                                                        admission.status === "ADMITTED"
                                                            ? "badge bg-success"
                                                            : admission.status === "PENDING"
                                                                ? "badge bg-warning text-dark"
                                                                : "badge bg-danger"
                                                    }
                                                >
                                                    {admission.status}
                                                </span>
                                            </td>
                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No Recent Admissions Found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>


        </MainLayout >

    );
}

export default Dashboard;