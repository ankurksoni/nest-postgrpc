import { Injectable } from '@nestjs/common';
import { ItemsResponse, allItems } from '@./common';

@Injectable()
export class AppService {
  sayHello(name: string): string {
    return `Hello, ${name}!`;
  }

  getItems(limit: number = 10, filter: string = ''): ItemsResponse {
    const filteredItems = filter
      ? allItems.filter(
          ({ name, description, tags }) =>
            name.toLowerCase().includes(filter.toLowerCase()) ||
            description.toLowerCase().includes(filter.toLowerCase()) ||
            tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())),
        )
      : allItems.slice(0, limit);

    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }
}
