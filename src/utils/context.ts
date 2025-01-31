import { ArgumentsHost, ExecutionContext, Logger } from '@nestjs/common';

const logger = new Logger('I18nService');

export function getContextObject(
  context?: ExecutionContext | ArgumentsHost,
): any {
  const contextType = context?.getType<string>() ?? 'undefined';

  switch (contextType) {
    case 'http':
      return context.switchToHttp().getRequest();
    case 'graphql':
      return context.getArgs()[2];
    case 'rpc':
      return context.switchToRpc().getContext();
    case 'rmq':
      return context.getArgs()[1];
    case 'telegraf':
      return context.getArgs()[0];
    default:
      logger.warn(`context type: ${contextType} not supported`);
  }
}
