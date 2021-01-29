import axios from 'axios'
import cheerio from 'cheerio'

interface Video {
  title: string,
  url: string,
  imgURL: string,
  author: string,
  authorURL: string,
  duration: string,
  quality: string,
  views: string,
  id: string
}

export class Xvideos {
  private static baseURL = 'https://xvideos.com'
  private static api = axios.create({ baseURL: 'https://xvideos.com/' })

  private static extractVideos (html: string): Video[] {
    const $ = cheerio.load(html)
    $('span.sprfluous').remove()

    return $('div.thumb-block')
      .map((_, element): Video => {
        const video = $(element)
        return {
          title: video.find('p.title').text(),
          url: this.baseURL + video.find('p.title > a').attr('href'),
          imgURL: video.find('div.thumb img').attr('data-src'),
          duration: video.find('span.duration').text(),
          author: video.find('span.bg a').text(),
          authorURL: this.baseURL + video.find('span.bg a').attr('href'),
          quality: video.find('span.bg > span[class="video-hd-mark"], span.bg > span[class="video-sd-mark"]').text(),
          views: video.find('span.bg > span > span').text(),
          id: video.attr('data-id')
        }
      })
      .toArray() as unknown as Video[]
  } 

  public static async newVideos (page?: number): Promise<Video[]> {
    const response = await this.api.get(page ? `new/${(page - 1)}` : '')
    return this.extractVideos(response.data)
  }

  public static async search (query: string, page?: number): Promise<Video[]> {
    const response = await this.api.get('', { params: {
      k: query,
      p: (page - 1)
    }})
    return this.extractVideos(response.data)
  }

  public static async bestVideos (page?: number): Promise<Video[]> {
    let response = await this.api.get('best')

    if (page) {
      response = await this.api.get(`${response.request.path}/${page - 1}`)
    }

    return this.extractVideos(response.data)
  }

  public static async verifiedVideos (page?: number): Promise<Video[]> {
    const response = await this.api.get(`verified/videos/${page ? (page - 1) : '' }`)
    return this.extractVideos(response.data)
  }

  public static async taggedVideos (tag: string, page?: number): Promise<Video[]> {
    const response = await this.api.get(`tags/${tag}/${page ? (page - 1) : '' }`)
    return this.extractVideos(response.data)
  }

  public static async tags (): Promise<string[]> {
    const response = await this.api.get(`tags`)
    const $ = cheerio.load(response.data)

    return $('ul#tags > li > a > b').map((_, element) => $(element).text()).toArray() as unknown as string[]
  }
}
