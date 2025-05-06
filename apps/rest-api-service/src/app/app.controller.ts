// app.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.appService.getHello(name);
  }
}