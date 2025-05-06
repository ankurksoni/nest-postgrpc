import { Injectable } from '@nestjs/common';

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  available: boolean;
  metadata: Record<string, string>;
}

@Injectable()
export class AppService {
  sayHello(name: string): string {
    return `Hello bhai, ${name}!`;
  }

  getItems(limit: number = 10, filter: string = ''): { items: Item[], totalCount: number } {
    const allItems: Item[] = [
      {
        id: '1',
        name: 'Product One',
        description: 'This is the first product',
        price: 19.99,
        tags: ['electronics', 'gadget'],
        available: true,
        metadata: { color: 'black', size: 'medium' }
      },
      {
        id: '2',
        name: 'Product Two',
        description: 'This is the second product',
        price: 29.99,
        tags: ['clothing', 'fashion'],
        available: true,
        metadata: { color: 'blue', material: 'cotton' }
      },
      {
        id: '3',
        name: 'Product Three',
        description: 'This is the third product',
        price: 39.99,
        tags: ['home', 'decor'],
        available: false,
        metadata: { weight: '2kg', dimensions: '30x40x10cm' }
      },
      {
        id: '4',
        name: 'Product Four',
        description: 'This is the fourth product',
        price: 49.99,
        tags: ['electronics', 'computer'],
        available: true,
        metadata: { brand: 'TechX', warranty: '1 year' }
      },
      {
        id: '5',
        name: 'Product Five',
        description: 'This is the fifth product',
        price: 59.99,
        tags: ['furniture', 'home'],
        available: true,
        metadata: { material: 'wood', assembly: 'required' }
      }
    ];
    
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