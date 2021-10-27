import {Module} from '@nestjs/common';
import {ImgResizeService} from "./services/img-resize.service";


@Module({
  providers: [
    ImgResizeService
  ],
  exports: [
    ImgResizeService
  ],
})
export class NestjsImgResizeModule {


}
