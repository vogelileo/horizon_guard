/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import controller from '../../../controller/sensor-controller.js';
import express from 'express';
import validate from '../../../middleware/validate.js';

const router = express.Router();

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const schema = {
  query: Joi.object({}),
  body: Joi.object({
    sensorId: Joi.string().required(),
    dataThermal: Joi.string().base64(),
    dataRadar: Joi.string().base64(),
    dataVibration: Joi.string().base64(),
  }),
};

const path = '/transferdata';

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post(path, validate(schema), controller.transferdata);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

export { router };
