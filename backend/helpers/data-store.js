let store = {};

const upscaleImage = (data) => {
  const gridWidth = 32;
  const gridHeight = 24;
  const grid = [];
  for (let i = 0; i < gridHeight; i++) {
    grid[i] = data.slice(i * gridWidth, (i + 1) * gridWidth);
  }

  // Function to apply bilinear interpolation
  const upscaleBilinear = (src, newWidth, newHeight) => {
    const srcWidth = src[0].length;
    const srcHeight = src.length;
    const result = [];

    for (let y = 0; y < newHeight; y++) {
      const srcY = (y / (newHeight - 1)) * (srcHeight - 1);
      const y0 = Math.floor(srcY);
      const y1 = Math.min(y0 + 1, srcHeight - 1);
      const dy = srcY - y0;

      result[y] = [];

      for (let x = 0; x < newWidth; x++) {
        const srcX = (x / (newWidth - 1)) * (srcWidth - 1);
        const x0 = Math.floor(srcX);
        const x1 = Math.min(x0 + 1, srcWidth - 1);
        const dx = srcX - x0;

        // Bilinear interpolation formula
        const top = (1 - dx) * src[y0][x0] + dx * src[y0][x1];
        const bottom = (1 - dx) * src[y1][x0] + dx * src[y1][x1];
        result[y][x] = (1 - dy) * top + dy * bottom;
      }
    }

    return result;
  };

  const upscaledGrid = upscaleBilinear(grid, 32, 48);
  return upscaledGrid;
};

