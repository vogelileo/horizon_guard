let store = {};

const upscaleImage = (data) => {
  const gridWidth = 32;
  const gridHeight = 24;
  const grid = [];
  console.log(data);
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

  const upscaledGrid = upscaleBilinear(grid, 64, 48);
  return upscaledGrid;
};

const addDataPointToStore = (mac, data) => {
  if (!store[mac]) {
    store[mac] = [];
  }
  if (store[mac].length > 100) {
    store[mac].shift();
  }
  // let obj = {
  //   ...data,
  //   timeStamp: new Date().toISOString(),
  // };

  // obj.thermalImage = upscaleImage(data.thermalImage);
  store[mac].push({
    timeStamp: new Date().toISOString(),
    ...data,
  });
};

const getStore = () => {
  return store;
};

export { getStore, addDataPointToStore };
