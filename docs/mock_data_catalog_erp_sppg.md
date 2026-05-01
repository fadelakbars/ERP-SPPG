# Mock Data Catalog ERP SPPG

Dokumen ini mendefinisikan katalog mock data untuk prototipe frontend ERP SPPG. Isinya dirancang agar konsisten dengan [draft_api_contract_erp_sppg.md](/Users/user/Projects/Algenz/erp-sppg/docs/draft_api_contract_erp_sppg.md) dan cukup lengkap untuk menjalankan demo `normal`, `warning`, dan `exception`.

## 1. Tujuan
- Menjadi sumber data tunggal untuk seluruh halaman demo.
- Menjaga konsistensi antar modul, angka dashboard, dan detail transaksi.
- Mempermudah pembuatan `mock provider`, `fixtures`, dan `frontend types`.

## 2. Prinsip Penyusunan
- Semua data memakai `tenant_id` yang sama untuk satu skenario demo utama.
- Seluruh angka agregat dashboard harus dapat ditelusuri ke data detail.
- Mock data harus realistis, tidak acak, dan punya hubungan bisnis yang jelas.
- Setiap modul minimal punya data untuk state `normal`, `warning`, dan `exception`.

## 3. Konteks Demo Utama
- `tenant_id`: `tnt_sppg_makassar_01`
- `tenant_name`: `SPPG Makassar 01`
- `service_date`: `2026-05-01`
- `wilayah`: `Makassar`
- `aktor demo utama`: `Kepala SPPG`
- `alur demo`: dashboard -> menu -> porsi -> stok -> penerimaan -> produksi -> QC -> distribusi -> biaya

## 4. Data Inti per Modul

### 4.1 Tenant dan Session

#### Tenant
```json
{
  "id": "tnt_sppg_makassar_01",
  "name": "SPPG Makassar 01",
  "region_id": "reg_sulsel_01",
  "region_name": "Sulawesi Selatan",
  "status": "active"
}
```

#### Current User
```json
{
  "id": "usr_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "name": "Kepala SPPG Makassar 01",
  "email": "kepala@sppg.id",
  "role": "kepala_sppg",
  "status": "active"
}
```

#### User Pendukung
```json
[
  {
    "id": "usr_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "Petugas Gudang",
    "role": "petugas_gudang",
    "status": "active"
  },
  {
    "id": "usr_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "Ahli Gizi",
    "role": "ahli_gizi",
    "status": "active"
  },
  {
    "id": "usr_004",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "Kurir 1",
    "role": "kurir",
    "status": "active"
  }
]
```

### 4.2 Distribution Points
```json
[
  {
    "id": "dp_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "PAUD Melati",
    "type": "school",
    "beneficiary_total": 120,
    "status": "active"
  },
  {
    "id": "dp_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "SD Inpres Pannara",
    "type": "school",
    "beneficiary_total": 460,
    "status": "active"
  },
  {
    "id": "dp_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "SMP Negeri 8",
    "type": "school",
    "beneficiary_total": 380,
    "status": "active"
  },
  {
    "id": "dp_004",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "Posyandu Sehat Ibu Anak",
    "type": "community_post",
    "beneficiary_total": 320,
    "status": "active"
  }
]
```

### 4.3 Beneficiaries
Distribusi total penerima untuk demo utama:
- `paud`: 120
- `sd`: 460
- `smp`: 380
- `ibu_hamil`: 90
- `ibu_menyusui`: 70
- `balita`: 160

Total:
- `1280 beneficiaries`
- `1280 planned portions`

Contoh list item:
```json
{
  "id": "ben_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "name": "PAUD Melati",
  "group": "paud",
  "distribution_point_id": "dp_001",
  "distribution_point_name": "PAUD Melati",
  "planned_portions": 120,
  "status": "active"
}
```

