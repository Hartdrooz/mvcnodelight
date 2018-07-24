import { Container } from 'inversify';
import { WebServer, IMyService, HomeController, TYPES_TEST } from './express.test.dependecies';

describe('Testing ExpressServer base class', () => {
	let server: WebServer = null;
	const env = Object.assign({}, process.env);

	beforeEach(() => {
		server = new WebServer();
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
		const container: Container = server.getIoc();
		const myService = container.get<IMyService>(TYPES_TEST.MyService);

		expect(myService.helloWorld()).toBe('hello world');
	});
});
