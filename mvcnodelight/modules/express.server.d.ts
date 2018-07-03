import 'reflect-metadata';
import { Container } from 'inversify';
import { Express, Request, Response, NextFunction } from 'express';
export declare abstract class ExpressServer {
    private readonly DEFAULT_PORT;
    private _app;
    private _container;
    private _port;
    protected readonly Port: number;
    constructor();
    start(): void;
    abstract setPort(): number;
    abstract registerApplicationDependencies(container: Container): void;
    abstract errorHandler(err: any, req: Request, res: Response, next: NextFunction): void;
    abstract setViewEngine(app: Express): void;
    abstract setStaticFolder(): Array<string>;
    abstract registerMiddleware(app: Express): void;
    protected startServer(): void;
    private bootStrap;
    private registerDependencies;
    private loadControllers;
}
