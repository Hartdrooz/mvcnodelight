"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const core_1 = require("../../core");
const stack_1 = require("../stack");
let LoggerService = class LoggerService {
    constructor(args) {
        this._loggers = args;
    }
    get TraceLevel() {
        let level = process.env.TRACE_LEVEL || 'ERROR';
        level = level.toLocaleLowerCase();
        switch (level) {
            case 'debug':
                return core_1.TraceLevel.Debug;
            case 'info':
                return core_1.TraceLevel.Info;
            case 'warning':
                return core_1.TraceLevel.Warning;
            default:
                return core_1.TraceLevel.Error;
        }
    }
    debug(message, stackFrames) {
        this.log(message, core_1.TraceLevel.Debug, this.getStack(stackFrames));
    }
    info(message, stackFrames) {
        this.log(message, core_1.TraceLevel.Info, this.getStack(stackFrames));
    }
    warning(message, stackFrames) {
        this.log(message, core_1.TraceLevel.Warning, this.getStack(stackFrames));
    }
    error(err, stackFrames) {
        this.log(err, core_1.TraceLevel.Error, this.getStack(stackFrames));
    }
    log(msg, level, stack) {
        this._loggers.forEach(l => {
            switch (level) {
                case core_1.TraceLevel.Debug:
                    if (this.TraceLevel == core_1.TraceLevel.Debug) {
                        l.debug(msg, stack);
                    }
                    break;
                case core_1.TraceLevel.Info:
                    if (this.TraceLevel <= core_1.TraceLevel.Info) {
                        l.info(msg, stack);
                    }
                    break;
                case core_1.TraceLevel.Warning:
                    if (this.TraceLevel <= core_1.TraceLevel.Warning) {
                        l.warning(msg, stack);
                    }
                    break;
                case core_1.TraceLevel.Error:
                    l.error(msg, stack);
                    break;
            }
        });
    }
    getStack(stackFrames) {
        if (stackFrames && stackFrames.length > 0) {
            return stack_1.StackTraceService.parseStackTrace(stackFrames);
        }
        return null;
    }
};
LoggerService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject(core_1.FRAMEWORK_TYPES.Logger)),
    __metadata("design:paramtypes", [Array])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=LoggerService.js.map