import { ILoggerService } from './ILoggerService';
import { ILogger } from '../../services';
import { IStackTraceService } from '../stack';
export declare class LoggerService implements ILoggerService {
    private stackService;
    private _loggers;
    private readonly TraceLevel;
    constructor(args: ILogger[], stackService: IStackTraceService);
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(err: any): void;
    private log;
    private getStack;
}
