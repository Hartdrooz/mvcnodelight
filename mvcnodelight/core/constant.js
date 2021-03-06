"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const METADATA_KEY = {
    controller: 'mvc:controller',
    httpGet: 'mvc:http-get'
};
exports.METADATA_KEY = METADATA_KEY;
const FRAMEWORK_TYPES = {
    Logger: Symbol.for('mvc:Logger'),
    Express: Symbol.for('mvc:Express'),
    Controller: Symbol.for('mvc:Controllers'),
    LogService: Symbol.for('mvc:LogService'),
    StackService: Symbol.for('mvc:StackService')
};
exports.FRAMEWORK_TYPES = FRAMEWORK_TYPES;
var TraceLevel;
(function (TraceLevel) {
    TraceLevel[TraceLevel["Debug"] = 1] = "Debug";
    TraceLevel[TraceLevel["Info"] = 2] = "Info";
    TraceLevel[TraceLevel["Warning"] = 3] = "Warning";
    TraceLevel[TraceLevel["Error"] = 4] = "Error";
})(TraceLevel || (TraceLevel = {}));
exports.TraceLevel = TraceLevel;
//# sourceMappingURL=constant.js.map