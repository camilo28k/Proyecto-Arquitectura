import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateEnvironmentDto {

    @IsString()
    title: string;

    @IsString()
    description: string

    @Type(()=> Number)
    @IsNumber()
    goal: number

    @Type(()=> Number)
    @IsNumber()
    raised: number


}
