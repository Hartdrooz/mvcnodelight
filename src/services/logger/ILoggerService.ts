import { StackFrame } from 'stack-trace';

export interface ILoggerService {
	debug(message: string, stackFrames?: StackFrame[]): void;
	info(message: string, stackFrames?: StackFrame[]): void;
	warning(message: string, stackFrames?: StackFrame[]): void;
	error(err: any, stackFrames?: StackFrame[]): void;
}
