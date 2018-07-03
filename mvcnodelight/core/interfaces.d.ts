import { Router } from 'express';
export interface IControllerMetadata {
    path: string;
    target: any;
}
export interface IController {
    registerRoutes(router: Router): void;
}
