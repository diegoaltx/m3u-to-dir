const assert = require('chai').assert
const path = require('path')
const m3uToDir = require('../index')
const samplePath = path.join(__dirname, 'sample.m3u')

describe('parseFile', () => {
  it('shold return parse result', () => {
    const result = m3uToDir.parseFile(samplePath)
    const requiredKeys = [ 'path', 'body', 'tracks' ]
    assert.hasAllKeys(result, requiredKeys)
  })
})
