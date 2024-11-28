import Activity from '../assets/activity.svg?react';
import Available from '../assets/checkmark--filled.svg?react';
import Camera from '../assets/camera.svg?react';
import ConnectionOff from '../assets/connection-signal--off.svg?react';
import ConnectionOn from '../assets/connection-signal.svg?react';
import Radar from '../assets/radar.svg?react';
import WarningHex from '../assets/warning--hex--filled.svg?react';

const SensorCard = ({
  name,
  id,
  lastUpdate,
  location,
  intruderDetected,
  vibrationEnabled,
  radarEnabled1,
  radarEnabled2,
  thermalEnabled,
  thermalImage,
}) => {
  return (
    <div className='m-1 bcol-ibm-gray-30 sensor'>
      <div className='bcol-ibm-blue-40 d-f f-jb sensor-title'>
        <div>
          <h2 className='ml-1 mr-2 mb-1 text-bold'>{name}</h2>
          <div className='d-f fd-c'>
            <h5 className='m-1'>ID: {id}</h5>
            <h5 className='m-1'>Last update: {lastUpdate}</h5>
            <h5 className='m-1'>Location: {location}</h5>
          </div>
        </div>
        <div className='d-f f-jc m-3 w50p'>
          {new Date() - new Date(lastUpdate) > 50000 ? (
            <ConnectionOff className='img-w' />
          ) : (
            <ConnectionOn className='img-w' />
          )}
          {console.log(
            new Date() - new Date(lastUpdate),
            new Date(),
            new Date(lastUpdate)
          )}

          <WarningHex
            className='img-w'
            fill={intruderDetected ? 'red' : '#78a9ff'}
          />
        </div>
      </div>

      <div className='d-f fd-c'>
        <div className='p-1 d-f' style={{ borderBottom: '1px solid black' }}>
          <Radar className='mr-3 img-h' />
          {radarEnabled1 ? <Available fill='green' /> : <></>}
        </div>
        <div className='p-1 d-f' style={{ borderBottom: '1px solid black' }}>
          <Radar className='mr-3 img-h' />
          {radarEnabled2 ? <Available fill='green' /> : <></>}
        </div>
        <div className='p-1 d-f' style={{ borderBottom: '1px solid black' }}>
          <Activity className='mr-3 img-h' />
          {vibrationEnabled ? <Available fill='green' /> : <></>}
        </div>
        <div
          className='p-1 d-f fd-c'
          style={{ borderBottom: '1px solid black' }}
        >
          <div className='d-f'>
            <Camera className='mr-3 img-h' />
            {thermalEnabled ? <Available fill='green' /> : <></>}
          </div>
          {thermalImage}
        </div>
        {intruderDetected ? (
          <button
            onClick={(e) =>
              window.alert('You need the advanced License for this :)')
            }
            className='cursor-pointer m-2 bcol-ibm-red-60 text-bold col-ibm-white'
          >
            -- DETONATE --
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SensorCard;
