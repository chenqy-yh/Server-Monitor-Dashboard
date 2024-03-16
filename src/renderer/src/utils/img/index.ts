import { Img, ImgKeys } from './img'

type Images = {
  [key in ImgKeys]: string
}

class ImgHelper {
  private images: Images
  constructor() {
    // 异步加载json文件
    this.images = Img
  }

  getImg(key: ImgKeys) {
    const img = this.images[key]
    return img ?? this.images['file']
  }
}

const imgHelper = new ImgHelper()

export { imgHelper }
