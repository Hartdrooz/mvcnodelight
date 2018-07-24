import { StackFrame } from 'stack-trace';
import { IStack } from './stack';

export class StackTraceService {
	static parseStackTrace(stackFrames: StackFrame[]): IStack {
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
