# Screen Map Prototipe ERP SPPG

Dokumen ini mendefinisikan struktur layar, prioritas halaman, dan alur navigasi prototipe frontend ERP SPPG untuk kebutuhan demo calon client.

## 1. Tujuan
- Menentukan halaman yang benar-benar masuk ruang lingkup demo.
- Menyusun urutan navigasi yang membentuk cerita produk yang mudah dipahami.
- Menjadi acuan implementasi `pages`, `routes`, dan komponen reusable.

## 2. Prinsip Screen Planning
- Fokus pada alur bisnis yang paling kuat untuk dipresentasikan.
- Mulai dari ringkasan operasional, lalu masuk ke detail proses hulu ke hilir.
- Hindari terlalu banyak halaman master jika tidak memperkuat narasi demo.
- Setiap layar harus punya sumber data yang jelas dari kontrak API.

## 3. Peran Demo Utama
- `Kepala SPPG`: peran utama untuk demo web admin.
- `Ahli Gizi`: muncul pada alur menu, porsi, dan QC.
- `Petugas Gudang`: muncul pada alur pengadaan, penerimaan, dan stok.
- `Kurir`: muncul pada alur distribusi dan bukti serah terima.

## 4. Narasi Demo yang Disarankan
1. Buka dashboard untuk menunjukkan kondisi operasional harian.
2. Masuk ke perencanaan menu dan target porsi.
3. Tunjukkan bagaimana kebutuhan bahan dan stok mendukung rencana tersebut.
4. Tunjukkan pengadaan atau penerimaan barang bila ada kekurangan stok.
5. Masuk ke batch produksi dan quality check.
6. Lanjut ke distribusi dan bukti serah terima.
7. Tutup dengan ringkasan biaya operasional dan indikator performa.

## 5. Struktur Navigasi Utama

### 5.1 Level 1 Navigation
- Dashboard
- Operasional Gizi
- Pengadaan
- Persediaan
- Produksi
- Distribusi
- Keuangan
- Master Data

### 5.2 Struktur Menu per Area

`Dashboard`
- Dashboard Operasional

`Operasional Gizi`
- Perencanaan Menu
- Rencana Porsi Harian

`Pengadaan`
- Purchase Request
- Purchase Order
- Penerimaan Barang

`Persediaan`
- Ringkasan Stok
- Batch Stok
- Riwayat Pergerakan Stok

`Produksi`
- Rencana Produksi
- Batch Produksi
- Quality Check
- Checklist Sanitasi

`Distribusi`
- Manifest Distribusi
- Delivery Run
- Bukti Serah Terima
- Insiden Distribusi

`Keuangan`
- Ringkasan Biaya Harian
- Daftar Pengeluaran
- Deviasi Anggaran

`Master Data`
- Penerima Manfaat
- Titik Distribusi
- Vendor

## 6. Daftar Layar Prototipe

### 6.1 Must-Have Screens
- `Login / Pilih Tenant`
- `Dashboard Operasional`
- `Perencanaan Menu`
- `Rencana Porsi Harian`
- `Ringkasan Stok`
- `Penerimaan Barang`
- `Batch Produksi`
- `Quality Check`
- `Delivery Run`
- `Bukti Serah Terima`
- `Ringkasan Biaya Harian`

Alasan:
- kumpulan layar ini sudah cukup untuk menunjukkan keseluruhan alur demo dari hulu ke hilir.

### 6.2 Should-Have Screens
- `Purchase Request`
- `Purchase Order`
- `Batch Stok`
- `Checklist Sanitasi`
- `Deviasi Anggaran`
- `Penerima Manfaat`
- `Titik Distribusi`

Alasan:
- layar ini memperkaya cerita operasional dan menunjukkan kedalaman produk.

### 6.3 Nice-to-Have Screens
- `Riwayat Pergerakan Stok`
- `Insiden Distribusi`
- `Vendor`
- `Profil Pengguna / Current Session`

Alasan:
- layar ini berguna untuk pendalaman bila ada waktu, tetapi tidak kritikal untuk demo pertama.

## 7. Definisi Tiap Layar Inti

### 7.1 Login / Pilih Tenant
Tujuan:
- memberi konteks bahwa sistem mendukung multi-tenant.

Konten utama:
- form login sederhana;
- pilihan tenant atau unit SPPG;
- ringkasan identitas pengguna aktif.

### 7.2 Dashboard Operasional
Tujuan:
- membuka demo dengan gambaran status SPPG hari ini.

Konten utama:
- stat cards jumlah penerima, target porsi, batch produksi aktif, pengiriman aktif;
- peringatan stok minimum, QC pending, dan deviasi biaya;
- tabel pengiriman terbaru;
- ringkasan biaya per porsi;
- shortcut ke layar detail.

