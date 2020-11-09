import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { PicturesModule } from './modules/pictures/pictures.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    PicturesModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/files',
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
