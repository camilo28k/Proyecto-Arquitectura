import { IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    userId:string
    @IsString()
    objetivo: string
}
