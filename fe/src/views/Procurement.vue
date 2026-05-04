<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '../store/app';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Loader2,
  ArrowDownToLine,
  CheckCircle2,
  Clock
} from 'lucide-vue-next';

const appStore = useAppStore();

onMounted(() => {
  if (appStore.purchaseOrders.length === 0) {
    appStore.fetchInitialData();
  }
});

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'badge-gray',
    ordered: 'badge-info',
    partially_received: 'badge-warning',
    received: 'badge-success',
    cancelled: 'badge-danger',
  };
  return classes[status] || 'badge-gray';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    draft: 'Draft',
    ordered: 'Dipesan',
    partially_received: 'Diterima Parsial',
    received: 'Diterima',
    cancelled: 'Dibatalkan',
  };
  return labels[status] || status;
};
</script>

<template>
  <div class="procurement-page">
    <div v-if="appStore.loading" class="loading-overlay">
      <Loader2 class="animate-spin" :size="48" />
      <p>Memuat data pengadaan...</p>
    </div>

    <template v-else>
      <header class="page-header">
        <div class="header-content">
          <h1>Pengadaan & Penerimaan</h1>
          <p>Kelola pemesanan bahan baku dan kontrol kualitas barang masuk.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary">
            <ArrowDownToLine :size="18" />
            Terima Barang
          </button>
          <button class="btn-primary">
            <Plus :size="18" />
            Buat PO Baru
          </button>
        </div>
      </header>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon-bg info">
            <ShoppingCart :size="20" class="text-blue-600" />
          </div>
          <div class="stat-content">
            <span class="label">PO Aktif</span>
            <span class="value">3</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-bg warning">
            <Clock :size="20" class="text-orange-600" />
          </div>
          <div class="stat-content">
            <span class="label">Menunggu Kedatangan</span>
            <span class="value">2</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-actions">
          <div class="search-box">
            <Search :size="18" class="search-icon" />
            <input type="text" placeholder="Cari nomor PO atau vendor..." />
          </div>
          <button class="btn-secondary">
            <Filter :size="18" />
            Filter
          </button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>No. Purchase Order</th>
              <th>Vendor</th>
              <th>Tanggal</th>
              <th>Total Nilai</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="po in appStore.purchaseOrders" :key="po.id">
              <td class="font-bold">{{ po.po_no }}</td>
              <td>{{ po.vendor }}</td>
              <td>{{ po.date }}</td>
              <td class="text-right">Rp {{ po.amount.toLocaleString() }}</td>
              <td>
                <span :class="['badge', getStatusBadgeClass(po.status)]">
                  {{ getStatusLabel(po.status) }}
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
    </template>
  </div>
</template>

<style scoped>
.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: #6b7280;
}

.animate-spin {
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

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
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 240px;
}

.stat-icon-bg {
  padding: 0.75rem;
  border-radius: 0.5rem;
}

.stat-icon-bg.info { background: #eff6ff; }
.stat-icon-bg.warning { background: #fffbeb; }

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-content .label {
  font-size: 0.75rem;
  color: #6b7280;
}

.stat-content .value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
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

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success { background: #dcfce7; color: #166534; }
.badge-info { background: #eff6ff; color: #1e40af; }
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
  color: #2563eb;
}

.font-bold { font-weight: 700; }
.text-right { text-align: right; }
</style>
