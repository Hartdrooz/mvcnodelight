import { StackFrame } from 'stack-trace';
export interface ILogger {
    debug(message: string, stack?: StackFrame): void;
    info(message: string, stack?: StackFrame): void;
    warning(message: string, stack?: StackFrame): void;
    error(err: any, stack?: StackFrame): void;
}
