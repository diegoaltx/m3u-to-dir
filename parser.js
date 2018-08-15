const EOL = require('os').EOL

module.exports = {
  validateHeader,
  InvalidHeaderError,
  extractTracks,
  parse
}

function validateHeader (body) {
  const lines = body.split(EOL)
  const firstLine = lines[0]

  if (firstLine === '#EXTM3U') {
    return true
  }

  throw new InvalidHeaderError()
}

function InvalidHeaderError () {
  Error.captureStackTrace(this);
  this.message = 'A valid m3u header was not found';
  this.name = 'InvalidHeaderError'
}

InvalidHeaderError.prototype = Object.create(Error.prototype)

function extractTracks (body) {
  const trackPattern = /^(?:#EXTINF:)(\d+), (.*) - (.*)(?:\n|\r|\r\n)(.*)$/mg

  const tracks = []

  while ((found = trackPattern.exec(body)) !== null) {
    if (found.index === trackPattern.lastIndex) {
        trackPattern.lastIndex++;
    }

    tracks.push({
      position: tracks.length + 1,
      duration: found[1],
      artist: found[2],
      title: found[3],
      path: found[4]
    })
  }

  return tracks
}

function parse (body) {
  validateHeader(body)
  
  const tracks = extractTracks(body)
  
  return { body, tracks }
}
