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
    acc_x: Joi.string(),
    acc_y: Joi.string(),
    acc_z: Joi.string(),
    is_radar_1: Joi.string(),
    is_radar_2: Joi.string(),
    thermal_image: Joi.string(),
    highest_temp: Joi.string(),
    lowest_temp: Joi.string(),
    average_temp: Joi.string(),
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
