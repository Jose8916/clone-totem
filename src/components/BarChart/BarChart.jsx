import { Bar } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      // Configuración para la escala X
    },
    y: {
      // Configuración para la escala Y
      beginAtZero: true,
    },
  },
};

function BarChart({ totalExitosas, totalPendientes }) {
  const currentHour = moment().format("HH:00"); // Obtiene la hora actual en formato "HH:00"
  const hours = Array.from({ length: 4 }, (_, i) =>
    moment(currentHour, "HH:00").subtract(i * 4, "hours").format("HH:00")
  ).reverse(); // Genera un array de las últimas 4 horas

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Total Exitosas",
        data: Array.from({ length: 4 }, () => totalExitosas),
        fill: false,
        borderColor: "rgb(223, 226, 9)",
        backgroundColor: "rgb(255, 0, 0)",
        tension: 0.5,
      },
      {
        label: "Total Pendientes",
        data: Array.from({ length: 4 }, () => totalPendientes),
        fill: false,
        borderColor: "rgb(223, 24, 241)",
        backgroundColor: "rgb(42, 6, 245)",
        tension: 0.1,
      },
    ],
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
