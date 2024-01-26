import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guards';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth.service';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
export declare class RoleGuard extends JwtAuthGuard {
    private reflector;
    private readonly userRepository;
    constructor(authService: AuthService, reflector: Reflector, userRepository: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
