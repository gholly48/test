import { IsString, MinLength, MaxLength  } from "class-validator";

export class CreateJobDto {

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    description: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    category: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    location: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    phone: string

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    website: string

}

