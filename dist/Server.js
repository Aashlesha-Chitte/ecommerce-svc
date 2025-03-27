"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const error_1 = require("./libs/error");
const routes_1 = require("./libs/routes");
const router_1 = __importDefault(require("./router"));
class Server {
    constructor(config) {
        this.config = config;
        this.app = (0, express_1.default)();
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
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initCors();
            this.initJsonParser();
            this.setupRoutes();
            return this.app;
        });
    }
    /**
     * This will Setup all the routes in the system
     *
     * @returns -Instance of Current Object
     * @memberof Server
     */
    setupRoutes() {
        this.app.use('/ecommerce-ui', router_1.default);
        // catch 404 and forward to error handler
        this.app.use(routes_1.notFoundRoutes);
        // error handler, send stacktrace only during development
        this.app.use(error_1.errorHandler);
    }
    /**
     * This will run the server at specified port after opening up of Database
     *
     * @returns -Instance of Current Object
     */
    run() {
        // Listen on port config.port
        const { port, env } = this.config;
        this.startServer(port, env); // Start the server directly
        return this;
    }
    startServer(port, env) {
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
    initCors() {
        var _a;
        const corsOrigin = (_a = this.config) === null || _a === void 0 ? void 0 : _a.corsOrigin;
        if (typeof corsOrigin === 'string') {
            try {
                // Try parsing if corsOrigin is a JSON string
                this.app.use((0, cors_1.default)({
                    optionsSuccessStatus: 200,
                    origin: JSON.parse(corsOrigin) || '*',
                }));
            }
            catch (error) {
                console.error(`Failed to parse corsOrigin: ${error.message}`);
                // Fallback to '*'
                this.app.use((0, cors_1.default)({
                    optionsSuccessStatus: 200,
                    origin: '*',
                }));
            }
        }
        else {
            // Fallback for non-string or undefined
            console.warn(`corsOrigin is not a valid string. Falling back to '*'`);
            this.app.use((0, cors_1.default)({
                optionsSuccessStatus: 200,
                origin: '*',
            }));
        }
    }
    initJsonParser() {
        this.app.use(bodyParser.json({ limit: '2mb' }));
        this.app.use(express_1.default.json({ limit: '2mb' }));
        this.app.use(express_1.default.urlencoded({
            extended: true,
            parameterLimit: 100000,
        }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map