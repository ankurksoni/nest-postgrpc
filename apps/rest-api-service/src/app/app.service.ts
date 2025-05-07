import { Injectable, OnModuleInit } from '@nestjs/common';
import { grpcClient } from '../grpc-client.provider';
import { ItemsResponse } from '@./common';

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
      if (!this.helloService) {
        throw new Error('HelloService not initialized');
      }

      if (limit < 0) {
        throw new Error('Limit cannot be negative');
      }

      const response = await this.helloService.GetItems({ limit, filter }).toPromise();

      if (!response || !response.items) {
        throw new Error('Invalid response from service');
      }

      return {
        items: response.items,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching items:', error instanceof Error ? error.message : 'Unknown error');
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch items');
    }
  }
}