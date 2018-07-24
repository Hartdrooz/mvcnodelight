import { injectable } from 'inversify';
import * as stackTrace from 'stack-trace';
import { StackFrame } from 'stack-trace';
import { IStack } from './stack';

export interface IStackTraceService {
	stackTrace(error?: Error): IStack;
}

@injectable()
export class StackTraceService implements IStackTraceService {
	stackTrace(error?: Error): IStack {
		let stackFrames: StackFrame[];

		if (error) {
			stackFrames = stackTrace.parse(error);
		} else {
			stackFrames = stackTrace.get();
		}
		if (stackFrames.length > 0) {
			const stackFrame = stackFrames[0];
			const stack: IStack = {
				typename: stackFrame.getTypeName(),
				functionname: stackFrame.getFunctionName(),
				methodName: stackFrame.getMethodName(),
				fileName: stackFrame.getFileName(),
				lineNumber: stackFrame.getLineNumber(),
				columnNumber: stackFrame.getColumnNumber()
			};
			return stack;
		}

		return null;
	}
}
