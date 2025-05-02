import { Controller, Post, Body, UseFilters, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { HttpExceptionFilter } from 'src/response/http-exception.filter';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @UseFilters(new HttpExceptionFilter())
      async signUp(@Body() createUserDto: any) {

        try {
        const user = await this.authService.signUp(createUserDto);
        return {
          success: true,
          message: 'ثبت نام موفقیت آمیز بود',
          data: user
        }
      } catch(error) {
        throw new HttpException({
          status: HttpStatus.CONFLICT, // کد 409
          error: 'ایمیل از قبل وجود دارد',
          message: 'این ایمیل قبلا ثبت شده است',
        }, HttpStatus.CONFLICT);
      }
      }

    @Post('signin')
      async signIn(@Body() body: { email: string; password: string }) {
        return this.authService.signIn(body.email, body.password);
      }
    
    @Post('forgot-password')
      async forgotPassword(@Body() { email }: ForgotPasswordDto) {
        await this.authService.requestPasswordReset(email);
        return { message: 'اگر ایمیل معتبر باشد، لینک بازیابی ارسال شد' };
      }
    
    @Post('reset-password')
      async resetPassword(@Body() dto: ResetPasswordDto) {
        await this.authService.resetPassword(dto.token, dto.newPassword);
        return { message: 'رمز عبور با موفقیت تغییر یافت' };
      }
}

