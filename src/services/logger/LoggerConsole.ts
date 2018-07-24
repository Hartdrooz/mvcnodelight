import { injectable } from 'inversify';
import { ILogger } from './ILogger';
import { IStack } from '../stack';
const chalk = require('chalk');

@injectable()
export class LoggerConsole implements ILogger {
	private _log: any;

	constructor() {
		this._log = console.log;
	}

	debug(message: string, stack: IStack): void {
		this._log(chalk.green(message), stack);
	}
	info(message: string, stack: IStack): void {
		this._log(chalk.blue(message), stack);
	}
	warning(message: string, stack: IStack): void {
		this._log(chalk.yellow(message), stack);
	}
	error(err: any, stack: IStack): void {
		this._log(chalk.red(err), stack);
	}
}
