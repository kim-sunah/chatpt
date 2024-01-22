import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './entities/comment.entity';
import { RefundController } from './refund/refund.controller';
import { RefundService } from './refund/refund.service';
import { RefundModule } from './refund/refund.module';
import { Refund } from './entities/refund.entity';

const typeOrmModuleOptions = {
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        namingStrategy: new SnakeNamingStrategy(),
        type: 'mysql',
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        // entities: [User, Comment, Refund],
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
        UserModule,
        AuthModule,
        CommentModule,
        RefundModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
