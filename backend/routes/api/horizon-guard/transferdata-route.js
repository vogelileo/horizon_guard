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
    acc_x: Joi.number(),
    acc_y: Joi.number(),
    acc_z: Joi.number(),
    is_radar_1: Joi.boolean(),
    is_radar_2: Joi.boolean(),
    thermalImage: Joi.array(),
    highest_temp: Joi.number(),
    lowest_temp: Joi.number(),
    average_temp: Joi.number(),
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
