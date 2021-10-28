import {getResizeService} from "./helpers/get-resize-service";
import {ImageTypes, ImgConvertConfig, ImgResizeConfig, ImgResizeService} from "../src";
import fs from "fs";
import path from "path";
import * as Benchmark from "benchmark";

async function benchmark() {
  const imgResizeService: ImgResizeService = await getResizeService();
  const suite = new Benchmark.Suite();


  const jpgBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'forest.jpg'));
  const pngBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'example-2.png'));
  const pngBufferFullHd: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'example-3.png'));
  const tiffBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, 'test-images', 'tiff-example.tiff'));

  const resizeConfig: ImgResizeConfig = {width: 500, height: 500, outType: ImageTypes.jpg};
  const resizeConfigPng: ImgResizeConfig = {width: 500, height: 500, outType: ImageTypes.png};
  const convertConfig: ImgConvertConfig = {outType: ImageTypes.jpg};


  suite.add(`Resize jpg 1920x1080 to 500x281`, {
    defer: true,
    fn: async (deferred) => {
      imgResizeService.resize(jpgBuffer, resizeConfig).then(() => deferred.resolve())
    }
  }).add(`Resize png 1920x1080 to 500x281`, {
    defer: true,
    fn: async (deferred) => {
      imgResizeService.resize(pngBufferFullHd, resizeConfigPng).then(() => deferred.resolve())
    }
  }).add(`Convert 650x434 png to jpg`, {
    defer: true,
    fn: async (deferred) => {
      imgResizeService.convert(pngBuffer, convertConfig).then(() => deferred.resolve())
    }
  }).add(`Convert 650x434 tiff to jpg`, {
    defer: true,
    fn: async (deferred) => {
      imgResizeService.convert(tiffBuffer, convertConfig).then(() => deferred.resolve())
    }
  }).on('complete', (res) => {
    for (let b of Array.from(res.currentTarget)) {
      const benchmark: Benchmark = b as Benchmark;
      console.log(benchmark.name + ' --> ' + benchmark.hz + " ops/sec | Samples: " + benchmark.stats.sample.length);
    }
  }).run();

}

benchmark();



