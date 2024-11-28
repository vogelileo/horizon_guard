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
    type: Joi.string().valid('thermal', 'radar', 'vibration').required(),
  }),
};

const path = '/register';

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post(path, validate(schema), controller.register);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

export { router };
