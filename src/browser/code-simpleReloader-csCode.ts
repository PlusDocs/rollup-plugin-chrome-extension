import { delay, interval, mergeMap, retry } from 'rxjs'
import {
  devWarning,
  reloadStream,
  sendUpdateVersion,
} from './simpleReloader_helpers'

console.log(devWarning)

const { name } = chrome.runtime.getManifest()

interval(1000)
  .pipe(
    mergeMap(() => sendUpdateVersion(undefined)),
    retry(4),
  )
  .subscribe({
    error(err) {
      if (err.message.includes('context invalidated'))
        console.log(`Reload the page to reconnect to ${name}.`)
      else console.error(err)
    },
  })

reloadStream.pipe(delay(200)).subscribe(() => location.reload())
