import { observable, action } from 'mobx'

const logItems = observable([])

export const log = action(msg => {
    logItems.unshift(msg)
})

export function getLog() {
    return logItems.join('\n')
}
