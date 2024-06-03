import React, { useEffect, useRef } from "react";
import { createCardCanvas } from "./getImage";

const CardComponent = ({
  age = "asd",
  liquidAssets = "asdfas",
  netWorth = "asdfa",
  message = "asdfa",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    createCardCanvas(age, liquidAssets, netWorth, message)
      .then((canvas) => {
        if (canvasRef.current) {
          canvasRef.current.appendChild(canvas);
        }
      })
      .catch((error) => {
        console.error("Error creating card canvas:", error);
      });
  }, [age, liquidAssets, netWorth, message]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CardComponent;
