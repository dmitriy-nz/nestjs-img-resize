import {Module} from '@nestjs/common';
import {NestjsImgResizeModule} from "../../src/nestjs-img-resize.module";

@Module({
  controllers: [],
  imports: [
    NestjsImgResizeModule,
  ],
  providers: [],
  exports: [],
})
export class TestModule {
}
