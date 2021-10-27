import {BadRequestException, Injectable} from '@nestjs/common';
import {ImageEditor} from '../classes/ImageEditor';
import {ImgResizeConfig} from "../interfaces/ImgResizeConfig";
import {ImageTypes} from "../enums/ImageTypes";
import {ImgResizeResponse} from "../interfaces/ImgResizeResponse";
import {ImgDimension} from "../interfaces/ImgDimension";
import {ImgConvertConfig} from "../interfaces/ImgConvertConfig";

@Injectable()
export class ImgResizeService {

  static isImageSmaller(imgResolution: ImgDimension, resizeConfig: ImgResizeConfig): boolean {
    return imgResolution.width <= resizeConfig.width && imgResolution.height <= resizeConfig.height
  }

  /**
   * Resize image by bulk configuration
   * @param image
   * @param resizeConfig
   */
  async resizeBulk(image: Buffer, resizeConfig: ImgResizeConfig[]): Promise<ImgResizeResponse[]> {
    return Promise.all(resizeConfig.map(rc => this.resize(image, rc)));
  }

  /**
   *  Resize image by configuration
   * @param image
   * @param resizeConfig
   */
  async resize(image: Buffer, resizeConfig: ImgResizeConfig): Promise<ImgResizeResponse> {
    const outType: ImageTypes = resizeConfig.outType || ImageTypes.jpeg;

    try {
      const ie: ImageEditor = new ImageEditor(image);
      const inputImageResolution: ImgDimension = await ie.size();

      if (resizeConfig.fillAlpha) {
        ie.fillAlpha(resizeConfig.fillAlpha);
      }

      if (resizeConfig.autoExifRotate) {
        await ie.autoOrient()
      }

      if (resizeConfig.exact) {
        ie.resizeExact(resizeConfig.width, resizeConfig.height);
      } else {
        if (resizeConfig.allowStretch || !ImgResizeService.isImageSmaller(inputImageResolution, resizeConfig)) {
          ie.resize(resizeConfig.width, resizeConfig.height);
        }
      }

      const buffer: Buffer = await ie.toBuffer(outType);
      const resizedIe: ImageEditor = new ImageEditor(buffer);
      const imageResolution: ImgDimension = await resizedIe.size();

      return {
        sizeName: resizeConfig.sizeName || null,
        width: imageResolution.width,
        height: imageResolution.height,
        size: buffer.byteLength,
        type: outType,
        buffer,
      };

    } catch (err) {
      console.error(err);
      throw new BadRequestException(null, `Image invalid`);
    }
  }

  /**
   * Converting an image to a specific format
   * @param image
   * @param convertConfig
   */
  async convert(image: Buffer, convertConfig: ImgConvertConfig): Promise<Buffer> {
    const outType: ImageTypes = convertConfig.outType || ImageTypes.jpeg;

    try {
      const ie: ImageEditor = new ImageEditor(image);

      if (convertConfig.fillAlpha) {
        ie.fillAlpha(convertConfig.fillAlpha);
      }

      if (convertConfig.autoExifRotate) {
        await ie.autoOrient()
      }

      return await ie.toBuffer(outType);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(null, `Image invalid`);
    }
  }

  /**
   * Get image dimension
   * @param buffer
   */
  async getImgDimension(buffer: Buffer): Promise<ImgDimension> {
    const ie: ImageEditor = new ImageEditor(buffer);
    return await ie.size();
  }


}
