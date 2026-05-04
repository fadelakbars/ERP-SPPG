import type { PurchaseOrder } from '../types';

const MOCK_POS: PurchaseOrder[] = [
  { id: 'po_001', po_no: 'PO-20260501-001', vendor: 'Mitra Tani Jaya', date: '2026-05-01', amount: 4500000, status: 'received' },
  { id: 'po_002', po_no: 'PO-20260501-002', vendor: 'Sumber Protein Makmur', date: '2026-05-01', amount: 8200000, status: 'partially_received' },
  { id: 'po_003', po_no: 'PO-20260502-001', vendor: 'Sayur Segar Abadi', date: '2026-05-02', amount: 1500000, status: 'ordered' },
];

export const ProcurementService = {
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_POS];
  },

  async updatePOStatus(id: string, status: PurchaseOrder['status']): Promise<PurchaseOrder> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const po = MOCK_POS.find(p => p.id === id);
    if (!po) throw new Error('PO not found');
    po.status = status;
    return { ...po };
  }
};
