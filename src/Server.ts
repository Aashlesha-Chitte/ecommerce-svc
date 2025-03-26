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
    this.app.get('/', (req, res) => {
      return res.send('Express Typescript on Vercel');
    });
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
    // Listen on port config.port
    const { port, env } = this.config;

    this.startServer(port, env); // Start the server directly

    return this;
}

private startServer(port: number, env: string) {
    this.app.listen(port, () => {
        console.info(`Mongo service running...`);
        const message = `|| App is running at port '${port}' in '${env}' mode ||`;
        console.info(message);
        console.info('Press CTRL-C to stop\n');
    });
}
  /**
   *
   * Lets you to enable cors
   */
  private initCors() {
    const corsOrigin = this.config?.corsOrigin;

    if (typeof corsOrigin === 'string') {
        try {
            // Try parsing if corsOrigin is a JSON string
            this.app.use(cors({
                optionsSuccessStatus: 200,
                origin: JSON.parse(corsOrigin) || '*',
            }));
        } catch (error) {
            console.error(`Failed to parse corsOrigin: ${(error as Error).message}`);
            // Fallback to '*'
            this.app.use(cors({
                optionsSuccessStatus: 200,
                origin: '*',
            }));
        }
    } else {
        // Fallback for non-string or undefined
        console.warn(`corsOrigin is not a valid string. Falling back to '*'`);
        this.app.use(cors({
            optionsSuccessStatus: 200,
            origin: '*',
        }));
    }
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
