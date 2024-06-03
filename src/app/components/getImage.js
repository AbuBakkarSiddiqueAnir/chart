export function getImage() {
  const img = new Image();
  img.src = "/chart-img-1.png";
  return img;
}
export function createCanvasWithTextAndImage(text, imageUrl) {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions (adjust based on your requirements)
  const canvasWidth = 300;
  const canvasHeight = 400;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Font settings for the text
  const fontSize = 15;
  const font = `${fontSize}px Arial`;
  ctx.font = font;
  const lineHeight = fontSize + 5;

  // Split text into lines
  const lines = text.split("\n");

  // Calculate text starting position
  const textX = 10;
  let textY = fontSize + 10;

  // Draw each line of text on the canvas
  lines.forEach((line) => {
    ctx.fillText(line, textX, textY);
    textY += lineHeight;
  });

  // Create an image element
  const image = new Image();

  // Define what happens when the image loads
  image.onload = function () {
    // Draw the image on the canvas below the text
    const imageX = 0;
    const imageY = textY;
    const imageWidth = canvasWidth / 3;
    const imageHeight = canvasHeight / 2.4 - textY - 10;

    ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
  };

  // Set the source of the image to trigger the loading
  image.src = imageUrl;

  // Return the canvas element
  return canvas;
}

export function createCardCanvas(age, liquidAssets, netWorth, message) {
  // Create a container for the HTML content
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "300px";
  container.style.height = "200px";

  // Create the card HTML content
  const cardHtml = `
    <div style="
      border: 1px solid #ccc; 
      border-radius: 8px; 
      padding: 10px; 
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
      font-family: Arial, sans-serif; 
      font-size: 14px; 
      width: 100%; 
      height: 100%; 
      box-sizing: border-box;
    ">
      <p>Age: <span style="color: #0000ff;">${age}</span></p>
      <p>Liquid Assets: <span style="color: #0000ff;">${liquidAssets}</span></p>
      <p>Total Net Worth: <span style="color: #0000ff;">${netWorth}</span></p>
      <p style="color: #ff0000; font-weight: bold;">Attention:</p>
      <p>${message}</p>
    </div>
  `;

  container.innerHTML = cardHtml;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  const canvasWidth = 300;
  const canvasHeight = 200;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Use html2canvas to render the HTML content to the canvas
  html2canvas(container).then(function (renderedCanvas) {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(renderedCanvas, 0, 0);
  });

  // Return the canvas element
  return canvas;
}
