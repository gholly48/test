import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

    @Post('signup')
      async signUp(@Body() createUserDto: any) {
        return this.authService.signUp(createUserDto)
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
