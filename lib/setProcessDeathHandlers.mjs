import inspector from 'node:inspector';
import process from 'node:process';
import { pid } from 'node:process';
import { killProcessByPid } from './killProcess';
// const promiseBeforeKillCurrentProcessMs = 5000
const promiseBeforeKillCurrentProcessMs = 0;
export const setProcessDeathHandlers = async ({ beforeKillProcess, }) => {
    process.stdin.resume();
    const eventsNames = [
        // app is closing
        'exit',
        // catches ctrl+c event
        'SIGINT',
        //  catches "kill pid" (for example: nodemon restart)
        'SIGUSR1',
        'SIGUSR2',
        // catches uncaught exceptions
        'uncaughtException',
    ];
    for (const eventName of eventsNames) {
        const processEventHandler = async (eventOrCode) => {
            console.log(`%cProcess event '${eventName}' : ${eventOrCode}`, 'color: #ff571a');
            // console.trace()
            // if (eventName === 'uncaughtException') return
            inspector.close();
            console.log('Inspector closed');
            // process.exit()
            if (beforeKillProcess) {
                await beforeKillProcess();
            }
            await new Promise(resolve => setTimeout(resolve, promiseBeforeKillCurrentProcessMs));
            killProcessByPid(pid);
        };
        process.on(eventName, processEventHandler);
    }
};
//# sourceMappingURL=setProcessDeathHandlers.js.map