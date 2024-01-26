import { Role } from '../../enum/Role'
import { SetMetadata } from '@nestjs/common'

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)