# Visi dan Ruang Lingkup ERP SPPG

Dokumen ini menjadi turunan awal dari `analisis_kebutuhan_erp_sppg.md` untuk menetapkan arah produk, batasan implementasi awal, dan prioritas modul ERP SPPG. Pada tahap terdekat, fokus delivery adalah prototipe frontend untuk kebutuhan demo calon client.

## 1. Tujuan Dokumen
Dokumen ini disusun untuk:
- menyamakan pemahaman tim bisnis dan tim teknis terhadap tujuan sistem;
- menetapkan ruang lingkup tahap awal pengembangan prototipe;
- menjadi acuan untuk desain arsitektur, model data, dan roadmap implementasi.

## 2. Visi Produk
ERP SPPG adalah sistem operasional terintegrasi untuk mendukung perencanaan, produksi, distribusi, pengawasan mutu, dan akuntabilitas keuangan program MBG pada unit SPPG secara terstandar, terukur, dan dapat diawasi dari pusat. Tahap awal produk diwujudkan sebagai prototipe frontend interaktif yang merepresentasikan alur inti dan siap dipresentasikan ke calon client.

## 3. Sasaran Utama
- Meningkatkan kontrol operasional harian SPPG dari pengadaan sampai distribusi.
- Menjamin kepatuhan pada SOP keamanan pangan, kontrol mutu, dan batas waktu konsumsi.
- Menyediakan pelaporan keuangan dan operasional yang cepat, akurat, dan siap audit.
- Mendukung pengawasan multi-wilayah oleh BGN tanpa mencampur data antar SPPG.
- Memungkinkan operasional lapangan tetap berjalan pada kondisi internet terbatas.

## 4. Prinsip Dasar Solusi
- `Multi-tenant`: setiap SPPG memiliki data operasional sendiri, dengan agregasi untuk tingkat wilayah dan pusat.
- `API-first`: seluruh fungsi inti tersedia melalui API agar mudah diintegrasikan dengan aplikasi mobile dan sistem eksternal.
- `Mobile-friendly`: proses yang dilakukan di lapangan harus bisa dipakai lewat perangkat mobile.
- `Offline-first` untuk aktivitas lapangan yang kritikal.
- `Auditability`: semua transaksi penting harus terlacak siapa, kapan, dan perubahan apa yang terjadi.

## 5. Aktor Sistem
- `BGN Pusat`: melihat dashboard nasional, audit, monitoring kinerja, dan rekap anggaran.
- `Admin Wilayah`: memantau beberapa SPPG dalam wilayah tertentu.
- `Kepala SPPG`: menyetujui transaksi, memonitor operasional harian, dan memastikan kepatuhan.
- `Ahli Gizi`: menyusun menu, target gizi, dan validasi komposisi porsi.
- `Petugas Dapur`: mencatat produksi, checklist sanitasi, dan pemakaian bahan.
- `Petugas Gudang`: menerima barang, memeriksa kualitas, dan mengelola stok.
- `Kurir/Logistik`: menerima tugas distribusi, konfirmasi pengiriman, dan serah terima.
- `Mitra/Vendor`: pemasok bahan baku yang datanya diverifikasi dan dievaluasi.

## 6. Ruang Lingkup Fase Awal
Fase awal difokuskan pada prototipe frontend yang menampilkan proses inti paling menentukan keberhasilan operasional SPPG. Sumber data pada fase ini menggunakan mock data, tetapi struktur data, penamaan field, dan respons layar harus mengikuti kontrak API yang dirancang sejak awal.

### 6.1 Modul Dalam Cakupan Prototipe Demo
- Master data SPPG, tenant, pengguna, peran, lokasi, sekolah, dan penerima manfaat.
- Perencanaan menu dan standar gizi per kelompok penerima.
- Perencanaan kebutuhan bahan berdasarkan menu dan jumlah porsi.
- Pengadaan dan penerimaan barang dengan pemeriksaan kualitas dasar.
- Manajemen persediaan dengan FIFO/FEFO.
- Produksi dapur per batch dan checklist sanitasi.
- Distribusi, bukti serah terima, foto, GPS, dan status pengiriman.
- Pencatatan anggaran operasional harian dan realisasi pengeluaran utama.
- Dashboard operasional dan laporan dasar.

Catatan implementasi awal:
- prioritas ada pada tampilan, alur pengguna, dan konsistensi data antarlayar;
- interaksi dapat memakai mock service atau mock API lokal;
- seluruh data mock harus mengikuti skema request/response yang disepakati;
- validasi visual dan narasi demo lebih penting daripada otomatisasi backend penuh.

### 6.2 Modul Di Luar Cakupan Prototipe Demo
- Implementasi backend produksi penuh.
- Integrasi database produksi dan sinkronisasi mobile nyata.
- Integrasi bank otomatis penuh untuk mutasi rekening real-time.
- Optimasi rute berbasis machine learning atau peta tingkat lanjut.
- Integrasi nasional penuh dengan seluruh sistem pemerintah.
- Prediksi kebutuhan bahan berbasis histori dan AI.
- Portal vendor mandiri untuk penawaran dan e-procurement lengkap.

## 7. Prioritas Kebutuhan

### Prioritas 1
- dashboard operasional yang kuat untuk demo;
- alur menu ke produksi ke distribusi yang mudah dipahami client;
- tampilan stok, pengadaan, dan penerimaan barang;
- tampilan biaya operasional dan ringkasan anggaran;
- konsistensi mock data dengan kontrak API.

### Prioritas 2
- evaluasi mitra;
- dashboard lintas wilayah;
- sinkronisasi ke sistem eksternal;
- analitik performa dan efisiensi.

## 8. Indikator Keberhasilan Awal
- Calon client dapat memahami alur operasional SPPG melalui prototipe tanpa penjelasan teknis panjang.
- Seluruh layar utama memakai data mock yang konsisten antar halaman.
- Struktur data frontend sudah sejalan dengan kontrak API awal.
- Perubahan dari mock service ke backend nyata nantinya tidak memaksa redesign UI besar.
- Skenario demo utama dapat dijalankan dari dashboard sampai distribusi dan laporan.

## 9. Asumsi Awal
- Satu tenant utama mewakili satu unit SPPG.
- Setiap SPPG dapat melayani lebih dari satu titik distribusi.
- Satu menu dapat memiliki variasi porsi berdasarkan kelompok penerima.
- Pengguna lapangan lebih banyak memakai perangkat mobile dibanding desktop.
- Data internet tidak selalu tersedia saat distribusi berlangsung.

## 10. Risiko Desain Awal
- Variasi SOP antar wilayah dapat membuat proses terlalu fleksibel atau terlalu kaku.
- Integrasi eksternal berpotensi mengubah desain data bila didefinisikan terlambat.
- Data master penerima manfaat dapat cepat usang jika tidak ada prosedur sinkronisasi.
- Offline sync berisiko konflik data bila tidak ada aturan status transaksi yang jelas.

## 11. Keputusan Rancangan Awal
- Sistem dibangun modular, tetapi modul inti berada dalam satu platform terpadu.
- Fase pertama memprioritaskan prototipe frontend interaktif dibanding backend operasional penuh.
- Seluruh modul inti harus memakai struktur audit trail dan status workflow.
- Desain data dan API harus lebih dulu distabilkan agar mock data, frontend, dan backend nanti tetap satu jalur.
