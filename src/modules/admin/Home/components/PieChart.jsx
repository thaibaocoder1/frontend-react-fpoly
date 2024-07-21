import useOrder from "@hooks/useOrder";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [filters] = useState({
    _all: true,
  });
  const { orders } = useOrder(filters);
  const countByStatus =
    orders.length > 0 &&
    orders.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
  const statusLabels = [
    "Pending",
    "Confirmed",
    "Shipping",
    "Completed",
    "Canceled",
    "Rejected",
  ];
  const statusCounts = statusLabels.map(
    (_, index) => countByStatus[index + 1] || 0
  );

  const data = {
    labels: statusLabels,
    datasets: [
      {
        data: statusCounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          backgroundColor: "rgb(255,255,255)",
          bodyColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          padding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: (tooltipItem) => {
              const label = tooltipItem.label || "";
              const value = tooltipItem.raw || 0;
              return `${label}: ${value}`;
            },
          },
        },
      },
      cutout: 80,
    },
  };

  return (
    <div className="w-full">
      <Doughnut data={data} id="Doughnut" />
    </div>
  );
};
export default DoughnutChart;
