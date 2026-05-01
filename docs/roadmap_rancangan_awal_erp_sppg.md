# Roadmap Rancangan Awal ERP SPPG

Dokumen ini memecah langkah awal proyek dari analisis kebutuhan menuju desain siap implementasi. Fokus aktual tahap pertama adalah prototipe frontend berbasis mock data untuk demo calon client.

## 1. Tujuan
- Menentukan urutan kerja yang realistis pada fase perancangan awal.
- Mengurangi risiko desain ulang besar di tengah implementasi.
- Menjaga agar prototipe awal fokus pada proses operasional paling kritikal dan mudah didemokan.

## 2. Target Fase Awal
Pada akhir fase rancangan awal, tim diharapkan memiliki:
- ruang lingkup prototipe demo yang disepakati;
- workflow bisnis inti yang tervalidasi;
- rancangan arsitektur awal;
- rancangan model data awal;
- kontrak API awal;
- backlog frontend prototype yang sudah diprioritaskan.

## 3. Tahapan Rekomendasi

### Tahap 1: Validasi Bisnis dan Skenario Demo
Fokus:
- validasi aktor, alur kerja, dan pengecualian operasional;
- konfirmasi perbedaan proses antar SPPG bila ada;
- tetapkan definisi sukses demo client.

Output:
- dokumen visi dan ruang lingkup final;
- daftar use case prioritas untuk demo;
- keputusan modul yang masuk prototipe.

### Tahap 2: Desain Proses, Data, dan Kontrak API
Fokus:
- detail workflow status untuk tiap transaksi inti;
- definisi master data dan relasi utama;
- identifikasi dokumen operasional yang harus tersedia di sistem;
- definisi struktur request/response untuk mock API.

Output:
- BPMN atau flow rinci;
- ERD awal;
- kamus data awal;
- matriks peran vs akses;
- dokumen API contract awal.

### Tahap 3: Desain Prototipe Frontend
Fokus:
- desain struktur halaman dan navigasi demo;
- desain komponen aplikasi frontend;
- pemetaan service layer ke kontrak API;
- strategi mock data dan demo scenario.

Output:
- wireframe atau spesifikasi UI;
- arsitektur frontend awal;
- katalog mock data;
- daftar kebutuhan non-fungsional untuk demo.

### Tahap 4: Implementasi Prototipe
Fokus:
- pecah modul menjadi backlog delivery frontend;
- tentukan urutan layar dan alur demo;
- siapkan strategi review internal sebelum presentasi client.

Output:
- product backlog prototipe;
- release plan demo;
- acceptance criteria per skenario demo.

## 4. Urutan Modul Prototipe yang Disarankan
1. Master data, tenant, user, role, lokasi, penerima manfaat.
2. Menu, standar gizi, dan perencanaan porsi.
3. Inventory, pengadaan, dan penerimaan barang.
4. Produksi dapur dan checklist sanitasi.
5. Distribusi, bukti serah terima, dan insiden.
6. Keuangan operasional dan laporan dasar.

Urutan ini dipilih karena modul-modul tersebut membentuk narasi demo yang paling kuat dari hulu ke hilir.

## 5. Deliverable Rancangan Lanjutan yang Masih Dibutuhkan
- ERD visual rinci;
- BPMN atau swimlane diagram per proses inti;
- dokumen API contract awal;
- matriks hak akses per peran;
- spesifikasi UI/UX untuk web admin dan mobile;
- katalog mock data per modul;
- strategi testing demo flow dan handoff ke fase backend.

Turunan eksekusi dari roadmap ini dicatat pada dokumen [todo_prototipe_frontend_erp_sppg.md](/Users/user/Projects/Algenz/erp-sppg/docs/todo_prototipe_frontend_erp_sppg.md).

## 6. Risiko Tahap Awal
- kebutuhan berubah karena juknis operasional belum sepenuhnya seragam;
- tim langsung masuk coding tanpa memaku definisi workflow;
- desain data tidak siap untuk kebutuhan audit dan integrasi;
- offline requirement diremehkan dan baru dibahas setelah mobile dibuat.

## 7. Rekomendasi Praktis
- gunakan dokumen ini bersama dokumen proses, arsitektur, dan model data sebagai baseline workshop desain;
- tetapkan satu keputusan resmi untuk setiap area yang masih asumsi;
- mulai dari kontrak API dan mock data sebelum membangun banyak layar;
- setelah prototipe tervalidasi oleh client, lanjutkan ke backend dengan mempertahankan kontrak yang sama.
