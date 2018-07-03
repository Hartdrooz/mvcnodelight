import { ILoggerService } from './ILoggerService';
import { ILogger } from '../../services';
export declare class LoggerService implements ILoggerService {
    private _loggers;
    constructor(args: ILogger[]);
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(err: any): void;
    private log;
}
