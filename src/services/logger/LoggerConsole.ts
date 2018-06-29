import { injectable } from 'inversify';
import { ILogger } from './ILogger';
const chalk = require('chalk');

@injectable()
export class LoggerConsole implements ILogger {
	private _log: any;

	constructor() {
		this._log = console.log;
	}

	debug(message: string): void {
		this._log(chalk.green(message));
	}
	info(message: string): void {
		this._log(chalk.blue(message));
	}
	warning(message: string): void {
		this._log(chalk.yellow(message));
	}
	error(err: any): void {
		this._log(chalk.red(err));
	}
}
