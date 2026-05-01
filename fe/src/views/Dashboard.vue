<script setup lang="ts">
import { useAppStore } from '../store/app';
import { LayoutDashboard, Users, Utensils, Truck, Warehouse, Banknote } from 'lucide-vue-next';

const appStore = useAppStore();

const stats = [
  { label: 'Total Penerima', value: appStore.dashboard.beneficiary_total.toLocaleString(), icon: Users, color: 'text-blue-600' },
  { label: 'Rencana Produksi', value: `${appStore.dashboard.planned_portions.toLocaleString()} Porsi`, icon: Utensils, color: 'text-orange-600' },
  { label: 'Batch Produksi', value: `${appStore.dashboard.production_batches_completed}/${appStore.dashboard.production_batches_total}`, icon: Warehouse, color: 'text-green-600' },
  { label: 'Pengiriman', value: `${appStore.dashboard.delivery_runs_completed}/${appStore.dashboard.delivery_runs_total}`, icon: Truck, color: 'text-purple-600' },
  { label: 'Biaya per Porsi', value: `Rp ${appStore.dashboard.cost_per_portion.toLocaleString()}`, icon: Banknote, color: 'text-emerald-600' },
];
</script>

<template>
  <div class="dashboard">
    <header class="page-header">
      <h1>Dashboard Operasional</h1>
      <p>Ringkasan status harian SPPG Makassar 01 - 1 Mei 2026</p>
    </header>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-icon" :class="stat.color">
          <component :is="stat.icon" :size="24" />
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ stat.label }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="content-card alert-section">
        <h2>Peringatan Sistem</h2>
        <div class="alert-list">
          <div class="alert-item warning">
            <span class="alert-title">Stok Telur Menipis</span>
            <p>Sisa stok hanya cukup untuk 1 hari produksi.</p>
          </div>
          <div class="alert-item info">
            <span class="alert-title">Batch PB-20260501-001</span>
            <p>Menunggu hasil Quality Control (QC).</p>
          </div>
        </div>
      </div>
      
      <div class="content-card status-section">
        <h2>Status Pengiriman</h2>
        <p>4 dari 6 rute pengiriman telah dikonfirmasi sampai tujuan.</p>
        <!-- Placeholder for chart or list -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 0.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.content-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-card h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.alert-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border-left: 4px solid transparent;
}

.alert-item.warning {
  background: #fffbeb;
  border-color: #f59e0b;
}

.alert-item.info {
  background: #eff6ff;
  border-color: #3b82f6;
}

.alert-title {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.alert-item p {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}
</style>
