import type { Beneficiary } from '../types';

// Adding mock data for beneficiaries if not in catalog, but catalog has it in summary
// Let's assume some mock data for the list
const MOCK_BENEFICIARIES: Beneficiary[] = [
  { id: 'ben_001', name: 'Andi Pratama', group: 'SD', school: 'SD Inpres Pannara', distribution_point: 'SD Inpres Pannara', status: 'active' },
  { id: 'ben_002', name: 'Siti Aminah', group: 'PAUD', school: 'PAUD Melati', distribution_point: 'PAUD Melati', status: 'active' },
  { id: 'ben_003', name: 'Budi Santoso', group: 'SMP', school: 'SMP Negeri 8', distribution_point: 'SMP Negeri 8', status: 'active' },
  { id: 'ben_004', name: 'Rina Wijaya', group: 'SD', school: 'SD Inpres Pannara', distribution_point: 'SD Inpres Pannara', status: 'active' },
  { id: 'ben_005', name: 'Fajar Ramadhan', group: 'PAUD', school: 'Posyandu Sehat Ibu Anak', distribution_point: 'Posyandu Sehat Ibu Anak', status: 'active' },
];

export const BeneficiaryService = {
  async getBeneficiaries(): Promise<Beneficiary[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_BENEFICIARIES];
  },

  async toggleStatus(id: string): Promise<Beneficiary> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const ben = MOCK_BENEFICIARIES.find(b => b.id === id);
    if (!ben) throw new Error('Beneficiary not found');
    ben.status = ben.status === 'active' ? 'inactive' : 'active';
    return { ...ben };
  }
};
