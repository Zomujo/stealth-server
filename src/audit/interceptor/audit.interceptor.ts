import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { AuditsService } from '../audit.service';
import { AUDIT_METADATA_KEY, AuditOptions } from '../decorator';
import { getBeforeSnapshot } from '../utils';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly auditsService: AuditsService,
    private readonly sequelize: Sequelize,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const auditOptions = this.reflector.get<AuditOptions>(
      AUDIT_METADATA_KEY,
      context.getHandler(),
    );

    const shouldSkip =
      auditOptions?.disabled ||
      !['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);

    const user = req.user;

    const baseLog = {
      userId: user?.id,
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      requestUrl: req.originalUrl,
      method: req.method,
      source: 'api',
      context: context.getClass().name + '.' + context.getHandler().name,
      correlationId: req.headers['x-correlation-id'],
    };

    const id = req.params?.id || req.body?.id;
    const modelName = auditOptions?.tableName;

    return next.handle().pipe(
      tap(async (response) => {
        if (shouldSkip) return;

        const action =
          req.method === 'POST'
            ? 'CREATE'
            : req.method === 'DELETE'
              ? 'DELETE'
              : 'UPDATE';

        let before = null;

        if (
          ['PUT', 'PATCH', 'DELETE'].includes(req.method) &&
          modelName &&
          id
        ) {
          try {
            before = await getBeforeSnapshot(this.sequelize, modelName, id);
          } catch (err) {
            console.error('Error fetching before snapshot:', err);
          }
        }

        await this.auditsService.createLog({
          ...baseLog,
          action,
          tableName: modelName || 'unknown',
          recordId: response?.id || id || 'unknown',
          before,
          after: response || null,
          description: auditOptions?.description || null,
        });
      }),
    );
  }
}
