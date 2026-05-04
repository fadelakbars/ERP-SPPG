import { MOCK_CATALOG } from '../mocks/catalog';
import type { FinanceSummary, Expense } from '../types';

export const FinanceService = {
  async getSummary(): Promise<FinanceSummary> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...MOCK_CATALOG.finance.summary } as FinanceSummary;
  },

  async getExpenses(): Promise<Expense[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_CATALOG.finance.expenses] as Expense[];
  }
};
