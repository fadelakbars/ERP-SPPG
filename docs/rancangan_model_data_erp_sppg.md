# Rancangan Model Data ERP SPPG

Dokumen ini menyusun entitas data inti ERP SPPG untuk mendukung desain database, API, dan workflow modul utama.

## 1. Tujuan
- Menentukan objek data utama pada fase awal.
- Menjadi acuan penyusunan ERD dan skema basis data.
- Menjaga konsistensi antar modul dan integrasi.

## 2. Prinsip Desain Data
- Semua transaksi utama wajib memiliki `tenant_id`.
- Master data dipisahkan dari data transaksi.
- Tabel transaksi penting harus menyimpan status workflow dan jejak audit.
- Relasi batch digunakan untuk stok, produksi, dan distribusi agar pelacakan bahan tetap utuh.

## 3. Entitas Master

### 3.1 Organisasi dan Akses
- `tenants`
- `regions`
- `sppg_sites`
- `users`
- `roles`
- `user_role_assignments`

Field kunci awal:
- `tenants`: kode, nama, status
- `sppg_sites`: tenant_id, nama lokasi, alamat, kapasitas produksi
- `users`: tenant_id opsional, nama, kontak, status

### 3.2 Mitra dan Lokasi Layanan
- `vendors`
- `vendor_categories`
- `schools_or_distribution_points`
- `beneficiary_groups`
- `beneficiaries`

Field kunci awal:
- `vendors`: tenant_id, nama, jenis, status verifikasi
- `schools_or_distribution_points`: tenant_id, nama, alamat, koordinat
- `beneficiaries`: tenant_id, grup, titik distribusi, status aktif

### 3.3 Gizi dan Menu
- `menus`
- `menu_items`
- `nutrition_standards`
- `recipes`
- `recipe_ingredients`

Field kunci awal:
- `menus`: tenant_id, nama menu, tanggal berlaku, status
- `nutrition_standards`: grup penerima, target kalori, protein, lemak
- `recipes`: menu_id, nama resep, hasil porsi

## 4. Entitas Transaksi Pengadaan dan Persediaan
- `purchase_requests`
- `purchase_request_items`
- `purchase_orders`
- `purchase_order_items`
- `goods_receipts`
- `goods_receipt_items`
- `inventory_items`
- `inventory_batches`
- `stock_movements`
- `stock_adjustments`

Relasi inti:
- satu `purchase_request` memiliki banyak item;
- `purchase_order` dapat berasal dari satu atau lebih item permintaan;
- `goods_receipt` mereferensikan purchase order;
- stok fisik disimpan pada `inventory_batches`;
- semua perubahan stok dicatat di `stock_movements`.

## 5. Entitas Produksi Dapur
- `production_plans`
- `production_plan_items`
- `kitchen_checklists`
- `production_batches`
- `production_batch_materials`
- `quality_checks`
- `finished_goods_records`

Relasi inti:
- `production_plans` dibuat dari menu dan target porsi;
- `production_batches` merealisasikan rencana;
- `production_batch_materials` menautkan bahan yang dipakai per batch stok;
- `quality_checks` memverifikasi kelayakan batch sebelum distribusi.

## 6. Entitas Distribusi
- `delivery_plans`
- `delivery_plan_items`
- `delivery_runs`
- `delivery_proofs`
- `delivery_incidents`

Field kunci awal:
- `delivery_runs`: tenant_id, batch_produksi, kurir, waktu berangkat, waktu tiba, status
- `delivery_proofs`: delivery_run_id, foto, gps_lat, gps_lng, penerima, waktu_terima
- `delivery_incidents`: jenis insiden, catatan, lampiran

## 7. Entitas Keuangan
- `budgets`
- `budget_lines`
- `expenses`
- `expense_items`
- `account_mappings`
- `financial_reports`

Relasi inti:
- `budgets` ditetapkan per periode dan tenant;
- `expenses` dapat direferensikan dari pembelian atau biaya operasional langsung;
- biaya per porsi dihitung dari data produksi, distribusi, dan pengeluaran.

## 8. Entitas Pendukung
- `attachments`
- `audit_logs`
- `sync_logs`
- `notifications`
- `integration_jobs`

Tujuan:
- `attachments` menyimpan metadata file;
- `audit_logs` melacak perubahan penting;
- `sync_logs` memantau status sinkronisasi mobile;
- `integration_jobs` menyimpan histori kirim/terima ke sistem eksternal.

## 9. Atribut Standar yang Disarankan
Setiap tabel transaksi utama minimal memiliki:
- `id`
- `tenant_id`
- `document_no` atau kode referensi
- `status`
- `created_at`
- `created_by`
- `updated_at`
- `updated_by`
- `approved_at` bila relevan
- `approved_by` bila relevan
- `deleted_at` untuk soft delete bila diperlukan

## 10. Relasi Data Kritis yang Harus Dijaga
- vendor -> pengadaan -> penerimaan -> batch stok -> batch produksi -> distribusi
- beneficiary group -> standard gizi -> menu -> rencana produksi -> output porsi
- budget -> expense -> biaya per porsi -> laporan keuangan

Relasi tersebut penting untuk audit mutu, audit biaya, dan penelusuran insiden.

## 11. Aturan Data Awal
- satu transaksi tidak boleh berpindah tenant;
- batch yang sudah dipakai produksi tidak boleh dihapus;
- pengiriman tidak boleh selesai tanpa referensi batch produksi yang lolos QC;
- expense yang telah diposting tidak boleh diubah langsung, harus melalui mekanisme koreksi;
- beneficiary nonaktif tidak boleh masuk perencanaan distribusi baru.

## 12. Langkah Lanjutan yang Dibutuhkan
- turunkan dokumen ini menjadi ERD rinci;
- definisikan kamus data per tabel dan field;
- tentukan aturan validasi per endpoint;
- petakan mana data master yang dikelola internal dan mana yang berasal dari integrasi.
