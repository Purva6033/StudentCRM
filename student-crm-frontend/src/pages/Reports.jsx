import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import LeadStatusChart from "../components/LeadStatusChart";
import CoursePieChart from "../components/CoursePieChart";
import CounselorPerformanceChart from "../components/CounselorPerformanceChart";
import MonthlyAdmissionChart from "../components/MonthlyAdmissionChart";
import LoadingSpinner from "../components/LoadingSpinner";

import {
    getLeadStatusReport,
    getCourseReport,
    getCounselorPerformance,
    getMonthlyAdmissions
} from "../services/dashboardService";

import {
    exportPDF,
    exportExcel
} from "../utils/reportExport";

function Reports() {

    const [leadStatus, setLeadStatus] = useState([]);
    const [courseReport, setCourseReport] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [monthlyAdmissions, setMonthlyAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {

        setLoading(true);

        try {

            const leadResponse = await getLeadStatusReport();
            setLeadStatus(leadResponse.data);

            const courseResponse = await getCourseReport();
            setCourseReport(courseResponse.data);

            const performanceResponse = await getCounselorPerformance();
            setPerformance(performanceResponse.data);

            const monthlyResponse = await getMonthlyAdmissions();
            setMonthlyAdmissions(monthlyResponse.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleExportPDF = () => {

        const headers = [
            "Report",
            "Category",
            "Count"
        ];

        const rows = [];

        leadStatus.forEach(item => {
            rows.push(["Lead Status", item.status, item.total]);
        });

        courseReport.forEach(item => {
            rows.push(["Course Admissions", item.courseName, item.total]);
        });

        performance.forEach(item => {
            rows.push([
                "Counselor Performance",
                item.counselorName,
                item.totalAdmissions
            ]);
        });

        monthlyAdmissions.forEach(item => {
            rows.push([
                "Monthly Admissions",
                item.month,
                item.total
            ]);
        });

        exportPDF(
            "Student CRM Analytics Report",
            headers,
            rows
        );

    };

    const handleExportExcel = () => {

        const data = [];

        leadStatus.forEach(item => {
            data.push({
                Report: "Lead Status",
                Category: item.status,
                Count: item.total
            });
        });

        courseReport.forEach(item => {
            data.push({
                Report: "Course Admissions",
                Category: item.courseName,
                Count: item.total
            });
        });

        performance.forEach(item => {
            data.push({
                Report: "Counselor Performance",
                Category: item.counselorName,
                Count: item.totalAdmissions
            });
        });

        monthlyAdmissions.forEach(item => {
            data.push({
                Report: "Monthly Admissions",
                Category: item.month,
                Count: item.total
            });
        });

        exportExcel(
            "Student CRM Analytics",
            data
        );

    };

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div
                className="container-fluid"
                style={{
                    maxWidth: "1250px"
                }}
            >

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <div>

                        <h3 className="fw-bold mb-1">
                            📊 Reports & Analytics
                        </h3>

                        <small className="text-muted">
                            Student CRM Analytics Dashboard
                        </small>

                    </div>

                    <div>

                        <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={handleExportPDF}
                        >
                            📄 PDF
                        </button>

                        <button
                            className="btn btn-success btn-sm"
                            onClick={handleExportExcel}
                        >
                            📊 Excel
                        </button>

                    </div>

                </div>

                <div className="row g-3">

                    <div className="col-lg-6">

                        <div className="card shadow-sm border-0">

                            <div className="card-header bg-primary text-white py-2">

                                <h6 className="mb-0">

                                    📊 Lead Status

                                </h6>

                            </div>

                            <div
                                className="card-body p-2"
                                style={{ height: "290px" }}
                            >

                                {
                                    leadStatus.length > 0 ?

                                        <LeadStatusChart
                                            data={leadStatus}
                                        />

                                        :

                                        <div className="text-center mt-5">

                                            No Data Available

                                        </div>
                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow-sm border-0">

                            <div className="card-header bg-success text-white py-2">

                                <h6 className="mb-0">

                                    🥧 Course Admissions

                                </h6>

                            </div>

                            <div
                                className="card-body p-2"
                                style={{ height: "220px" }}
                            >

                                {
                                    courseReport.length > 0 ?

                                        <CoursePieChart
                                            data={courseReport}
                                        />

                                        :

                                        <div className="text-center mt-5">

                                            No Data Available

                                        </div>
                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow-sm border-0">

                            <div className="card-header bg-info text-white py-2">

                                <h6 className="mb-0">

                                    👨‍🏫 Counselor Performance

                                </h6>

                            </div>

                            <div
                                className="card-body p-2"
                                style={{ height: "220px" }}
                            >

                                {
                                    performance.length > 0 ?

                                        <CounselorPerformanceChart
                                            data={performance}
                                        />

                                        :

                                        <div className="text-center mt-5">

                                            No Data Available

                                        </div>
                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow-sm border-0">

                            <div className="card-header bg-warning py-2">

                                <h6 className="mb-0 text-dark">

                                    📈 Monthly Admissions

                                </h6>

                            </div>

                            <div
                                className="card-body p-2"
                                style={{ height: "220px" }}
                            >

                                {
                                    monthlyAdmissions.length > 0 ?

                                        <MonthlyAdmissionChart
                                            data={monthlyAdmissions}
                                        />

                                        :

                                        <div className="text-center mt-5">

                                            No Data Available

                                        </div>
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Reports;