import { Module } from '@nestjs/common';

import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { UserPicturesController } from './userPictures.controller';
import { picturesProviders } from './pictures.providers';

@Module({
  providers: [PicturesService, ...picturesProviders],
  controllers: [PicturesController, UserPicturesController]
})
export class PicturesModule { }
