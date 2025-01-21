// DonutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ chartData, chartOptions }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="h-60">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DonutChart;
