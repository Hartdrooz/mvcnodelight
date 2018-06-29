const METADATA_KEY = {
	controller: 'mvc:controller',
	httpGet: 'mvc:http-get'
};

const TYPES = {
	Logger: Symbol.for('mvc:Logger'),
	Express: Symbol.for('mvc:Express'),
	Controller: Symbol.for('mvc:Controllers'),
	LogService: Symbol.for('mvc:LogService')
};

const enum TraceLevel {
	Debug = 1,
	Info,
	Warning,
	Error
}

export { METADATA_KEY, TYPES, TraceLevel };