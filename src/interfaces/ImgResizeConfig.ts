import {ImgConvertConfig} from "./ImgConvertConfig";

export interface ImgResizeConfig extends ImgConvertConfig {

  /** Resized image width **/
  width: number;

  /** Resized image height **/
  height: number;

  /** If true then the output image size will have the exact size specified in the configuration,
   * by default false - resizing takes into account the aspect ratio of the image **/
  exact?: boolean;

  /** Stretch the image if it is smaller than the specified size, only works if exact = false, default false **/
  allowStretch?: boolean;

  /** Size name, for identify resized result (optional) **/
  sizeName?: string;
}
