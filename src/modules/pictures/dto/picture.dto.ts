import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PictureDto {

  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly filename: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}


export class CreatePictureDto {

  @ApiProperty()
  readonly filename: string;

}

export class SuccessDto {

  @ApiProperty()
  readonly message: string;

}
