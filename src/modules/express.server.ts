import 'reflect-metadata';
import { Container } from 'inversify';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Express, Request, Response, NextFunction } from 'express';

import { ILogger, ILoggerService, LoggerConsole, LoggerService } from '../services';
import { IStackTraceService, StackTraceService } from '../services/stack';
import { ReflectionApi } from './reflection';
import { FRAMEWORK_TYPES, IController } from '../core';

export abstract class ExpressServer {
	private readonly DEFAULT_PORT = 3000;

	private _app: Express;
	private _container: Container;
	private _port: number;

	protected get Port(): number {
		if (this._port == null) {
			if (process.env.PORT) return parseInt(process.env.PORT);

			return this.DEFAULT_PORT;
		}
		return this._port;
	}

	constructor() {
		this._app = express();
		this._container = new Container();
	}

	start(): void {
		this.bootStrap();
	}

	// Abstract functions
	abstract setPort(): number;
	abstract registerApplicationDependencies(container: Container): void;
	abstract errorHandler(err: any, req: Request, res: Response, next: NextFunction): void;
	abstract setViewEngine(app: Express): void;
	abstract setStaticFolder(): Array<string>;
	abstract registerMiddleware(app: Express): void;
	abstract initApplication(container: Container): Promise<Error>;

	// Protected function
	protected startServer(): void {
		this._app.listen(this._port, () => {});
	}

	// Private functions

	private bootStrap(): void {
		this.registerApplicationDependencies(this._container);
		this.registerDependencies();
		this.registerMiddleware(this._app);
		this._port = this.setPort();
		this.loadControllers();

		this._app.use(bodyParser.json());
		this._app.use(bodyParser.urlencoded({ extended: true }));

		this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
			// We log the error
			const logService = this._container.get<ILoggerService>(FRAMEWORK_TYPES.LogService);
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
				} else {
					this.startApp();
				}
			})
			.catch(error => {
				this.stopApp(error);
			});
	}

	private registerDependencies(): void {
		this._container
			.bind<ILogger>(FRAMEWORK_TYPES.Logger)
			.to(LoggerConsole)
			.inSingletonScope();

		this._container
			.bind<ILoggerService>(FRAMEWORK_TYPES.LogService)
			.to(LoggerService)
			.inSingletonScope();

		this._container
			.bind<IStackTraceService>(FRAMEWORK_TYPES.StackService)
			.to(StackTraceService)
			.inSingletonScope();
	}

	private loadControllers() {
		const constructors = ReflectionApi.getControllersFromMetadata();

		if (constructors.length == 0) {
			console.log('no controllers registered');
			return;
		}

		constructors.forEach(constructor => {
			const name = constructor.name;

			// Validate if this controller is already registerd
			if (this._container.isBoundNamed(FRAMEWORK_TYPES.Controller, name)) {
				throw new Error(`Duplicate registered controller ${name}`);
			}

			this._container
				.bind(FRAMEWORK_TYPES.Controller)
				.to(constructor)
				.whenTargetNamed(name);
		});

		let controllers = ReflectionApi.getControllersFromContainer(this._container);

		controllers.forEach((controller: IController) => {
			const metadata = ReflectionApi.getControllerMetadata(controller.constructor);
			const router = express.Router();
			controller.registerRoutes(router);
			this._app.use(metadata.path, router);
		});
	}

	/**
	 * This method is protected
	 * to be able to override it for
	 * unit testing
	 */
	protected startApp() {
		// Start the server
		this._app.listen(this.Port, () => {
			console.log(`Server listening on port ${this.Port}`);
		});
	}

	private stopApp(error: Error) {
		const loggerService = this._container.get<ILoggerService>(FRAMEWORK_TYPES.LogService);
		loggerService.error(error);
	}
}
