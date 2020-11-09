import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Exclude } from "class-transformer";

export class UserDto {
  readonly id: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

}

export class UserListDto {


  readonly totalCount: number;

  readonly users: UserDto[];

}

export class QueryUserDto {

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly name: string;

  @IsOptional()
  @Exclude({ toPlainOnly: true })
  offset: number

  @IsOptional()
  @Exclude({ toPlainOnly: true })
  limit: number

}

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;

}

export class UpdateUserDto {

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly name: string;

}

export class SuccessDto {

  readonly message: string;

}