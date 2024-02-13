import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guards';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enum/Role';

@Injectable()
export class RoleGuard extends JwtAuthGuard {
    constructor(
        authService: AuthService,
        private reflector: Reflector,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(authService);
    }

    async canActivate(context: ExecutionContext) {
        const authenticated = await super.canActivate(context);
        if (!authenticated) return false;

        const req = context.switchToHttp().getRequest();
        const { id } = req.user;

        const user = await this.userRepository.findOne({ where: { id } });
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        req.user.role = user.authority;
		console.log(user.authority,roles)
        if (!roles) 
            return true;
        return roles.some((role) => user.authority === role);
    }
}
