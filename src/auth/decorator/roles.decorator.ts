import { SetMetadata } from '@nestjs/common';
import { Role } from '../interface/roles.enum';
import {
  Features,
  PermissionLevel,
} from '../../core/shared/enums/permissions.enum';

export const ROLES_KEY = 'roles';
export const PERMISSION_KEY = 'permission';

export interface PermissionBody {
  feature: Features;
  level: PermissionLevel;
}

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const Permission = (feature: Features, level: PermissionLevel) =>
  SetMetadata(PERMISSION_KEY, { feature, level });
