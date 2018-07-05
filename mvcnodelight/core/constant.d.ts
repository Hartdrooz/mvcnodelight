declare const METADATA_KEY: {
    controller: string;
    httpGet: string;
};
declare const TYPES: {
    Logger: symbol;
    Express: symbol;
    Controller: symbol;
    LogService: symbol;
};
declare const enum TraceLevel {
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}
export { METADATA_KEY, TYPES, TraceLevel };