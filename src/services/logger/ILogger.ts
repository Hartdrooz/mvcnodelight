import { IStack } from '../stack';

export interface ILogger {
	debug(message: string, stack?: IStack): void;
	info(message: string, stack?: IStack): void;
	warning(message: string, stack?: IStack): void;
	error(err: any, stack?: IStack): void;
}
