import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfig } from "src/_config/jwt.config";

import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { SessionModule } from 'nestjs-session';
import * as session from 'express-session';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.naver.com',
        port: 465,
        auth: {
          user: 'chlxodud04@naver.com',
          pass: 'military22'
      },
      },
      defaults: {
        from: '"nest-modules" <chlxodud04@naver.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
   
  ],
  
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
