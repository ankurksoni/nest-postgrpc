// app.controller.ts
import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.appService.getHello(name);
  }

  @Get('/items')
  async getItems(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('filter', new DefaultValuePipe('')) filter: string,
  ) {
    return this.appService.getItems(limit, filter);
  }
}