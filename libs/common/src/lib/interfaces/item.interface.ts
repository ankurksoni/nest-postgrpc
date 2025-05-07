/**
 * Represents an item in the e-commerce store.
 *
 * @interface Item
 * @property {string} id - Unique identifier of the item.
 * @property {string} name - Name of the item.
 * @property {string} description - Description of the item.
 * @property {number} price - Price of the item in the store's default currency.
 * @property {string[]} tags - List of tags associated with the item.
 * @property {boolean} available - Whether the item is available for purchase.
 * @property {Record<string, string>} metadata - Additional metadata associated with the item.
 */
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