import { Injectable, OnModuleInit } from '@nestjs/common';
import { grpcClient } from '../grpc-client.provider';

@Injectable()
export class AppService implements OnModuleInit {
  private helloService: any;

  onModuleInit() {
    this.helloService = grpcClient.getService<any>('HelloService');
  }

  async getHello(name: string): Promise<string> {
    const response = await this.helloService.SayHello({ name }).toPromise();
    return response.message;
  }
}