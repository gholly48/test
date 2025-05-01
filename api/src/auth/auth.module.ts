import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'
import { MailService } from './mail/mail.service'

@Module({
  imports: [ 
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m'},
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, MailService],
  exports: [ AuthService ],
}) 

export class AuthModule {}
