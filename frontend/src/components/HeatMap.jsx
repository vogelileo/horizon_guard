import React, { useEffect, useRef } from 'react';

const ThermalImage = ({ thermalImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    console.log(thermalImage);

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth; // Match parent width
      canvas.height = (parent.offsetWidth / 32) * 24; // Maintain 32:24 aspect ratio

      drawThermalImage(); // Redraw the image after resizing
    };

    const drawThermalImage = () => {
      const ctx = canvas.getContext('2d');

      // Normalize values to range [0, 1]
      const min = Math.min(...thermalImage);
      const max = Math.max(...thermalImage);

      const normalize = (value) => (value - min) / (max - min);

      // Define grid dimensions
      const rows = 24;
      const cols = 32;
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the thermal grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const value = thermalImage[row * cols + col] || 0; // Default to 0 if undefined

          // Normalize the value
          const normalizedValue = normalize(value);

          // Map the normalized value to a blue-to-red gradient
          const red = Math.floor(normalizedValue * 255);
          const blue = 255 - red;

          ctx.fillStyle = `rgb(${red}, 0, ${blue})`;

          ctx.fillRect(
            col * cellWidth,
            row * cellHeight,
            cellWidth,
            cellHeight
          );
        }
      }
    };

    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);

    // Initialize canvas size and draw
    resizeCanvas();

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [thermalImage]);

  return (
    <div
      style={{
        width: '100%',
        border: '1px solid black pt-2',
        position: 'relative',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default ThermalImage;
