import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { formatNumber } from "../../utils/formatNum";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, 
  Filler
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
        const data = salesData.map((item: any) => item.orderCount);

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
    <div className="orderChart">
      <h3>Monthly Sales</h3>
      <div className="chart">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid:{
                  color: "rgba(0, 0, 0, 0.6)",
                  drawTicks: false
                },
                border: {
                    dash: [2,4],
                    color: "white"
                },  
                min: 0,
                max: 100,
                offset: true,
                position: "left",
                ticks: {
                  padding: 20,
                  stepSize: 50,
                  align: "inner",
                  font: {
                    weight: "bold"
                  },
                  callback: function(value) {
                    let nextValue = Number(value) + 50;
                    return value + " - " + nextValue;
                  },
                }
              },
              x: {
                grid: {
                  display: false
                },
                border:{
                  dash: [2,4],
                  color: "rgba(0, 0, 0, 0.6)"
                },
                ticks:{
                  align: "start",
                  font: {
                    weight: "bold"
                  }
                }
            },
            },
            plugins: {
              legend: {
                display: false
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonthlySalesChart;

export const OrderStatusChart = ({
  pending,
  paid,
  total
}: {
  pending?: number;
  paid?: number;
  total?: number;
}) => {
  const orderData = {
    labels: ["Paid", "Pending"],
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
    <div className="donutCont">
      <h3>Total Orders</h3>
      <div className="donut">
        <Doughnut
          data={orderData}
          options={{
            responsive: true,
            aspectRatio: 1,
            plugins: {
              legend: {
                display: false,
                // position: 'bottom',
                // align: "start",
              },
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
        <div className="tag">{formatNumber(total)}</div>
      </div>
      <div className="legend">
        <div>
          <span style={{ color: "#00C49F" }}>●</span> Paid
        </div>
        <div>
          <span style={{ color: "#FFBB28" }}>●</span> Pending
        </div>
      </div>
    </div>
  );
};
