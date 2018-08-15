# m3u-to-dir

Utility to normalize/copy files from a m3u playlist to a destination directory.

## Installation

```
npm install -g m3u-to-dir
```

## Usage

### CLI

Copy all files in source (playlist.m3u) to destination (./some-dir):

```
m3utodir copy playlist.m3u ./some-dir 
```

Copy all files in source (playlist.m3u) to destination (./some-dir) normalizing them to MP3, 128kbps, 44.1Khz:

```
m3utodir normalize playlist.m3u ./destination-dir 
```

### Programmatically

```
const mp3todir = require('mp3-to-dir')
const m3u = m3utodir.parseFile('./playlist.m3u')

// copy
m3utodir.copyTracks(m3u, './some-dir')

// normalize
m3utodir.normalizeTracks(m3u, './some-dir')
```
