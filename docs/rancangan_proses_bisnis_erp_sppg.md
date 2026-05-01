# Rancangan Proses Bisnis ERP SPPG

Dokumen ini memetakan alur bisnis utama ERP SPPG sebagai dasar penyusunan backlog sistem, peran pengguna, dan status transaksi.

## 1. Tujuan
- Mendefinisikan proses operasional inti yang harus didukung sistem.
- Menentukan titik input data, kontrol, persetujuan, dan output laporan.
- Menjadi dasar penyusunan use case, workflow status, dan SLA operasional.

## 2. Prinsip Perancangan Proses
- Setiap proses memiliki penanggung jawab yang jelas.
- Status transaksi harus dapat ditelusuri dari awal hingga selesai.
- Titik kontrol kualitas ditempatkan sebelum bahan dipakai dan sebelum makanan dikirim.
- Kegiatan lapangan harus tetap dapat berjalan saat koneksi tidak stabil.

## 3. Alur Proses Utama

### 3.1 Perencanaan Operasional Harian
1. Ahli gizi menentukan menu dan standar porsi per kelompok penerima.
2. Sistem menghitung kebutuhan bahan berdasarkan jumlah penerima aktif.
3. Kepala SPPG meninjau rencana produksi harian.
4. Sistem menghasilkan draft kebutuhan belanja dan pengeluaran bahan dari stok.

Output:
- rencana menu harian;
- estimasi kebutuhan bahan;
- target jumlah porsi per titik distribusi.

### 3.2 Pengadaan dan Penerimaan Bahan
1. Petugas membuat permintaan pembelian berdasarkan kekurangan stok.
2. Kepala SPPG menyetujui permintaan bila sesuai anggaran.
3. Vendor mengirim bahan ke gudang/dapur.
4. Petugas gudang melakukan pemeriksaan kualitas, jumlah, tanggal kedaluwarsa, dan dokumen penerimaan.
5. Bahan yang lolos masuk stok; bahan yang gagal dicatat sebagai ditolak atau dikembalikan.

Titik kontrol:
- validasi vendor aktif;
- cek harga terhadap acuan;
- cek kualitas dan kelayakan bahan.

### 3.3 Manajemen Stok
1. Stok masuk dicatat per batch.
2. Sistem memberi prioritas pemakaian dengan FIFO/FEFO.
3. Pengeluaran bahan ke produksi dicatat berdasarkan batch aktual.
4. Penyesuaian stok hanya dapat dilakukan oleh peran berwenang dengan alasan yang wajib diisi.

Output:
- kartu stok;
- histori batch;
- notifikasi stok minimum dan kedaluwarsa.

### 3.4 Produksi Dapur
1. Petugas dapur mengisi checklist sanitasi pra-produksi.
2. Sistem membuka batch produksi berdasarkan rencana harian.
3. Bahan baku dikeluarkan dari stok sesuai batch.
4. Petugas mencatat progres produksi dan hasil akhir porsi jadi.
5. Ahli gizi atau petugas QC melakukan verifikasi mutu sebelum distribusi.

Titik kontrol:
- checklist higiene dan sanitasi;
- validasi jumlah porsi hasil;
- waktu mulai dan selesai masak;
- status lulus atau tidak lulus QC.

### 3.5 Distribusi dan Serah Terima
1. Kepala SPPG atau petugas logistik membuat manifest distribusi.
2. Kurir menerima tugas per rute atau titik distribusi.
3. Saat pengantaran, aplikasi mencatat waktu berangkat, tiba, foto, nama penerima, dan GPS.
4. Jika ada kendala, kurir mencatat insiden dan status parsial/gagal.
5. Sistem menutup pengiriman ketika bukti serah terima lengkap.

Titik kontrol:
- pengiriman hanya dapat dilakukan untuk batch yang lolos QC;
- sistem memantau batas waktu konsumsi 3-4 jam;
- bukti serah terima wajib untuk status selesai.

### 3.6 Pencatatan Keuangan Operasional
1. Pengeluaran pembelian, biaya logistik, dan biaya operasional dicatat per kategori.
2. Sistem membandingkan realisasi dengan anggaran dan biaya per porsi.
3. Kepala SPPG meninjau pengeluaran anomali atau yang melebihi batas.
4. Laporan harian dan periodik disiapkan untuk kebutuhan LPJ.

Output:
- rekap pengeluaran;
- biaya per porsi;
- laporan deviasi anggaran.

### 3.7 Monitoring dan Pelaporan
1. Dashboard harian menampilkan produksi, stok, distribusi, dan pengeluaran.
2. Admin wilayah dan BGN melihat agregasi lintas tenant sesuai otoritas.
3. Laporan operasional dan keuangan dapat difilter per tanggal, tenant, wilayah, dan status.

## 4. Daftar Workflow Inti

### 4.1 Purchase Request
`draft -> diajukan -> disetujui/ditolak -> dipesan -> diterima sebagian/diterima penuh -> selesai`

### 4.2 Penerimaan Barang
`draft -> diperiksa -> diterima/ditolak sebagian/ditolak -> masuk stok -> selesai`

### 4.3 Batch Produksi
`direncanakan -> persiapan -> diproses -> menunggu QC -> lolos QC/gagal QC -> siap distribusi -> selesai`

### 4.4 Distribusi
`draft -> dijadwalkan -> diambil kurir -> dalam perjalanan -> diterima/gagal/parsial -> ditutup`

### 4.5 Pengeluaran Operasional
`draft -> diajukan -> diverifikasi -> diposting -> masuk laporan`

## 5. Pengecualian Proses yang Harus Diakomodasi
- sekolah libur atau penerima tidak aktif sementara;
- pengiriman gagal karena cuaca, akses jalan, atau penerima tidak tersedia;
- bahan diterima tetapi kualitas tidak sesuai;
- produksi ulang parsial karena batch gagal QC;
- sinkronisasi tertunda dari aplikasi mobile ke server pusat.

## 6. Kebutuhan Notifikasi Awal
- stok minimum tercapai;
- bahan akan kedaluwarsa;
- pengeluaran melewati ambang batas;
- batch belum QC tetapi jadwal distribusi sudah dekat;
- pengiriman belum selesai melewati SLA waktu;
- data mobile belum tersinkron dalam periode tertentu.

## 7. Artefak Sistem yang Harus Tersedia
- master data penerima manfaat dan titik distribusi;
- dokumen transaksi pembelian, penerimaan, stok, produksi, distribusi, dan biaya;
- audit trail perubahan status;
- lampiran foto dan dokumen pendukung;
- dashboard ringkas untuk operasional dan audit.
