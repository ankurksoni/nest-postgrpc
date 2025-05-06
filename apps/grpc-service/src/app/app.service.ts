import { Injectable } from '@nestjs/common';
import { Item, ItemsResponse, allItems } from '@./common';

@Injectable()
export class AppService {
  sayHello(name: string): string {
    return `Hello, ${name}!`;
  }

  getItems(limit: number = 10, filter: string = ''): ItemsResponse {
    // Apply filtering if filter parameter is provided
    let filteredItems = allItems;
    if (filter) {
      const filterLower = filter.toLowerCase();
      filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(filterLower) || 
        item.description.toLowerCase().includes(filterLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(filterLower))
      );
    }
    
    // Apply limit
    const limitedItems = filteredItems.slice(0, limit);
    
    return {
      items: limitedItems,
      totalCount: filteredItems.length
    };
  }
}