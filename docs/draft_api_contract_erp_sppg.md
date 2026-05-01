# Draft API Contract ERP SPPG

Dokumen ini menyusun kontrak API awal untuk mendukung prototipe frontend ERP SPPG. Fokusnya adalah menstabilkan bentuk request dan response agar mock data, service layer, dan implementasi backend berikutnya tetap berada pada jalur yang sama.

## 1. Tujuan
- Menjadi acuan awal untuk `types`, `services`, dan `mock providers`.
- Menentukan endpoint minimum yang dibutuhkan oleh prototipe demo.
- Menjaga konsistensi nama field, struktur data, dan status workflow.

## 2. Konvensi Umum
- Base path awal: `/api/v1`
- Semua response sukses menggunakan kunci `data`
- Response list menggunakan `data` dan `meta`
- Semua resource utama memiliki `id`, `tenant_id`, `status`, `created_at`, dan `updated_at`
- Format waktu: ISO 8601, contoh `2026-05-01T08:30:00+08:00`
- Format mata uang: angka numerik dalam Rupiah, tanpa formatting string

## 3. Header dan Konteks

### 3.1 Request Headers
- `Authorization: Bearer <token>`
- `X-Tenant-Id: <tenant_id>`
- `Content-Type: application/json`

### 3.2 Query Pattern Umum
- `page`
- `page_size`
- `search`
- `status`
- `date_from`
- `date_to`
- `sort_by`
- `sort_order`

## 4. Resource Kontrak Umum

### 4.1 Response List
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

### 4.2 Response Detail
```json
{
  "data": {}
}
```

