import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        <nav className="navbar bg-white shadow-sm px-4">

            <h4 className="mb-0">
                Dashboard
            </h4>

            <div className="d-flex align-items-center">

                <span className="me-3 fw-bold">
                    {localStorage.getItem("email")}
                </span>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;