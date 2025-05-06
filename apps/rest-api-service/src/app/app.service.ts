import { Injectable, OnModuleInit } from '@nestjs/common';
import { grpcClient } from '../grpc-client.provider';

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  available: boolean;
  metadata: Record<string, string>;
}

interface ItemsResponse {
  items: Item[];
  total_count: number;
}

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
        total_count: response.total_count
      };
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
}