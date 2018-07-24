import { StackFrame } from 'stack-trace';
import { ILoggerService } from './ILoggerService';
import { ILogger } from '../../services';
export declare class LoggerService implements ILoggerService {
    private _loggers;
    private readonly TraceLevel;
    constructor(args: ILogger[]);
    debug(message: string, stackFrames?: StackFrame[]): void;
    info(message: string, stackFrames?: StackFrame[]): void;
    warning(message: string, stackFrames?: StackFrame[]): void;
    error(err: any, stackFrames?: StackFrame[]): void;
    private log;
    private getStack;
}
