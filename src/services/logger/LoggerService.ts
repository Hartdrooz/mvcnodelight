import { ILoggerService } from './ILoggerService';
import { injectable, multiInject, inject } from 'inversify';
import { StackFrame } from 'stack-trace';
import { FRAMEWORK_TYPES, TraceLevel } from '../../core';
import { ILogger } from '../../services';
import { IStackTraceService } from '../stack';

@injectable()
export class LoggerService implements ILoggerService {
	private _loggers: ILogger[];

	constructor(
		@multiInject(FRAMEWORK_TYPES.Logger) args: ILogger[],
		@inject(FRAMEWORK_TYPES.StackService) private stackService: IStackTraceService
	) {
		this._loggers = args;
	}

	debug(message: string): void {
		this.log(message, TraceLevel.Debug, this.getStack());
	}
	info(message: string): void {
		this.log(message, TraceLevel.Info, this.getStack());
	}
	warning(message: string): void {
		this.log(message, TraceLevel.Warning, this.getStack());
	}
	error(err: any): void {
		this.log(err, TraceLevel.Error, this.getStack(err));
	}

	private log(msg: any, level: TraceLevel, stack: StackFrame) {
		this._loggers.forEach(l => {
			switch (level) {
				case TraceLevel.Debug:
					l.debug(msg, stack);
					break;
				case TraceLevel.Info:
					l.info(msg, stack);
					break;
				case TraceLevel.Warning:
					l.warning(msg, stack);
					break;
				case TraceLevel.Error:
					l.error(msg, stack);
					break;
			}
		});
	}

	private getStack(error?: any): StackFrame {
		const stacks = this.stackService.Trace(error);
		return stacks[0];
	}
}
