import inspector from 'node:inspector'
import { setProcessDeathHandlers } from './setProcessDeathHandlers.mjs'
import { killPrevProcess } from './killPrevProcess'
export * from './killProcess'
const defaultPort = 9229
const defaultHost = 'localhost'
export const useNodeInspector = async ({
    port = defaultPort,
    host = defaultHost,
    beforeKillProcess,
    isClearConsole = false,
}) => {
    killPrevProcess()
    let currentInspectorUrl = inspector.url()
    const isInspectorStartedEarlier =
        !!currentInspectorUrl && currentInspectorUrl.includes(`:${port}`)
    if (isInspectorStartedEarlier) {
        console.warn(
            `Inspector (${host}:${port}) not started because he was started early, and has url: ${currentInspectorUrl}`
        )
        inspector.close()
        return
    }
    inspector.open(port, host)
    currentInspectorUrl = inspector.url()
    if (isClearConsole) {
        console.clear()
    }
    console.log('Inspector opened on:', currentInspectorUrl)
    setProcessDeathHandlers({ beforeKillProcess })
}
//# sourceMappingURL=index.js.map
