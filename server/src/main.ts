import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.enableCors()
  app.use(morgan('dev'))
  await app.listen(8080)
}
bootstrap()
