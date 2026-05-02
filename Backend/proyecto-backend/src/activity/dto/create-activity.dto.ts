import { IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    objetivo: string
}
