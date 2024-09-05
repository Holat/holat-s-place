import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MonthlySalesChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await axios.get("/api/adminApi/monthly-sales");
        const salesData = response.data;

        const labels = salesData.map((item: any) => item.month);
        const data = salesData.map((item: any) => item.totalSales);

        setChartData({
          labels,
          datasets: [
            {
              label: "Monthly Sales",
              data: data,
              borderColor: "#fa6400", // Customize your line color
              backgroundColor: "rgba(250, 100, 0, 0.1)", // For filling under the line
              fill: true,
              tension: 0.4, // Smooth curves
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchMonthlySales();
  }, []);

  return (
    <div>
      <h2>Monthly Sales</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return "$" + value; // Adds $ sign to the y-axis labels
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default MonthlySalesChart;

export const OrderStatusChart = ({
  pending,
  paid,
}: {
  pending: number;
  paid: number;
}) => {
  const [orderData, setOrderData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const orderData = {
    labels: ["Payed", "Pending"],
    datasets: [
      {
        label: "Orders",
        data: [paid || 0, pending || 0],
        backgroundColor: ["#00C49F", "#FFBB28"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <h2>Total Orders</h2>
      <Doughnut
        data={orderData}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          cutout: "70%", // Adjust the thickness of the doughnut
        }}
      />
      <div className="legend">
        <div>
          <span style={{ color: "#00C49F" }}>●</span> Payed
        </div>
        <div>
          <span style={{ color: "#FFBB28" }}>●</span> Pending
        </div>
      </div>
    </div>
  );
};
