import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { IoAdapter } from '@nestjs/platform-socket.io';

import winston from 'winston';
import SlackHook from 'winston-slack-webhook-transport';
import { WinstonModule } from 'nest-winston';

var amqp = require('amqplib/callback_api');
const url =
  'amqps://chatPT:chatPT123456@b-e4d218f5-5560-4786-b2bc-f3185dca9ce3.mq.ap-northeast-2.amazonaws.com:5671';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Accept , Authorization , X-XSRF-TOKEN , refreshtoken',
    credentials: true,
  });

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(), // Add a timestamp to Slack logs
      winston.format.errors({ stack: true }),
      winston.format.printf(({ timestamp, level, message, context, stack }) => {
        return `${timestamp} [${context}] ${level}: ${message}${
          stack ? `\n${stack}` : ''
        }`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new SlackHook({
        webhookUrl: process.env.SLACK_WEBHOOK_URL,
        channel: '#project',
        username: 'LoggerBot',
        level: 'info',
      }),
    ],
  });

  app.useLogger(logger);
  await app.listen(4000, '0.0.0.0');
}

bootstrap();
