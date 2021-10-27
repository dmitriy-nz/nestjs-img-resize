import {ImgResizeService} from "../src/services/img-resize.service";
import {getResizeService} from "./helpers/get-resize-service";
import * as fs from "fs";
import {ImgResizeResponse} from "../src/interfaces/ImgResizeResponse";
import * as path from "path";
import {ImgResizeConfig} from "../src/interfaces/ImgResizeConfig";
import {checkResizedImageDimension} from "./helpers/check-resized-image-dimension";

describe('Array files uploads', () => {
  let imgResizeService: ImgResizeService;

  beforeEach(async () => {
    imgResizeService = await getResizeService();
  });

  it('Simple resize, maintain aspect ratio by width', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest.jpg'));

    const resizeConfig: ImgResizeConfig = {width: 400, height: 400};
    const resizedImg: ImgResizeResponse = await imgResizeService.resize(imgBuffer, resizeConfig);
    await checkResizedImageDimension(imgBuffer, resizeConfig, resizedImg.buffer);
  });

  it('Simple resize, maintain aspect ratio by height', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest-height.jpg'));

    const resizeConfig: ImgResizeConfig = {width: 400, height: 400};
    const resizedImg: ImgResizeResponse = await imgResizeService.resize(imgBuffer, resizeConfig);
    await checkResizedImageDimension(imgBuffer, resizeConfig, resizedImg.buffer);
  });

  it('Exact resize', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest-height.jpg'));

    const resizeConfig: ImgResizeConfig = {width: 400, height: 400, exact: true};
    const resizedImg: ImgResizeResponse = await imgResizeService.resize(imgBuffer, resizeConfig);
    await checkResizedImageDimension(imgBuffer, resizeConfig, resizedImg.buffer);
  });

  it('Stretch disable resize, lower size image', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest-height.jpg'));

    const resizeConfig: ImgResizeConfig = {width: 1000, height: 1500};
    const resizedImg: ImgResizeResponse = await imgResizeService.resize(imgBuffer, resizeConfig);
    await checkResizedImageDimension(imgBuffer, resizeConfig, resizedImg.buffer);
  });

  it('Stretch allow resize, lower size image', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest-height.jpg'));

    const resizeConfig: ImgResizeConfig = {width: 1000, height: 1500, allowStretch: true};
    const resizedImg: ImgResizeResponse = await imgResizeService.resize(imgBuffer, resizeConfig);
    await checkResizedImageDimension(imgBuffer, resizeConfig, resizedImg.buffer);
  });

  it('Stretch allow exact resize, lower size image', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest-height.jpg'));

    const resizeConfig: ImgResizeConfig = {width: 1000, height: 1500, allowStretch: true, exact: true};
    const resizedImg: ImgResizeResponse = await imgResizeService.resize(imgBuffer, resizeConfig);
    await checkResizedImageDimension(imgBuffer, resizeConfig, resizedImg.buffer);
  });
  
});
