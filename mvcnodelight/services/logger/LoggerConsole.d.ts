import { ILogger } from './ILogger';
import { IStack } from '../stack';
export declare class LoggerConsole implements ILogger {
    private _log;
    constructor();
    debug(message: string, stack: IStack): void;
    info(message: string, stack: IStack): void;
    warning(message: string, stack: IStack): void;
    error(err: any, stack: IStack): void;
}
