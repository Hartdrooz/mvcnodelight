import { ExpressServer } from '../modules/express.server';
import { Request, Response, NextFunction, Express, Router } from 'express';
import { Container, injectable } from 'inversify';
import { IController, controller } from '../core';

export const TYPES_TEST = {
	MyService: Symbol.for('MyService')
};

export interface IMyService {
	helloWorld(): string;
}

@injectable()
export class MyService implements IMyService {
	helloWorld(): string {
		return 'hello world';
	}
}

@controller()
export class HomeController implements IController {
	registerRoutes(router: Router): void {
		router.get('/', (req: Request, res: Response) => {
			res.json('hello world');
		});
	}
}

export class WebServer extends ExpressServer {
	initApplication(container: Container): Promise<Error> {
		const promise = Promise.resolve(null);
		return promise;
	}
	setStaticFolder(): string[] {
		return null;
	}
	getPort() {
		return this.Port;
	}

	private _ioc: Container;
	getIoc(): Container {
		return this._ioc;
	}

	setPort(): number {
		return 8101;
	}

	registerApplicationDependencies(container: Container): void {
		container
			.bind<IMyService>(TYPES_TEST.MyService)
			.to(MyService)
			.inTransientScope();

		this._ioc = container;
	}
	errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {}
	setViewEngine(app: Express): void {}
	registerMiddleware(app: Express): void {}

	// Override the start, it's unit test so no need
	// to start the server
	startApp() {}
}
