/**
 * This decorator need to be used on top level
 * of a controller
 * @param path The path of the controller (route)
 */
export declare function controller(path?: string): (target: Function) => void;
