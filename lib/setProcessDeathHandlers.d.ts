import { TBeforeKillProcess } from '.';
export declare const setProcessDeathHandlers: ({ beforeKillProcess, }: {
    beforeKillProcess?: TBeforeKillProcess | undefined;
}) => Promise<void>;
