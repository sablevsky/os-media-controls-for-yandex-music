'use strict'

import { curry, compose, join, mapObjectsToPrimitives } from './helpers.js'

const makeArtworkURL = curry(
  (replaceable, baseURL, size) =>
    `https://${baseURL.replace(replaceable, size)}`
)

const generateArtworksArray = (generateArtworkFromSize) => {
  const COVER_SIZES = [
    '30x30',
    '50x50',
    '80x80',
    '100x100',
    '200x200',
    '300x300',
    '400x400',
  ]
  return COVER_SIZES.map((size) => ({
    src: generateArtworkFromSize(size),
    sizes: size,
    type: 'image/png',
  }))
}

const joinWithComma = join(', ')
const getArtistsNamesArr = mapObjectsToPrimitives('title')

const generateArtworksArrayByURL = compose(
  generateArtworksArray,
  makeArtworkURL('%%')
)
const createArtistString = compose(joinWithComma, getArtistsNamesArr)

const createSetMediaSessionMetadata = curry(
  (generateArtworksArrayByURL, createArtistString, getTrackData) => () => {
    const { title, cover, artists, album } = getTrackData()
    const artwork = generateArtworksArrayByURL(cover)
    const artist = createArtistString(artists)

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album: album.title,
      artwork,
    })
  }
)

export const createChangeMediaSessionMetadata = createSetMediaSessionMetadata(
  generateArtworksArrayByURL
)(createArtistString)
