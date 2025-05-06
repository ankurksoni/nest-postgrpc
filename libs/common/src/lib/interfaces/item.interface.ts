export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  available: boolean;
  metadata: Record<string, string>;
}

export interface ItemsResponse {
  items: Item[];
  totalCount: number;
} 