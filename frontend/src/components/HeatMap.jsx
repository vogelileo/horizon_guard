import { useEffect, useRef } from 'react';

const ThermalImage = ({ thermalImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    console.log(thermalImage);

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth; // Match parent width
      canvas.height = (parent.offsetWidth / 128) * 96; // Maintain 32:24 aspect ratio

      drawThermalImage(); // Redraw the image after resizing
    };

    const drawThermalImage = () => {
      const ctx = canvas.getContext('2d');

      // Normalize values to range [0, 1]
      const min = Math.min(...thermalImage);
      const max = Math.max(...thermalImage);

      const normalize = (value) => (value - min) / (max - min);

      // Define grid dimensions
      const originalRows = 24;
      const originalCols = 32;
      const upscaledRows = 96;
      const upscaledCols = 128;
      const cellWidth = canvas.width / upscaledCols;
      const cellHeight = canvas.height / upscaledRows;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the thermal grid
      for (let row = 0; row < upscaledRows; row++) {
        for (let col = 0; col < upscaledCols; col++) {
          const origX = (col / upscaledCols) * (originalCols - 1);
          const origY = (row / upscaledRows) * (originalRows - 1);

          // Find the integer coordinates of the original pixel
          const x0 = Math.floor(origX);
          const x1 = Math.min(x0 + 1, originalCols - 1);
          const y0 = Math.floor(origY);
          const y1 = Math.min(y0 + 1, originalRows - 1);
          const bilinearInterpolate = (image, x0, y0, x1, y1, dx, dy) => {
            const topLeft = image[y0 * 32 + x0]; // Original value at (x0, y0)
            const topRight = image[y0 * 32 + x1]; // Original value at (x1, y0)
            const bottomLeft = image[y1 * 32 + x0]; // Original value at (x0, y1)
            const bottomRight = image[y1 * 32 + x1]; // Original value at (x1, y1)

            // Interpolate along the x-axis
            const top = topLeft + (topRight - topLeft) * dx;
            const bottom = bottomLeft + (bottomRight - bottomLeft) * dx;

            // Interpolate along the y-axis
            return top + (bottom - top) * dy;
          };

          // Interpolate the thermal value at (origX, origY) using bilinear interpolation
          const value = bilinearInterpolate(
            thermalImage,
            x0,
            y0,
            x1,
            y1,
            origX - x0,
            origY - y0
          );

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
        border: '1px solid black',
        position: 'relative',
      }}
      className='mt-2'
    >
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default ThermalImage;
