# TODO Prototipe Frontend ERP SPPG

Dokumen ini adalah perpanjangan operasional dari roadmap rancangan awal. Fokusnya bukan lagi arah besar, tetapi daftar kerja konkret untuk menyiapkan prototipe frontend ERP SPPG berbasis mock data dan kontrak API.

## 1. Tujuan
- Menerjemahkan roadmap menjadi pekerjaan yang bisa langsung dieksekusi.
- Menjaga urutan kerja agar frontend demo tetap konsisten dengan proses bisnis dan kontrak API.
- Menjadi checklist bersama untuk desain, frontend, dan persiapan presentasi client.

## 2. Prinsip Eksekusi
- Jangan membangun layar sebelum alur demo dan shape data jelas.
- Semua data tampilan harus lewat service layer.
- Mock data harus konsisten antar halaman dan antar modul.
- Prioritaskan layar yang memperkuat narasi demo dari dashboard sampai laporan.

## 3. Daftar TODO Utama

### 3.1 Validasi Arah Demo
- [ ] Finalkan tujuan demo dan pesan utama yang ingin ditunjukkan ke calon client.
- [ ] Tetapkan peran pengguna utama yang akan dipakai saat demo.
- [ ] Pilih alur demo utama dari hulu ke hilir.
- [ ] Tentukan modul yang wajib tampil dan modul yang cukup sebagai placeholder.
- [ ] Tetapkan kriteria selesai untuk versi demo pertama.

Output minimum:
- daftar skenario demo;
- urutan presentasi layar;
- daftar modul in-scope untuk demo.

### 3.2 Desain Kontrak API Awal
- [ ] Buat daftar endpoint minimum per modul.
- [ ] Definisikan request dan response untuk halaman list, detail, summary, dan action utama.
- [ ] Samakan penamaan field antar modul.
- [ ] Definisikan shape status workflow untuk pengadaan, stok, produksi, distribusi, dan biaya.
- [ ] Tandai field yang masih asumsi agar mudah direvisi.

Output minimum:
- dokumen endpoint per modul;
- contoh payload sukses, kosong, warning, dan error.

### 3.3 Katalog Mock Data
- [ ] Susun dataset tenant, user, lokasi, sekolah, dan penerima manfaat.
- [ ] Susun dataset menu, standar gizi, resep, dan rencana porsi.
- [ ] Susun dataset vendor, purchase request, purchase order, dan penerimaan barang.
- [ ] Susun dataset stok, batch, pergerakan barang, dan notifikasi stok minimum.
- [ ] Susun dataset produksi, checklist sanitasi, QC, distribusi, dan proof of delivery.
- [ ] Susun dataset biaya operasional, ringkasan anggaran, dan laporan dashboard.
- [ ] Pastikan semua ringkasan dashboard berasal dari data mock yang sama.

Output minimum:
- satu katalog mock data terpusat;
- mapping relasi antardata.

Rujukan kerja:
- [mock_data_catalog_erp_sppg.md](/Users/user/Projects/Algenz/erp-sppg/docs/mock_data_catalog_erp_sppg.md)

### 3.4 Struktur Frontend
- [ ] Tentukan struktur folder untuk `pages`, `components`, `services`, `models`, dan `mocks`.
- [ ] Buat service layer per modul.
- [ ] Buat interface atau type terpusat dari kontrak API.
- [ ] Buat mock provider yang mengembalikan data sesuai kontrak.
- [ ] Siapkan state dasar untuk list, detail, loading, empty state, dan error state.

Output minimum:
- fondasi frontend yang tidak hardcode data langsung di komponen.

### 3.5 Screen Planning
- [ ] Buat daftar seluruh halaman yang masuk demo.
- [ ] Tentukan prioritas layar `must-have`, `should-have`, dan `nice-to-have`.
- [ ] Tentukan komponen reusable seperti tabel, stat card, status badge, timeline, dan form section.
- [ ] Buat alur navigasi dari dashboard ke halaman detail.
- [ ] Tentukan versi mobile/responsif untuk skenario kurir atau petugas lapangan.

