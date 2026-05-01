import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateEducationDto {

            @IsString()
            title: string
    
            @IsString()
            description: string
    
            @Type(()=> Number)
            @IsNumber()
            goal: number
    
            @Type(()=> Number)
            @IsNumber()
            raised: number
}
    
