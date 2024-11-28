/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import controller from '../../../controller/root-controller.js';
import express from 'express';
import validate from '../../../middleware/validate.js';

const router = express.Router();

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const schema = {
  query: Joi.object({}),
  body: Joi.object({}),
};

const path = '/';

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post(path, validate(schema), controller.root);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

export { router };
