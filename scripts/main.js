'use strict'

import { changeMediaSessionMetadata } from './core.js'

externalAPI.on(
  externalAPI.EVENT_TRACK,
  changeMediaSessionMetadata(externalAPI.getCurrentTrack)
)

navigator.mediaSession.setActionHandler(
  'previoustrack',
  async () =>
    await (externalAPI.getProgress().position < 5
      ? externalAPI.prev()
      : externalAPI.play())
)
navigator.mediaSession.setActionHandler('nexttrack', async () =>
  externalAPI.next()
)
navigator.mediaSession.setActionHandler('play', () => externalAPI.togglePause())
navigator.mediaSession.setActionHandler('pause', () =>
  externalAPI.togglePause()
)
