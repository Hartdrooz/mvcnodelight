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
    LogService: Symbol.for('mvc:LogService')
};
exports.FRAMEWORK_TYPES = FRAMEWORK_TYPES;
//# sourceMappingURL=constant.js.map