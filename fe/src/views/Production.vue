<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '../store/app';
import { 
  ClipboardList, 
  ChefHat, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Loader2,
  Check
} from 'lucide-vue-next';

const appStore = useAppStore();

onMounted(() => {
  if (appStore.productionBatches.length === 0) {
    appStore.fetchInitialData();
  }
});

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    pending_qc: 'badge-warning',
    qc_passed: 'badge-info',
    ready_for_delivery: 'badge-primary',
    completed: 'badge-success',
  };
  return classes[status] || 'badge-gray';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending_qc: 'Menunggu QC',
    qc_passed: 'Lolos QC',
    ready_for_delivery: 'Siap Distribusi',
    completed: 'Selesai',
  };
  return labels[status] || status;
};

const approveQC = async (id: string) => {
  await appStore.updateProductionStatus(id, 'qc_passed');
};
</script>

<template>
  <div class="production-page">
    <div v-if="appStore.loading" class="loading-overlay">
      <Loader2 class="animate-spin" :size="48" />
      <p>Memuat data produksi...</p>
    </div>

    <template v-else>
      <header class="page-header">
        <div class="header-content">
          <h1>Menu & Produksi</h1>
          <p>Perencanaan menu harian dan status produksi dapur.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary">Riwayat Produksi</button>
          <button class="btn-primary" :disabled="appStore.syncing">
            <ChefHat :size="18" />
            Mulai Batch Baru
          </button>
        </div>
      </header>

      <div class="production-grid">
        <!-- Left Column: Menu Info -->
        <section class="menu-section">
          <div class="content-card">
            <div class="card-header">
              <ClipboardList :size="20" class="text-blue-600" />
              <h2>Rencana Menu Harian</h2>
            </div>
            
            <div class="menu-info">
              <div class="menu-header">
                <span class="menu-date">1 Mei 2026</span>
                <h3 class="menu-name">{{ appStore.dashboard.planned_portions > 0 ? 'Nasi Ayam Sayur' : 'Memuat...' }}</h3>
              </div>
              
              <div class="nutrition-grid">
                <div class="nutrition-item">
                  <span class="label">Kalori</span>
                  <span class="value">650 kcal</span>
                </div>
                <div class="nutrition-item">
                  <span class="label">Protein</span>
                  <span class="value">24 g</span>
                </div>
                <div class="nutrition-item">
                  <span class="label">Lemak</span>
                  <span class="value">18 g</span>
                </div>
              </div>

              <div class="ingredients-list">
                <h4>Kebutuhan Bahan Utama</h4>
                <ul>
                  <li><span>Beras</span><span class="font-medium">128 kg</span></li>
                  <li><span>Ayam</span><span class="font-medium">96 kg</span></li>
                  <li><span>Sayur Campur</span><span class="font-medium">76.8 kg</span></li>
                  <li><span>Telur</span><span class="font-medium">1,280 butir</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card sanitation-card">
            <div class="card-header">
              <CheckCircle2 :size="20" class="text-green-600" />
              <h2>Checklist Sanitasi</h2>
            </div>
            <div class="sanitation-status">
              <div class="status-item">
                <CheckCircle2 :size="16" class="text-green-600" />
                <span>Higiene Personel (Lengkap)</span>
              </div>
              <div class="status-item">
                <CheckCircle2 :size="16" class="text-green-600" />
                <span>Kebersihan Area Masak (OK)</span>
              </div>
              <div class="status-item">
                <Clock :size="16" class="text-blue-600" />
                <span>Pemeriksaan Suhu (Rutin)</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Right Column: Production Batches -->
        <section class="batches-section">
          <div class="content-card">
            <div class="card-header">
              <Clock :size="20" class="text-orange-600" />
              <h2>Batch Produksi Aktif</h2>
              <div v-if="appStore.syncing" class="sync-indicator">
                <Loader2 :size="14" class="animate-spin" />
                <span>Mensinkronkan...</span>
              </div>
            </div>

            <div class="batch-list">
              <div v-for="batch in appStore.productionBatches" :key="batch.id" class="batch-item">
                <div class="batch-main">
                  <div class="batch-info">
                    <span class="batch-no">{{ batch.no }}</span>
                    <span class="batch-time">{{ batch.time }}</span>
                  </div>
                  <div class="batch-portions">
                    <span class="portions-value">{{ batch.produced }} / {{ batch.portions }}</span>
                    <span class="portions-label">Porsi</span>
                  </div>
                  <div class="batch-status">
                    <span :class="['badge', getStatusBadgeClass(batch.status)]">
                      {{ getStatusLabel(batch.status) }}
                    </span>
                  </div>
                  <div class="batch-actions">
                    <button 
                      v-if="batch.status === 'pending_qc'" 
                      class="btn-action approve"
                      @click="approveQC(batch.id)"
                      title="Luluskan QC"
                      :disabled="appStore.syncing"
                    >
                      <Check :size="18" />
                    </button>
                    <router-link :to="`/production/${batch.id}`" class="btn-icon">
                      <ArrowRight :size="18" />
                    </router-link>
                  </div>
                </div>
                
                <div v-if="batch.status === 'pending_qc'" class="batch-alert">
                  <AlertCircle :size="14" />
                  <span>Menunggu validasi ahli gizi sebelum didistribusikan.</span>
                </div>
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
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.sync-indicator {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
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
  cursor: pointer;
}

.production-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1.5rem;
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
  color: #111827;
  margin: 0;
}

.menu-info {
  padding: 1.25rem;
}

.menu-header {
  margin-bottom: 1.25rem;
}

.menu-date {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
}

.menu-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0.25rem 0 0 0;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.nutrition-item {
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}

.nutrition-item .label {
  font-size: 0.75rem;
  color: #6b7280;
}

.nutrition-item .value {
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
}

.ingredients-list h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.ingredients-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e5e7eb;
  font-size: 0.875rem;
  color: #4b5563;
}

.ingredients-list li:last-child {
  border-bottom: none;
}

.sanitation-status {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
}

.batch-list {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.batch-item {
  border: 1px solid #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;
}

.batch-main {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.batch-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.batch-no {
  font-weight: 700;
  color: #111827;
}

.batch-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.batch-portions {
  text-align: right;
  min-width: 100px;
}

.portions-value {
  display: block;
  font-weight: 700;
  color: #111827;
}

.portions-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.batch-status {
  min-width: 120px;
  text-align: center;
}

.batch-alert {
  background-color: #fffbeb;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #92400e;
  border-top: 1px solid #fef3c7;
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-warning { background: #fef3c7; color: #92400e; }
.badge-info { background: #eff6ff; color: #1e40af; }
.badge-primary { background: #e0e7ff; color: #3730a3; }
.badge-success { background: #dcfce7; color: #166534; }
.badge-gray { background: #f3f4f6; color: #374151; }

.btn-icon {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.btn-icon:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

.font-medium { font-weight: 500; }

@media (max-width: 1024px) {
  .production-grid {
    grid-template-columns: 1fr;
  }
}
</style>
