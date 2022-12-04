/// <reference types="node" />

import inspector from 'node:inspector'

import { watchProcessDeath } from 'watch-process-death'
type TOptions = {
    host?: string
    port?: number
}
export default async ({
    host = 'localhost',
    port = 9229,
}: TOptions): Promise<void> => {
    let currentInspectorUrl = inspector.url()
    const isInspectorStartedEarlier = !!currentInspectorUrl
    if (isInspectorStartedEarlier) {
        console.warn(
            `Inspector (${host}:${port}) not started because he was started earler, and has url: ${currentInspectorUrl}`
        )
        return
    }
    inspector.open(port, host)
    currentInspectorUrl = inspector.url()
    console.log('Inspector opened on:', currentInspectorUrl)
    // open -a "Google Chrome" http://stackoverflow.com
    // open -a "Google Chrome" http://localhost:8081/web-downloads/
    // --args --disable-web-security
    watchProcessDeath(() => {
        console.log('inspector close')
        inspector.close()
    })
}

// const CDP = require('chrome-remote-interface')
// async function example() {
//     let client
//     try {
//         // connect to endpoint
//         client = await CDP()
//         // extract domains
//         const { Network, Page } = client
//         // setup handlers
//         Network.requestWillBeSent(params => {
//             console.log(params.request.url)
//         })
//         // enable events then start!
//         await Network.enable()
//         await Page.enable()
//         await Page.navigate({ url: 'https://github.com' })
//         await Page.loadEventFired()
//     } catch (err) {
//         console.error(err)
//     } finally {
//         if (client) {
//             await client.close()
//         }
//     }
// }
// example()

// const startWsWatching = wsUrl => {
//     const DevToolsClient = require('./devtools-client')
//     const Controller = new DevToolsClient()
//     Controller.connect({
//         nodeWSEndpoint: wsUrl,
//     }).then(({ Debugger, Runtime, Profiler }) => {
//         console.log('Debugger, Runtime, Profiler:', Debugger, Runtime, Profiler)
//         // resolves with an object containing all available DevTools domains
//     })
// }
