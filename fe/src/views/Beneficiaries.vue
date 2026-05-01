<script setup lang="ts">
import { ref } from 'vue';
import { Search, Plus, MoreVertical, Filter } from 'lucide-vue-next';

// Mock data for beneficiaries
const beneficiaries = [
  { id: 'ben_001', name: 'PAUD Melati', group: 'paud', point: 'PAUD Melati', portions: 120, status: 'active' },
  { id: 'ben_002', name: 'SD Inpres Pannara', group: 'sd', point: 'SD Inpres Pannara', portions: 460, status: 'active' },
  { id: 'ben_003', name: 'SMP Negeri 8', group: 'smp', point: 'SMP Negeri 8', portions: 380, status: 'active' },
  { id: 'ben_004', name: 'Posyandu Sehat Ibu Anak', group: 'balita', point: 'Posyandu Sehat', portions: 320, status: 'active' },
];

const getGroupLabel = (group: string) => {
  const labels: Record<string, string> = {
    paud: 'PAUD',
    sd: 'SD',
    smp: 'SMP',
    balita: 'Balita/Ibu',
  };
  return labels[group] || group.toUpperCase();
};
</script>

<template>
  <div class="beneficiaries-page">
    <header class="page-header">
      <div class="header-content">
        <h1>Penerima Manfaat</h1>
        <p>Kelola data sekolah dan kelompok penerima manfaat gizi.</p>
      </div>
      <button class="btn-primary">
        <Plus :size="18" />
        Tambah Penerima
      </button>
    </header>

    <div class="table-container">
      <div class="table-actions">
        <div class="search-box">
          <Search :size="18" class="search-icon" />
          <input type="text" placeholder="Cari sekolah atau wilayah..." />
        </div>
        <button class="btn-secondary">
          <Filter :size="18" />
          Filter
        </button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Nama Penerima</th>
            <th>Kelompok</th>
            <th>Titik Distribusi</th>
            <th>Jumlah Porsi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in beneficiaries" :key="item.id">
            <td class="font-medium">{{ item.name }}</td>
            <td>
              <span class="badge badge-gray">{{ getGroupLabel(item.group) }}</span>
            </td>
            <td>{{ item.point }}</td>
            <td class="text-right">{{ item.portions }}</td>
            <td>
              <span class="badge badge-success">Aktif</span>
            </td>
            <td>
              <button class="btn-icon">
                <MoreVertical :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.page-header p {
  color: #6b7280;
  margin-top: 0.25rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.table-container {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-actions {
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.btn-secondary {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background-color: #f9fafb;
  padding: 0.875rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
}

.data-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
  color: #111827;
}

.data-table tr:hover {
  background-color: #f9fafb;
}

.font-medium {
  font-weight: 500;
}

.text-right {
  text-align: right;
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-gray {
  background-color: #f3f4f6;
  color: #374151;
}

.badge-success {
  background-color: #dcfce7;
  color: #166534;
}

.btn-icon {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.btn-icon:hover {
  background-color: #f3f4f6;
  color: #4b5563;
}
</style>
