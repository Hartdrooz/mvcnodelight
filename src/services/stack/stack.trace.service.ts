import { injectable } from 'inversify';
import * as stackTrace from 'stack-trace';
import { StackFrame } from 'stack-trace';

export interface IStackTraceService {
	Trace(error?: Error): StackFrame[];
}

@injectable()
export class StackTraceService implements IStackTraceService {
	Trace(error?: Error): StackFrame[] {
		if (error) {
			return stackTrace.parse(error);
		}

		return stackTrace.get();
	}
}
