import { IController, IControllerMetadata } from '../core';
import { Container } from 'inversify';
export declare class ReflectionApi {
    static getControllersFromMetadata(): Array<any>;
    static cleanUpMetadata(): void;
    static getControllersFromContainer(container: Container): IController[];
    static getControllerMetadata(constructor: any): IControllerMetadata;
}
