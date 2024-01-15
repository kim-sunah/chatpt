import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
    // Constructor DI
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions():
        | TypeOrmModuleOptions
        | Promise<TypeOrmModuleOptions> {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DATABASE_HOST'),
            port: this.configService.get<number>('DATABASE_PORT'),
            username: this.configService.get<string>('DATABASE_USERNAME'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: this.configService.get<string>('DATABASE_NAME'),
            synchronize: this.configService.get<boolean>('DATABASE_SYNC'),
            autoLoadEntities: true,
            logging: true,
        };
    }
}
