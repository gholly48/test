import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد'
  })
  password: string
}