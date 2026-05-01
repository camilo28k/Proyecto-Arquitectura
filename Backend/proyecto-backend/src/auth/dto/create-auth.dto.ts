import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