### 4.4 Vendors
```json
[
  {
    "id": "ven_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "CV Pangan Sejahtera",
    "category": "sembako_dan_protein",
    "verification_status": "verified",
    "status": "active"
  },
  {
    "id": "ven_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "UD Sayur Segar Lokal",
    "category": "sayur_buah",
    "verification_status": "verified",
    "status": "active"
  }
]
```

### 4.5 Menus
Menu utama untuk tanggal demo:
```json
{
  "id": "menu_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "name": "Nasi Ayam Sayur",
  "service_date": "2026-05-01",
  "beneficiary_group": "umum_sekolah",
  "approval_status": "approved",
  "status": "active"
}
```

Nutrition target:
```json
{
  "calories_kcal": 650,
  "protein_g": 24,
  "fat_g": 18
}
```

Recipe items utama:
```json
[
  {
    "ingredient_id": "inv_rice_01",
    "ingredient_name": "Beras",
    "quantity": 100,
    "unit": "gram"
  },
  {
    "ingredient_id": "inv_chicken_01",
    "ingredient_name": "Ayam",
    "quantity": 75,
    "unit": "gram"
  },
  {
    "ingredient_id": "inv_veg_01",
    "ingredient_name": "Sayur Campur",
    "quantity": 60,
    "unit": "gram"
  },
  {
    "ingredient_id": "inv_egg_01",
    "ingredient_name": "Telur",
    "quantity": 1,
    "unit": "butir"
  }
]
```

### 4.6 Portion Plans
```json
{
  "id": "pp_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "service_date": "2026-05-01",
  "menu_id": "menu_001",
  "menu_name": "Nasi Ayam Sayur",
  "total_portions": 1280,
  "status": "planned"
}
```

Breakdown per distribution point:
```json
[
  {
    "distribution_point_id": "dp_001",
    "distribution_point_name": "PAUD Melati",
    "planned_portions": 120
  },
  {
    "distribution_point_id": "dp_002",
    "distribution_point_name": "SD Inpres Pannara",
    "planned_portions": 460
  },
  {
    "distribution_point_id": "dp_003",
    "distribution_point_name": "SMP Negeri 8",
    "planned_portions": 380
  },
  {
    "distribution_point_id": "dp_004",
    "distribution_point_name": "Posyandu Sehat Ibu Anak",
    "planned_portions": 320
  }
]
```

Required ingredients summary:
```json
[
  {
    "inventory_item_id": "inv_rice_01",
    "inventory_item_name": "Beras",
    "required_qty": 128,
    "unit": "kg"
  },
  {
    "inventory_item_id": "inv_chicken_01",
    "inventory_item_name": "Ayam",
    "required_qty": 96,
    "unit": "kg"
  },
  {
    "inventory_item_id": "inv_veg_01",
    "inventory_item_name": "Sayur Campur",
    "required_qty": 76.8,
    "unit": "kg"
  },
  {
    "inventory_item_id": "inv_egg_01",
    "inventory_item_name": "Telur",
    "required_qty": 1280,
    "unit": "butir"
  }
]
```

### 4.7 Purchase Requests

#### PR Normal
```json
{
  "id": "pr_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "document_no": "PR-20260501-001",
  "request_date": "2026-05-01",
  "status": "approved",
  "notes": "Kebutuhan telur dan sayur untuk 2 hari"
}
```

#### PR Warning
```json
{
  "id": "pr_002",
  "tenant_id": "tnt_sppg_makassar_01",
  "document_no": "PR-20260501-002",
  "request_date": "2026-05-01",
  "status": "submitted",
  "notes": "Menunggu approval karena stok ayam menipis"
}
```

### 4.8 Goods Receipts

#### GR Normal
```json
{
  "id": "gr_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "document_no": "GR-20260501-001",
  "vendor_id": "ven_001",
  "receipt_date": "2026-05-01",
  "status": "accepted"
}
```

#### GR Exception
```json
{
  "id": "gr_002",
  "tenant_id": "tnt_sppg_makassar_01",
  "document_no": "GR-20260501-002",
  "vendor_id": "ven_001",
  "receipt_date": "2026-05-01",
  "status": "partially_rejected",
  "exception_reason": "Sebagian telur retak"
}
```

