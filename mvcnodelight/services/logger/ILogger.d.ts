export interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(err: any): void;
}
