let store = {};

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

export { getStore, addDataPointToStore };
