import {ImageTypes} from "../enums/ImageTypes";

export interface ImgResizeResponse {
  width: number;
  height: number;
  buffer: Buffer;
  size: number;
  type: ImageTypes;
  sizeName: string;
}
