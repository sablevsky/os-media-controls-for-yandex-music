'use strict'

import { trackObj } from './mock.js'
import { curry, compose, join, mapObjectsToPrimitives } from './helpers.js'

const createArtworkURL = (baseURL, replaceable, size) =>
  `https://${baseURL.replace(replaceable, size)}`

const getArtworksArray = (generateArtworkFromSize) => {
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
const getArtistsNamesArr = curry(mapObjectsToPrimitives)('title')
const createArtistString = compose(joinWithComma, getArtistsNamesArr)


//Impure part
const setMediaSessionMetadata = (createArtistString) => {
  const { title, cover, artists, album } = trackObj

  const generateArtworkFromSize = curry(createArtworkURL)(cover)('%%')
  const artwork = getArtworksArray(generateArtworkFromSize)


  const artist = createArtistString(artists)

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    album: album.title,
    artwork,
  })
}

curry(setMediaSessionMetadata)(createArtistString)

