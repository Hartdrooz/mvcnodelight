import { IStack } from './stack';
export interface IStackTraceService {
    stackTrace(error?: Error): IStack;
}
export declare class StackTraceService implements IStackTraceService {
    stackTrace(error?: Error): IStack;
}
