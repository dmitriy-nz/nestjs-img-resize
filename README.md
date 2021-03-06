# Description

NestJS module for simple and flexible image resizing. Uses the [gm](https://www.npmjs.com/package/gm) library and
implements a user-friendly interface for resizing and converting images.

### Features

- Format support: jpg, jpeg, png, tif, tiff (other formats were not tested)
- Resize images while maintaining aspect ratio
- Automatic image rotation by exif metadata
- Converting images to supported formats
- Additional settings for resizing images

## Installation

Install this library

```shell
npm install nestjs-img-resize
```

The library depends on gm, so the graphicsmagick and imagemagick libraries need to be installed

```shell
apt-get install -y graphicsmagick imagemagick
```

or

```shell
brew install imagemagick
brew install graphicsmagick
```

## Usage

Connect the module to your project

```ts
@Module({
  imports: [
    NestjsImgResizeModule,
  ],
})
export class AppModule {
}
```

Inject ImgResizeService into controller or your service

```ts
@Injectable()
export class Myservice {
  constructor(protected imgResizeService: ImgResizeService) {
  }
}
```

### Image conversion method

Converting an image to a specific format

```
convert(image: Buffer, convertConfig: ImgConvertConfig):Promise<Buffer>;
```

### Image resize method

Resize image by configuration

```
resize(image: Buffer, resizeConfig: ImgResizeConfig): Promise<ImgResizeResponse>;
```

### Image bulk resize method

Resize image by bulk configuration, and the result is images in several sizes.

```
resizeBulk(image: Buffer, resizeConfig: ImgResizeConfig[]): Promise<ImgResizeResponse[]>
```

### Get image dimension

```
getImgDimension(buffer: Buffer): Promise<ImgDimension>
```

### Interfaces

#### ImgConvertConfig

| Prop            | Type        | Description                                                                                                                  |
|----------------	|------------	|----------------------------------------------------------------------------------------------------------------------------	|
| autoExifRotate  | boolean      | Allow to automatically rotate the image based on exif metadata, default - false                                              |
| outType          | ImageTypes  | Output Image Format, default jpeg                                                                                            |
| fillAlpha        | string      | Fill the alpha channel with a specific color, useful when converting a format with an alpha channel to a format without it  |

#### ImgResizeConfig

extends ImgConvertConfig

| Prop          | Type          | Description                                                                                              |
|--------------	|--------------	|--------------------------------------------------------------------------------------------------------	|
| width          | number        | Resized image width, required                                                                            |
| height        | number        | Resized image height, required                                                                          |
| exact          | boolean        | If true then the output image size will have the exact size specified in the configuration, by default false - resizing takes into account the aspect ratio of the image                                                                                                    |
| allowStretch  | allowStretch  | Stretch the image if it is smaller than the specified size, only works if exact = false, default false  |
| sizeName      | string        | Size name, for identify resized result, optional                                                        |
| autoExifRotate  | boolean      | Allow to automatically rotate the image based on exif metadata, default - false                                              |
| outType          | ImageTypes  | Output Image Format, default jpeg                                                                                            |
| fillAlpha        | string      | Fill the alpha channel with a specific color, useful when converting a format with an alpha channel to a format without it  |

## Benchmark

```shell
npm run benchmark
```

### Benchmark results

The results depend on the characteristics of the machine on which the test is performed.  
My results on Intel Core i5-10300H CPU @ 2.50GHz ?? 8, 15,5 GiB, Ubuntu 20.04.2 LTS

#### v1.0.0

```shell
Resize jpg 1920x1080 to 500x281 --> 9.81338447508557 ops/sec | Samples: 49
Resize png 1920x1080 to 500x281 --> 4.821842038356058 ops/sec | Samples: 27
Convert 650x434 png to jpg --> 28.200684305778598 ops/sec | Samples: 68
Convert 650x434 tiff to jpg --> 25.820336860905076 ops/sec | Samples: 45
```

## Tests

```shell
npm run test:e2e
```

## License

[MIT](LICENSE)
