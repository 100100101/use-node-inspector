import { killProcessByPid } from './killProcess';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { pid as currentProcessPid } from 'node:process';
const processIsNodeIndicator = '/bin/node';
const prevProcessFileName = 'prevProcessInfo.json';
const prevProcessFilePath = path.resolve(__dirname, '../', prevProcessFileName);
export const killPrevProcess = async () => {
    const isPrevProcessJsonExists = fs.existsSync(prevProcessFilePath);
    if (isPrevProcessJsonExists) {
        try {
            const prevProcessInfo = JSON.parse(fs.readFileSync(prevProcessFilePath).toString());
            const pid = prevProcessInfo.pid;
            const infoAboutPotentialNodeProcess = execSync(`lsof -p ${pid}|grep ${processIsNodeIndicator}`).toString();
            const isNodeProcess = infoAboutPotentialNodeProcess.includes(processIsNodeIndicator);
            if (isNodeProcess)
                killProcessByPid(pid);
        }
        catch (e) {
            //
        }
    }
    const currentProcessInfo = {
        pid: currentProcessPid,
    };
    fsPromises.writeFile(prevProcessFilePath, JSON.stringify(currentProcessInfo, null, 2));
};
//# sourceMappingURL=killPrevProcess.js.map