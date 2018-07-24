"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const services_1 = require("../services");
class MockLogger {
    debug(message, stack) {
        this.message = message;
        this.stack = stack;
    }
    info(message, stack) {
        this.message = message;
        this.stack = stack;
    }
    warning(message, stack) {
        this.message = message;
        this.stack = stack;
    }
    error(err, stack) {
        this.err = err;
        this.stack = stack;
    }
}
describe('loogerService', () => {
    let logger;
    let loggerService;
    beforeEach(() => {
        const loggers = new Array();
        logger = new MockLogger();
        loggers.push(logger);
        loggerService = new services_1.LoggerService(loggers);
    });
    afterEach(() => {
        logger = null;
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
//# sourceMappingURL=loggerservice.test.js.map