### 4.3 Response Error
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data tidak valid",
    "details": []
  }
}
```

## 5. Authentication dan Session

### 5.1 Login
- `POST /auth/login`

Request:
```json
{
  "email": "kepala@sppg.id",
  "password": "secret"
}
```

Response:
```json
{
  "data": {
    "access_token": "mock-token",
    "token_type": "Bearer",
    "expires_at": "2026-05-01T18:00:00+08:00",
    "user": {
      "id": "usr_001",
      "tenant_id": "tnt_sppg_makassar_01",
      "name": "Kepala SPPG Makassar 01",
      "email": "kepala@sppg.id",
      "role": "kepala_sppg"
    }
  }
}
```

### 5.2 Current User
- `GET /auth/me`

Response:
```json
{
  "data": {
    "id": "usr_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "Kepala SPPG Makassar 01",
    "email": "kepala@sppg.id",
    "role": "kepala_sppg",
    "tenant": {
      "id": "tnt_sppg_makassar_01",
      "name": "SPPG Makassar 01"
    }
  }
}
```

## 6. Dashboard Operasional

### 6.1 Dashboard Summary
- `GET /dashboard/summary?date=2026-05-01`

Response:
```json
{
  "data": {
    "date": "2026-05-01",
    "tenant_id": "tnt_sppg_makassar_01",
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
      "low_stock_count": 3,
      "qc_pending_count": 1,
      "delivery_risk_count": 1,
      "budget_warning_count": 1
    }
  }
}
```

### 6.2 Dashboard Alerts
- `GET /dashboard/alerts?date=2026-05-01`

Response:
```json
{
  "data": [
    {
      "id": "alt_001",
      "type": "low_stock",
      "severity": "warning",
      "title": "Stok telur menipis",
      "message": "Sisa stok hanya cukup untuk 1 hari produksi",
      "related_resource_type": "inventory_item",
      "related_resource_id": "inv_egg_01"
    }
  ]
}
```

## 7. Master Data

### 7.1 Beneficiaries
- `GET /beneficiaries`
- `GET /beneficiaries/{id}`

List item shape:
```json
{
  "id": "ben_001",
  "tenant_id": "tnt_sppg_makassar_01",
  "name": "PAUD Melati",
  "group": "paud",
  "distribution_point_id": "dp_001",
  "distribution_point_name": "PAUD Melati",
  "planned_portions": 120,
  "status": "active",
  "created_at": "2026-05-01T08:00:00+08:00",
  "updated_at": "2026-05-01T08:00:00+08:00"
}
```

### 7.2 Distribution Points
- `GET /distribution-points`
- `GET /distribution-points/{id}`

Detail shape:
```json
{
  "data": {
    "id": "dp_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "PAUD Melati",
    "type": "school",
    "address": "Jl. Melati No. 1",
    "gps_lat": -5.1477,
    "gps_lng": 119.4327,
    "beneficiary_total": 120,
    "status": "active",
    "created_at": "2026-05-01T08:00:00+08:00",
    "updated_at": "2026-05-01T08:00:00+08:00"
  }
}
```

### 7.3 Vendors
- `GET /vendors`
- `GET /vendors/{id}`

## 8. Menu dan Perencanaan Porsi

### 8.1 Menus
- `GET /menus`
- `GET /menus/{id}`

Detail shape:
```json
{
  "data": {
    "id": "menu_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "name": "Nasi Ayam Sayur",
    "service_date": "2026-05-01",
    "beneficiary_group": "sd",
    "nutrition_target": {
      "calories_kcal": 650,
      "protein_g": 24,
      "fat_g": 18
    },
    "recipe_items": [
      {
        "ingredient_id": "inv_rice_01",
        "ingredient_name": "Beras",
        "quantity": 100,
        "unit": "gram"
      }
    ],
    "approval_status": "approved",
    "status": "active",
    "created_at": "2026-04-30T16:00:00+08:00",
    "updated_at": "2026-04-30T18:00:00+08:00"
  }
}
```

### 8.2 Daily Portion Plans
- `GET /portion-plans?service_date=2026-05-01`
- `GET /portion-plans/{id}`

Response:
```json
{
  "data": {
    "id": "pp_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "service_date": "2026-05-01",
    "menu_id": "menu_001",
    "menu_name": "Nasi Ayam Sayur",
    "total_portions": 1280,
    "distribution_points": [
      {
        "distribution_point_id": "dp_001",
        "distribution_point_name": "PAUD Melati",
        "beneficiary_group": "paud",
        "planned_portions": 120
      }
    ],
    "required_ingredients": [
      {
        "inventory_item_id": "inv_rice_01",
        "inventory_item_name": "Beras",
        "required_qty": 128,
        "unit": "kg"
      }
    ],
    "status": "planned",
    "created_at": "2026-04-30T18:30:00+08:00",
    "updated_at": "2026-04-30T18:30:00+08:00"
  }
}
```

## 9. Pengadaan

### 9.1 Purchase Requests
- `GET /purchase-requests`
- `GET /purchase-requests/{id}`

Status workflow:
- `draft`
- `submitted`
- `approved`
- `rejected`
- `ordered`
- `received_partial`
- `received_full`
- `completed`

Detail shape:
```json
{
  "data": {
    "id": "pr_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "document_no": "PR-20260501-001",
    "request_date": "2026-05-01",
    "requested_by": {
      "id": "usr_002",
      "name": "Petugas Gudang"
    },
    "items": [
      {
        "inventory_item_id": "inv_egg_01",
        "inventory_item_name": "Telur",
        "requested_qty": 300,
        "unit": "butir",
        "estimated_unit_price": 2200
      }
    ],
    "status": "approved",
    "notes": "Kebutuhan untuk 2 hari",
    "created_at": "2026-05-01T07:00:00+08:00",
    "updated_at": "2026-05-01T08:00:00+08:00"
  }
}
```

### 9.2 Purchase Orders
- `GET /purchase-orders`
- `GET /purchase-orders/{id}`

### 9.3 Goods Receipts
- `GET /goods-receipts`
- `GET /goods-receipts/{id}`

Status workflow:
- `draft`
- `inspected`
- `accepted`
- `partially_rejected`
- `rejected`
- `stock_posted`
- `completed`

Detail shape:
```json
{
  "data": {
    "id": "gr_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "document_no": "GR-20260501-001",
    "vendor": {
      "id": "ven_001",
      "name": "CV Pangan Sejahtera"
    },
    "receipt_date": "2026-05-01",
    "items": [
      {
        "inventory_item_id": "inv_egg_01",
        "inventory_item_name": "Telur",
        "ordered_qty": 300,
        "received_qty": 280,
        "accepted_qty": 260,
        "rejected_qty": 20,
        "unit": "butir",
        "expiry_date": "2026-05-10",
        "inspection_status": "partially_rejected",
        "inspection_notes": "Sebagian retak"
      }
    ],
    "status": "partially_rejected",
    "created_at": "2026-05-01T08:00:00+08:00",
    "updated_at": "2026-05-01T08:20:00+08:00"
  }
}
```

## 10. Persediaan

### 10.1 Inventory Summary
- `GET /inventory/summary`

Response:
```json
{
  "data": [
    {
      "inventory_item_id": "inv_rice_01",
      "inventory_item_name": "Beras",
      "category": "sembako",
      "available_qty": 250,
      "unit": "kg",
      "minimum_qty": 100,
      "days_remaining": 3,
      "status": "safe"
    },
    {
      "inventory_item_id": "inv_egg_01",
      "inventory_item_name": "Telur",
      "category": "protein",
      "available_qty": 80,
      "unit": "butir",
      "minimum_qty": 150,
      "days_remaining": 1,
      "status": "low_stock"
    }
  ]
}
```

### 10.2 Inventory Batches
- `GET /inventory/batches`
- `GET /inventory/batches/{id}`

Detail shape:
```json
{
  "data": {
    "id": "bat_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "inventory_item_id": "inv_rice_01",
    "inventory_item_name": "Beras",
    "batch_no": "RICE-20260429-A",
    "received_date": "2026-04-29",
    "expiry_date": "2026-07-29",
    "available_qty": 120,
    "unit": "kg",
    "source_document_type": "goods_receipt",
    "source_document_id": "gr_009",
    "status": "available",
    "created_at": "2026-04-29T09:00:00+08:00",
    "updated_at": "2026-05-01T06:00:00+08:00"
  }
}
```

### 10.3 Stock Movements
- `GET /inventory/movements`

## 11. Produksi

### 11.1 Production Plans
- `GET /production-plans`
- `GET /production-plans/{id}`

### 11.2 Production Batches
- `GET /production/batches`
- `GET /production/batches/{id}`

Status workflow:
- `planned`
- `preparing`
- `in_progress`
- `pending_qc`
- `qc_passed`
- `qc_failed`
- `ready_for_delivery`
- `completed`

Detail shape:
```json
{
  "data": {
    "id": "pb_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "batch_no": "PB-20260501-001",
    "service_date": "2026-05-01",
    "menu_id": "menu_001",
    "menu_name": "Nasi Ayam Sayur",
    "planned_portions": 320,
    "produced_portions": 315,
    "start_time": "2026-05-01T04:00:00+08:00",
    "end_time": "2026-05-01T06:15:00+08:00",
    "materials": [
      {
        "inventory_batch_id": "bat_001",
        "inventory_item_name": "Beras",
        "used_qty": 32,
        "unit": "kg"
      }
    ],
    "status": "pending_qc",
    "created_at": "2026-05-01T03:30:00+08:00",
    "updated_at": "2026-05-01T06:15:00+08:00"
  }
}
```

### 11.3 Quality Checks
- `GET /quality-checks`
- `GET /quality-checks/{id}`

Detail shape:
```json
{
  "data": {
    "id": "qc_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "production_batch_id": "pb_001",
    "checked_by": {
      "id": "usr_003",
      "name": "Ahli Gizi"
    },
    "check_time": "2026-05-01T06:20:00+08:00",
    "temperature_ok": true,
    "packaging_ok": true,
    "taste_ok": true,
    "notes": "",
    "result": "passed",
    "status": "completed",
    "created_at": "2026-05-01T06:20:00+08:00",
    "updated_at": "2026-05-01T06:25:00+08:00"
  }
}
```

### 11.4 Sanitation Checklists
- `GET /sanitation-checklists`
- `GET /sanitation-checklists/{id}`

## 12. Distribusi

### 12.1 Delivery Runs
- `GET /delivery-runs`
- `GET /delivery-runs/{id}`

Status workflow:
- `draft`
- `scheduled`
- `picked_up`
- `in_transit`
- `delivered`
- `partial`
- `failed`
- `closed`

Detail shape:
```json
{
  "data": {
    "id": "dr_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "run_no": "DR-20260501-001",
    "courier": {
      "id": "usr_004",
      "name": "Kurir 1"
    },
    "vehicle_no": "DD 1234 XX",
    "departure_time": "2026-05-01T06:45:00+08:00",
    "delivery_deadline": "2026-05-01T10:00:00+08:00",
    "distribution_points": [
      {
        "distribution_point_id": "dp_001",
        "distribution_point_name": "PAUD Melati",
        "planned_portions": 120,
        "delivered_portions": 120,
        "status": "delivered"
      }
    ],
    "status": "in_transit",
    "created_at": "2026-05-01T06:30:00+08:00",
    "updated_at": "2026-05-01T07:10:00+08:00"
  }
}
```

### 12.2 Delivery Proofs
- `GET /delivery-proofs`
- `GET /delivery-proofs/{id}`

Detail shape:
```json
{
  "data": {
    "id": "dpf_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "delivery_run_id": "dr_001",
    "distribution_point_id": "dp_001",
    "receiver_name": "Ibu Sari",
    "received_at": "2026-05-01T07:30:00+08:00",
    "gps_lat": -5.1477,
    "gps_lng": 119.4327,
    "photo_url": "https://mock.local/proofs/dpf_001.jpg",
    "notes": "",
    "status": "delivered",
    "created_at": "2026-05-01T07:30:00+08:00",
    "updated_at": "2026-05-01T07:30:00+08:00"
  }
}
```

### 12.3 Delivery Incidents
- `GET /delivery-incidents`
- `GET /delivery-incidents/{id}`

## 13. Keuangan

### 13.1 Expense Summary
- `GET /finance/expense-summary?date=2026-05-01`

Response:
```json
{
  "data": {
    "date": "2026-05-01",
    "tenant_id": "tnt_sppg_makassar_01",
    "expense_total": 15360000,
    "budget_total": 16640000,
    "budget_remaining": 1280000,
    "cost_per_portion": 12000,
    "budget_utilization_pct": 92.5,
    "breakdown": [
      {
        "category": "bahan_baku",
        "amount": 12600000
      },
      {
        "category": "logistik",
        "amount": 1560000
      },
      {
        "category": "operasional",
        "amount": 1200000
      }
    ]
  }
}
```

### 13.2 Expenses
- `GET /expenses`
- `GET /expenses/{id}`

Status workflow:
- `draft`
- `submitted`
- `verified`
- `posted`

Detail shape:
```json
{
  "data": {
    "id": "exp_001",
    "tenant_id": "tnt_sppg_makassar_01",
    "document_no": "EXP-20260501-001",
    "expense_date": "2026-05-01",
    "category": "bahan_baku",
    "reference_type": "goods_receipt",
    "reference_id": "gr_001",
    "amount": 572000,
    "notes": "Pembelian telur dan sayur",
    "status": "posted",
    "created_at": "2026-05-01T09:00:00+08:00",
    "updated_at": "2026-05-01T09:20:00+08:00"
  }
}
```

### 13.3 Budget Deviations
- `GET /finance/budget-deviations`

## 14. Mapping Layar ke Endpoint
- `Login / Pilih Tenant` -> `POST /auth/login`, `GET /auth/me`
- `Dashboard Operasional` -> `GET /dashboard/summary`, `GET /dashboard/alerts`
- `Perencanaan Menu` -> `GET /menus`, `GET /menus/{id}`
- `Rencana Porsi Harian` -> `GET /portion-plans`, `GET /portion-plans/{id}`
- `Ringkasan Stok` -> `GET /inventory/summary`
- `Penerimaan Barang` -> `GET /goods-receipts`, `GET /goods-receipts/{id}`
- `Batch Produksi` -> `GET /production/batches`, `GET /production/batches/{id}`
- `Quality Check` -> `GET /quality-checks`, `GET /quality-checks/{id}`
- `Delivery Run` -> `GET /delivery-runs`, `GET /delivery-runs/{id}`
- `Bukti Serah Terima` -> `GET /delivery-proofs`, `GET /delivery-proofs/{id}`
- `Ringkasan Biaya Harian` -> `GET /finance/expense-summary`, `GET /expenses`

## 15. Status dan Enum Awal
- `beneficiary_group`: `paud`, `sd`, `smp`, `sma`, `balita`, `ibu_hamil`, `ibu_menyusui`
- `alert_severity`: `info`, `warning`, `critical`
- `inspection_status`: `accepted`, `partially_rejected`, `rejected`
- `delivery_status`: `delivered`, `partial`, `failed`
- `approval_status`: `draft`, `submitted`, `approved`, `rejected`

## 16. Catatan Implementasi Frontend
- Semua endpoint di atas cukup diimplementasikan sebagai mock provider pada fase demo.
- `POST`, `PUT`, dan `PATCH` belum harus benar-benar menyimpan data permanen, tetapi shape request/response perlu tetap didefinisikan saat dibutuhkan UI.
- Jika waktu terbatas, prioritaskan endpoint yang dipakai layar `must-have`.
- Simpan semua contract types di satu lokasi terpusat agar service layer dan mock fixtures tidak divergen.
