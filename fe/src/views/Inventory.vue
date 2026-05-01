<script setup lang="ts">
import { ref } from 'vue';
import { MOCK_CATALOG } from '../mocks/catalog';
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  History,
  Package,
  MoreVertical,
  ArrowDownToLine
} from 'lucide-vue-next';

const inventory = MOCK_CATALOG.inventory;

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    safe: 'badge-success',
    warning_expiry: 'badge-warning',
    low_stock: 'badge-danger',
  };
  return classes[status] || 'badge-gray';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    safe: 'Aman',
    warning_expiry: 'Mendekati Kedaluwarsa',
    low_stock: 'Stok Rendah',
  };
  return labels[status] || status;
};
</script>

<template>
  <div class="inventory-page">
    <header class="page-header">
      <div class="header-content">
        <h1>Inventori & Stok</h1>
        <p>Manajemen stok bahan baku dan pemantauan kedaluwarsa.</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary">
          <History :size="18" />
          Riwayat Pergerakan
        </button>
        <button class="btn-primary">
          <ArrowDownToLine :size="18" />
          Penerimaan Barang
        </button>
      </div>
    </header>

    <div class="stats-row">
      <div class="stat-card">
        <span class="label">Total Item</span>
        <span class="value">24</span>
      </div>
      <div class="stat-card warning">
        <span class="label">Stok Rendah</span>
        <span class="value">3</span>
      </div>
      <div class="stat-card danger">
        <span class="label">Mendekati Kedaluwarsa</span>
        <span class="value">2</span>
      </div>
    </div>

    <div class="table-container">
      <div class="table-actions">
        <div class="search-box">
          <Search :size="18" class="search-icon" />
          <input type="text" placeholder="Cari bahan baku..." />
        </div>
        <div class="filter-group">
          <button class="btn-secondary">
            <Filter :size="18" />
            Filter
          </button>
          <button class="btn-primary">
            <Plus :size="18" />
            Item Baru
          </button>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Bahan Baku</th>
            <th>Kategori</th>
            <th>Stok Saat Ini</th>
            <th>Stok Minimum</th>
            <th>Kedaluwarsa Terdekat</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inventory" :key="item.id">
            <td>
              <div class="item-name-cell">
                <Package :size="16" class="text-gray-400" />
                <span class="font-medium">{{ item.name }}</span>
              </div>
            </td>
            <td>
              <span class="badge badge-gray">{{ item.category }}</span>
            </td>
            <td class="text-right font-medium">{{ item.qty }} {{ item.unit }}</td>
            <td class="text-right text-gray-500">{{ item.min }} {{ item.unit }}</td>
            <td>{{ item.expiry }}</td>
            <td>
              <span :class="['badge', getStatusBadgeClass(item.status)]">
                {{ getStatusLabel(item.status) }}
              </span>
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

.header-actions {
  display: flex;
  gap: 0.75rem;
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

.btn-secondary {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.stat-card .label {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-card .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.stat-card.warning .value { color: #d97706; }
.stat-card.danger .value { color: #dc2626; }

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

.filter-group {
  display: flex;
  gap: 0.75rem;
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

.item-name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.text-right { text-align: right; }
.text-gray-500 { color: #6b7280; }
.text-gray-400 { color: #9ca3af; }
.font-medium { font-weight: 500; }

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success { background: #dcfce7; color: #166534; }
.badge-warning { background: #fffbeb; color: #92400e; }
.badge-danger { background: #fef2f2; color: #991b1b; }
.badge-gray { background: #f3f4f6; color: #374151; }

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
