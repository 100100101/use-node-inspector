import inspector from 'node:inspector'
import { setProcessDeathHandlers } from './setProcessDeathHandlers'
import { killPrevProcess } from './killPrevProcess'
export * from './killProcess'
export type TBeforeKillProcess = () => Promise<void> | void
type TUseNodeInspector = (props: {
    port?: number
    host?: string
    beforeKillProcess?: TBeforeKillProcess
    // clearConsoleAfterInstancesQt?: number | false
    isClearConsole?: boolean
}) => Promise<void>

const defaultPort = 9229
const defaultHost = 'localhost'

export const useNodeInspector: TUseNodeInspector = async ({
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
