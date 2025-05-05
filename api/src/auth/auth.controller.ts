import { Controller, Post, Body, Res, UseFilters, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { HttpExceptionFilter } from './http-exception.filter'
import { Response } from 'express'

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
      async signIn(
        @Body() body: { email: string; password: string },
        @Res({ passthrough: true }) response: Response
      ) { 
        try {
          const { access_token } = await this.authService.signIn(body.email, body.password);
          
          response.cookie('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // در production باید true باشد
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 3600000, // 1 ساعت
            path: '/',
          })
           
          return { 
            success: true,
            message: 'ورود با موفقیت انجام شد',
            access_token // اختیاری: اگر می‌خوای توکن رو در پاسخ هم بفرستی
          }
      
        } catch(error) {
          // خطاهای مناسب برای ورود (مثلاً ایمیل/رمز اشتباه)
          throw new HttpException({
            status: HttpStatus.UNAUTHORIZED, // کد 401
            error: 'ورود ناموفق',
            message: 'ایمیل یا رمز عبور اشتباه است',
          }, HttpStatus.UNAUTHORIZED)
        }  
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
