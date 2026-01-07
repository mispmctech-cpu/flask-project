-- S&H Faculty Forms - Database Schema
-- This file contains SQL CREATE TABLE statements for Science & Humanities faculty forms

-- ============================================================================
-- 1. AP_SH_Yearly (Assistant Professor - S&H Yearly Form)
-- Excludes rows: 2, 5, 6
-- Total rows: 5
-- ============================================================================

CREATE TABLE IF NOT EXISTS "AP_SH_Yearly" (
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

CREATE TABLE IF NOT EXISTS "AP_SH_Yearly_drafts" (
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

-- ============================================================================
-- 2. ASP_SH_Yearly (Associate Professor - S&H Yearly Form)
-- Excludes rows: 3, 5, 6
-- Total rows: 6
-- ============================================================================

CREATE TABLE IF NOT EXISTS "ASP_SH_Yearly" (
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

CREATE TABLE IF NOT EXISTS "ASP_SH_Yearly_drafts" (
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

-- ============================================================================
-- 3. Prof_SH_Yearly (Professor - S&H Yearly Form)
-- Excludes rows: 3, 5, 6
-- Total rows: 6
-- ============================================================================

CREATE TABLE IF NOT EXISTS "Prof_SH_Yearly" (
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

CREATE TABLE IF NOT EXISTS "Prof_SH_Yearly_drafts" (
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

-- ============================================================================
-- 4. Core_scope_SH (Faculty Core Scope - S&H Monthly Form)
-- Excludes rows: 10, 14
-- Total rows: 13
-- ============================================================================

CREATE TABLE IF NOT EXISTS "Core_scope_SH" (
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

CREATE TABLE IF NOT EXISTS "Core_scope_SH_drafts" (
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

-- ============================================================================
-- Indexes for faster lookups
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_ap_sh_yearly_dept_member ON "AP_SH_Yearly"("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_asp_sh_yearly_dept_member ON "ASP_SH_Yearly"("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_prof_sh_yearly_dept_member ON "Prof_SH_Yearly"("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_core_scope_sh_dept_member ON "Core_scope_SH"("Department", "Portfolio Member Name");

CREATE INDEX IF NOT EXISTS idx_ap_sh_yearly_drafts_dept_member ON "AP_SH_Yearly_drafts"("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_asp_sh_yearly_drafts_dept_member ON "ASP_SH_Yearly_drafts"("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_prof_sh_yearly_drafts_dept_member ON "Prof_SH_Yearly_drafts"("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_core_scope_sh_drafts_dept_member ON "Core_scope_SH_drafts"("Department", "Portfolio Member Name");

