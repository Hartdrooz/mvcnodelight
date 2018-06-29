export interface ILoggerService {
	debug(message: string);
	info(message: string);
	warning(message: string);
	error(err: any);
}
