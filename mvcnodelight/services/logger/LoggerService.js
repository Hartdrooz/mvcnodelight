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
let LoggerService = class LoggerService {
    constructor(args, stackService) {
        this.stackService = stackService;
        this._loggers = args;
    }
    debug(message) {
        this.log(message, 1 /* Debug */, this.getStack());
    }
    info(message) {
        this.log(message, 2 /* Info */, this.getStack());
    }
    warning(message) {
        this.log(message, 3 /* Warning */, this.getStack());
    }
    error(err) {
        this.log(err, 4 /* Error */, this.getStack(err));
    }
    log(msg, level, stack) {
        this._loggers.forEach(l => {
            switch (level) {
                case 1 /* Debug */:
                    l.debug(msg, stack);
                    break;
                case 2 /* Info */:
                    l.info(msg, stack);
                    break;
                case 3 /* Warning */:
                    l.warning(msg, stack);
                    break;
                case 4 /* Error */:
                    l.error(msg, stack);
                    break;
            }
        });
    }
    getStack(error) {
        const stacks = this.stackService.Trace(error);
        return stacks[0];
    }
};
LoggerService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject(core_1.FRAMEWORK_TYPES.Logger)),
    __param(1, inversify_1.inject(core_1.FRAMEWORK_TYPES.StackService)),
    __metadata("design:paramtypes", [Array, Object])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=LoggerService.js.map