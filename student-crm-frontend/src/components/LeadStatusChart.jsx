import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function LeadStatusChart({ data }) {

    const chartData = {

        labels: data.map(item => item.status),

        datasets: [

            {

                label: "Leads",

                data: data.map(item => item.total),

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#14b8a6",
                    "#f97316",
                    "#6b7280"
                ],

                borderRadius: 10,

                borderSkipped: false,

                barPercentage: 0.55,

                categoryPercentage: 0.70

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            },

            tooltip: {

                backgroundColor: "#1f2937",

                titleColor: "#fff",

                bodyColor: "#fff",

                padding: 10

            }

        },

        scales: {

            x: {

                grid: {

                    display: false

                },

                ticks: {

                    color: "#495057",

                    maxRotation: 35,

                    minRotation: 35,

                    font: {

                        size: 11,

                        weight: "bold"

                    }

                }

            },

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 1,

                    color: "#495057"

                },

                grid: {

                    color: "#e9ecef"

                }

            }

        }

    };

    return (

        <div
            style={{
                height: "270px"
            }}
        >

            <Bar
                data={chartData}
                options={options}
            />

        </div>

    );

}

export default LeadStatusChart;