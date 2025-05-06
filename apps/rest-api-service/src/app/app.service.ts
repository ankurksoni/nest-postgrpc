import { Injectable, OnModuleInit } from '@nestjs/common';
import { grpcClient } from '../grpc-client.provider';
import { Item, ItemsResponse } from '@./common';

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

  async getItems(limit: number = 10, filter: string = ''): Promise<ItemsResponse> {
    try {
      const response = await this.helloService.GetItems({ limit, filter }).toPromise();
      return {
        items: response.items,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
}