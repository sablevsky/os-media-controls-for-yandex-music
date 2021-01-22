'use strict'

import { changeMediaSessionMetadata } from './core.js'

externalAPI.on(
  externalAPI.EVENT_TRACK,
  changeMediaSessionMetadata(externalAPI.getCurrentTrack)
)

navigator.mediaSession.setActionHandler('previoustrack', async () =>
  externalAPI.prev()
)
navigator.mediaSession.setActionHandler('nexttrack', async () =>
  externalAPI.next()
)
navigator.mediaSession.setActionHandler('play', () =>
  externalAPI.togglePause()
)
navigator.mediaSession.setActionHandler('pause', () =>
  externalAPI.togglePause()
)
