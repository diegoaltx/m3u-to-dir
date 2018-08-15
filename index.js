const fs = require('fs')
const path = require('path')
const Lame = require('node-lame').Lame
const parser = require('./parser')

module.exports = {
  parseFile,
  copyTracks,
  normalizeTracks
}

function parseFile (path) {
  const body = fs.readFileSync(path, 'utf-8')
  const result = parser.parse(body)

  return { path, ...result }
}

/* TODO: duplicate code on copyTracks and normalizeTracks
 * to deal with files paths, needs refactoring
 */

function copyTracks (m3u, toDir) {
  const m3uPath = path.resolve(m3u.path)
  const m3uDir = path.dirname(m3uPath)

   for (const track of m3u.tracks) {
    const extension = path.extname(track.path)
    const position = String(track.position).padStart(4, '0')
    const filename = `${position}${extension}`
    const toPath = path.join(toDir, filename)
    const fromPath = path.resolve(m3uDir, track.path)

    fs.copyFileSync(fromPath, toPath)
  }
}

async function normalizeTracks (m3u, toDir) {
  const m3uPath = path.resolve(m3u.path)
  const m3uDir = path.dirname(m3uPath)

  for (const track of m3u.tracks) {
    const extension = path.extname(track.path)
    const position = String(track.position).padStart(4, '0')
    const filename = `${position}${extension}`
    const toPath = path.join(toDir, filename)
    const fromPath = path.resolve(m3uDir, track.path)

    const encoderOptions = {
      output: toPath,
      bitrate: 128,
      cbr: true,
      resample: 44.1,
      mp3Input: true
    }

    const encoder = new Lame(encoderOptions).setFile(fromPath)

    await encoder.encode()
  }
}
