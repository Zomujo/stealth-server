import { SetMetadata } from '@nestjs/common';
import { AuditOptions } from './audit-options.interface';

export const AUDIT_METADATA_KEY = 'custom:audit-options';

export const Audit = (options: AuditOptions = {}) =>
  SetMetadata(AUDIT_METADATA_KEY, options);
