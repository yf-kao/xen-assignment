import { Controller, Get, Post, Patch, Delete, Param, NotFoundException, BadRequestException, Request, Res, Query, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { ApiTags, ApiBody, ApiResponse, ApiConsumes } from '@nestjs/swagger';

import { unlinkSync } from 'fs'

import { PicturesService } from './pictures.service';
import { Picture as PictureEntity } from './picture.entity';
import { PictureDto, SuccessDto } from './dto/picture.dto';
import { UPLOAD_FOLDER } from '../../core/constants';

import { editFileName, imageFileFilter } from '../../utils/file-upload.utils';

@ApiTags('pictures')
@Controller('users/:userId/pictures')
export class UserPicturesController {
  constructor(private readonly pictureService: PicturesService) { }

  @Get()
  @ApiResponse({ status: 200, type: [PictureDto] })
  async findAll(@Param('userId') userId: number, @Query('offset') offset = 0, @Query('limit') limit = 10) {
    return this.pictureService.findAll({ userId }, offset, limit);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: PictureDto })
  async findOne(@Param('userId') userId: number, @Param('id') id: number): Promise<PictureEntity> {
    const picture = await this.pictureService.findOne(id, { userId });

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    return picture;
  }

  @Get(':id/download')
  @ApiResponse({ status: 200 })
  async downloadById(@Param('userId') userId: number, @Param('id') id: number, @Res() res) {
    const picture = await this.pictureService.findOne(id, { userId });

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    return res.sendFile(picture.filename, { root: UPLOAD_FOLDER });
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ status: 201, type: PictureDto })
  @UseInterceptors(FilesInterceptor('image', 20, {
    storage: diskStorage({
      destination: UPLOAD_FOLDER,
      filename: editFileName
    }),
    fileFilter: imageFileFilter
  }))
  async uploadMultipleFiles(@Param('userId') userId: number, @Request() req, @UploadedFiles() files) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    return Promise.all(files.map(async file => await this.pictureService.create(file, { userId })));
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ status: 200, type: SuccessDto })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: UPLOAD_FOLDER,
      filename: editFileName
    }),
    fileFilter: imageFileFilter
  }))
  async update(@Param('userId') userId: number, @Param('id') id: number, @Request() req, @UploadedFile() file) {

    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    const orignalPicture = await this.pictureService.findOne(id, { userId });

    if (!orignalPicture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    await unlinkSync(`${UPLOAD_FOLDER}/${orignalPicture.filename}`);

    await this.pictureService.update(id, file, { userId });
    return { message: 'success' };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessDto })
  async remove(@Param('userId') userId: number, @Param('id') id: number) {
    const picture = await this.pictureService.findOne(id, { userId });

    if (!picture) {
      throw new NotFoundException('This Picture doesn\'t exist');
    }

    await this.pictureService.delete(id, { userId });
    await unlinkSync(`${UPLOAD_FOLDER}/${picture.filename}`);

    return { message: 'success' };
  }
}
