import { Injectable, Res } from '@nestjs/common'
import { CreateJobDto } from './dto/create-job.dto'
import { UpdateJobDto } from './dto/update-job.dto'
import { JobRes } from './dto/job.response.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { plainToClass as toClass } from 'class-transformer'

@Injectable()
export class JobsService {
  constructor( private readonly prisma: PrismaService) {}

  async create( createJobDto: CreateJobDto ) {
        const jobs = await this.prisma.job.create({data: createJobDto})
        return {
          message: `شغل ${createJobDto.title} با موفقیت ایجاد شد`
        }
    
    } 

  async findAll() {
    const jobs = await this.prisma.job.findMany();
    return toClass(JobRes, jobs, { excludeExtraneousValues: true })  
  }

  async findOne(id: number) {
    const jobs = await this.prisma.job.findUnique({where: {id}})
    return toClass(JobRes, jobs, { excludeExtraneousValues: true })
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const jobs = await this.prisma.job.update({where: {id},data: updateJobDto})
        return {
          message: `شغل ${updateJobDto.title} با موفقیت بروز شد`
        }
  }

  async remove( id: number ) {
    const jobs = await this.prisma.job.delete({ where: {id} })
    return {
      message: `شغل ${id} حذف شد!`
    }
  }

}

