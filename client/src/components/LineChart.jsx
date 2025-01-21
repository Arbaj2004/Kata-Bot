// LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: data.map((ticket) => ticket.date), // Dates as labels
    datasets: [
      {
        label: "Tickets Generated",
        data: data.map((ticket) => ticket.count), // Ticket counts as data
        borderColor: "#3B82F6", // Tailwind blue-500
        backgroundColor: "#fff", // Blue with opacity
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Chart configuration options (without grid lines)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000", // Adjust for light mode
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false, // Hide X-axis grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Tickets",
        },
        grid: {
          display: false, // Hide Y-axis grid lines
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-fit mr-5">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
