import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHello(name: string): string {
    return `Hello bhai, ${name}!`;
  }
}