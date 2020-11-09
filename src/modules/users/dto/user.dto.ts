import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Exclude } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

}

export class UserListDto {


  @ApiProperty()
  readonly totalCount: number;

  @ApiProperty()
  readonly users: UserDto[];

}

export class QueryUserDto {

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  readonly email: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Exclude({ toPlainOnly: true })
  offset: number

  @IsOptional()
  @ApiPropertyOptional()
  @Exclude({ toPlainOnly: true })
  limit: number

}

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

}

export class UpdateUserDto {

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsOptional()
  @ApiProperty()
  readonly name: string;

}

export class SuccessDto {

  @ApiProperty()
  readonly message: string;

}