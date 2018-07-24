import { ExpressServer } from '../modules/express.server';
import { Request, Response, NextFunction, Express, Router } from 'express';
import { Container } from 'inversify';
import { IController } from '../core';
export declare const TYPES_TEST: {
    MyService: symbol;
};
export interface IMyService {
    helloWorld(): string;
}
export declare class MyService implements IMyService {
    helloWorld(): string;
}
export declare class HomeController implements IController {
    registerRoutes(router: Router): void;
}
export declare class WebServer extends ExpressServer {
    initApplication(container: Container): Promise<Error>;
    setStaticFolder(): string[];
    getPort(): number;
    private _ioc;
    getIoc(): Container;
    setPort(): number;
    registerApplicationDependencies(container: Container): void;
    errorHandler(err: any, req: Request, res: Response, next: NextFunction): void;
    setViewEngine(app: Express): void;
    registerMiddleware(app: Express): void;
    startApp(): void;
}
