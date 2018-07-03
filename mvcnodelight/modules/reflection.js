"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class ReflectionApi {
    static getControllersFromMetadata() {
        let arrayOfControllerMetadata = Reflect.getMetadata(core_1.METADATA_KEY.controller, Reflect) || [];
        return arrayOfControllerMetadata.map((metadata) => metadata.target);
    }
    static cleanUpMetadata() {
        Reflect.defineMetadata(core_1.METADATA_KEY.controller, [], Reflect);
    }
    static getControllersFromContainer(container) {
        return container.getAll(core_1.TYPES.Controller);
    }
    static getControllerMetadata(constructor) {
        let controllerMetadata = Reflect.getMetadata(core_1.METADATA_KEY.controller, constructor);
        return controllerMetadata;
    }
}
exports.ReflectionApi = ReflectionApi;
//# sourceMappingURL=reflection.js.map