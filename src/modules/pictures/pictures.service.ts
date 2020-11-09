import { Injectable, Inject } from '@nestjs/common';

import { Picture } from './picture.entity';
import { PictureDto } from './dto/picture.dto';
import { PICTURE_REPOSITORY } from '../../core/constants';

@Injectable()
export class PicturesService {
  constructor(@Inject(PICTURE_REPOSITORY) private readonly pictureRepository: typeof Picture) { }

  async create(picture: PictureDto, query = {}): Promise<Picture> {
    return await this.pictureRepository.create<Picture>({ ...picture, ...query });
  }

  async findAll(query = {}, offset, limit): Promise<Picture[]> {
    return await this.pictureRepository.findAll<Picture>({ where: { ...query }, offset, limit });
  }

  async findOne(id, query = {}): Promise<Picture> {
    return await this.pictureRepository.findOne({
      where: { id, ...query }
    });
  }

  async delete(id, query = {}) {
    return await this.pictureRepository.destroy({ where: { id, ...query } });
  }

  async update(id, data, query = {}) {
    return await this.pictureRepository.update({ ...data }, { where: { id, ...query } });
  }
}
