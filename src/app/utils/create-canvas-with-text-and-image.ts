"use client";
export function createCanvasWithTextAndImage(text: string, imageUrl: string) {
  if (!document) return;
  const canvas = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  const canvasWidth = 160;
  const canvasHeight = 220;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const fontSize = 15;
  const font = `bold ${fontSize}px Arial`;
  ctx!.font = font;
  const lineHeight = fontSize + 5;

  const lines = text.split("\n");

  const textX = 10;
  let textY = fontSize + 10;

  lines.forEach((line) => {
    ctx!.fillText(line, textX, textY);
    textY += lineHeight;
  });

  const image = new Image();

  image.onload = function () {
    const imageX = 0;
    const imageY = textY;
    const imageWidth = canvasWidth / 1.4;
    const imageHeight = canvasHeight / 1.2 - textY - 10;

    ctx!.drawImage(image, imageX, imageY, imageWidth, imageHeight);
  };

  image.src = imageUrl;

  return canvas;
}
