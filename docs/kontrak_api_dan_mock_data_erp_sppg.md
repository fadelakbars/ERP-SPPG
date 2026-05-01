# Kontrak API dan Mock Data ERP SPPG

Dokumen ini menjadi panduan khusus untuk fase prototipe frontend. Tujuannya adalah memastikan seluruh data mock yang dipakai pada demo tetap konsisten dengan struktur API yang nantinya akan diimplementasikan pada backend.

## 1. Tujuan
- Menetapkan bentuk request dan response awal sebelum backend tersedia.
- Menjaga agar frontend tidak bergantung pada data dummy yang tidak realistis.
- Mempermudah transisi dari mock provider ke API nyata.

## 2. Prinsip Kerja
- Frontend hanya mengambil data melalui service layer.
- Service layer mengonsumsi interface kontrak yang sama, baik sumbernya mock maupun API nyata.
- Nama field, struktur pagination, status workflow, dan format relasi harus konsisten.
- Mock data harus merepresentasikan skenario bisnis nyata, bukan sekadar placeholder acak.

## 3. Bentuk Deliverable
- daftar endpoint per modul;
- tipe request dan response utama;
- contoh payload sukses, kosong, dan gagal;
- katalog mock data yang dipakai lintas halaman;
- aturan relasi antar mock data.

## 4. Modul yang Harus Memiliki Kontrak API di Fase Demo
- authentication dan current user;
- dashboard operasional;
- master data penerima manfaat dan titik distribusi;
- menu dan perencanaan porsi;
- pengadaan dan penerimaan barang;
- inventory dan batch stok;
- produksi dan quality check;
- distribusi dan bukti serah terima;
- pengeluaran operasional dan laporan ringkas.

## 5. Pola Kontrak yang Disarankan

### 5.1 Pola Response List
```json
{
  "data": [],
  "meta": {
    "page": 1,
    "page_size": 10,
    "total_items": 0,
    "total_pages": 0
  }
}
```

### 5.2 Pola Response Detail
```json
{
  "data": {}
}
```

### 5.3 Pola Error
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid",
    "details": []
  }
}
```

## 6. Aturan Mock Data
- Setiap record transaksi harus memiliki `id`, `tenant_id`, `status`, `created_at`, dan `updated_at`.
- Data antar modul harus saling terhubung secara konsisten.
- Nilai ringkasan pada dashboard harus berasal dari kumpulan mock data yang sama dengan halaman detailnya.
- Status workflow pada mock harus mengikuti alur bisnis yang telah didefinisikan.
- Siapkan minimal tiga skenario: normal, warning, dan exception.

## 7. Skenario Demo yang Disarankan

### 7.1 Skenario Normal
- menu harian dibuat;
- bahan tersedia;
- produksi selesai dan lolos QC;
- distribusi berhasil;
- biaya harian tercatat normal.

### 7.2 Skenario Warning
- stok menipis;
- satu batch hampir melewati batas waktu distribusi;
- pengeluaran melewati ambang biaya per porsi.

### 7.3 Skenario Exception
- penerimaan barang ditolak sebagian;
- batch gagal QC;
- pengiriman parsial atau terlambat.

## 8. Aturan Frontend
- Jangan hardcode shape data langsung di komponen tampilan.
- Definisikan model atau interface terpusat untuk semua modul.
- Pisahkan file mock fixture dari mapper atau transformer data.
- Jika ada field yang belum pasti, tandai sebagai asumsi kontrak dan dokumentasikan.

## 9. Langkah Implementasi yang Disarankan
1. Tetapkan endpoint dan payload minimum per modul.
2. Buat tipe data atau interface frontend.
3. Buat mock provider yang mengembalikan payload sesuai kontrak.
4. Bangun halaman menggunakan service layer, bukan import data statis langsung.
5. Uji skenario demo utama dari dashboard ke detail transaksi.

## 10. Hasil yang Diharapkan
- prototipe terlihat realistis saat didemokan;
- frontend siap dihubungkan ke backend tanpa refactor besar;
- kontrak API awal sudah menjadi bahasa bersama antara desain, frontend, dan backend.
