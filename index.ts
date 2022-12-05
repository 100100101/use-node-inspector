/// <reference types="node" />

import inspector from 'node:inspector'

// import { watchProcessDeath } from 'watch-process-death'
// import { watchProcessDeath } from '../watch-process-death/src'
import { watchProcessDeath } from 'watch-process-death'
import { TUseNodeInspector } from './types'

const defaultOptions = {
    host: 'localhost',
    port: 9229,
}
export const useNodeInspector: TUseNodeInspector = async options => {
    let finalOptions = defaultOptions
    if (options) {
        finalOptions = {
            ...defaultOptions,
            ...options,
        }
    }
    const { host, port } = finalOptions
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
    watchProcessDeath(async () => {
        await new Promise(resolve => process.nextTick(resolve))
        console.log('node:inspector close')
        inspector.close()
    })
}
