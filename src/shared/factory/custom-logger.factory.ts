import { ConsoleLogger } from '@nestjs/common';
import { Logtail } from '@logtail/node';

export class StealthCustomLogger extends ConsoleLogger {
  private logtail: Logtail;

  constructor(context?: string) {
    super(context);
    const sourceToken = process.env.LOGTAIL_SOURCE_TOKEN;
    this.logtail = new Logtail(sourceToken, {
      endpoint: process.env.LOGTAIL_HOST,
    });
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    this.logtail.info(message, { optionalParams }).catch(console.error);
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    super.error(message, trace, ...optionalParams);
    this.logtail.error(message, { trace, optionalParams }).catch(console.error);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    this.logtail.warn(message, { optionalParams }).catch(console.error);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
    this.logtail.debug(message, { optionalParams }).catch(console.error);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, ...optionalParams);
    this.logtail.info(message, { optionalParams }).catch(console.error);
  }
}
