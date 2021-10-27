import {ImgResizeService} from "../../src/services/img-resize.service";
import {createTestModule} from "./create-test-module";
import {INestApplication} from "@nestjs/common";

export async function getResizeService(): Promise<ImgResizeService> {
  const app: INestApplication = await createTestModule();
  return await app.get(ImgResizeService);
}
