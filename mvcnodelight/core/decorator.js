"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const constant_1 = require("./constant");
/**
 * This decorator need to be used on top level
 * of a controller
 * @param path The path of the controller (route)
 */
function controller(path) {
    return function (target) {
        let routePath = null;
        if (path) {
            routePath = path;
        }
        else {
            // By convention the controller if not path present
            // will be api/[controller]
            let controllerName = target.name.toLocaleLowerCase();
            // Remove the controller tag name if present
            controllerName = controllerName.replace('controller', '');
            routePath = `api/${controllerName}`;
        }
        let currentMetadata = {
            path: routePath,
            target: target
        };
        // Add injectable tag to controller
        inversify_1.decorate(inversify_1.injectable(), target);
        Reflect.defineMetadata(constant_1.METADATA_KEY.controller, currentMetadata, target);
        // We need to create an array that contains the metadata of all
        // the controllers in the application, the metadata cannot be
        // attached to a controller. It needs to be attached to a global
        // We attach metadata to the Reflect object itself to avoid
        // declaring additonal globals. Also, the Reflect is avaiable
        // in both node and web browsers.
        const previousMetadata = Reflect.getMetadata(constant_1.METADATA_KEY.controller, Reflect) || [];
        const newMetadata = [currentMetadata, ...previousMetadata];
        Reflect.defineMetadata(constant_1.METADATA_KEY.controller, newMetadata, Reflect);
    };
}
exports.controller = controller;
//# sourceMappingURL=decorator.js.map