import { setTotalIncoming } from "@app/slice/OrderSlice";
import useStatistical from "@hooks/useStatistical";
import { formatCurrencyNumberVI } from "@utils/Format";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

const LineChart = () => {
  const dispatch = useDispatch();
  const { statistical } = useStatistical();
  const statusLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyRevenue = [];

  if (statistical.length > 0) {
    for (let i = 1; i <= 12; i++) {
      const ordersInMonth = statistical.filter((order) => {
        const orderMonth = new Date(order.createdAt).getMonth() + 1;
        return orderMonth === i;
      });
      const totalRevenueInMonth = ordersInMonth.reduce(
        (total, order) => total + order.price * order.quantity,
        0
      );
      monthlyRevenue.push(totalRevenueInMonth);
    }
  }
  const totalIncoming = monthlyRevenue.reduce((acc, item) => acc + item, 0);

  const data = {
    labels: statusLabels,
    datasets: [
      {
        label: "Earnings",
        tension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: monthlyRevenue,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Revenue: ${formatCurrencyNumberVI(tooltipItem.raw)}`;
          },
        },
      },
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Monthly Earnings",
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };
  useEffect(() => {
    dispatch(setTotalIncoming(totalIncoming));
  }, [dispatch, totalIncoming]);

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
