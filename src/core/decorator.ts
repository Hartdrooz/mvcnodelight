import { injectable, decorate } from 'inversify';
import { METADATA_KEY } from './constant';

/**
 * This decorator need to be used on top level
 * of a controller
 * @param path The path of the controller (route)
 */
export function controller(path?: string) {
	return function(target: Function) {
		let routePath = null;

		if (path) {
			routePath = path;
		} else {
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
		decorate(injectable(), target);

		Reflect.defineMetadata(METADATA_KEY.controller, currentMetadata, target);

		// We need to create an array that contains the metadata of all
		// the controllers in the application, the metadata cannot be
		// attached to a controller. It needs to be attached to a global
		// We attach metadata to the Reflect object itself to avoid
		// declaring additonal globals. Also, the Reflect is avaiable
		// in both node and web browsers.
		const previousMetadata = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];

		const newMetadata = [currentMetadata, ...previousMetadata];

		Reflect.defineMetadata(METADATA_KEY.controller, newMetadata, Reflect);
	};
}
