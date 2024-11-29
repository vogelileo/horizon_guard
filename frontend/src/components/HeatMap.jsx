import { useEffect, useRef } from 'react';

const ThermalCanvas = (thermalImage) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Set the canvas size to match its parent element
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth; // Match parent width
      canvas.height = (parent.offsetWidth / 32) * 24; // Maintain 32:24 aspect ratio

      drawThermalImage(); // Redraw the image after resizing
    };

    // Draw the thermal image
    const drawThermalImage = () => {
      const ctx = canvas.getContext('2d');

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
          const value = thermalImage[row * cols + col];

          // Map the value to a color (blue to red gradient)
          const red = Math.min(255, value * 2.55);
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
    <div style={{ width: '100%', position: 'relative' }} className='mt-2'>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default ThermalCanvas;
