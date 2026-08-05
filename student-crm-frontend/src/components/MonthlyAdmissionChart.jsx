import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

function MonthlyAdmissionChart({ data }) {

    const chartData = {

        labels: data.map(item => item.month),

        datasets: [

            {

                label: "Admissions",

                data: data.map(item => item.total),

                borderColor: "#0d6efd",

                backgroundColor: "rgba(13,110,253,.15)",

                fill: true,

                tension: 0.4,

                pointRadius: 3,

                pointHoverRadius: 5,

                borderWidth: 2

            }

        ]

    };
    const options = {

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

    };
    return (

        <div
            style={{
                height: "150px"
            }}
        >

            <Line
                data={chartData}
                options={options}
            />

        </div>

    );

}

export default MonthlyAdmissionChart;