"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeMoq = require("typemoq");
const services_1 = require("../services");
const stack_1 = require("../services/stack");
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
    let stackService;
    beforeEach(() => {
        const loggers = new Array();
        logger = new MockLogger();
        loggers.push(logger);
        stackService = TypeMoq.Mock.ofType(stack_1.StackTraceService);
        loggerService = new services_1.LoggerService(loggers, stackService.object);
    });
    afterEach(() => {
        logger = null;
        stackService = null;
        loggerService = null;
    });
    test('should have instance instanced', () => {
        expect(loggerService).toBeDefined();
    });
});
//# sourceMappingURL=loggerservice.spec.js.map