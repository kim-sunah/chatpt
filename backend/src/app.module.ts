import Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { LivecastModule } from './livecast/livecast.module';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

import { CacheModule } from '@nestjs/cache-manager';
import { CommentModule } from './comment/comment.module';

import { AdminModule } from './admin/admin.module';
import { BadwordModule } from './badword/badword.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { EventsModule } from './events/events.module';
import { SearchModule } from './search/search.module';
import { PaymentModule } from './payment/payment.module';
import { MessageModule } from './message/message.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/entities/*{.js,.ts}'],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    CacheModule.register({
      ttl: 6,
      max: 1000,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    AuthModule,
    ProductModule,
    LivecastModule,
    InquiryModule,
    CommentModule,
    AdminModule,
    BadwordModule,
    WishlistModule,
    EventsModule,
    SearchModule,
    PaymentModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
