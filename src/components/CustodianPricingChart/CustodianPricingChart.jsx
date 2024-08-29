import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top 5 Custodians with Pricing Details',
    },
  },
};

const CustodianPricingChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Dummy data to simulate fetched data
    const data = [
      { custodianName: 'Custodian A', allInFee: 200, discountStandardPricing: 10, ticketFee: 50, introFee: 30 },
      { custodianName: 'Custodian B', allInFee: 150, discountStandardPricing: 20, ticketFee: 40, introFee: 25 },
      { custodianName: 'Custodian C', allInFee: 180, discountStandardPricing: 15, ticketFee: 45, introFee: 28 },
      { custodianName: 'Custodian D', allInFee: 170, discountStandardPricing: 18, ticketFee: 35, introFee: 22 },
      { custodianName: 'Custodian E', allInFee: 160, discountStandardPricing: 12, ticketFee: 38, introFee: 27 },
    ];

    const labels = data.map(custodian => custodian.custodianName);
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'All-In Fee',
          data: data.map(custodian => custodian.allInFee),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Discount Standard Pricing',
          data: data.map(custodian => custodian.discountStandardPricing),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Ticket Fee',
          data: data.map(custodian => custodian.ticketFee),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Intro Fee',
          data: data.map(custodian => custodian.introFee),
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    });
  }, []);

  if (!chartData.labels) {
    return <div>Loading...</div>;
  }

  return <Bar options={options} data={chartData} />;
};

export default CustodianPricingChart;
