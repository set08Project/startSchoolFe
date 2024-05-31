import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintReportCard: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const preprocessContent = () => {
    const content = contentRef.current;
    if (!content) return;

    // Traverse the DOM and replace "oklch" color functions with a fallback color
    const elementsWithUnsupportedColors = content.querySelectorAll("*");
    elementsWithUnsupportedColors.forEach((element: any) => {
      const computedStyles = window.getComputedStyle(element);
      if (computedStyles.color.includes("oklch")) {
        element.style.color = "#000000"; // Replace with a fallback color
      }
    });
  };

  const downloadPDF = () => {
    const input = contentRef.current;

    if (!input) {
      console.error("Ref is not set");
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf: any = new jsPDF();
        pdf.addImage(imgData, "PNG", 30, 10);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  useEffect(() => {
    preprocessContent();
  }, []);
  return (
    <div>
      <button onClick={downloadPDF}>Download PDF</button>
      <div ref={contentRef}>
        {/* Content you want to convert to PDF */}
        <h1>Hello, World!</h1>
        <p>This is a test PDF download.</p>
      </div>
    </div>
  );
};

export default PrintReportCard;
