import { MOCK_CATALOG } from '../mocks/catalog';
import type { ProductionBatch } from '../types';

export const ProductionService = {
  async getBatches(): Promise<ProductionBatch[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_CATALOG.productionBatches] as ProductionBatch[];
  },

  async updateBatchStatus(id: string, status: ProductionBatch['status']): Promise<ProductionBatch> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const batch = MOCK_CATALOG.productionBatches.find(b => b.id === id);
    if (!batch) throw new Error('Batch not found');
    
    // In a real app, we'd send this to the backend
    // For now, we update the mock (simulating local state change)
    (batch as any).status = status;
    return { ...batch } as ProductionBatch;
  },

  async getBatchById(id: string): Promise<ProductionBatch | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const batch = MOCK_CATALOG.productionBatches.find(b => b.id === id);
    return batch ? { ...batch } as ProductionBatch : undefined;
  }
};
