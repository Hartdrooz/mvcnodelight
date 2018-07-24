"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const stackTrace = require("stack-trace");
let StackTraceService = class StackTraceService {
    stackTrace(error) {
        let stackFrames;
        if (error) {
            stackFrames = stackTrace.parse(error);
        }
        else {
            stackFrames = stackTrace.get();
        }
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
};
StackTraceService = __decorate([
    inversify_1.injectable()
], StackTraceService);
exports.StackTraceService = StackTraceService;
//# sourceMappingURL=stack.trace.service.js.map