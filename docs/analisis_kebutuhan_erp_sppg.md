# Analisis Kebutuhan Proyek ERP untuk Satuan Pelayanan Pemenuhan Gizi (SPPG) - Program Makan Bergizi Gratis (MBG)

Dokumen ini merupakan hasil analisis kebutuhan sistem perencanaan sumber daya perusahaan (ERP) yang dirancang khusus untuk operasional **Satuan Pelayanan Pemenuhan Gizi (SPPG)** di bawah naungan **Badan Gizi Nasional (BGN)**, merujuk pada Pedoman dan Petunjuk Teknis (Juknis) resmi yang berlaku.

---

## 1. Latar Belakang dan Tujuan
Satuan Pelayanan Pemenuhan Gizi (SPPG) memiliki tanggung jawab untuk menyediakan dan mendistribusikan makan bergizi kepada penerima manfaat, termasuk anak sekolah, balita, ibu hamil, dan ibu menyusui, dalam rangka mendukung program Makan Bergizi Gratis (MBG) serta percepatan penurunan stunting.

Untuk memastikan operasional SPPG berjalan secara **efisien, transparan, akuntabel, dan sesuai standar keamanan pangan**, diperlukan sebuah sistem informasi yang terintegrasi (ERP).

---

## 2. Pemangku Kepentingan (Stakeholders)
Sistem ini dirancang untuk mendukung interaksi dan koordinasi antar pihak berikut:
* **Manajemen Pusat (BGN):** Memantau realisasi anggaran dan kinerja pelayanan gizi secara nasional.
* **Kepala SPPG:** Mengelola operasional harian, belanja, dan kepatuhan terhadap SOP.
* **Tim Dapur/Ahli Gizi:** Merencanakan menu, menghitung kebutuhan kalori, dan melakukan kontrol kualitas (QC).
* **Kurir & Logistik:** Melakukan pengiriman dan konfirmasi serah terima paket makanan.
* **Mitra dan Yayasan:** Memasok bahan baku dan bekerja sama dalam pelayanan gizi.

---

## 3. Modul Utama Sistem ERP SPPG

### A. Modul Manajemen Dana & Akuntabilitas Keuangan
*Sesuai dengan Petunjuk Teknis Pembuatan Rekening SPPG dan Penggunaan Dana Makan Bergizi Gratis 2025.*
* **Integrasi Rekening SPPG:** Pemantauan arus kas dan dana masuk/keluar secara *real-time*.
* **Auto-Reporting:** Pembuatan laporan pertanggungjawaban (LPJ) keuangan yang sesuai dengan format audit BGN.
* **Budget Control:** Notifikasi otomatis jika pengeluaran harian melebihi plafon dana per porsi.

### B. Modul Produksi dan Manajemen Dapur
*Sesuai dengan Pedoman Sertifikasi Keamanan Pangan Pada Satuan Pelayanan Pemenuhan Gizi 2025.*
* **Nutrient Calculator:** Sistem otomatisasi untuk menghitung komposisi gizi (kalori, protein, lemak, dan mikronutrien).
* **SOP Digital (Sanitasi & Higiene):** *Checklist* digital yang harus diisi oleh staf dapur sebelum dan sesudah proses memasak.
* **Batch Tracking:** Pelacakan bahan baku untuk memastikan tidak ada bahan kedaluwarsa (FEFO/FIFO).

### C. Modul Rantai Pasok (Supply Chain & Mitra)
*Sesuai dengan Petunjuk Teknis Pemilihan Yayasan dan Mitra Yayasan 2025.*
* **Manajemen Vendor Lokal:** Verifikasi, database, dan evaluasi mitra petani atau UMKM penyedia bahan makanan.
* **Purchasing & Quality Gate:** Sistem persetujuan penerimaan barang berdasarkan standar kualitas yang ditetapkan sebelum masuk ke gudang.

### D. Modul Distribusi & Logistik
* **Route Optimization:** Pemetaan rute pengiriman yang optimal dari SPPG ke sekolah/posko penerima.
* **Verification of Delivery (VoD):** Konfirmasi penerimaan menggunakan aplikasi mobile yang dilengkapi foto dan koordinat GPS.
* **Food Safety Window:** Pemantauan waktu tunggu (*holding time*) agar makanan dikonsumsi maksimal 3-4 jam setelah selesai dimasak.

### E. Modul Kelompok Khusus & Tata Kelola Libur
* **Manajemen Penerima Manfaat Khusus:** Pemisahan data untuk siswa PAUD, non-PAUD, ibu hamil, menyusui, dan balita sesuai pedoman Juknis.
* **Penanganan Libur Sekolah:** Penyesuaian data distribusi paket gizi selama masa libur sekolah.

---

## 4. Analisis Risiko dan Mitigasi

| Risiko Operasional | Dampak | Strategi Mitigasi |
| :--- | :--- | :--- |
| **Koneksi internet di daerah** | Akses ke sistem pusat terputus | Menggunakan *Offline-First Approach* pada aplikasi mobile dan sinkronisasi otomatis saat terhubung ke jaringan. |
| **Kerusakan bahan pangan** | Makanan tidak layak konsumsi | Penerapan sistem FIFO/FEFO dan *Quality Control* digital. |
| **Kesalahan hitung porsi/anggaran** | Defisit dana operasional | Sistem *Budget Control* dan *Unit Costing* yang membatasi pengeluaran per porsi secara otomatis. |

---

## 5. Kesimpulan dan Rekomendasi Teknis
Untuk mendukung kebutuhan di atas, sistem sebaiknya dibangun dengan arsitektur:
1.  **Multi-Tenancy:** Memungkinkan data per wilayah terisolasi namun tetap dapat dilaporkan ke pusat.
2.  **API-First:** Mempermudah sinkronisasi data dengan sistem BGN (SISTAKOL) dan lembaga lain (Kemenkes, BKKBN).
3.  **Mobile-Friendly:** Memudahkan tim operasional, kurir, dan petugas lapangan dalam menginput data secara cepat.
