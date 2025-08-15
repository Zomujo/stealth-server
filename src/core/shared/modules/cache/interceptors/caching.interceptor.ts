import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  private logger = new Logger(CustomCacheInterceptor.name);
  protected trackBy(context: ExecutionContext): string {
    // const request: Request = context.switchToHttp().getRequest();
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }

    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return undefined;
    }
    const protocol = request.protocol;
    const host = httpAdapter.getRequestHostname(request);
    const url = httpAdapter.getRequestUrl(request);
    const fullUrl = `${protocol}://${host}${url}`;
    return this.buildCacheKeyFrom(fullUrl);
  }

  private buildCacheKeyFrom(fullUrl: string): string {
    try {
      const url = new URL(fullUrl);

      const normalizedPath = url.pathname
        .replace(/^\/api\/v1\//, '')
        .replace(/^\//, '')
        .replace(/\//g, ':');

      // Sort query parameters for consistency
      const params = Array.from(url.searchParams.entries()).sort();
      const queryString = params
        .map(([key, value]) => `${key}=${value}`)
        .join(':');

      return `${normalizedPath}${queryString ? `:${queryString}` : ''}`;
    } catch (error) {
      this.logger.error(`Invalid URL passed: ${error.message}`, error.stack);
      return '';
    }
  }
}
