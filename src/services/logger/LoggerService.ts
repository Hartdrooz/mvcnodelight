import { ILoggerService } from './ILoggerService';
import { injectable, multiInject } from 'inversify';
import { TYPES, TraceLevel } from '../../core';
import { ILogger } from '../../services';

@injectable()
export class LoggerService implements ILoggerService {
	private _loggers: ILogger[];

	constructor(@multiInject(TYPES.Logger) args: ILogger[]) {
		this._loggers = args;
	}

	debug(message: string): void {
		this.log(message, TraceLevel.Debug);
	}
	info(message: string): void {
		this.log(message, TraceLevel.Info);
	}
	warning(message: string): void {
		this.log(message, TraceLevel.Warning);
	}
	error(err: any): void {
		this.log(err, TraceLevel.Error);
	}

	private log(msg: any, level: TraceLevel) {
		this._loggers.forEach(l => {
			switch (level) {
				case TraceLevel.Debug:
					l.debug(msg);
					break;
				case TraceLevel.Info:
					l.info(msg);
					break;
				case TraceLevel.Warning:
					l.warning(msg);
					break;
				case TraceLevel.Error:
					l.error(msg);
					break;
			}
		});
	}
}
