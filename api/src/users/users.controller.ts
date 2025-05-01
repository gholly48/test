import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './userDto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto ) {
        const user = await this.usersService.create(createUserDto);
        return {
          message: `کاربر ${createUserDto.name} با موفقیت ایجاد شد`
        }
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
      }

    @Get()
    findall() {
        return this.usersService.findAll()
    }

    @Put(':id') 
    async update(@Param('id', ParseIntPipe) id: number, @Body() data) {
        const user =  await this.usersService.update(id, data)
        return {
            message: `کاربر ${id} بروز ضد`
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.remove(id)
        return {
            message: `کاربر ${id} حذف ضد`
        }
    }

}
