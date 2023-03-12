"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNodeInspector = void 0;
const tslib_1 = require("tslib");
const node_inspector_1 = tslib_1.__importDefault(require("node:inspector"));
const watch_process_death_1 = require("watch-process-death");
const watchProcessDeath = new watch_process_death_1.WatchProcessDeath();
const defaultOptions = {
    host: 'localhost',
    port: 9229,
};
const useNodeInspector = async (options) => {
    let finalOptions = defaultOptions;
    if (options) {
        finalOptions = {
            ...defaultOptions,
            ...options,
        };
    }
    const { host, port } = finalOptions;
    let currentInspectorUrl = node_inspector_1.default.url();
    const isInspectorStartedEarlier = !!currentInspectorUrl;
    if (isInspectorStartedEarlier) {
        console.warn(`Inspector (${host}:${port}) not started because he was started earler, and has url: ${currentInspectorUrl}`);
        return;
    }
    node_inspector_1.default.open(port, host);
    currentInspectorUrl = node_inspector_1.default.url();
    console.log('Inspector opened on:', currentInspectorUrl);
    watchProcessDeath.addMiddleware(async (eventName, withExit) => {
        if (!withExit)
            return;
        await new Promise(resolve => process.nextTick(resolve));
        console.log('node:inspector close');
        node_inspector_1.default.close();
    });
};
exports.useNodeInspector = useNodeInspector;
//# sourceMappingURL=index.js.map