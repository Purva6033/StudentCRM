import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function CoursePieChart({ data }) {

    const chartData = {

        labels: data.map(item => item.courseName),

        datasets: [

            {

                data: data.map(item => item.total),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997",
                    "#fd7e14",
                    "#6610f2",
                    "#0dcaf0",
                    "#adb5bd"
                ],

                borderColor: "#ffffff",

                borderWidth: 2,

                radius: "75%"      // Smaller Pie

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "top",

                labels: {

                    boxWidth: 10,

                    boxHeight: 10,

                    padding: 8,

                    font: {

                        size: 10

                    }

                }

            }

        }

    };

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "170px"
            }}
        >

            {/* Legend */}

            <div
                style={{
                    width: "58%"
                }}
            >

                {
                    chartData.labels.map((label, index) => (

                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                                fontSize: "12px"
                            }}
                        >

                            <span
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    backgroundColor:
                                        chartData.datasets[0].backgroundColor[index],
                                    marginRight: "8px"
                                }}
                            />

                            {label}

                        </div>

                    ))
                }

            </div>

            {/* Pie */}

            <div
                style={{
                    width: "210px",
                    height: "210px",
                    marginLeft: "-15px"   // <-- moves pie towards left
                }}
            >

                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                />

            </div>

        </div>

    );

}

export default CoursePieChart;