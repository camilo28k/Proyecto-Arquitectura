import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateArtDto {
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
        
                @IsString()
                @IsOptional()
                image?: string
        
}
