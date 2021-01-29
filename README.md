# Naughty Videos

An API for naughty websites ¯\\\_( ͡° ͜ʖ ͡°)\_/¯

## Why?

Well, it all started as an internal joke, and then I decided to make it real for no real reason ¯\\\_(ツ)\_/¯

## API

### Class Xvideos

Method | Description | Params | Return
--- | --- | --- | ---
static newVideos | gets videos from the home page | [page: number] | Promise<Video[]>
static bestVideos | gets videos from the "best" tab | [page: number] | Promise<Video[]>
static verifiedVideos | gets videos from the "verified" tab | [page: number] | Promise<Video[]>
static search | searches for videos | query: string [page: number] | Promise<Video[]>
static taggedVideos | gets videos containing a specific tag | tag: string [page: number] | Promise<Video[]>
static tags | gets all available tags | | Promise<string[]>

## Installation

```bash
  npm install naughty-videos
```

## Example

```ts
  const { Xvideos } = require('naughty-videos')

  Xvideos.search('example').then(console.log)
```

## Disclaimer

This weird module is **not** associated with any of the supported websites.
