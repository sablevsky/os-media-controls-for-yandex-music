'use strict'

import { curry, compose, join, arrayOfFields } from './helpers.js'

const artworkURL = curry(
  (replaceable, baseURL, size) =>
    `https://${baseURL.replace(replaceable, size)}`
)

const artworksArray = (artworkFromSize) => {
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
    src: artworkFromSize(size),
    sizes: size,
    type: 'image/png',
  }))
}

const joinWithComma = join(', ')
const arrayOfTitleFields = arrayOfFields('title')

const artworksArrayByURL = compose(artworksArray, artworkURL('%%'))
const artistString = compose(joinWithComma, arrayOfTitleFields)

//Impure part
const setMediaSessionMetadata = curry(
  (artworksArrayByURL, artistString, getTrackData) => () => {
    const { title, cover, artists, album } = getTrackData()
    const artwork = artworksArrayByURL(cover)
    const artist = artistString(artists)

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album: album.title,
      artwork,
    })
  }
)

export const changeMediaSessionMetadata = setMediaSessionMetadata(
  artworksArrayByURL
)(artistString)
