import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
         
  app.enableCors({
    origin: 'http://localhost:5173'
  })
  
  await app.listen(process.env.PORT || "");
    console.log(`Server Running On Port ${process.env.PORT}`)
    console.log('Prisma Database Connected!')
}

bootstrap();
 