### 7.3 Perencanaan Menu
Tujuan:
- menunjukkan bagaimana menu dan standar gizi direncanakan.

Konten utama:
- daftar menu aktif;
- detail komposisi dan target gizi;
- status persetujuan menu;
- informasi kelompok penerima.

### 7.4 Rencana Porsi Harian
Tujuan:
- menunjukkan konversi menu menjadi target operasional.

Konten utama:
- tanggal operasional;
- titik distribusi;
- jumlah penerima per kelompok;
- total target porsi;
- estimasi kebutuhan bahan.

### 7.5 Ringkasan Stok
Tujuan:
- menunjukkan kesiapan bahan baku.

Konten utama:
- stok tersedia;
- item kritis;
- bahan mendekati kedaluwarsa;
- tautan ke batch stok dan penerimaan barang.

### 7.6 Penerimaan Barang
Tujuan:
- menunjukkan kontrol kualitas saat bahan masuk.

Konten utama:
- daftar penerimaan;
- status diterima, ditolak sebagian, ditolak;
- detail vendor, item, dan tanggal kedaluwarsa;
- catatan inspeksi kualitas.

### 7.7 Batch Produksi
Tujuan:
- menunjukkan eksekusi produksi dapur.

Konten utama:
- daftar batch per hari;
- status batch;
- bahan yang dipakai;
- hasil porsi jadi;
- waktu mulai dan selesai produksi.

### 7.8 Quality Check
Tujuan:
- menunjukkan bahwa produksi tidak langsung dikirim tanpa verifikasi.

Konten utama:
- daftar batch menunggu QC;
- hasil inspeksi;
- status lolos atau gagal;
- alasan kegagalan bila ada.

### 7.9 Delivery Run
Tujuan:
- menunjukkan proses distribusi dan monitoring lapangan.

Konten utama:
- manifest per rute;
- kurir bertugas;
- status perjalanan;
- estimasi waktu dan SLA;
- indikator risiko keterlambatan.

### 7.10 Bukti Serah Terima
Tujuan:
- menunjukkan akuntabilitas distribusi.

Konten utama:
- foto serah terima;
- nama penerima;
- lokasi GPS;
- waktu diterima;
- status diterima, parsial, atau gagal.

### 7.11 Ringkasan Biaya Harian
Tujuan:
- menutup demo dengan sisi akuntabilitas keuangan.

Konten utama:
- total pengeluaran harian;
- biaya per porsi;
- deviasi terhadap anggaran;
- komposisi biaya utama;
- daftar transaksi biaya terbaru.

## 8. Alur Navigasi Demo Utama
1. `Login / Pilih Tenant`
2. `Dashboard Operasional`
3. `Perencanaan Menu`
4. `Rencana Porsi Harian`
5. `Ringkasan Stok`
6. `Penerimaan Barang` atau `Purchase Request` bila ingin menunjukkan replenishment
7. `Batch Produksi`
8. `Quality Check`
9. `Delivery Run`
10. `Bukti Serah Terima`
11. `Ringkasan Biaya Harian`

## 9. Skenario State yang Harus Terlihat di UI

### 9.1 Normal State
- batch produksi selesai tepat waktu;
- distribusi berhasil;
- biaya masih dalam ambang.

### 9.2 Warning State
- stok minimum tercapai;
- QC masih pending menjelang jadwal distribusi;
- biaya per porsi mendekati batas.

### 9.3 Exception State
- penerimaan barang ditolak sebagian;
- batch gagal QC;
- delivery run terlambat atau parsial.

## 10. Komponen Reusable yang Disarankan
- `StatCard`
- `StatusBadge`
- `FilterBar`
- `DataTable`
- `SectionHeader`
- `TimelineStatus`
- `InfoDrawer` atau `SidePanel`
- `PhotoProofCard`
- `AlertBanner`
- `EmptyState`

## 11. Catatan Responsive dan Mobile
- Dashboard tetap optimal di laptop karena ini perangkat demo utama.
- Area distribusi dan bukti serah terima perlu disiapkan dalam layout mobile-friendly.
- Jika mobile app penuh belum dibuat, tampilkan versi simulasi mobile pada halaman distribusi.

## 12. Definisi Selesai
- Semua layar `must-have` memiliki desain dan data mock yang konsisten.
- Navigasi antarhalaman mendukung urutan demo tanpa kebingungan.
- Setiap layar telah dipetakan ke modul API yang jelas.
- State normal, warning, dan exception muncul minimal pada layar kunci.
