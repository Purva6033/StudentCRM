import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getActivityLogs } from "../services/activityLogService";

function ActivityLogs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const response = await getActivityLogs();

            setLogs(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <h2 className="mb-4">
                    Activity Logs
                </h2>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Action</th>
                            <th>Performed By</th>
                            <th>Lead</th>
                            <th>Date & Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {logs.map((log) => (

                            <tr key={log.activityId}>

                                <td>{log.activityId}</td>

                                <td>{log.action}</td>

                                <td>{log.performedBy}</td>

                                <td>{log.lead?.studentName}</td>

                                <td>{log.timestamp}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}

export default ActivityLogs;