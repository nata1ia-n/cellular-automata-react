import React, { useEffect, useRef } from "react";

interface CellularAutomatonCanvasProps {
  generations: number[][];
}

const CellularAutomatonCanvas: React.FC<CellularAutomatonCanvasProps> = ({
  generations,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Unable to get 2D context");
      return;
    }
    console.log("🌺 generations: ", generations);

    // canvas dimensions
    const cols = generations[0].length;
    const rows = generations.length;
    const cellSize = 450 / rows;
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    // drawing cells
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const bit = generations[rowIndex][colIndex];
        context.fillStyle = bit === 1 ? "black" : "white";
        context.fillRect(
          colIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        );
      }
    }
    console.log("Canvas should now be updated");

  }, [generations]);

  return <canvas ref={canvasRef} />;
};

export default CellularAutomatonCanvas;
