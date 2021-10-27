import * as gm from 'gm';
import {State} from 'gm';
import {ImageTypes} from "../enums/ImageTypes";
import {ImgDimension} from "../interfaces/ImgDimension";

const EditorClient = gm.subClass({imageMagick: true});

export class ImageEditor {
  gm: State;

  constructor(public pathToImage: string | Buffer) {
    this.gm = EditorClient(pathToImage as any);
  }

  autoOrient(): void {
    this.gm.autoOrient();
  }

  fillAlpha(color: string): void {
    this.gm.background(color);
    this.gm.alpha('remove');
  }

  resize(width: number, height?: number): void {
    this.gm.resize(width, height);
  }

  resizeExact(width: number, height?: number): void {
    this.gm.resizeExact(width, height);
  }

  toBuffer(type: ImageTypes): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      this.gm.toBuffer(type, (err, buffer: Buffer) => {
        if (err)
          reject(err);
        else
          resolve(buffer);
      });
    });
  }

  size(): Promise<ImgDimension> {
    return new Promise((res, reject) => {
      this.gm.size((err, response) => {
        if (err)
          reject(err);
        res(response);
      });
    });
  }

  rotate(angle: number, background: string = 'white'): void {
    this.gm.rotate(background, angle);
  }

  crop(width: number, height: number, x: number, y: number): void {
    this.gm.crop(width, height, x, y);
  }

  save(path: string): Promise<void> {
    return new Promise((res, rej) => {
      this.gm.write(path, (err) => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }
}
