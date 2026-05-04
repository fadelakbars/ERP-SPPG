import { MOCK_CATALOG } from '../mocks/catalog';
import type { InventoryItem } from '../types';

export const InventoryService = {
  async getInventory(): Promise<InventoryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_CATALOG.inventory] as InventoryItem[];
  },

  async adjustStock(id: string, amount: number): Promise<InventoryItem> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const item = MOCK_CATALOG.inventory.find(i => i.id === id);
    if (!item) throw new Error('Item not found');
    
    item.qty += amount;
    return { ...item } as InventoryItem;
  }
};
