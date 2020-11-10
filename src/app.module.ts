import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { PicturesModule } from './modules/pictures/pictures.module';

import { UPLOAD_FOLDER } from './core/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    PicturesModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: UPLOAD_FOLDER,
      }),
    })
  ]
})
export class AppModule { }
