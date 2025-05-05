import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
    
  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  
  await app.listen(process.env.PORT || "")
    console.log(`Server Running On Port ${process.env.PORT}`)
    console.log('Prisma Database Connected!')
}

bootstrap()
 