export type TOptions = {
    host?: string
    port?: number
}
export type TUseNodeInspector = (options?: TOptions) => Promise<void>
