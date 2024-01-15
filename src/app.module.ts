import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmConfig } from './_config/typeorm.config';
import { envValidationSchema } from './_config/env-validation.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LivecastModule } from './livecast/livecast.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { CartlistModule } from './cartlist/cartlist.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './user/entities/user.entity';
import Joi from 'joi';

const typeOrmModuleOptions = {
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => ({
        namingStrategy: new SnakeNamingStrategy(),
        type: 'mysql',
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        entities: [User],
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
        TypeOrmModule.forRootAsync(typeOrmModuleOptions),
        AuthModule,
        UserModule,
        ProductModule,
        OrderModule,
        LivecastModule,
        InquiryModule,
        CartlistModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
