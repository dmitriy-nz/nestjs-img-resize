import {ImageTypes} from "../enums/ImageTypes";

export interface ImgConvertConfig {

  /** Allow to automatically rotate the image based on exif metadata, default - false **/
  autoExifRotate?: boolean;

  /** Output Image Format, default jpeg **/
  outType?: ImageTypes;

  /** Fill the alpha channel with a specific color, useful when converting a format with an alpha channel to a format without it **/
  fillAlpha?: string;

}
