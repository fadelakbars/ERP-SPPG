<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '../store/app';
import { 
  Banknote, 
  TrendingUp, 
  Wallet, 
  FileText, 
  Download,
  Calendar,
  ArrowUpRight,
  MoreVertical,
  Plus,
  Loader2
} from 'lucide-vue-next';

const appStore = useAppStore();

onMounted(() => {
  if (!appStore.financeSummary) {
    appStore.fetchInitialData();
  }
});

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
};
</script>

<template>
  <div class="finance-page">
    <div v-if="appStore.loading || !appStore.financeSummary" class="loading-overlay">
      <Loader2 class="animate-spin" :size="48" />
      <p>Memuat data keuangan...</p>
    </div>

    <template v-else>
      <header class="page-header">
        <div class="header-content">
          <h1>Keuangan Operasional</h1>
          <p>Ringkasan anggaran, pengeluaran, dan biaya per porsi.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary">
            <Download :size="18" />
            Ekspor Laporan
          </button>
          <button class="btn-primary">
            <Plus :size="18" />
            Input Pengeluaran
          </button>
        </div>
      </header>

      <div class="finance-overview">
        <div class="overview-card main-stat">
          <div class="stat-header">
            <div class="icon-box bg-blue-100 text-blue-600">
              <Banknote :size="24" />
            </div>
            <span class="stat-title">Total Pengeluaran Hari Ini</span>
          </div>
          <div class="stat-body">
            <h2 class="stat-value">{{ formatCurrency(appStore.financeSummary.total_expense) }}</h2>
            <div class="stat-meta">
              <TrendingUp :size="14" class="text-green-600" />
              <span class="text-green-600 font-bold">{{ appStore.financeSummary.utilization_pct }}%</span>
              <span class="text-gray-500">dari plafon harian</span>
            </div>
          </div>
          <div class="stat-footer">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: appStore.financeSummary.utilization_pct + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="overview-card">
          <div class="stat-header">
            <div class="icon-box bg-orange-100 text-orange-600">
              <Wallet :size="20" />
            </div>
            <span class="stat-title">Sisa Anggaran Harian</span>
          </div>
          <div class="stat-body">
            <h2 class="stat-value">{{ formatCurrency(appStore.financeSummary.remaining_budget) }}</h2>
            <p class="stat-desc">Estimasi untuk kebutuhan darurat</p>
          </div>
        </div>

        <div class="overview-card">
          <div class="stat-header">
            <div class="icon-box bg-green-100 text-green-600">
              <TrendingUp :size="20" />
            </div>
            <span class="stat-title">Biaya per Porsi</span>
          </div>
          <div class="stat-body">
            <h2 class="stat-value">{{ formatCurrency(appStore.financeSummary.cost_per_portion) }}</h2>
            <p class="stat-desc">Target: Rp 12.500 / porsi</p>
          </div>
        </div>
      </div>

      <div class="finance-content">
        <section class="transactions-section">
          <div class="content-card">
            <div class="card-header">
              <FileText :size="20" class="text-gray-400" />
              <h2>Daftar Pengeluaran</h2>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Referensi</th>
                  <th>Waktu Posting</th>
                  <th>Status</th>
                  <th>Jumlah</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="exp in appStore.expenses" :key="exp.id">
                  <td class="font-bold">{{ exp.category }}</td>
                  <td class="text-gray-500">{{ exp.ref }}</td>
                  <td>{{ exp.date }}</td>
                  <td>
                    <span class="badge badge-success">{{ exp.status }}</span>
                  </td>
                  <td class="text-right font-bold">{{ formatCurrency(exp.amount) }}</td>
                  <td>
                    <button class="btn-icon">
                      <MoreVertical :size="16" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="budget-breakdown">
          <div class="content-card">
            <div class="card-header">
              <TrendingUp :size="20" class="text-gray-400" />
              <h2>Rincian Biaya</h2>
            </div>
            <div class="breakdown-list">
              <div class="breakdown-item">
                <div class="item-label">Bahan Baku</div>
                <div class="item-bar-container">
                  <div class="item-bar bg-blue-500" style="width: 82%"></div>
                </div>
                <div class="item-value">82%</div>
              </div>
              <div class="breakdown-item">
                <div class="item-label">Logistik</div>
                <div class="item-bar-container">
                  <div class="item-bar bg-orange-500" style="width: 10%"></div>
                </div>
                <div class="item-value">10%</div>
              </div>
              <div class="breakdown-item">
                <div class="item-label">Operasional</div>
                <div class="item-bar-container">
                  <div class="item-bar bg-green-500" style="width: 8%"></div>
                </div>
                <div class="item-value">8%</div>
              </div>
            </div>
          </div>
        </section>
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

.finance-overview {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.overview-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-stat {
  grid-row: span 1;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-blue-100 { background: #eff6ff; }
.bg-orange-100 { background: #fff7ed; }
.bg-green-100 { background: #f0fdf4; }

.stat-title {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.stat-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.stat-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.progress-bar {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  margin-top: 1.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}

.finance-content {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
}

.content-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-header h2 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
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
}

.data-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
}

.breakdown-list {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.item-bar-container {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  flex: 1;
}

.item-bar {
  height: 100%;
  border-radius: 4px;
}

.bg-blue-500 { background: #3b82f6; }
.bg-orange-500 { background: #f97316; }
.bg-green-500 { background: #22c55e; }

.item-value {
  font-size: 0.75rem;
  font-weight: 700;
  color: #111827;
  text-align: right;
  margin-top: 0.25rem;
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.badge-success { background: #dcfce7; color: #166534; }

.text-green-600 { color: #16a34a; }
.text-orange-600 { color: #ea580c; }
.text-blue-600 { color: #2563eb; }
.text-gray-500 { color: #6b7280; }
.text-gray-400 { color: #9ca3af; }
.font-bold { font-weight: 700; }
.text-right { text-align: right; }

@media (max-width: 1024px) {
  .finance-overview {
    grid-template-columns: 1fr;
  }
  .finance-content {
    grid-template-columns: 1fr;
  }
}
</style>
