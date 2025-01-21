import React from 'react'
import DonutChart from './DonutChart'
import LineChart from './LineChart';

const TicketStat = () => {

  const chartData = {
    labels: ["Active", "Solved"],
    datasets: [
      {
        label: "Votes",
        data: [300, 50],
        backgroundColor: ["#718FD0", "#DADDE3"],
        hoverBackgroundColor: ["#2587be", "#DADDE3"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    cutout: "60%", // Makes it a donut chart
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
    },
  };
  const ticketData = [
    { date: "2022-01-04", count: 12 },
    { date: "2024-01-04", count: 12 },
    { date: "2024-10-01", count: 5 },
    { date: "2024-10-02", count: 8 },
    { date: "2024-10-03", count: 2 },
    { date: "2024-10-04", count: 12 },
    { date: "2024-11-04", count: 12 },
    { date: "2024-12-04", count: 12 },
    { date: "2024-12-05", count: 4 },
  ];

  return (
    <div className='flex flex-col w-screen' >
      <p>Tickets Stats</p>
      <div className='flex justify-between items-center  '>
        <DonutChart chartData={chartData} chartOptions={chartOptions} />
        <LineChart data={ticketData}/>
      </div>
    </div>
  );
}

export default TicketStat