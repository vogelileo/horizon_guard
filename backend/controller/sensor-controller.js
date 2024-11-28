/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { addDataPointToStore, getStore } from '../helpers/data-store.js';
import {
  intruderRadar,
  intruderThermal,
  intruderVibration,
} from '../helpers/intruder-detection.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const getSensorData = async (req, res) => {
  try {
    let store = getStore();

    let result = Object.keys(store).map((mac) => {
      let lastE = store[mac][store[mac].length - 1];
      return {
        name: 'TEMP Edge ESP32',
        id: mac,
        lastUpdate: lastE.timeStamp,
        location: 'TEMP Süd West',
        intruderDetected: true,
        // intruderRadar() || intruderVibration() || intruderThermal(),
        vibrationEnabled:
          lastE.acc_x !== 0 && lastE.acc_y !== 0 && lastE.acc_z !== 0,
        radarEnabled1: typeof lastE.is_radar_1 === 'number',
        radarEnabled2: typeof lastE.is_radar_2 === 'number',
        thermalEnabled:
          lastE.highest_temp !== 0 &&
          lastE.lowest_temp !== 0 &&
          lastE.average_temp !== 0,
        thermalImage: thermalImage,
      };
    });

    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const transferdata = async (req, res) => {
  try {
    addDataPointToStore(req.body.sensorId, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { getSensorData, transferdata };
