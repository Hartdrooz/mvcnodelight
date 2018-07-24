import { StackFrame } from 'stack-trace';
import { ILoggerService } from './ILoggerService';
import { injectable, multiInject, inject } from 'inversify';
import { FRAMEWORK_TYPES, TraceLevel } from '../../core';
import { ILogger } from '../../services';
import { StackTraceService, IStack } from '../stack';

@injectable()
export class LoggerService implements ILoggerService {
	private _loggers: ILogger[];

	private get TraceLevel(): TraceLevel {
		let level = process.env.TRACE_LEVEL || 'ERROR';
		level = level.toLocaleLowerCase();

		switch (level) {
			case 'debug':
				return TraceLevel.Debug;
			case 'info':
				return TraceLevel.Info;
			case 'warning':
				return TraceLevel.Warning;
			default:
				return TraceLevel.Error;
		}
	}

	constructor(@multiInject(FRAMEWORK_TYPES.Logger) args: ILogger[]) {
		this._loggers = args;
	}

	debug(message: string, stackFrames?: StackFrame[]): void {
		this.log(message, TraceLevel.Debug, this.getStack(stackFrames));
	}
	info(message: string, stackFrames?: StackFrame[]): void {
		this.log(message, TraceLevel.Info, this.getStack(stackFrames));
	}
	warning(message: string, stackFrames?: StackFrame[]): void {
		this.log(message, TraceLevel.Warning, this.getStack(stackFrames));
	}
	error(err: any, stackFrames?: StackFrame[]): void {
		this.log(err, TraceLevel.Error, this.getStack(stackFrames));
	}

	private log(msg: any, level: TraceLevel, stack: IStack) {
		this._loggers.forEach(l => {
			switch (level) {
				case TraceLevel.Debug:
					if (this.TraceLevel == TraceLevel.Debug) {
						l.debug(msg, stack);
					}
					break;
				case TraceLevel.Info:
					if (this.TraceLevel <= TraceLevel.Info) {
						l.info(msg, stack);
					}
					break;
				case TraceLevel.Warning:
					if (this.TraceLevel <= TraceLevel.Warning) {
						l.warning(msg, stack);
					}
					break;
				case TraceLevel.Error:
					l.error(msg, stack);
					break;
			}
		});
	}

	private getStack(stackFrames?: StackFrame[]): IStack {
		if (stackFrames && stackFrames.length > 0) {
			return StackTraceService.parseStackTrace(stackFrames);
		}
		return null;
	}
}
