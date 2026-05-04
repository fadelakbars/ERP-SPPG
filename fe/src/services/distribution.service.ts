import { MOCK_CATALOG } from '../mocks/catalog';
import type { DistributionRun } from '../types';

export const DistributionService = {
  async getRuns(): Promise<DistributionRun[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_CATALOG.distribution] as DistributionRun[];
  },

  async updateRunStatus(id: string, status: DistributionRun['status']): Promise<DistributionRun> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const run = MOCK_CATALOG.distribution.find(r => r.id === id);
    if (!run) throw new Error('Run not found');
    
    (run as any).status = status;
    return { ...run } as DistributionRun;
  }
};
