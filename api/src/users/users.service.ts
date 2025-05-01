import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './userDto'
import { plainToClass as toClass } from 'class-transformer'
import { UserRes } from './user.response'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  [x: string]: any
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
      const salt = await bcrypt.genSalt(10)
      console.log(salt)
      const hashedPassword = bcrypt.hashSync(createUserDto.password, salt)
      console.log(hashedPassword)
        return this.prisma.user.create({ data: { ...createUserDto, password: hashedPassword } })
      }
     
      findAll() {
        const users = this.prisma.user.findMany()
        return toClass(UserRes, users, {excludeExtraneousValues: true})
      }
    
      findOne(id: number) {
        const users = this.prisma.user.findUnique({where: {id}})
        return toClass(UserRes, users, {excludeExtraneousValues: true})
      }
    
      update(id: number, data) {
        return this.prisma.user.update({
          where: { id },
          data: { ...data, updatedAt: new Date() },
        })
      }
    
      remove(id: number) {
        return this.prisma.user.delete({where: {id}})
      }

      findByEmail(email: string ) {
        return this.prisma.user.findUnique({where: {email}})
    }

}