Output minimum:
- screen map;
- prioritas implementasi halaman.

### 3.6 Implementasi Layar Prioritas
- [ ] Bangun dashboard operasional utama.
- [ ] Bangun halaman master data penerima manfaat dan titik distribusi.
- [ ] Bangun halaman menu dan perencanaan porsi.
- [ ] Bangun halaman pengadaan dan penerimaan barang.
- [ ] Bangun halaman inventory dan batch stok.
- [ ] Bangun halaman produksi dan quality check.
- [ ] Bangun halaman distribusi dan bukti serah terima.
- [ ] Bangun halaman biaya operasional dan ringkasan laporan.

Output minimum:
- alur demo utama bisa berjalan penuh tanpa dead end.

### 3.7 Demo States
- [ ] Siapkan state normal untuk semua layar utama.
- [ ] Siapkan state warning untuk kasus stok menipis, keterlambatan, atau biaya melewati ambang.
- [ ] Siapkan state exception untuk kasus barang ditolak, batch gagal QC, atau pengiriman parsial.
- [ ] Pastikan state tersebut mudah dipicu saat demo.

Output minimum:
- minimal tiga mode demo: normal, warning, exception.

### 3.8 Polishing Demo
- [ ] Rapikan narasi angka pada dashboard agar masuk akal dan konsisten.
- [ ] Pastikan label status mudah dipahami non-teknis.
- [ ] Tambahkan empty state dan helper text yang menjelaskan konteks layar.
- [ ] Pastikan tampilan responsif dan stabil pada ukuran laptop presentasi.
- [ ] Pastikan transisi antarlayar cukup cepat untuk presentasi langsung.

Output minimum:
- prototipe siap ditampilkan tanpa perlu banyak penjelasan tambahan.

### 3.9 Review Internal
- [ ] Review kesesuaian layar dengan dokumen proses bisnis.
- [ ] Review kesesuaian mock data dengan kontrak API.
- [ ] Review konsistensi istilah bisnis antarhalaman.
- [ ] Review apakah skenario demo sudah mencakup nilai jual utama untuk client.
- [ ] Catat gap yang boleh ditunda dan gap yang wajib dibenahi sebelum demo.

Output minimum:
- daftar revisi final sebelum presentasi.

## 4. Prioritas Eksekusi

### Prioritas 1
- kontrak API minimum;
- katalog mock data inti;
- dashboard;
- alur menu -> produksi -> distribusi;
- ringkasan biaya operasional.

### Prioritas 2
- pengadaan dan inventory detail;
- warning state dan exception state;
- tampilan mobile untuk distribusi.

### Prioritas 3
- penghalusan visual;
- placeholder untuk modul lanjutan;
- variasi skenario tambahan.

## 5. Urutan Kerja yang Disarankan
1. Finalkan skenario demo.
2. Susun kontrak API minimum.
3. Buat type/interface frontend.
4. Susun mock data terpusat.
5. Bangun service layer dan mock provider.
6. Implementasikan dashboard dan layar inti.
7. Tambahkan warning dan exception states.
8. Review internal dan rapikan narasi demo.

## 6. Definisi Selesai untuk Demo Awal
- Semua layar utama yang dijanjikan tersedia.
- Tidak ada komponen yang membaca data statis langsung tanpa service layer.
- Mock data konsisten antarhalaman.
- Skenario normal dapat dijalankan penuh.
- Skenario warning dan exception minimal tersedia pada layar kunci.
- Tim dapat mendemokan sistem tanpa menjelaskan “ini masih dummy” terlalu sering karena datanya sudah terasa realistis.

## 7. Catatan Penting
- Jika ada perubahan kontrak API, type frontend dan mock provider harus diperbarui bersamaan.
- Jangan menambah terlalu banyak modul sebelum alur demo utama stabil.
- Jika waktu sempit, utamakan kualitas narasi demo dibanding kuantitas halaman.
