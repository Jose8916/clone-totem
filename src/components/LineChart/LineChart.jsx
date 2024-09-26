import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  LineElement,
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
  
};

function LineChart({totalExitosas, totalPendientes}) {
  const currentHour = moment().format("HH:00"); // Obtiene la hora actual en formato "HH:00"
  const hours = Array.from({ length: 6 }, (_, i) =>
    moment(currentHour, "HH:00").subtract(i * 4, "hours").format("HH:00")
  ).reverse(); // Genera un array de las últimas 6 horas
  const data = {
    labels: hours,
    datasets: [
      {
        label: "Total Exitosas",
        data: Array.from({ length: 6 }, () => totalExitosas),
        fill: false,
        borderColor: "rgb(223, 226, 9)",
        backgroundColor: "rgb(255, 0, 0)",
        tension: 0.5,
      },
      {
        label: "Total Pendientes",
        data: Array.from({ length: 6 }, () => totalPendientes),
        fill: false,
        borderColor: "rgb(223, 24, 241)",
        backgroundColor: "rgb(24, 46, 241)",
        tension: 0.1,
      },
    ],
  };
  return <Line data={data} options={options} />;
}

export default LineChart;