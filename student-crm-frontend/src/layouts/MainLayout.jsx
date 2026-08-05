import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {

    return (

        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1"
                style={{
                    background: "#f4f6f9",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div
                    className="container-fluid py-4 px-4"
                    style={{
                        maxWidth: "1450px",
                        margin: "0 auto"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

}

export default MainLayout;