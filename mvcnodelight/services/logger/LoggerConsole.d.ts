import { ILogger } from './ILogger';
export declare class LoggerConsole implements ILogger {
    private _log;
    constructor();
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(err: any): void;
}
