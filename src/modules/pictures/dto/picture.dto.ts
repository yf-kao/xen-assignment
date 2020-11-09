import { IsNotEmpty } from 'class-validator';

export class PictureDto {

  readonly id: number;

  @IsNotEmpty()
  readonly filename: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}


export class CreatePictureDto {

  readonly filename: string;

}

export class SuccessDto {

  readonly message: string;

}