GR exception item detail:
```json
{
  "inventory_item_id": "inv_egg_01",
  "inventory_item_name": "Telur",
  "ordered_qty": 300,
  "received_qty": 280,
  "accepted_qty": 260,
  "rejected_qty": 20,
  "unit": "butir",
  "inspection_status": "partially_rejected"
}
```

### 4.9 Inventory Summary
```json
[
  {
    "inventory_item_id": "inv_rice_01",
    "inventory_item_name": "Beras",
    "available_qty": 250,
    "minimum_qty": 100,
    "unit": "kg",
    "days_remaining": 3,
    "status": "safe"
  },
  {
    "inventory_item_id": "inv_chicken_01",
    "inventory_item_name": "Ayam",
    "available_qty": 110,
    "minimum_qty": 90,
    "unit": "kg",
    "days_remaining": 2,
    "status": "safe"
  },
  {
    "inventory_item_id": "inv_veg_01",
    "inventory_item_name": "Sayur Campur",
    "available_qty": 82,
    "minimum_qty": 60,
    "unit": "kg",
    "days_remaining": 1,
    "status": "warning_expiry"
  },
  {
    "inventory_item_id": "inv_egg_01",
    "inventory_item_name": "Telur",
    "available_qty": 80,
    "minimum_qty": 150,
    "unit": "butir",
    "days_remaining": 1,
    "status": "low_stock"
  }
]
```

### 4.10 Inventory Batches
```json
[
  {
    "id": "bat_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "inventory_item_id": "inv_rice_01",
    "batch_no": "RICE-20260429-A",
    "available_qty": 120,
    "unit": "kg",
    "expiry_date": "2026-07-29",
    "status": "available"
  },
  {
    "id": "bat_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "inventory_item_id": "inv_veg_01",
    "batch_no": "VEG-20260501-B",
    "available_qty": 22,
    "unit": "kg",
    "expiry_date": "2026-05-02",
    "status": "near_expiry"
  },
  {
    "id": "bat_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "inventory_item_id": "inv_egg_01",
    "batch_no": "EGG-20260501-C",
    "available_qty": 80,
    "unit": "butir",
    "expiry_date": "2026-05-03",
    "status": "low_stock"
  }
]
```

### 4.11 Production Batches
Empat batch utama untuk total 1280 porsi:
```json
[
  {
    "id": "pb_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "batch_no": "PB-20260501-001",
    "planned_portions": 320,
    "produced_portions": 315,
    "status": "pending_qc"
  },
  {
    "id": "pb_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "batch_no": "PB-20260501-002",
    "planned_portions": 320,
    "produced_portions": 320,
    "status": "qc_passed"
  },
  {
    "id": "pb_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "batch_no": "PB-20260501-003",
    "planned_portions": 320,
    "produced_portions": 318,
    "status": "ready_for_delivery"
  },
  {
    "id": "pb_004",
    "tenant_id": "tnt_sppg_makassar_01",
    "batch_no": "PB-20260501-004",
    "planned_portions": 320,
    "produced_portions": 320,
    "status": "completed"
  }
]
```

Catatan dashboard:
- `production_batches_total = 4`
- `production_batches_completed = 3`
- `qc_pending_count = 1`

### 4.12 Quality Checks

#### QC Normal
```json
{
  "id": "qc_002",
  "tenant_id": "tnt_sppg_makassar_01",
  "production_batch_id": "pb_002",
  "result": "passed",
  "status": "completed"
}
```

#### QC Warning
```json
{
  "id": "qc_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "production_batch_id": "pb_001",
  "result": "pending",
  "status": "pending_review"
}
```

#### QC Exception
```json
{
  "id": "qc_003",
  "tenant_id": "tnt_sppg_makassar_01",
  "production_batch_id": "pb_005",
  "result": "failed",
  "status": "completed",
  "notes": "Kemasan tidak sesuai"
}
```

