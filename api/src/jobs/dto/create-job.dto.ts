import { IsString, MinLength, MaxLength  } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateJobDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    description: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    category: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    location: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    phone: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    website: string

}

