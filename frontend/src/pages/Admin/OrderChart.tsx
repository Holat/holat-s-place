import { useEffect, useState } from "react";
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
  ArcElement
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

        console.log(salesData)

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
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return "₦" + value; // Adds $ sign to the y-axis labels
                },
              },
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
        <div className="tag">{total}</div>
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
// borderDash: [8, 4],
//                 color: "#348632"
// https://stackoverflow.com/questions/39544767/how-can-i-show-dotted-gridlines-with-chartjs
// https://www.google.com/search?q=how+to+make+the+graph+grid+lines+in+Line+chartjs+dash&sca_esv=6fd0d93f9f01f957&sca_upv=1&rlz=1C1GCEU_en-GBNG1102NG1102&sxsrf=ADLYWIJ40_6VzcwELKR3lw3O_E_WVTobXA%3A1725550292067&ei=1M7ZZt7mA_br7_UPvJbQmQ0&ved=0ahUKEwjeoM3hj6yIAxX29bsIHTwLNNMQ4dUDCBA&uact=5&oq=how+to+make+the+graph+grid+lines+in+Line+chartjs+dash&gs_lp=Egxnd3Mtd2l6LXNlcnAiNWhvdyB0byBtYWtlIHRoZSBncmFwaCBncmlkIGxpbmVzIGluIExpbmUgY2hhcnRqcyBkYXNoSABQAFgAcAB4AJABAJgBAKABAKoBALgBA8gBAPgBAZgCAKACAJgDAJIHAKAHAA&sclient=gws-wiz-serp