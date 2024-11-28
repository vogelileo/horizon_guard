/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import express from 'express';
import expressLoader from './express-loader.js';
import routesLoader from './routes-loader.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/
const app = express();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/
const start = async () => {
  await initLoaders(app);
  return app;
};

const initLoaders = async (app) => {
  await expressLoader(app);
  console.log('Express loaded successfully');

  await routesLoader(app);
  console.log('Routes loaded successfully');
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
// Export app such that Jest can use it for testing

export default start;