### 4.13 Delivery Runs
Enam run untuk dashboard:
```json
[
  {
    "id": "dr_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-001",
    "distribution_point_id": "dp_001",
    "planned_portions": 120,
    "delivered_portions": 120,
    "status": "delivered"
  },
  {
    "id": "dr_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-002",
    "distribution_point_id": "dp_002",
    "planned_portions": 220,
    "delivered_portions": 220,
    "status": "delivered"
  },
  {
    "id": "dr_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-003",
    "distribution_point_id": "dp_002",
    "planned_portions": 240,
    "delivered_portions": 240,
    "status": "delivered"
  },
  {
    "id": "dr_004",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-004",
    "distribution_point_id": "dp_003",
    "planned_portions": 380,
    "delivered_portions": 360,
    "status": "in_transit"
  },
  {
    "id": "dr_005",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-005",
    "distribution_point_id": "dp_004",
    "planned_portions": 160,
    "delivered_portions": 160,
    "status": "delivered"
  },
  {
    "id": "dr_006",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-006",
    "distribution_point_id": "dp_004",
    "planned_portions": 160,
    "delivered_portions": 0,
    "status": "scheduled"
  }
]
```

Catatan dashboard:
- `delivery_runs_total = 6`
- `delivery_runs_completed = 4`
- `delivery_risk_count = 1`

### 4.14 Delivery Proofs
```json
[
  {
    "id": "dpf_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "delivery_run_id": "dr_001",
    "receiver_name": "Ibu Sari",
    "status": "delivered"
  },
  {
    "id": "dpf_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "delivery_run_id": "dr_002",
    "receiver_name": "Pak Hendra",
    "status": "delivered"
  },
  {
    "id": "dpf_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "delivery_run_id": "dr_003",
    "receiver_name": "Ibu Ningsih",
    "status": "delivered"
  },
  {
    "id": "dpf_004",
    "tenant_id": "tnt_sppg_makassar_01",
    "delivery_run_id": "dr_005",
    "receiver_name": "Ibu Rina",
    "status": "delivered"
  }
]
```

### 4.15 Delivery Incidents

#### Warning Incident
```json
{
  "id": "di_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "delivery_run_id": "dr_004",
  "incident_type": "delay_risk",
  "severity": "warning",
  "notes": "Akses jalan padat, estimasi terlambat 20 menit",
  "status": "open"
}
```

#### Exception Incident
```json
{
  "id": "di_002",
  "tenant_id": "tnt_sppg_makassar_01",
  "delivery_run_id": "dr_007",
  "incident_type": "partial_delivery",
  "severity": "critical",
  "notes": "Sebagian paket rusak saat pengantaran",
  "status": "resolved"
}
```

### 4.16 Expenses
```json
[
  {
    "id": "exp_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "category": "bahan_baku",
    "amount": 12600000,
    "status": "posted"
  },
  {
    "id": "exp_002",
    "tenant_id": "tnt_sppg_makassar_01",
    "category": "logistik",
    "amount": 1560000,
    "status": "posted"
  },
  {
    "id": "exp_003",
    "tenant_id": "tnt_sppg_makassar_01",
    "category": "operasional",
    "amount": 1200000,
    "status": "posted"
  }
]
```

### 4.17 Finance Summary
```json
{
  "date": "2026-05-01",
  "tenant_id": "tnt_sppg_makassar_01",
  "expense_total": 15360000,
  "budget_total": 16640000,
  "budget_remaining": 1280000,
  "cost_per_portion": 12000,
  "budget_utilization_pct": 92.5
}
```

Catatan perhitungan:
- `expense_total = 12.600.000 + 1.560.000 + 1.200.000 = 15.360.000`
- `cost_per_portion = 15.360.000 / 1.280 = 12.000`

