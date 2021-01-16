const NEXT_BUTTON_SELECTOR = '.d-icon.d-icon_track-next'
const PREV_BUTTON_SELECTOR = '.d-icon.d-icon_track-prev'
const PLAY_PAUSE_BUTTON_SELECTOR = '.d-icon.d-icon_play'

const nextBtn = document.querySelector(NEXT_BUTTON_SELECTOR)
const prevBtn = document.querySelector(PREV_BUTTON_SELECTOR)
const playPauseBtn = document.querySelector(PLAY_PAUSE_BUTTON_SELECTOR)

navigator.mediaSession.setActionHandler('previoustrack', () => prevBtn.click())
navigator.mediaSession.setActionHandler('nexttrack', () => nextBtn.click())
navigator.mediaSession.setActionHandler('play', () => playPauseBtn.click())
navigator.mediaSession.setActionHandler('pause', () => playPauseBtn.click())
