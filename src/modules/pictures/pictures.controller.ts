import { Controller, Get, Delete, Param, NotFoundException, Res, Query } from '@nestjs/common';

import { unlinkSync } from 'fs'

import { PicturesService } from './pictures.service';
import { Picture as PictureEntity } from './picture.entity';
import { UPLOAD_FOLDER } from '../../core/constants';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly pictureService: PicturesService) { }

  @Get()
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    return this.pictureService.findAll({}, offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PictureEntity> {
    const picture = await this.pictureService.findOne(id);

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    return picture;
  }

  @Get(':id/download')
  async downloadById(@Param('id') id: number, @Res() res) {
    const picture = await this.pictureService.findOne(id);

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    return res.sendFile(picture.filename, { root: UPLOAD_FOLDER });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const picture = await this.pictureService.findOne(id);

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    await this.pictureService.delete(id);
    await unlinkSync(`${UPLOAD_FOLDER}/${picture.filename}`);

    return { message: 'success' };
  }
}
