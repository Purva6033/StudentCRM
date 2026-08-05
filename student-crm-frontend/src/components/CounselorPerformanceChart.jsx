import {
    Bar
} from "react-chartjs-2";

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

function CounselorPerformanceChart({ data }) {

    const chartData = {

        labels: data.map(x => x.counselorName),

        datasets: [

            {

                label: "Admissions",

                data: data.map(x => x.totalAdmissions),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997"
                ],
                borderRadius: 6,

                barThickness: 30,

                maxBarThickness: 22


            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        }

    };
    return (

        <div
            style={{
                height: "190px",
                width: "100%",
                overflow: "hidden"
            }}
        >

            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            display: false
                        }
                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {
                                font: {
                                    size: 10
                                }
                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {
                                stepSize: 1,
                                font: {
                                    size: 10
                                }
                            }

                        }

                    }

                }}
            />

        </div>

    );

}

export default CounselorPerformanceChart;