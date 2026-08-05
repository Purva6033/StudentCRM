import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCounselors } from "../services/counselorService";
function Counselors() {

    const [counselors, setCounselors] = useState([]);

    useEffect(() => {
        loadCounselors();
    }, []);

    const loadCounselors = async () => {
        try {
            const response = await getCounselors();
            setCounselors(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>
            <div className="container mt-4">

                <h2 className="mb-4">Counselor Management</h2>

                <table className="table table-striped table-bordered">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {counselors.length > 0 ? (

                            counselors.map((user) => (

                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        {user.isActive ? "Active" : "Inactive"}
                                    </td>
                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="6" className="text-center">
                                    No Counselors Found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>
        </MainLayout>
    );
}
export default Counselors;