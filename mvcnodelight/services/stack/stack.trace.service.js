"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StackTraceService {
    static parseStackTrace(stackFrames) {
        if (stackFrames.length > 0) {
            const stackFrame = stackFrames[0];
            const stack = {
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
exports.StackTraceService = StackTraceService;
//# sourceMappingURL=stack.trace.service.js.map