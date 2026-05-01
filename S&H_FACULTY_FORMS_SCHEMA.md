# S&H Faculty Forms - Database Schema & Storage Buckets

## Overview
This document contains the SQL table schemas and Supabase storage bucket names for Science & Humanities (S&H) faculty forms.

---

## 1. AP_SH_Yearly (Assistant Professor - S&H Yearly Form)

### Table Schema
```sql
CREATE TABLE "AP_SH_Yearly" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Draft Table Schema
```sql
CREATE TABLE "AP_SH_Yearly_drafts" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Bucket
- **Bucket Name:** `Ap_SH`
- **File Path Pattern:** `apyearlysh_{row_number}_{timestamp}_{filename}`
- **Draft File Path Pattern:** `apyearlysh_draft_{row_number}_{timestamp}_{filename}`

### Excluded Rows
- Row 2: Guide student research and final-year projects
- Row 5: Facilitate industry-institute interaction through guest lectures, Internships
- Row 6: Engage in extension activities, and social outreach programs

### Total Rows: 5

---

## 2. ASP_SH_Yearly (Associate Professor - S&H Yearly Form)

### Table Schema
```sql
CREATE TABLE "ASP_SH_Yearly" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Draft Table Schema
```sql
CREATE TABLE "ASP_SH_Yearly_drafts" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Bucket
- **Bucket Name:** `Asp_SH_files`
- **File Path Pattern:** `aspyearlysh_{row_number}_{timestamp}_{filename}`
- **Draft File Path Pattern:** `aspyearlysh_draft_{row_number}_{timestamp}_{filename}`

### Excluded Rows
- Row 3: Guide student research and final-year projects
- Row 5: NPTEL/ MOOC certifications
- Row 6: Facilitate industry-institute interaction through guest lectures, Internships

### Total Rows: 6

---

## 3. Prof_SH_Yearly (Professor - S&H Yearly Form)

### Table Schema
```sql
CREATE TABLE "Prof_SH_Yearly" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Draft Table Schema
```sql
CREATE TABLE "Prof_SH_Yearly_drafts" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Bucket
- **Bucket Name:** `Professor_SH`
- **File Path Pattern:** `profyearlysh_{row_number}_{timestamp}_{filename}`
- **Draft File Path Pattern:** `profyearlysh_draft_{row_number}_{timestamp}_{filename}`

### Excluded Rows
- Row 3: Guide student research and final-year projects
- Row 5: NPTEL/ MOOC certifications
- Row 6: Facilitate MoU

### Total Rows: 6

---

## 4. Core_scope_SH (Faculty Core Scope - S&H Monthly Form)

### Table Schema
```sql
CREATE TABLE "Core_scope_SH" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Designation" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT,
    "Description_7" TEXT,
    "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT,
    "Description_8" TEXT,
    "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT,
    "Description_9" TEXT,
    "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT,
    "Description_10" TEXT,
    "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT,
    "Description_11" TEXT,
    "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT,
    "Description_12" TEXT,
    "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT,
    "Description_13" TEXT,
    "Upload The Scanned File_13" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Draft Table Schema
```sql
CREATE TABLE "Core_scope_SH_drafts" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Designation" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT,
    "Description_7" TEXT,
    "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT,
    "Description_8" TEXT,
    "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT,
    "Description_9" TEXT,
    "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT,
    "Description_10" TEXT,
    "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT,
    "Description_11" TEXT,
    "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT,
    "Description_12" TEXT,
    "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT,
    "Description_13" TEXT,
    "Upload The Scanned File_13" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Bucket
- **Bucket Name:** `form1-files-sh`
- **File Path Pattern:** `corescopesh_{row_number}_{timestamp}_{filename}`
- **Draft File Path Pattern:** `corescopesh_draft_{row_number}_{timestamp}_{filename}`

### Excluded Rows
- Row 10: Instution Developement: Participate in curriculum developement and revision through board of Studies
- Row 14: Administrative Duties: Assist in examination duties, including question paper setting, invigilation, and evaluation

### Total Rows: 13

---

## Storage Buckets Summary

| Form Type | Bucket Name | Purpose |
|-----------|-------------|---------|
| AP_SH_Yearly | `Ap_SH` | Assistant Professor S&H yearly form files |
| ASP_SH_Yearly | `Asp_SH_files` | Associate Professor S&H yearly form files |
| Prof_SH_Yearly | `Professor_SH` | Professor S&H yearly form files |
| Core_scope_SH | `form1-files-sh` | Faculty Core Scope S&H monthly form files |

---

## Notes

1. All tables use `TEXT` type for flexibility with form data
2. All tables include `created_at` and `updated_at` timestamps
3. Draft tables have the same schema as main tables
4. File uploads store public URLs in the database
5. Row numbers in the forms are renumbered sequentially (1, 2, 3...) after exclusion
6. All forms maintain the same functionality as engineering faculty forms (draft saving, file uploads, validation, etc.)

---

## Indexes (Recommended)

```sql
-- Indexes for faster lookups
CREATE INDEX idx_ap_sh_yearly_dept_member ON "AP_SH_Yearly"("Department", "Portfolio Member Name");
CREATE INDEX idx_asp_sh_yearly_dept_member ON "ASP_SH_Yearly"("Department", "Portfolio Member Name");
CREATE INDEX idx_prof_sh_yearly_dept_member ON "Prof_SH_Yearly"("Department", "Portfolio Member Name");
CREATE INDEX idx_core_scope_sh_dept_member ON "Core_scope_SH"("Department", "Portfolio Member Name");

-- Draft table indexes
CREATE INDEX idx_ap_sh_yearly_drafts_dept_member ON "AP_SH_Yearly_drafts"("Department", "Portfolio Member Name");
CREATE INDEX idx_asp_sh_yearly_drafts_dept_member ON "ASP_SH_Yearly_drafts"("Department", "Portfolio Member Name");
CREATE INDEX idx_prof_sh_yearly_drafts_dept_member ON "Prof_SH_Yearly_drafts"("Department", "Portfolio Member Name");
CREATE INDEX idx_core_scope_sh_drafts_dept_member ON "Core_scope_SH_drafts"("Department", "Portfolio Member Name");
```

