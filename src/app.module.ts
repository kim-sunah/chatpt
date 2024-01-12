import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './_config/typeorm.config';
import { envValidationSchema } from './_config/env-validation.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LivecastModule } from './livecast/livecast.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { CartlistModule } from './cartlist/cartlist.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: envValidationSchema,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: TypeOrmConfig,
        }),
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
export class AppModule {}
