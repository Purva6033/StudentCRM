import { NavLink } from "react-router-dom";

function Sidebar() {

    const role = localStorage.getItem("role");

    return (

        <div
            className="bg-dark text-white"
            style={{
                width: "300px",
                minHeight: "100vh",
                flexShrink: 0,
                boxShadow: "2px 0 8px rgba(0,0,0,0.2)"
            }}
        >

            <h3 className="text-center py-4 border-bottom">
                🎓 Student CRM
            </h3>

            <div className="nav flex-column p-3">

                {/* Dashboard */}

                <NavLink
                    className="nav-link text-white mb-2"
                    to={
                        role === "ADMIN"
                            ? "/dashboard"
                            : role === "COUNSELOR"
                                ? "/counselor-dashboard"
                                : "/student-dashboard"
                    }
                >
                    🏠 Dashboard
                </NavLink>



                {/* ================= ADMIN ================= */}

                {role === "ADMIN" && (

                    <>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/leads"
                        >
                            📋 Lead Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/calls"
                        >
                            ☎ Call Records
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/courses"
                        >
                            📚 Course Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/admissions"
                        >
                            📝 Admission Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/followups"
                        >
                            📞 Follow Up Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/counselors"
                        >
                            👨‍🏫 Counselor Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/reports"
                        >
                            📊 Reports & Analytics
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/activity"
                        >
                            📜 Activity Logs
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/change-password"
                        >
                            🔒 Change Password
                        </NavLink>

                    </>

                )}

                {/* ================= COUNSELOR ================= */}

                {role === "COUNSELOR" && (

                    <>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/leads"
                        >
                            📋 Lead Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/calls"
                        >
                            ☎ Call Records
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/admissions"
                        >
                            📝 Admission Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/followups"
                        >
                            📞 Follow Up Management
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/change-password"
                        >
                            🔒 Change Password
                        </NavLink>

                    </>

                )}

                {/* ================= STUDENT ================= */}

                {role === "STUDENT" && (

                    <>

                        <small className="text-secondary mt-3 mb-2">
                            MY ACCOUNT
                        </small>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/student-dashboard"
                        >
                            🏠 My Dashboard
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/student/edit-profile"
                        >
                            👤 Edit Profile
                        </NavLink>

                        <NavLink
                            className="nav-link text-white mb-2"
                            to="/change-password"
                        >
                            🔒 Change Password
                        </NavLink>

                    </>

                )}

                <hr />

                <button
                    className="btn btn-danger"
                    onClick={() => {

                        localStorage.clear();

                        window.location.href = "/";

                    }}
                >
                    🚪 Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;