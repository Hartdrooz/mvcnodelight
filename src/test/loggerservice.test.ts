import 'reflect-metadata';
import * as TypeMoq from 'typemoq';
import { LoggerService, ILogger } from '../services';
import { IStackTraceService, StackTraceService, IStack } from '../services/stack';

class MockLogger implements ILogger {
	public message: string;
	public stack: IStack;
	public err: any;

	debug(message: string, stack?: IStack) {
		this.message = message;
		this.stack = stack;
	}
	info(message: string, stack?: IStack) {
		this.message = message;
		this.stack = stack;
	}
	warning(message: string, stack?: IStack) {
		this.message = message;
		this.stack = stack;
	}
	error(err: any, stack?: IStack) {
		this.err = err;
		this.stack = stack;
	}
}

describe('loogerService', () => {
	let logger: MockLogger;
	let loggerService: LoggerService;
	let stackService: TypeMoq.IMock<IStackTraceService>;

	beforeEach(() => {
		const loggers = new Array<ILogger>();
		logger = new MockLogger();
		loggers.push(logger);
		stackService = TypeMoq.Mock.ofType<IStackTraceService>(StackTraceService);
		loggerService = new LoggerService(loggers, stackService.object);
		const stack: IStack = {
			typename: 'mockType',
			functionname: 'mockFunction',
			methodName: 'mockMethod',
			fileName: 'mockFileName',
			lineNumber: 100,
			columnNumber: 3
		};
		stackService.setup(x => x.stackTrace(null)).returns(() => stack);
	});

	afterEach(() => {
		logger = null;
		stackService = null;
		loggerService = null;
		process.env.TRACE_LEVEL = undefined;
	});

	test('should have instance instanced', () => {
		expect(loggerService).toBeDefined();
	});

	test('should log message debug', () => {
		process.env.TRACE_LEVEL = 'DEBUG';
		loggerService.debug('This is my debug message');
		expect(logger.message).toBe('This is my debug message');
	});

	test('should not log debug info flag', () => {
		process.env.TRACE_LEVEL = 'INFO';
		loggerService.debug('This is my debug message');
		expect(logger.message).toBeUndefined();
	});

	test('should log message info debug switch', () => {
		process.env.TRACE_LEVEL = 'DEBUG';
		loggerService.info('This is my info message');
		expect(logger.message).toBe('This is my info message');
	});

	test('should log message warning debug switch', () => {
		process.env.TRACE_LEVEL = 'DEBUG';
		loggerService.warning('This is my warning message');
		expect(logger.message).toBe('This is my warning message');
	});

	test('should log message error debug switch', () => {
		process.env.TRACE_LEVEL = 'DEBUG';
		loggerService.error('This is my error message');
		expect(logger.err).toBe('This is my error message');
	});

	test('should log message info - INFO switch', () => {
		process.env.TRACE_LEVEL = 'INFO';
		loggerService.info('This is my info message');
		expect(logger.message).toBe('This is my info message');
	});

	test('should log message warning - INFO switch', () => {
		process.env.TRACE_LEVEL = 'INFO';
		loggerService.warning('This is my warning message');
		expect(logger.message).toBe('This is my warning message');
	});
});
