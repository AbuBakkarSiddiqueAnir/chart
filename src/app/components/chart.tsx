"use client";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  Plugin,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ImagePoint {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const Chart: FC = () => {
  const data: ChartData<"line"> = {
    labels: Array.from({ length: 31 }, (_, i) => 50 + i),
    datasets: [
      {
        label: "Net Worth",
        data: [
          0, 9, 17, 26, 35, 48, 60, 75, 90, 105, 120, 135, 155, 160, 162, 164,
          166, 168, 170, 172, 172, 171, 170, 169, 168, 167, 166,
        ],
        fill: true,
        backgroundColor: "rgba(192,75,192,0.2)",
        borderColor: "rgba(192,75,192,1)",
        tension: 0.5,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Net Worth Over Time",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
      imagePoints: {
        images: [
          {
            src: "/home.png",
            x: 5,
            y: 140,
            width: 60,
            height: 60,
          },
          {
            src: "/dollar-bag.png",
            x: 6,
            y: 110,
            width: 60,
            height: 60,
          },
          {
            src: "/home.png",
            x: 9,
            y: 150,
            width: 60,
            height: 60,
          },
          {
            src: "/dollar-bag.png",
            x: 14,
            y: 130,
            width: 60,
            height: 60,
          },
          {
            src: "/home.png",
            x: 25,
            y: 140,
            width: 60,
            height: 60,
          },
        ],
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Net Worth (in millions)",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const customPlugin: Plugin<"line"> = {
    id: "imagePoints",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const { images } = (chart.options.plugins as any).imagePoints;

      images.forEach((imagePoint: ImagePoint) => {
        const img = new Image();
        img.src = imagePoint.src;
        img.onload = () => {
          const xPosition = chart.scales.x.getPixelForValue(imagePoint.x);
          const yPosition = chart.scales.y.getPixelForValue(imagePoint.y);
          const yAxisBottom = chart.scales.y.getPixelForValue(
            chart.scales.y.min
          );

          ctx.drawImage(
            img,
            xPosition - imagePoint.width / 2,
            yPosition - imagePoint.height / 2,
            imagePoint.width,
            imagePoint.height
          );

          ctx.beginPath();
          ctx.moveTo(xPosition, yPosition);
          ctx.lineTo(xPosition, yAxisBottom);
          ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
          ctx.stroke();
        };
      });
    },
  };

  return <Line data={data} options={options} plugins={[customPlugin]} />;
};

export default Chart;
