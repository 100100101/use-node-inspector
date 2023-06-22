export * from './killProcess';
export type TBeforeKillProcess = () => Promise<void> | void;
type TUseNodeInspector = (props: {
    port?: number;
    host?: string;
    beforeKillProcess?: TBeforeKillProcess;
    isClearConsole?: boolean;
}) => Promise<void>;
export declare const useNodeInspector: TUseNodeInspector;
