import { StackFrame } from 'stack-trace';
export interface IStackTraceService {
    Trace(error?: Error): StackFrame[];
}
export declare class StackTraceService implements IStackTraceService {
    Trace(error?: Error): StackFrame[];
}
