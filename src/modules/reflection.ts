import { METADATA_KEY, FRAMEWORK_TYPES, IController, IControllerMetadata } from '../core';
import { Container } from 'inversify';

export class ReflectionApi {
	static getControllersFromMetadata(): Array<any> {
		let arrayOfControllerMetadata = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];
		return arrayOfControllerMetadata.map((metadata: any) => metadata.target);
	}
	static cleanUpMetadata() {
		Reflect.defineMetadata(METADATA_KEY.controller, [], Reflect);
	}
	static getControllersFromContainer(container: Container) {
		return container.getAll<IController>(FRAMEWORK_TYPES.Controller);
	}
	static getControllerMetadata(constructor: any): IControllerMetadata {
		let controllerMetadata: IControllerMetadata = Reflect.getMetadata(
			METADATA_KEY.controller,
			constructor
		);
		return controllerMetadata;
	}
}
