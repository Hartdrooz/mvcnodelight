"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_test_dependecies_1 = require("./express.test.dependecies");
describe('Testing ExpressServer base class', () => {
    let server = null;
    const env = Object.assign({}, process.env);
    beforeEach(() => {
        server = new express_test_dependecies_1.WebServer();
    });
    afterEach(() => {
        // Clear state
        server = null;
        process.env = env;
    });
    test('webServer should be defined', () => {
        expect(server).toBeDefined();
    });
    test('it should return default port 3000', () => {
        expect(server.getPort()).toBe(3000);
    });
    test('it should return port 8080', () => {
        server.start();
        expect(server.getPort()).toBe(8101);
    });
    test('container should have dependencies MyService', () => {
        server.start();
        const container = server.getIoc();
        const myService = container.get(express_test_dependecies_1.TYPES_TEST.MyService);
        expect(myService.helloWorld()).toBe('hello world');
    });
});
//# sourceMappingURL=express.server.test.js.map