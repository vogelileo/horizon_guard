let store = {
  'test-MAC': [
    {
      timeStamp: new Date().toISOString(),
      acc_x: 12,
      acc_y: 11,
      acc_z: 31,
      is_radar_1: true,
      is_radar_2: true,
      thermal_image: null,
      highest_temp: 12.5,
      lowest_temp: 12.5,
      average_temp: 12.5,
    },
  ],
};

const convertDataToCorrectValues = (dataWithStrings) => {
  return {
    sensorId: dataWithStrings.sensorId,
    acc_x: parseFloat(dataWithStrings.acc_x) || 0,
    acc_y: parseFloat(dataWithStrings.acc_y) || 0,
    acc_z: parseFloat(dataWithStrings.acc_z) || 0,
    is_radar_1: dataWithStrings.is_radar_1 === 'True',
    is_radar_2: dataWithStrings.is_radar_2 === 'True',
    thermal_image: dataWithStrings.thermal_image || null,
    highest_temp: parseFloat(dataWithStrings.highest_temp) || 0,
    lowest_temp: parseFloat(dataWithStrings.lowest_temp) || 0,
    average_temp: parseFloat(dataWithStrings.average_temp) || 0,
  };
};

const addDataPointToStore = (mac, data) => {
  if (!store[mac]) {
    store[mac] = [];
  }
  if (store[mac].length > 100) {
    store[mac].shift();
  }
  store[mac].push({ timeStamp: new Date().toISOString(), ...data });
};

const getStore = () => {
  return store;
};

export { getStore, addDataPointToStore, convertDataToCorrectValues };
