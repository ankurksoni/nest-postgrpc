import { Item } from '../interfaces/item.interface';

export const allItems: Item[] = [
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