<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '../store/app';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter,
  MoreVertical,
  Navigation,
  Camera,
  AlertCircle,
  Loader2,
  Check,
  X
} from 'lucide-vue-next';

const appStore = useAppStore();

onMounted(() => {
  if (appStore.distributionRuns.length === 0) {
    appStore.fetchInitialData();
  }
});

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    scheduled: 'badge-gray',
    in_transit: 'badge-primary',
    delivered: 'badge-success',
    failed: 'badge-danger',
  };
  return classes[status] || 'badge-gray';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    scheduled: 'Dijadwalkan',
    in_transit: 'Dalam Perjalanan',
    delivered: 'Diterima',
    failed: 'Gagal',
  };
  return labels[status] || status;
};

const confirmDelivery = async (id: string) => {
  await appStore.updateDistributionStatus(id, 'delivered');
};
</script>

<template>
  <div class="distribution-page">
    <div v-if="appStore.loading" class="loading-overlay">
      <Loader2 class="animate-spin" :size="48" />
      <p>Memuat data distribusi...</p>
    </div>

    <template v-else>
      <header class="page-header">
        <div class="header-content">
          <h1>Distribusi & Logistik</h1>
          <p>Pemantauan pengiriman paket makanan ke titik distribusi.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary">Peta Rute</button>
          <button class="btn-primary" :disabled="appStore.syncing">
            <Truck :size="18" />
            Manifest Baru
          </button>
        </div>
      </header>

      <div class="distribution-grid">
        <!-- Main List -->
        <section class="list-section">
          <div class="table-container">
            <div class="table-actions">
              <div class="search-box">
                <Search :size="18" class="search-icon" />
                <input type="text" placeholder="Cari rute atau sekolah..." />
              </div>
              <div v-if="appStore.syncing" class="sync-indicator">
                <Loader2 :size="14" class="animate-spin" />
                <span>Mensinkronkan...</span>
              </div>
              <button class="btn-secondary">
                <Filter :size="18" />
                Filter
              </button>
            </div>

            <table class="data-table">
              <thead>
                <tr>
                  <th>No. Run</th>
                  <th>Titik Distribusi</th>
                  <th>Porsi</th>
                  <th>Waktu</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in appStore.distributionRuns" :key="item.id">
                  <td class="font-bold">{{ item.run_no }}</td>
                  <td>
                    <div class="point-cell">
                      <MapPin :size="14" class="text-gray-400" />
                      <span>{{ item.point }}</span>
                    </div>
                  </td>
                  <td class="text-right">{{ item.portions }}</td>
                  <td>{{ item.time }}</td>
                  <td>
                    <span :class="['badge', getStatusBadgeClass(item.status)]">
                      {{ getStatusLabel(item.status) }}
                    </span>
                  </td>
                  <td>
                    <div class="action-cell">
                      <button 
                        v-if="item.status === 'in_transit'" 
                        class="btn-icon confirm-btn" 
                        title="Konfirmasi Sampai"
                        @click="confirmDelivery(item.id)"
                        :disabled="appStore.syncing"
                      >
                        <Check :size="16" />
                      </button>
                      <button class="btn-icon" title="Lihat Bukti" v-if="item.status === 'delivered'">
                        <Camera :size="16" />
                      </button>
                      <button class="btn-icon">
                        <MoreVertical :size="16" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      <!-- Sidebar Info -->
      <section class="info-section">
        <div class="content-card status-card">
          <div class="card-header">
            <Navigation :size="20" class="text-blue-600" />
            <h2>Live Tracking</h2>
          </div>
          <div class="tracking-info">
            <div class="tracking-item">
              <div class="item-icon pulse">
                <Truck :size="16" class="text-blue-600" />
              </div>
              <div class="item-content">
                <span class="item-title">DR-20260501-004</span>
                <p class="item-desc">Menuju SMP Negeri 8</p>
                <span class="item-meta">Jarak: 2.4 km | Est: 12 menit</span>
              </div>
            </div>
            
            <div class="tracking-alert" v-if="true">
              <AlertCircle :size="16" class="text-orange-600" />
              <div class="alert-content">
                <span class="alert-title">Potensi Terlambat</span>
                <p>Kepadatan lalu lintas di Jl. Perintis Kemerdekaan.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="content-card summary-card">
          <div class="card-header">
            <CheckCircle2 :size="20" class="text-green-600" />
            <h2>Ringkasan Hari Ini</h2>
          </div>
          <div class="summary-list">
            <div class="summary-item">
              <span class="label">Total Porsi Terkirim</span>
              <span class="value">740</span>
            </div>
            <div class="summary-item">
              <span class="label">Sisa Dalam Pengantaran</span>
              <span class="value">380</span>
            </div>
            <div class="summary-item">
              <span class="label">Belum Berangkat</span>
              <span class="value">160</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    </template>
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
  cursor: pointer;
}

.distribution-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
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

.point-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-cell {
  display: flex;
  gap: 0.25rem;
}

.content-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
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

.tracking-info {
  padding: 1.25rem;
}

.tracking-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.item-icon {
  width: 40px;
  height: 40px;
  background: #eff6ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pulse {
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 700;
  font-size: 0.875rem;
  color: #111827;
}

.item-desc {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0.125rem 0;
}

.item-meta {
  font-size: 0.75rem;
  color: #6b7280;
}

.tracking-alert {
  background: #fff7ed;
  border: 1px solid #ffedd5;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  gap: 0.75rem;
}

.alert-content .alert-title {
  display: block;
  font-weight: 700;
  font-size: 0.75rem;
  color: #9a3412;
}

.alert-content p {
  font-size: 0.75rem;
  color: #c2410c;
  margin: 0.125rem 0 0 0;
}

.summary-list {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-item .label {
  font-size: 0.875rem;
  color: #6b7280;
}

.summary-item .value {
  font-weight: 700;
  color: #111827;
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success { background: #dcfce7; color: #166534; }
.badge-primary { background: #eff6ff; color: #1e40af; }
.badge-gray { background: #f3f4f6; color: #374151; }
.badge-danger { background: #fef2f2; color: #991b1b; }

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
.text-gray-400 { color: #9ca3af; }

@media (max-width: 1024px) {
  .distribution-grid {
    grid-template-columns: 1fr;
  }
}
</style>


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
.text-gray-400 { color: #9ca3af; }

@media (max-width: 1024px) {
  .distribution-grid {
    grid-template-columns: 1fr;
  }
}
</style>
