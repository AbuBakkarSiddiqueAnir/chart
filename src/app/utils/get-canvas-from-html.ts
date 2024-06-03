"use client";
import html2canvas from "html2canvas";

export async function createCardCanvas(
  age = "",
  liquidAssets = "",
  netWorth = "",
  message = ""
) {
  // Ensure the html2canvas library is loaded
  if (typeof html2canvas === "undefined") {
    throw new Error("html2canvas library is not loaded");
  }
  if (!document) return;
  // Create a container for the HTML content
  const container = document?.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px"; // Move it off-screen
  container.style.width = "280px";
  container.style.height = "203px";

  // Create the card HTML content
  const cardHtml = `
    <div style="
      border: 2px solid #0052CC; 
      border-radius: 10px; 
      padding: 15px; 
      background: #f9f9f9; 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      font-size: 15px; 
      width: 100%; 
      line-height:20px;
      font-weight:600;
      height: 100%; 
      box-sizing: border-box;
    ">
      <p>Age: <span style="color: #007BFF;">${age}</span></p>
      <p>Liquid Assets: <span style="color: #28a745;">${liquidAssets}</span></p>
      <p>Total Net Worth: <span style="color: #17a2b8;">${netWorth}</span></p>
      <p style="color: #dc3545; font-weight: bold; margin-top: 10px;">Attention:</p>
      <p>${message}</p>
    </div>
  `;

  container.innerHTML = cardHtml;
  if (document) document?.body.appendChild(container);

  let renderedCanvas;
  try {
    renderedCanvas = await html2canvas(container, {
      width: 280,
      height: 202,
    });
  } catch (e) {
    console.log(e, "error");
  }
  if (document) document?.body.removeChild(container);
  console.log(renderedCanvas);

  return renderedCanvas;
}
