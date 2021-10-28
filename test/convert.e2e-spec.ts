import {ImgResizeService} from "../src/services/img-resize.service";
import {getResizeService} from "./helpers/get-resize-service";
import * as fs from "fs";
import * as path from "path";
import {ImageTypes} from "../src/enums/ImageTypes";
import {fromBuffer} from "file-type";
import {ImgConvertConfig} from "../src/interfaces/ImgConvertConfig";

describe('Convert image type', () => {
  let imgResizeService: ImgResizeService;

  beforeEach(async () => {
    imgResizeService = await getResizeService();
  });

  it('Convert image from jpeg to png', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest-height.jpg'));

    const resizeConfig: ImgConvertConfig = {outType: ImageTypes.png};
    const resizedImg: Buffer = await imgResizeService.convert(imgBuffer, resizeConfig);

    const resizedFileType = await fromBuffer(resizedImg);
    expect(resizedFileType.ext).toEqual(resizeConfig.outType);
  });

  it('Convert image from png to jpg', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'example.png'));

    const resizeConfig: ImgConvertConfig = {outType: ImageTypes.jpg};
    const resizedImg: Buffer = await imgResizeService.convert(imgBuffer, resizeConfig);

    const resizedFileType = await fromBuffer(resizedImg);
    expect(resizedFileType.ext).toEqual(resizeConfig.outType);
  });

  it('Convert image from png to jpeg', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'example.png'));

    const resizeConfig: ImgConvertConfig = {outType: ImageTypes.jpeg};
    const resizedImg: Buffer = await imgResizeService.convert(imgBuffer, resizeConfig);

    const resizedFileType = await fromBuffer(resizedImg);
    expect(resizedFileType.ext).toEqual(ImageTypes.jpg);
  });

  it('Convert image from tiff to jpg', async () => {
    const imgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'tiff-example.tiff'));

    const resizeConfig: ImgConvertConfig = {outType: ImageTypes.jpg};
    const resizedImg: Buffer = await imgResizeService.convert(imgBuffer, resizeConfig);

    const resizedFileType = await fromBuffer(resizedImg);
    expect(resizedFileType.ext).toEqual(resizeConfig.outType);
  });


});
