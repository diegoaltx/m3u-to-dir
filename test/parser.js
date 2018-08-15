const assert = require('chai').assert
const EOL = require('os').EOL
const parser = require('../parser')

describe('validateHeader', () => {
  it('should throws an InvalidHeaderError if m3u header is not found', () => {
    const lines = [
      'WITHOUT AN VALID HEADER',
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const fn = () => parser.validateHeader(body)

    assert.throws(fn, parser.InvalidHeaderError)
  })

  it('should return true if m3u header is found', () => {
    const lines = [
      '#EXTM3U',
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const result = parser.validateHeader(body)

    assert.isTrue(result)
  })
})

describe('extractTracks', () => {
  it('should return an array of tracks', () => {
    const lines = [
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3',
      '#EXTINF:120, Example artist 2 - Example title 2',
      '/home/user/music/example2.mp3',
      '#EXTINF:210, Example artist 3 - Example title 3',
      '/home/user/music/example3.mp3'
    ]

    const body = lines.join(EOL)

    const tracks = parser.extractTracks(body)

    assert.equal(tracks.length, 3)
  })

  it('should extract track duration', () => {
    const lines = [
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const tracks = parser.extractTracks(body)

    assert.equal(tracks[0].duration, 105)
  })

  it('should extract track artist', () => {
    const lines = [
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const tracks = parser.extractTracks(body)

    assert.equal(tracks[0].artist, 'Example artist 1')
  })

  it('should extract track title', () => {
    const lines = [
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const tracks = parser.extractTracks(body)

    assert.equal(tracks[0].title, 'Example title 1')
  })

  it('should extract track path', () => {
    const lines = [
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const tracks = parser.extractTracks(body)

    assert.equal(tracks[0].path, '/home/user/music/example1.mp3')
  })

  it('should extract track position', () => {
    const lines = [
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3'
    ]

    const body = lines.join(EOL)

    const tracks = parser.extractTracks(body)

    assert.equal(tracks[0].position, 1)
  })
})

describe('parse', () => {
  it('should return parse result', () => {
    const lines = [
      '#EXTM3U',
      '#EXTINF:105, Example artist 1 - Example title 1',
      '/home/user/music/example1.mp3',
      '#EXTINF:120, Example artist 2 - Example title 2',
      '/home/user/music/example2.mp3',
      '#EXTINF:210, Example artist 3 - Example title 3',
      '/home/user/music/example3.mp3'
    ]

    const body = lines.join(EOL)

    const result = parser.parse(body)

    const requiredKeys = [ 'body', 'tracks' ]

    assert.hasAllKeys(result, requiredKeys)
  })
})
