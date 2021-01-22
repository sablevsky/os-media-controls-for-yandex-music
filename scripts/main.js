'use strict'

import {
  createChangeMediaSessionMetadata
} from './core.js'

const changeMediaSessionMetadata = createChangeMediaSessionMetadata(externalAPI.getCurrentTrack)

externalAPI.on(externalAPI.EVENT_TRACK, changeMediaSessionMetadata)

navigator.mediaSession.setActionHandler('previoustrack', async () => {
  await externalAPI.prev()
})
navigator.mediaSession.setActionHandler('nexttrack', async () => {
  await externalAPI.next()
})
navigator.mediaSession.setActionHandler('play', () => {
  externalAPI.togglePause()
})
navigator.mediaSession.setActionHandler('pause', () => {
  externalAPI.togglePause()
})
