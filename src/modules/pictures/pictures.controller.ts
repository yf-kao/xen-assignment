import { Controller, Get, Post, Patch, Delete, Param, NotFoundException, BadRequestException, Request, Res, Query, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiConsumes } from '@nestjs/swagger';

import { unlinkSync } from 'fs'

import { PicturesService } from './pictures.service';
import { Picture as PictureEntity } from './picture.entity';
import { PictureDto, SuccessDto } from './dto/picture.dto';
import { UPLOAD_FOLDER } from '../../core/constants';

@ApiTags('pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly pictureService: PicturesService) { }

  @Get()
  @ApiResponse({ status: 200, type: [PictureDto] })
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    return this.pictureService.findAll({}, offset, limit);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: PictureDto })
  async findOne(@Param('id') id: number): Promise<PictureEntity> {
    const picture = await this.pictureService.findOne(id);

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    return picture;
  }

  @Get(':id/download')
  @ApiResponse({ status: 200, type: SuccessDto })
  async downloadById(@Param('id') id: number, @Res() res) {
    const picture = await this.pictureService.findOne(id);

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    return res.sendFile(picture.filename, { root: UPLOAD_FOLDER });
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessDto })
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
