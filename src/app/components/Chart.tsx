"use client";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { createCanvasWithTextAndImage } from "../utils/create-canvas-with-text-and-image";
import { createCardCanvas } from "../utils/get-canvas-from-html";
import { useEffect } from "react";

ChartJs.register(
  annotationPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Chart() {
  const data = {
    labels: [0, 45, 50, 55, 60, 65, 70, 75, 80],
    datasets: [
      {
        label: "Net Worth",
        data: [40, 60, 80, 105, 133, 186, 175, 150, 120, 200, 400],
        fill: true,
        backgroundColor: "#C2C9FB",
        borderColor: "#657AED",
        tension: 0.1,
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

    callout: {
      display: true,
      position: "center",
      side: "bottom",
      start: {
        xValue: 3, // x position on the x-axis
        yValue: 0, // y position at the x-axis (y=0)
      },
    },
    xValue: 3,
    yValue: 260,
  };

  const annotation2 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage(
      " CHILD 2 \n COLLEGE",
      "/chart-img-1.png"
    ),
    xValue: 4,
    yValue: 290,
  };

  const annotation3 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage("", "/chart-img-2.png"),
    xValue: 3.4,
    yValue: 190,
  };
  const annotation4 = {
    type: "label",
    drawTime: "afterDraw",
    content: createCanvasWithTextAndImage(
      " EARLIEST AGE OF \n RETIREMENT",
      "/chart-img-3.png"
    ),
    xValue: 5.4,
    yValue: 240,
  };

  const annotation5 = {
    type: "box",
    drawTime: "afterDraw",
    shadowBlur: "10px",
    label: {
      content: "Loading...",
      display: true,
    },

    xMin: 4.9,
    xMax: 4.9,
    yMin: 125,
    yMax: 125,
    borderRadius: 20,
    borderColor: "#0C8CE9",
    backgroundColor: "#fff",
  };
  const annotation6 = {
    type: "box",
    drawTime: "afterDraw",
    shadowBlur: "10px",
    borderColor: "#0C8CE9",
    label: {
      content: "Loading....",
      display: true,
    },
    xMin: 6.9,
    xMax: 6.9,
    yMin: 315,
    yMax: 315,
    borderRadius: 20,
    backgroundColor: "#fff",
  };
  const options: any = {
    responsive: true,
    layout: {
      padding: {
        left: 100,
        right: 100,
      },
    },
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
      x: {
        title: {
          display: true,
          text: "Age",
        },
      },
      y: {
        title: {
          display: true,
          text: "Net Worth (in millions)",
        },
      },
    },
  };

  useEffect(() => {
    async function updateAnnotations() {
      const canvas2 = await createCardCanvas(
        63,
        "$100,000",
        "$500,000",
        "You will be pulling money from retirement funds and pay 20% penalty."
      );
      const canvas1 = await createCardCanvas(
        75,
        "$100,000",
        "$500,000",
        "You will be pulling money from retirement funds and pay 20% penalty."
      );

      options.plugins.annotation.annotations.annotation6.label.content =
        canvas1;
      options.plugins.annotation.annotations.annotation5.label.content =
        canvas2;

      ChartJs!.getChart("myChart")!.update();
    }

    updateAnnotations();
  }, []);

  return <Line id="myChart" data={data} options={options} />;
}
