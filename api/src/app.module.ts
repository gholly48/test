import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { JobsModule } from './jobs/jobs.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports:   [ UsersModule, PrismaModule, JobsModule, AuthModule ],
  providers: [ PrismaService ],
})

export class AppModule {}
