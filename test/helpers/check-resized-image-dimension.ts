import {ImgResizeConfig} from "../../src/interfaces/ImgResizeConfig";
import {ImgDimension} from "../../src/interfaces/ImgDimension";
import {ImageEditor} from "../../src/classes/ImageEditor";
import {ImgResizeService} from "../../src/services/img-resize.service";

export async function checkResizedImageDimension(originalImg: Buffer, resizedConfig: ImgResizeConfig, resizedImg: Buffer): Promise<void> {
  const originalIe: ImageEditor = new ImageEditor(originalImg);
  const originalImgDimension: ImgDimension = await originalIe.size();

  const resizedIe: ImageEditor = new ImageEditor(resizedImg);
  const resizedImgDimension: ImgDimension = await resizedIe.size();

  const aspectRatio: number = Math.min(originalImgDimension.width, originalImgDimension.height) / Math.max(originalImgDimension.width, originalImgDimension.height);


  if (!resizedConfig.allowStretch && ImgResizeService.isImageSmaller(originalImgDimension, resizedConfig)) {
    expect(resizedImgDimension.width).toBeLessThanOrEqual(resizedConfig.width);
    expect(resizedImgDimension.height).toBeLessThanOrEqual(resizedConfig.height);
  } else if (!resizedConfig.exact && originalImgDimension.width > originalImgDimension.height) {
    expect(resizedImgDimension.width).toEqual(resizedConfig.width);
    expect(resizedImgDimension.height).toEqual(Math.round(aspectRatio * resizedConfig.width));
  } else if (!resizedConfig.exact && originalImgDimension.width < originalImgDimension.height) {
    expect(resizedImgDimension.height).toEqual(resizedConfig.height);
    expect(resizedImgDimension.width).toEqual(Math.round(aspectRatio * resizedConfig.height));
  } else {
    expect(resizedImgDimension.width).toEqual(resizedConfig.width);
    expect(resizedImgDimension.height).toEqual(resizedConfig.height);
  }
}
