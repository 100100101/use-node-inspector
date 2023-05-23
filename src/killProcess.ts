import { execSync } from 'node:child_process'
export const killProcessByPid = (pid: number | string): boolean => {
    try {
        execSync(`kill -9 ${pid}`)
        console.log(`PID ${pid} killed`)
        return true
    } catch (error) {
        // console.error('error:', error)
    }
    return false
}
export const killProcessOnPort = (port: number | string) => {
    try {
        const pid = execSync(`lsof -t -i:${port}`).toString()
        if (!pid) {
            console.log(`Port ${port} is free`)
            return
        }
        console.log(`Release port ${port}`)
        const isProcessKilled = killProcessByPid(pid)
        if (isProcessKilled) {
            console.log(`Port ${port} has been released`)
        }
    } catch (error) {
        // console.error('error:', error)
    }
}
