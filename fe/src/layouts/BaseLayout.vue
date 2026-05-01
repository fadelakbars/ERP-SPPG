<script setup lang="ts">
import { ref } from 'vue';
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  Warehouse, 
  Truck, 
  Banknote, 
  Settings, 
  LogOut,
  Menu as MenuIcon,
  X
} from 'lucide-vue-next';

const sidebarOpen = ref(true);

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Penerima Manfaat', icon: Users, path: '/beneficiaries' },
  { name: 'Menu & Produksi', icon: Utensils, path: '/production' },
  { name: 'Inventori', icon: Warehouse, path: '/inventory' },
  { name: 'Distribusi', icon: Truck, path: '/distribution' },
  { name: 'Keuangan', icon: Banknote, path: '/finance' },
];

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<template>
  <div class="layout-container">
    <!-- Sidebar -->
    <aside :class="['sidebar', { 'sidebar-closed': !sidebarOpen }]">
      <div class="sidebar-header">
        <span class="logo-text" v-if="sidebarOpen">ERP SPPG</span>
        <button class="toggle-btn" @click="toggleSidebar">
          <X v-if="sidebarOpen" :size="20" />
          <MenuIcon v-else :size="20" />
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link 
          v-for="item in menuItems" 
          :key="item.name" 
          :to="item.path"
          class="nav-item"
          active-class="active"
        >
          <component :is="item.icon" :size="20" />
          <span v-if="sidebarOpen">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item logout-btn">
          <LogOut :size="20" />
          <span v-if="sidebarOpen">Keluar</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-bar">
        <div class="user-info">
          <span class="user-name">Kepala SPPG Makassar 01</span>
          <span class="user-role">Administrator</span>
        </div>
      </header>

      <div class="content-area">
        <slot></slot>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}

.sidebar {
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar-closed {
  width: 64px;
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.logo-text {
  font-weight: 700;
  font-size: 1.25rem;
  color: #2563eb;
}

.toggle-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.toggle-btn:hover {
  background-color: #f3f4f6;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
}

.nav-item:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.nav-item.active {
  background-color: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}

.sidebar-footer {
  padding: 1rem 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.logout-btn {
  color: #dc2626;
}

.logout-btn:hover {
  background-color: #fef2f2;
  color: #b91c1c;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.top-bar {
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.5rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
}

.user-role {
  font-size: 0.75rem;
  color: #6b7280;
}

.content-area {
  padding: 2rem;
  flex: 1;
}

@media (max-width: 640px) {
  .sidebar {
    position: fixed;
    z-index: 40;
    height: 100vh;
  }
  
  .sidebar-closed {
    transform: translateX(-100%);
  }
}
</style>
