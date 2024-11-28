/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// const MemoryStore = createMemoryStore(session);

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const expressLoader = async (app) => {
  //Payload limit
  app.use(express.json({ limit: '8mb' }));

  // Handle CORS (so far allow all origins)
  app.use(cors());

  //Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // //session
  // app.use(
  //   session({
  //     secret: config.secretKeys.expressSessionSecret,
  //     resave: true,
  //     store: new MemoryStore(),
  //     saveUninitialized: true,
  //   })
  // );

  //Loggin Requests
  app.use(morgan('tiny'));
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default expressLoader;
