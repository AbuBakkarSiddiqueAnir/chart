"use client";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  getImage,
  createCanvasWithTextAndImage,
  createCardCanvas,
} from "./getImage";

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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
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
    labels: [0, 45, 50, 55, 60, 65, 70, 75, 80],
    datasets: [
      {
        label: "Net Worth",
        data: [40, 60, 80, 100, 120, 140, 135, 130, 120, 200, 300],
        fill: true,
        backgroundColor: "#C2C9FB",
        borderColor: "#657AED",
        tension: 0.7,
      },
    ],
  };

  const annotation1 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage(
      " CHILD 1 \n COLLEGE",
      "/chart-img-1.png"
    ),
    xValue: 3,
    yValue: 160,
  };

  const annotation2 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage(
      " CHILD 2 \n COLLEGE",
      "/chart-img-1.png"
    ),
    xValue: 4,
    yValue: 190,
  };

  const annotation4 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage("", "/chart-img-2.png"),
    xValue: 3.4,
    yValue: 100,
  };
  const annotation5 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage(
      "EARLIEST AGE OF \n RETIREMENT",
      "/chart-img-3.png"
    ),
    xValue: 5.4,
    yValue: 140,
  };

  const annotation3 = {
    type: "box",
    shadowBlur: "10px",
    label: {
      content: [
        "Liquid Assets: $3.45M",
        "Liquid Assets: $3.45M",
        "Liquid Assets: $3.45M",
      ],
      display: true,
    },
    xMin: 3.5,
    xMax: 5.0,
    yMin: 45,
    yMax: 125,
    borderRadius: 20,
    borderColor: "red",
    backgroundColor: "#fff",
  };
  const annotation6 = {
    type: "box",
    shadowBlur: "10px",
    borderColor: "#0C8CE9",
    label: {
      content: [
        "Liquid Assets: $3.45M",
        "Liquid Assets: $3.45M",
        "Liquid Assets: $3.45M",
      ],
      display: true,
    },
    xMin: 6,
    xMax: 7.5,
    yMin: 145,
    yMax: 215,
    borderRadius: 20,
    backgroundColor: "#fff",
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
      annotation: {
        annotations: {
          annotation1,
          annotation2,
          annotation3,
          annotation4,
          annotation5,
          annotation6,
        },
      },
    },
    scales: {
      y: {
        stacked: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
