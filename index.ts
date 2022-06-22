import inspector from 'node:inspector'
import { watchProcessDeath } from 'watch-process-death'
type Props = {
    host?: string
    port?: number
}
export default async ({
    host = 'localhost',
    port = 9229,
}: Props): Promise<void> => {
    const currentInspectorUrl = inspector.url()
    console.log('currentInspectorUrl:', currentInspectorUrl)

    const isInspectorStartedEarlier = !!currentInspectorUrl
    if (isInspectorStartedEarlier) {
        console.warn(
            `Inspector (${host}:${port}) not started because he was started earler, and has url: ${currentInspectorUrl}`
        )
        return
    }
    inspector.open(port, host)
    console.log('Inspector opened on:', host, port)
    // open -a "Google Chrome" http://stackoverflow.com
    // open -a "Google Chrome" http://localhost:8081/web-downloads/
    // --args --disable-web-security
    watchProcessDeath(inspector.close)
}
