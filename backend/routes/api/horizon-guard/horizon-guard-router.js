/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import express from 'express';
import { router as registerRoute } from './register-route.js';
import { router as transferDataRoute } from './transferdata-route.js';

const router = express.Router();

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.use(registerRoute);
router.use(transferDataRoute);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

export { router };
