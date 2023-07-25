import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import Database from './libs/Database';
import * as bodyParser from 'body-parser';

import { errorHandler } from './libs/error';
import { notFoundRoutes } from './libs/routes';
import router from './router';

export default class Server {
  private app: Application;

  constructor(private config: any) {
    this.app = express();
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  public async bootstrap() {
    this.initCors();
    this.initJsonParser();
    this.setupRoutes();

    return this.app;
  }

  /**
   * This will Setup all the routes in the system
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
  public setupRoutes() {
    this.app.use(
      '/api',
      router,
    );

    // catch 404 and forward to error handler
    this.app.use(notFoundRoutes);

    // error handler, send stacktrace only during development
    this.app.use(errorHandler);
  }
  /**
   * This will run the server at specified port after opening up of Database
   *
   * @returns -Instance of Current Object
   */
  public run() {
    // open Database & listen on port config.port
    const { port, env, mongoAdmin } = this.config;
    Database.open({ mongoUri: mongoAdmin, testEnv: false }).then(() => {
      this.app.listen(port, async () => {
        console.info(`Mongo service running...`);
        const message = `|| App is running at port '${port}' in '${env}' mode ||`;
        console.info(message);
        console.info('Press CTRL-C to stop\n');
      });
    }).catch((err) => console.error('DB connection err::', err));
    return this;
  }
  /**
   *
   * Lets you to enable cors
   */
  private initCors() {
    this.app.use(cors({
      optionsSuccessStatus: 200,
      origin: JSON.parse(this.config.corsOrigin),
    }));
  }
  private initJsonParser() {
    this.app.use(bodyParser.json({ limit: '2mb' }));
    this.app.use(express.json({ limit: '2mb' }));
    this.app.use(express.urlencoded({
      extended: true,
      parameterLimit: 100000,
    }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}