## 5. Relasi Data yang Harus Dijaga
- `menu_001` dipakai oleh `pp_001`
- `pp_001` menghasilkan 4 `production_batches`
- `gr_001` dan `gr_002` memengaruhi `inventory_summary` dan `inventory_batches`
- `production_batches` memakai item dari `inventory_batches`
- `qc_001` terkait dengan `pb_001`
- `delivery_runs` mengambil output dari `production_batches`
- `delivery_proofs` terkait langsung dengan `delivery_runs`
- `expenses` harus tetap konsisten dengan `finance_summary`
- angka `dashboard_summary` harus diturunkan dari seluruh data di atas

## 6. Dashboard Summary Mapping
Gunakan angka berikut untuk `GET /dashboard/summary`:

```json
{
  "beneficiary_total": 1280,
  "planned_portions": 1280,
  "production_batches_total": 4,
  "production_batches_completed": 3,
  "delivery_runs_total": 6,
  "delivery_runs_completed": 4,
  "cost_total": 15360000,
  "cost_per_portion": 12000,
  "budget_utilization_pct": 92.5,
  "alerts": {
    "low_stock_count": 1,
    "qc_pending_count": 1,
    "delivery_risk_count": 1,
    "budget_warning_count": 1
  }
}
```

Catatan:
- pada kontrak API sebelumnya `low_stock_count` bernilai `3`;
- untuk konsistensi katalog ini, gunakan `1` item low stock utama yaitu telur;
- dua alert lain dapat dimasukkan sebagai `warning_expiry` dan `near_limit_budget`, tetapi jangan dihitung sebagai `low_stock`.

## 7. Skenario Demo

### 7.1 Normal
Dipakai untuk narasi utama:
- menu disetujui;
- porsi direncanakan;
- stok utama cukup;
- sebagian batch sudah selesai;
- empat delivery run sudah delivered;
- biaya masih dalam anggaran.

Resource utama:
- `menu_001`
- `pp_001`
- `pb_002`, `pb_003`, `pb_004`
- `dr_001`, `dr_002`, `dr_003`, `dr_005`
- `exp_001`, `exp_002`, `exp_003`

### 7.2 Warning
Dipakai untuk menunjukkan kemampuan monitoring:
- stok telur low stock;
- batch `pb_001` masih pending QC;
- `dr_004` berisiko terlambat;
- biaya mendekati batas anggaran.

Resource utama:
- `inv_egg_01`
- `qc_001`
- `di_001`
- `finance_summary`

### 7.3 Exception
Dipakai untuk menunjukkan kontrol dan audit trail:
- `gr_002` partially rejected;
- `qc_003` failed;
- `di_002` partial delivery incident.

Resource utama:
- `gr_002`
- `qc_003`
- `di_002`

## 8. Rekomendasi Struktur File Frontend
- `mocks/auth.ts`
- `mocks/dashboard.ts`
- `mocks/beneficiaries.ts`
- `mocks/distribution-points.ts`
- `mocks/vendors.ts`
- `mocks/menus.ts`
- `mocks/portion-plans.ts`
- `mocks/purchase-requests.ts`
- `mocks/goods-receipts.ts`
- `mocks/inventory.ts`
- `mocks/production.ts`
- `mocks/quality-checks.ts`
- `mocks/delivery-runs.ts`
- `mocks/delivery-proofs.ts`
- `mocks/expenses.ts`
- `mocks/finance-summary.ts`

## 9. Aturan Implementasi Mock Provider
- Mock provider harus mengembalikan shape sesuai kontrak API, bukan raw fixture langsung.
- Jika satu layar butuh state `normal`, `warning`, dan `exception`, gunakan parameter atau skenario aktif.
- Gunakan sumber angka yang sama untuk dashboard card dan detail table.
- Jangan duplikasi angka ringkasan secara manual di banyak file.

## 10. Definisi Selesai
- Semua layar `must-have` dapat dirender dari katalog ini.
- Semua angka pada dashboard cocok dengan detail modul.
- Tiga skenario demo dapat dipicu tanpa mengubah struktur data.
- Tim frontend bisa langsung menurunkan dokumen ini menjadi `types`, `fixtures`, dan `service mocks`.
