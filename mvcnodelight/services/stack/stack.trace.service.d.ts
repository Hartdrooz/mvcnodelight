import { StackFrame } from 'stack-trace';
import { IStack } from './stack';
export declare class StackTraceService {
    static parseStackTrace(stackFrames: StackFrame[]): IStack;
}
