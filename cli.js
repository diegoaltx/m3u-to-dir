#!/usr/bin/env node

const m3utodir = require('./index')

const [,, action, m3uPath, toPath] = process.argv;

if (!(action && m3uPath && toPath)) {
  console.log('Usage: m3utodir [copy|normalize] [source m3u] [destination dir]')
  process.exit(0)
}

runAction()

async function runAction () {
  try {
    const m3u = m3utodir.parseFile(m3uPath)
    
    if (action === 'copy') {
      m3utodir.copyTracks(m3u, toPath)
    }

    if (action == 'normalize') {
      await m3utodir.normalizeTracks(m3u, toPath)
    }
  }
  catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
