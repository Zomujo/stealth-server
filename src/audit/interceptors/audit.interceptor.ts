import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { AuditsService } from '../audit.service';
import { AUDIT_METADATA_KEY, AuditOptions } from '../decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly auditsService: AuditsService,
    private readonly sequelize: Sequelize,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
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
      userId: user?.sub,
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

    if (req.originalUrl === '/api/v1/auth/login' || shouldSkip) {
      return next.handle();
    }

    const action =
      req.method === 'POST'
        ? 'CREATE'
        : req.method === 'DELETE'
          ? 'DELETE'
          : 'UPDATE';

    await this.auditsService.create({
      ...baseLog,
      action,
      tableName: modelName || 'unknown',
      recordId: id || null,
      before: null,
      after: null,
      description: auditOptions?.description || null,
      statusCode: action === 'CREATE' ? 201 : 200,
    });
    return next.handle();
  }
}
