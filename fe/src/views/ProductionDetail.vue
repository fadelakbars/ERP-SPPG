<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '../store/app';
import { ProductionService } from '../services/production.service';
import type { ProductionBatch } from '../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  History,
  Info,
  Package,
  Activity,
  User as UserIcon
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const batchId = route.params.id as string;
const batch = ref<ProductionBatch | null>(null);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const data = await ProductionService.getBatchById(batchId);
  if (data) {
    batch.value = data;
  }
  loading.value = false;
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

const approveQC = async () => {
  if (!batch.value) return;
  await appStore.updateProductionStatus(batch.value.id, 'qc_passed');
  batch.value.status = 'qc_passed';
};

// Simulated Audit Trail
const auditTrail = [
  { time: '04:00', user: 'Petugas Dapur A', action: 'Produksi Dimulai', note: 'Batch mulai dimasak' },
  { time: '06:15', user: 'Petugas Dapur A', action: 'Produksi Selesai', note: '315 porsi dipacking' },
  { time: '06:20', user: 'Sistem', action: 'Status Update', note: 'Menunggu validasi QC' },
];

// Nutrition Stats for Visualization
const nutritionStats = [
  { label: 'Kalori', target: 650, actual: 648, unit: 'kcal' },
  { label: 'Protein', target: 24, actual: 23.5, unit: 'g' },
  { label: 'Lemak', target: 18, actual: 17.8, unit: 'g' },
];

const getProgressWidth = (actual: number, target: number) => {
  return Math.min(100, (actual / target) * 100) + '%';
};
</script>