const addDataPointToStore = (mac, data) => {
  data = [
    26.85, 27.26, 26.21, 26.96, 26.99, 27.69, 27.77, 27.83, 27.27, 27.62, 27.25,
    27.19, 26.17, 25.72, 25.02, 25.14, 24.79, 24.84, 25.62, 25.71, 25.64, 26.03,
    26.15, 26.67, 27, 28, 27.83, 28.6, 28.17, 27.88, 28.33, 28.57, 27.19, 26.11,
    26.27, 25.03, 24.78, 24.55, 25.14, 25.32, 26.01, 26.05, 27.33, 27.44, 26.39,
    25.33, 24.99, 24.48, 25.06, 24.54, 25.3, 25.14, 25.31, 25.53, 26.19, 26.18,
    27.12, 27.07, 28.23, 28.01, 28.26, 28.24, 28.93, 28.5, 25.7, 25.44, 23.58,
    23.24, 22.39, 22.63, 22.93, 23.12, 23.14, 23.51, 24.14, 24.05, 24, 24.45,
    24.39, 24.93, 24.53, 24.59, 24.72, 25.14, 25.07, 25.24, 25.51, 26.41, 26.23,
    27.14, 27.89, 28.3, 27.84, 28.12, 28.15, 28.89, 25.32, 24.25, 23, 22.7,
    23.05, 22.78, 22.8, 22.81, 22.75, 22.88, 23.59, 23.14, 23.14, 23.53, 23.99,
    23.73, 24.47, 24.32, 24.75, 24.73, 25.19, 24.77, 25.85, 25.42, 26.3, 26.38,
    27.46, 27.56, 28.1, 27.96, 28.57, 28.09, 23.34, 22.7, 22.01, 22.73, 21.6,
    22.2, 22.3, 22.62, 22.46, 22.1, 22.64, 22.51, 22.18, 22.23, 22.18, 22.67,
    22.67, 23.26, 23.91, 24.22, 24.49, 24.8, 25.12, 25.81, 25.75, 26.15, 26.97,
    27.58, 27.89, 27.74, 28.22, 28.59, 22.94, 22.06, 22.73, 22.48, 22.47, 22.29,
    22.2, 22.06, 22.02, 21.68, 22.36, 22.2, 22.4, 22.29, 22.33, 22.15, 22.22,
    22.3, 23.16, 23.07, 24.28, 24.2, 25.12, 25.07, 25.68, 26.06, 27.05, 27.45,
    27.61, 27.73, 28.22, 27.97, 22.09, 22.35, 22.19, 22.41, 22.44, 22.66, 22.86,
    23.07, 21.92, 21.83, 21.57, 21.68, 21.77, 21.61, 21.5, 22.01, 21.53, 21.97,
    22.17, 22.57, 22.59, 22.76, 23.88, 24.23, 25.12, 25.77, 26.45, 27.18, 27.23,
    27.76, 27.95, 28.56, 22.18, 22.09, 22.45, 21.99, 22.07, 22.5, 22.71, 22.83,
    22.13, 21.64, 22.55, 22.22, 21.91, 21.4, 21.62, 21.28, 21.61, 21.85, 22.46,
    22.15, 22.72, 22.63, 23.68, 23.76, 24.88, 25.27, 26.65, 26.87, 27.39, 27.41,
    28.26, 28.11, 22, 22.2, 21.59, 22.29, 22.07, 22.04, 22.06, 21.99, 21.08,
    21.86, 21.86, 22.32, 21.71, 21.88, 21.64, 21.22, 21.5, 21.71, 21.54, 21.85,
    22.08, 22.49, 22.9, 23.63, 24.32, 25.14, 25.8, 26.7, 26.89, 27.71, 28.03,
    28.08, 22.25, 21.97, 22.06, 22.18, 22.41, 21.91, 22.04, 21.79, 21.45, 21.56,
    22, 22.12, 22, 21.61, 21.39, 20.87, 22.26, 21.89, 21.96, 21.48, 21.75, 21.8,
    22.78, 23.16, 24.68, 24.71, 26.04, 26.08, 27.29, 27.12, 28.08, 27.83, 21.49,
    22.03, 22.58, 22.63, 21.99, 22.16, 21.35, 21.32, 21.38, 21.78, 21.77, 21.91,
    21.68, 21.68, 20.74, 20.98, 21.81, 21.96, 21.94, 22.72, 21.77, 21.76, 21.97,
    23.02, 24.33, 24.9, 25.73, 26.29, 26.76, 27.26, 27.86, 27.9, 22.21, 21.84,
    22.8, 22.26, 22.79, 22.29, 21.52, 21.19, 21.76, 21.65, 21.96, 21.8, 21.7,
    20.97, 20.73, 21.31, 22.14, 22.07, 22.21, 22.16, 21.96, 21.87, 22.74, 22.93,
    24.64, 24.45, 25.76, 25.89, 26.99, 26.96, 27.98, 27.79, 21.98, 22.67, 22.73,
    23.07, 22.32, 21.98, 21.45, 22.37, 22.13, 21.89, 21.63, 22.02, 21.29, 20.78,
    20.77, 21.91, 22.27, 21.85, 21.99, 22.11, 21.4, 21.74, 23.28, 23.55, 24.26,
    24.47, 25.16, 26.18, 26.31, 26.88, 27.86, 27.87, 22.41, 22.87, 22.74, 23.1,
    22.2, 21.3, 21.73, 22.2, 22.21, 21.89, 21.92, 21.88, 21.35, 20.63, 21.36,
    21.86, 21.94, 21.71, 22.01, 22.09, 21.62, 21.53, 22.74, 23.64, 24.56, 24.5,
    25.46, 25.49, 26.66, 26.63, 27.58, 28.16, 21.97, 22.11, 22.43, 22.47, 21.27,
    21.12, 22.73, 22.8, 22.04, 22.37, 22.06, 22.47, 20.52, 19.97, 21.39, 22.1,
    21.71, 21.8, 21.65, 22, 21.06, 21.44, 22.67, 23.36, 24.18, 24.49, 25.04,
    25.98, 26.5, 26.64, 27.01, 26.93, 23.06, 21.95, 22.18, 21.57, 20.84, 20.98,
    23.33, 22.69, 22.44, 22.18, 22.58, 22.04, 20.32, 20, 21.82, 21.7, 21.89,
    21.48, 21.87, 21.68, 21.24, 21.38, 22.58, 23.19, 24.34, 24.37, 25.32, 25.38,
    26.32, 26.08, 26.69, 26.8, 24.02, 23.19, 21.56, 21.05, 20.33, 21.45, 22.71,
    23.08, 22.29, 22.6, 22.54, 22.12, 19.78, 20.21, 21.68, 21.93, 21.53, 21.51,
    21.72, 21.57, 20.82, 21.22, 22.21, 23.06, 24.05, 24.4, 24.99, 25.66, 25.77,
    26.01, 26.38, 27.1, 24.51, 23.81, 22.54, 21.25, 20.84, 21.32, 22.59, 22.44,
    22.53, 22.32, 22.53, 21.97, 19.91, 20.6, 21.87, 21.85, 21.87, 21.51, 21.67,
    21.12, 21.03, 21.38, 22.81, 23.22, 24.14, 24.24, 25.35, 25.33, 26.03, 26.12,
    26.68, 26.77, 25.57, 25.06, 23.85, 23.79, 22.62, 22.96, 22.08, 22.21, 22.04,
    22.23, 21.63, 20.61, 19.95, 20.96, 21.6, 21.84, 21.27, 21.61, 21.47, 21.28,
    20.68, 21.34, 22.55, 23.49, 24.31, 24.61, 25.07, 25.92, 25.95, 26.17, 26.58,
    27.54, 25.98, 25.55, 25.14, 24.54, 24.09, 23.43, 22.77, 22.25, 21.82, 21.7,
    21.2, 19.25, 20.1, 20.72, 21.61, 21.41, 21.73, 21.32, 21.63, 20.7, 21.1,
    21.34, 23.14, 23.25, 24.36, 24.17, 25.45, 25.51, 26.09, 25.9, 26.91, 27.09,
    26.32, 25.85, 25.72, 25.63, 25.11, 24.84, 24.31, 24.15, 22.9, 22.61, 20.42,
    19.89, 19.42, 19.42, 20.09, 21.13, 20.78, 20.91, 20.37, 20.35, 20.64, 21.21,
    22.78, 23.72, 23.99, 24.63, 25.51, 25.89, 26.21, 26.9, 27.05, 27.81, 26.5,
    26.35, 25.98, 25.81, 25.41, 25.27, 25.38, 24.81, 24.1, 23.66, 22.1, 21.24,
    20.2, 20.09, 20.52, 20.86, 19.85, 19.86, 20.25, 19.95, 20.52, 20.73, 23.1,
    23.37, 24.29, 24.18, 25.3, 25.65, 26.9, 27.02, 27.78, 27.23, 27.14, 27.38,
    26.27, 26.22, 25.78, 25.77, 25.26, 25.54, 24.77, 24.82, 24.12, 24.41, 22.96,
    22.88, 22.25, 22.49, 21.8, 21.98, 21.39, 21.75, 20.02, 20.38, 22.83, 23.67,
    23.91, 24.48, 25.01, 26.14, 26.5, 26.69, 28.15, 28.22, 27.66, 27.15, 27.19,
    26.16, 25.98, 25.87, 26.03, 25.86, 25.18, 24.91, 24.94, 24.74, 23.97, 23.83,
    23.73, 23.28, 23.2, 23.02, 22.92, 22.91, 21.6, 21.38, 23.3, 24.05, 24.13,
    24.24, 25.3, 25.63, 27.23, 27.03, 27.46, 27.91,
  ];
  if (!store[mac]) {
    store[mac] = [];
  }
  if (store[mac].length > 100) {
    store[mac].shift();
  }
  let obj = {
    ...data,
    timeStamp: new Date().toISOString(),
  };

  (obj.thermalImage = upscaleImage(data.thermalImage)), store[mac].push(obj);
};

const getStore = () => {
  return store;
};

export { getStore, addDataPointToStore };
