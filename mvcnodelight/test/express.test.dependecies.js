"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_server_1 = require("../modules/express.server");
const inversify_1 = require("inversify");
const core_1 = require("../core");
exports.TYPES_TEST = {
    MyService: Symbol.for('MyService')
};
let MyService = class MyService {
    helloWorld() {
        return 'hello world';
    }
};
MyService = __decorate([
    inversify_1.injectable()
], MyService);
exports.MyService = MyService;
let HomeController = class HomeController {
    registerRoutes(router) {
        router.get('/', (req, res) => {
            res.json('hello world');
        });
    }
};
HomeController = __decorate([
    core_1.controller()
], HomeController);
exports.HomeController = HomeController;
class WebServer extends express_server_1.ExpressServer {
    cleanUp(container) {
        throw new Error('Method not implemented.');
    }
    initApplication(container) {
        const promise = Promise.resolve(null);
        return promise;
    }
    setStaticFolder() {
        return null;
    }
    getPort() {
        return this.Port;
    }
    getIoc() {
        return this._ioc;
    }
    setPort() {
        return 8101;
    }
    registerApplicationDependencies(container) {
        container
            .bind(exports.TYPES_TEST.MyService)
            .to(MyService)
            .inTransientScope();
        this._ioc = container;
    }
    errorHandler(err, req, res, next) { }
    setViewEngine(app) { }
    registerMiddleware(app) { }
    // Override the start, it's unit test so no need
    // to start the server
    startApp() { }
}
exports.WebServer = WebServer;
//# sourceMappingURL=express.test.dependecies.js.map