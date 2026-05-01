# Rancangan Arsitektur Sistem ERP SPPG

Dokumen ini mendefinisikan arsitektur solusi awal untuk ERP SPPG berdasarkan kebutuhan operasional, audit, integrasi, dan kondisi lapangan. Penyesuaian tahap awal: prioritas implementasi adalah prototipe frontend dengan mock data yang tunduk pada kontrak API.

## 1. Tujuan Arsitektur
- Menyediakan fondasi teknis untuk prototipe frontend yang cepat didemokan.
- Menjaga agar struktur UI, mock data, dan kontrak API selaras sejak awal.
- Mendukung evolusi bertahap dari mock service ke backend nyata.
- Menjamin rancangan tetap siap berkembang ke sistem produksi.

## 2. Prinsip Arsitektur
- `Frontend-first prototype`: fase awal memprioritaskan antarmuka dan alur demo yang representatif.
- `API-contract first`: sebelum backend penuh dibuat, bentuk request dan response distabilkan terlebih dahulu.
- `Mockable services`: frontend harus membaca data melalui layer service agar mudah diganti dari mock ke API nyata.
- `Offline-capable clients`: kebutuhan offline tetap dipertimbangkan pada desain layar dan model data, walau belum diimplementasikan penuh pada fase demo.
- `Secure by default`: autentikasi, otorisasi, dan audit trail menjadi bagian inti.
- `Observable`: aktivitas sistem, error, dan sinkronisasi harus dapat dipantau.

## 3. Komponen Tingkat Tinggi

### 3.1 Client Layer
- `Web Admin Prototype`: kanal utama untuk demo calon client.
- `Mobile View Prototype`: dapat berupa layout responsif atau simulasi layar mobile untuk kurir dan petugas lapangan.

### 3.2 Application Layer
- `Frontend UI Modules`
- `API Service Layer`
- `Mock API Provider`
- `Auth & Access Contract`
- `Master Data Contract`
- `Nutrition & Menu Contract`
- `Procurement Contract`
- `Inventory Contract`
- `Production Contract`
- `Distribution Contract`
- `Finance & Reporting Contract`

### 3.3 Data Layer
- `Mock Data Files` atau `in-memory mock server` untuk fase demo.
- `API schema definitions` sebagai sumber struktur data.
- `Relational Database`, `Object Storage`, dan `Queue` disiapkan sebagai target fase implementasi backend.

### 3.4 Integration Layer
- `External API Connector` untuk BGN/SISTAKOL, bank, atau sistem pemerintah lain.
- `Import/Export Adapter` untuk CSV/Excel pada fase awal bila integrasi API belum tersedia.

## 4. Arsitektur Logis
Pada fase demo, UI berkomunikasi ke service layer frontend. Service layer tersebut membaca data dari mock provider yang meniru respons API. Dengan pola ini, komponen UI tidak bergantung langsung pada data statis dan dapat dialihkan ke backend nyata tanpa perubahan besar pada layar.

Target transisi:
- `UI Components -> Frontend Service Layer -> Mock Provider`
- fase berikutnya menjadi `UI Components -> Frontend Service Layer -> Real API Backend`

## 5. Rekomendasi Struktur Modul

### 5.1 Modul Inti Domain
- `tenant`
- `user_access`
- `beneficiary`
- `menu_nutrition`
- `vendor_procurement`
- `inventory`
- `production`
- `distribution`
- `finance`
- `reporting`

### 5.2 Modul Pendukung
- `audit_log`
- `attachments`
- `notifications`
- `sync_offline`
- `integration`

### 5.3 Modul Tambahan Khusus Prototipe
- `mock_data_catalog`
- `api_contracts`
- `demo_scenarios`
- `design_tokens`

## 6. Strategi Multi-Tenancy
- Setiap data transaksi memiliki `tenant_id`.
- Akses pengguna dibatasi oleh `tenant_id` dan `role`.
- Admin wilayah dapat mengakses beberapa tenant melalui pemetaan wilayah.
- Pusat hanya mengakses data agregat atau detail sesuai kewenangan audit.

Rekomendasi awal:
- gunakan satu database dengan pemisahan logis berbasis `tenant_id` untuk MVP;
- siapkan abstraksi agar tenant besar dapat dipisah di masa depan jika diperlukan.

## 7. Strategi Offline-First
- Mobile menyimpan transaksi lokal dengan status `pending_sync`.
- Setiap transaksi memiliki `client_generated_id` untuk mencegah duplikasi.
- Sinkronisasi menggunakan timestamp, version, dan status konflik.
- Konflik pada transaksi kritikal tidak diselesaikan diam-diam; sistem harus menandai dan meminta review.

Prioritas offline:
- bukti pengiriman;
- status distribusi;
- checklist sanitasi;
- pencatatan insiden lapangan.

## 8. Keamanan dan Kepatuhan
- Autentikasi berbasis session atau token dengan masa berlaku terkontrol.
- Otorisasi berbasis role dan scope tenant/wilayah.
- Audit log untuk create, update, approve, reject, adjust, dan delete logical.
- Lampiran sensitif harus memiliki kontrol akses.
- Data pribadi penerima manfaat hanya ditampilkan seperlunya sesuai peran.

## 9. Integrasi yang Perlu Diantisipasi
- Sistem pelaporan pusat BGN.
- Sumber data penerima manfaat dari sekolah, posyandu, atau instansi terkait.
- Mutasi atau rekonsiliasi rekening bila integrasi bank tersedia.
- Layanan geolokasi atau peta untuk distribusi.

## 10. Non-Functional Requirements Awal
- Loading prototipe cepat dan stabil saat dipresentasikan.
- Navigasi antarlayar mulus untuk skenario demo utama.
- Mock data konsisten dan tidak saling bertentangan antar modul.
- Struktur service frontend mudah dialihkan ke API nyata.
- Komponen UI dapat dipakai ulang saat masuk fase implementasi backend.

## 11. Risiko Arsitektur
- Arsitektur terlalu kompleks sejak awal akan memperlambat delivery.
- Offline sync yang buruk akan menimbulkan duplikasi atau kehilangan bukti lapangan.
- Model multi-tenant yang lemah akan berisiko kebocoran data antar SPPG.
- Integrasi eksternal yang belum pasti dapat memicu perubahan besar bila tidak diisolasi melalui adapter.

## 12. Keputusan Awal yang Disarankan
- Mulai dari frontend prototype yang berbasis contract dan mock service.
- Pisahkan `UI`, `service layer`, dan `mock provider` sejak awal.
- Susun kontrak API per modul sebelum memperbanyak layar.
- Gunakan satu katalog mock data yang konsisten lintas halaman demo.
- Jadikan backend modular monolith sebagai target fase setelah validasi client.
