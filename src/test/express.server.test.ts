import { ExpressServer } from '../modules/express.server';
import { Request, Response, NextFunction, Express } from 'express';
import { Container } from 'inversify';

class WebServer extends ExpressServer {
	registerApplicationDependencies(container: Container): void {
		throw new Error('Method not implemented.');
	}
	errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
		throw new Error('Method not implemented.');
	}
	setViewEngine(app: Express): void {
		throw new Error('Method not implemented.');
	}
	registerMiddleware(app: Express): void {
		throw new Error('Method not implemented.');
	}
}

describe('Testing ExpressServer base class', () => {
	let server: WebServer = null;

	beforeEach(() => {
		server = new WebServer();
	});

	afterEach(() => {
		server = null;
	});

	test('webServer should be defined', () => {
		expect(server).toBeDefined();
	});
});
