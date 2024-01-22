import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import session from 'express-session';
import {TypeormStore} from "connect-typeorm"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );


  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
<<<<<<< HEAD
    allowedHeaders: 'Content-Type, Accept , Authorization , refreshtoken, X-XSRF-TOKEN',
=======
    allowedHeaders: 'Content-Type, Accept , Authorization , X-XSRF-TOKEN , refreshtoken',
>>>>>>> ea95193c84da8cbfa57f74b021706c9b989e0494
    credentials: true,
  });

  await app.listen(4000, '0.0.0.0');
}

bootstrap();
