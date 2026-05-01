-- ============================================
-- Institution Form Draft Tables
-- Run this in Supabase SQL Editor
-- ============================================

-- ========== INSTITUTION FORM 2 DRAFTS ==========
CREATE TABLE IF NOT EXISTS institution_form2_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form2_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form2_drafts" ON institution_form2_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form2_drafts_member ON institution_form2_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 3 DRAFTS (PRINCIPAL) ==========
CREATE TABLE IF NOT EXISTS institution_form3_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    form_type TEXT, -- 'monthly' or 'semester'
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form3_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form3_drafts" ON institution_form3_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form3_drafts_member ON institution_form3_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 4 DRAFTS (DEAN - IQAC) ==========
CREATE TABLE IF NOT EXISTS institution_form4_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form4_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form4_drafts" ON institution_form4_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form4_drafts_member ON institution_form4_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 5 DRAFTS (Director - Academics) ==========
CREATE TABLE IF NOT EXISTS institution_form5_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form5_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form5_drafts" ON institution_form5_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form5_drafts_member ON institution_form5_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 6 DRAFTS (COE) ==========
CREATE TABLE IF NOT EXISTS institution_form6_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    form_type TEXT, -- 'monthly' or 'oncein6months'
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form6_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form6_drafts" ON institution_form6_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form6_drafts_member ON institution_form6_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 7 DRAFTS (EXECUTIVE DEAN – INTERNATIONAL AFFAIRS) ==========
CREATE TABLE IF NOT EXISTS institution_form7_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    form_type TEXT, -- 'monthly', 'semester', or 'year'
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form7_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form7_drafts" ON institution_form7_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form7_drafts_member ON institution_form7_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 8 DRAFTS (HEAD-PLACEMENT) ==========
CREATE TABLE IF NOT EXISTS institution_form8_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form8_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form8_drafts" ON institution_form8_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form8_drafts_member ON institution_form8_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 9 DRAFTS (PLACEMENT OFFICER) ==========
CREATE TABLE IF NOT EXISTS institution_form9_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form9_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form9_drafts" ON institution_form9_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form9_drafts_member ON institution_form9_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 10 DRAFTS (Training Head) ==========
CREATE TABLE IF NOT EXISTS institution_form10_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    form_type TEXT, -- 'monthly' or 'sixmonths'
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form10_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form10_drafts" ON institution_form10_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form10_drafts_member ON institution_form10_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 11 DRAFTS (TRAINING OFFICER) ==========
CREATE TABLE IF NOT EXISTS institution_form11_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form11_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form11_drafts" ON institution_form11_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form11_drafts_member ON institution_form11_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 12 DRAFTS (HEAD RISE) ==========
CREATE TABLE IF NOT EXISTS institution_form12_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form12_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form12_drafts" ON institution_form12_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form12_drafts_member ON institution_form12_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 13 DRAFTS (IT INFRA COORDINATOR) ==========
CREATE TABLE IF NOT EXISTS institution_form13_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form13_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form13_drafts" ON institution_form13_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form13_drafts_member ON institution_form13_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 14 DRAFTS (WEBSITE COORDINATOR) ==========
CREATE TABLE IF NOT EXISTS institution_form14_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form14_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form14_drafts" ON institution_form14_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form14_drafts_member ON institution_form14_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 15 DRAFTS (ERP COORDINATOR) ==========
CREATE TABLE IF NOT EXISTS institution_form15_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form15_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form15_drafts" ON institution_form15_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form15_drafts_member ON institution_form15_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 16 DRAFTS (PRO) ==========
CREATE TABLE IF NOT EXISTS institution_form16_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form16_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form16_drafts" ON institution_form16_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form16_drafts_member ON institution_form16_drafts("Portfolio Member Name");

-- ========== INSTITUTION FORM 17 DRAFTS (LOGISTICS COORDINATOR) ==========
CREATE TABLE IF NOT EXISTS institution_form17_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    draft_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE institution_form17_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on institution_form17_drafts" ON institution_form17_drafts FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_inst_form17_drafts_member ON institution_form17_drafts("Portfolio Member Name");

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Institution form draft tables created successfully!' as status;