<template>
  <div class="production-detail">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Memuat detail batch...</p>
    </div>

    <template v-else-if="batch">
      <header class="page-header">
        <button class="btn-back" @click="router.back()">
          <ArrowLeft :size="20" />
        </button>
        <div class="header-content">
          <div class="breadcrumb">
            <router-link to="/production">Produksi</router-link>
            <span>/</span>
            <span>Detail Batch</span>
          </div>
          <h1>{{ batch.no }}</h1>
        </div>
        <div class="header-actions">
          <button 
            v-if="batch.status === 'pending_qc'" 
            class="btn-primary" 
            @click="approveQC"
            :disabled="appStore.syncing"
          >
            <Check :size="18" />
            Luluskan QC
          </button>
          <button class="btn-secondary">Cetak Label</button>
        </div>
      </header>

      <div class="detail-grid">
        <!-- Main Content -->
        <div class="main-column">
          <section class="content-card status-overview">
            <div class="overview-header">
              <div class="status-indicator">
                <span :class="['badge', getStatusBadgeClass(batch.status)]">
                  {{ getStatusLabel(batch.status) }}
                </span>
                <span class="timestamp">Diperbarui: Hari ini, 06:20</span>
              </div>
              <div class="batch-stats">
                <div class="stat">
                  <span class="label">Target Porsi</span>
                  <span class="value">{{ batch.portions }}</span>
                </div>
                <div class="stat">
                  <span class="label">Realisasi</span>
                  <span class="value">{{ batch.produced }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="content-card">
            <div class="card-header">
              <Activity :size="20" class="text-blue-600" />
              <h2>Analisis Gizi Real-time</h2>
            </div>
            <div class="nutrition-analysis">
              <div v-for="stat in nutritionStats" :key="stat.label" class="nutrition-progress">
                <div class="progress-info">
                  <span class="label">{{ stat.label }}</span>
                  <span class="values">{{ stat.actual }} / {{ stat.target }} {{ stat.unit }}</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: getProgressWidth(stat.actual, stat.target) }"></div>
                </div>
              </div>
              <div class="nutrition-alert">
                <Info :size="16" class="text-blue-600" />
                <span>Kandungan gizi batch ini telah sesuai dengan standar kelompok PAUD & SD.</span>
              </div>
            </div>
          </section>

          <section class="content-card">
            <div class="card-header">
              <Package :size="20" class="text-orange-600" />
              <h2>Bahan Baku Terpakai</h2>
            </div>
            <table class="detail-table">
              <thead>
                <tr>
                  <th>Bahan</th>
                  <th>Batch Stok</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-medium">Beras Premium</td>
                  <td class="text-mono">INV-BRS-004</td>
                  <td>32 kg</td>
                  <td><span class="badge badge-success">OK</span></td>
                </tr>
                <tr>
                  <td class="font-medium">Ayam Potong</td>
                  <td class="text-mono">INV-AYM-012</td>
                  <td>24 kg</td>
                  <td><span class="badge badge-success">OK</span></td>
                </tr>
                <tr>
                  <td class="font-medium">Sayur Campur</td>
                  <td class="text-mono">INV-SYR-008</td>
                  <td>19.2 kg</td>
                  <td><span class="badge badge-success">OK</span></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="side-column">
          <section class="content-card audit-card">
            <div class="card-header">
              <History :size="20" class="text-gray-600" />
              <h2>Audit Trail</h2>
            </div>
            <div class="timeline">
              <div v-for="(entry, index) in auditTrail" :key="index" class="timeline-item">
                <div class="timeline-point"></div>
                <div class="timeline-content">
                  <div class="entry-header">
                    <span class="entry-time">{{ entry.time }}</span>
                    <span class="entry-user">
                      <UserIcon :size="12" />
                      {{ entry.user }}
                    </span>
                  </div>
                  <span class="entry-action">{{ entry.action }}</span>
                  <p class="entry-note">{{ entry.note }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-card qc-checklist">
            <div class="card-header">
              <CheckCircle2 :size="20" class="text-green-600" />
              <h2>QC Checklist</h2>
            </div>
            <div class="checklist-items">
              <div class="check-item checked">
                <Check :size="16" />
                <span>Suhu masakan > 75°C</span>
              </div>
              <div class="check-item checked">
                <Check :size="16" />
                <span>Uji organoleptik (Rasa, Bau)</span>
              </div>
              <div class="check-item checked">
                <Check :size="16" />
                <span>Kebersihan Wadah</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </template>

    <div v-else class="error-state">
      <AlertCircle :size="48" class="text-red-500" />
      <h2>Batch Tidak Ditemukan</h2>
      <button class="btn-primary" @click="router.push('/production')">Kembali ke Produksi</button>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.btn-back {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #6b7280;
}

.header-content {
  flex: 1;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.breadcrumb a {
  color: #2563eb;
  text-decoration: none;
}

.page-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
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

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
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
  margin: 0;
}

.status-overview {
  padding: 1.5rem;
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timestamp {
  font-size: 0.75rem;
  color: #6b7280;
}

.batch-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat .label {
  font-size: 0.75rem;
  color: #6b7280;
}

.stat .value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.nutrition-analysis {
  padding: 1.25rem;
}

.nutrition-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.375rem;
}

.progress-info .label { font-weight: 600; }
.progress-info .values { color: #6b7280; }

.progress-bar-bg {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}

.nutrition-alert {
  margin-top: 1.5rem;
  background: #eff6ff;
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #1e40af;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table th {
  background: #f9fafb;
  padding: 0.75rem 1.25rem;
  text-align: left;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
}

.detail-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
}

.audit-card {
  padding-bottom: 1.5rem;
}

.timeline {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  position: relative;
  padding-left: 1.5rem;
}

.timeline-point {
  position: absolute;
  left: 0;
  top: 0.25rem;
  width: 10px;
  height: 10px;
  background: #d1d5db;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #f3f4f6;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 15px;
  bottom: -20px;
  width: 2px;
  background: #f3f4f6;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.entry-user {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.entry-action {
  display: block;
  font-weight: 700;
  font-size: 0.875rem;
  color: #111827;
}

.entry-note {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.125rem 0 0 0;
}

.checklist-items {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.check-item.checked {
  color: #166534;
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

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.font-medium { font-weight: 500; }
.text-mono { font-family: monospace; color: #6b7280; }
</style>
