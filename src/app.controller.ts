import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World! Wrong';
  }

  @Get('debug-sentry')
  getError() {
    throw new Error('Sentry Test Error: ' + Date.now());
  }
}
