import './App.scss';

import { useEffect, useState } from 'react';

import Header from './components/Header';
import SensorCard from './components/SensorCard';
import axios from 'axios';

const App = () => {
  const [sensors, setSensor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'http://10.0.24.1:3001/api/horizon-guard/getSensorData'
      );
      setSensor(res.data.data);
    };
    fetchData();

    let intervalId = setInterval(fetchData, 300);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header />
      <div className='d-f fd-c'>
        <div className='d-f fd-c mt-1'>
          <h4 className='m-1'>System Status: ONLINE</h4>
          <h4 className='m-1'>Amount of connected sensors: {sensors.length}</h4>
        </div>
        <div>
          {sensors.length > 0 &&
            sensors.map((sensor, index) => (
              <SensorCard
                key={index}
                name={sensor.name}
                id={sensor.id}
                lastUpdate={sensor.lastUpdate}
                location={sensor.location}
                intruderDetected={sensor.intruderDetected}
                vibrationEnabled={sensor.vibrationEnabled}
                radarEnabled1={sensor.radarEnabled1}
                radarEnabled2={sensor.radarEnabled2}
                thermalEnabled={sensor.thermalEnabled}
                thermalImage={sensor.thermalImage}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
