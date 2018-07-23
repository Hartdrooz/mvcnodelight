"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const express = require("express");
const bodyParser = require("body-parser");
const services_1 = require("../services");
const stack_1 = require("../services/stack");
const reflection_1 = require("./reflection");
const core_1 = require("../core");
class ExpressServer {
    constructor() {
        this.DEFAULT_PORT = 3000;
        this._app = express();
        this._container = new inversify_1.Container();
    }
    get Port() {
        if (this._port == null) {
            if (process.env.PORT)
                return parseInt(process.env.PORT);
            return this.DEFAULT_PORT;
        }
        return this._port;
    }
    start() {
        this.bootStrap();
    }
    // Protected function
    startServer() {
        this._app.listen(this._port, () => { });
    }
    // Private functions
    bootStrap() {
        this.registerApplicationDependencies(this._container);
        this.registerDependencies();
        this.registerMiddleware(this._app);
        this._port = this.setPort();
        this.loadControllers();
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use((err, req, res, next) => {
            // We log the error
            const logService = this._container.get(core_1.FRAMEWORK_TYPES.LogService);
            logService.error(err);
            this.errorHandler(err, req, res, next);
        });
        // Set the view engine in case of a website
        this.setViewEngine(this._app);
        // Get all static folders to set in the express engine
        const folders = this.setStaticFolder();
        if (folders) {
            folders.forEach(f => {
                this._app.use(express.static(f));
            });
        }
        // Init some services if needed
        this.initApplication(this._container)
            .then(error => {
            if (error) {
                this.stopApp(error);
            }
            else {
                this.startApp();
            }
        })
            .catch(error => {
            this.stopApp(error);
        });
    }
    registerDependencies() {
        this._container
            .bind(core_1.FRAMEWORK_TYPES.Logger)
            .to(services_1.LoggerConsole)
            .inSingletonScope();
        this._container
            .bind(core_1.FRAMEWORK_TYPES.LogService)
            .to(services_1.LoggerService)
            .inSingletonScope();
        this._container
            .bind(core_1.FRAMEWORK_TYPES.StackService)
            .to(stack_1.StackTraceService)
            .inSingletonScope();
    }
    loadControllers() {
        const constructors = reflection_1.ReflectionApi.getControllersFromMetadata();
        if (constructors.length == 0) {
            console.log('no controllers registered');
            return;
        }
        constructors.forEach(constructor => {
            const name = constructor.name;
            // Validate if this controller is already registerd
            if (this._container.isBoundNamed(core_1.FRAMEWORK_TYPES.Controller, name)) {
                throw new Error(`Duplicate registered controller ${name}`);
            }
            this._container
                .bind(core_1.FRAMEWORK_TYPES.Controller)
                .to(constructor)
                .whenTargetNamed(name);
        });
        let controllers = reflection_1.ReflectionApi.getControllersFromContainer(this._container);
        controllers.forEach((controller) => {
            const metadata = reflection_1.ReflectionApi.getControllerMetadata(controller.constructor);
            const router = express.Router();
            controller.registerRoutes(router);
            this._app.use(metadata.path, router);
        });
    }
    startApp() {
        // Start the server
        this._app.listen(this.Port, () => {
            console.log(`Server listening on port ${this.Port}`);
        });
    }
    stopApp(error) {
        const loggerService = this._container.get(core_1.FRAMEWORK_TYPES.LogService);
        loggerService.error(error);
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=express.server.js.map