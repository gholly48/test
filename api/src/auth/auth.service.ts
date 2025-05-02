import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { CreateUserDto } from 'src/users/userDto'
import * as bcrypt from 'bcryptjs'
import { MailService } from './mail/mail.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  [x: string]: any
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private mailService: MailService
    ) {}
    
async signUp(createUserDto: CreateUserDto) {
  return await this.usersService.create(createUserDto)

}

async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !( bcrypt.compareSync(password, user.password ))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

async validateUser(id: number) {
    return this.usersService.findOne(id);
  }

async requestPasswordReset(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // برای جلوگیری از حمله Enumeration همیشه 200 برگردانید
      return;
    }

    const token = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.RESET_TOKEN_SECRET, expiresIn: '1h' },
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiresAt: new Date(Date.now() + 3600000), // 1 ساعت بعد
      },
    });

    await this.mailService.sendResetPasswordEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.RESET_TOKEN_SECRET,
      });

      const user = await this.prisma.user.findFirst({
        where: {
          id: payload.sub,
          resetToken: token,
          resetTokenExpiresAt: { gt: new Date() },
        },
      });

      if (!user) {
        throw new UnauthorizedException('لینک نامعتبر یا منقضی شده است');
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiresAt: null,
        },
      });
    } catch (err) {
      throw new UnauthorizedException('لینک نامعتبر یا منقضی شده است');
    }
  }

}
