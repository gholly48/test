import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleDestroy() {
        throw new Error('Method not implemented.')
    }

    async onModuleInit() {
        await this.$connect()
    }
}
 