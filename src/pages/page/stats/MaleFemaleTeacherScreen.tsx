import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "School Fee Dateset Payment",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Payment 1",
      data: [1, 7, 9, 20, 3, 15, 5],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Payment 2",
      data: [1, 7, 9, 20, 3, 15, 5],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

let numb = Math.floor(Math.random() * (20 - 1)) + 1;

console.log(numb);

const MaleFemaleTeacherScreen = () => {
  return (
    <div>
      <Bar options={options} data={data} />

      <p>{numb}</p>
    </div>
  );
};

export default MaleFemaleTeacherScreen;
