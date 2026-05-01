-- Create draft tables for faculty forms 1-8
-- These tables store in-progress form data that faculty can save and resume later

-- Form 1 Drafts (18 rows)
CREATE TABLE IF NOT EXISTS form1_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT, "Description_12" TEXT, "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT, "Description_13" TEXT, "Upload The Scanned File_13" TEXT,
    "Status_14" TEXT, "Description_14" TEXT, "Upload The Scanned File_14" TEXT,
    "Status_15" TEXT, "Description_15" TEXT, "Upload The Scanned File_15" TEXT,
    "Status_16" TEXT, "Description_16" TEXT, "Upload The Scanned File_16" TEXT,
    "Status_17" TEXT, "Description_17" TEXT, "Upload The Scanned File_17" TEXT,
    "Status_18" TEXT, "Description_18" TEXT, "Upload The Scanned File_18" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 2 Drafts (11 rows)
CREATE TABLE IF NOT EXISTS form2_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 3 Drafts (14 rows)
CREATE TABLE IF NOT EXISTS form3_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT, "Description_12" TEXT, "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT, "Description_13" TEXT, "Upload The Scanned File_13" TEXT,
    "Status_14" TEXT, "Description_14" TEXT, "Upload The Scanned File_14" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 4 Drafts (17 rows)
CREATE TABLE IF NOT EXISTS form4_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT, "Description_12" TEXT, "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT, "Description_13" TEXT, "Upload The Scanned File_13" TEXT,
    "Status_14" TEXT, "Description_14" TEXT, "Upload The Scanned File_14" TEXT,
    "Status_15" TEXT, "Description_15" TEXT, "Upload The Scanned File_15" TEXT,
    "Status_16" TEXT, "Description_16" TEXT, "Upload The Scanned File_16" TEXT,
    "Status_17" TEXT, "Description_17" TEXT, "Upload The Scanned File_17" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 5 Drafts (12 rows)
CREATE TABLE IF NOT EXISTS form5_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT, "Description_12" TEXT, "Upload The Scanned File_12" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 6 Drafts (16 rows)
CREATE TABLE IF NOT EXISTS form6_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT, "Description_12" TEXT, "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT, "Description_13" TEXT, "Upload The Scanned File_13" TEXT,
    "Status_14" TEXT, "Description_14" TEXT, "Upload The Scanned File_14" TEXT,
    "Status_15" TEXT, "Description_15" TEXT, "Upload The Scanned File_15" TEXT,
    "Status_16" TEXT, "Description_16" TEXT, "Upload The Scanned File_16" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 7 Drafts (9 rows)
CREATE TABLE IF NOT EXISTS form7_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Form 8 Drafts (13 rows)
CREATE TABLE IF NOT EXISTS form8_monthly_drafts (
    id SERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Month" TEXT,
    "Status_1" TEXT, "Description_1" TEXT, "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT, "Description_2" TEXT, "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT, "Description_3" TEXT, "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT, "Description_4" TEXT, "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT, "Description_5" TEXT, "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT, "Description_6" TEXT, "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT, "Description_7" TEXT, "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT, "Description_8" TEXT, "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT, "Description_9" TEXT, "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT, "Description_10" TEXT, "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT, "Description_11" TEXT, "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT, "Description_12" TEXT, "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT, "Description_13" TEXT, "Upload The Scanned File_13" TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for all draft tables
ALTER TABLE form1_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form2_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form3_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form4_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form5_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form6_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form7_monthly_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE form8_monthly_drafts ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (same as main form tables)
CREATE POLICY "Allow anonymous insert on form1_monthly_drafts" ON form1_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form1_monthly_drafts" ON form1_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form1_monthly_drafts" ON form1_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form1_monthly_drafts" ON form1_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form2_monthly_drafts" ON form2_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form2_monthly_drafts" ON form2_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form2_monthly_drafts" ON form2_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form2_monthly_drafts" ON form2_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form3_monthly_drafts" ON form3_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form3_monthly_drafts" ON form3_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form3_monthly_drafts" ON form3_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form3_monthly_drafts" ON form3_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form4_monthly_drafts" ON form4_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form4_monthly_drafts" ON form4_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form4_monthly_drafts" ON form4_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form4_monthly_drafts" ON form4_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form5_monthly_drafts" ON form5_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form5_monthly_drafts" ON form5_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form5_monthly_drafts" ON form5_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form5_monthly_drafts" ON form5_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form6_monthly_drafts" ON form6_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form6_monthly_drafts" ON form6_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form6_monthly_drafts" ON form6_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form6_monthly_drafts" ON form6_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form7_monthly_drafts" ON form7_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form7_monthly_drafts" ON form7_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form7_monthly_drafts" ON form7_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form7_monthly_drafts" ON form7_monthly_drafts FOR DELETE USING (true);

CREATE POLICY "Allow anonymous insert on form8_monthly_drafts" ON form8_monthly_drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select on form8_monthly_drafts" ON form8_monthly_drafts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update on form8_monthly_drafts" ON form8_monthly_drafts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on form8_monthly_drafts" ON form8_monthly_drafts FOR DELETE USING (true);

-- Create indexes for faster draft lookups
CREATE INDEX IF NOT EXISTS idx_form1_drafts_lookup ON form1_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form2_drafts_lookup ON form2_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form3_drafts_lookup ON form3_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form4_drafts_lookup ON form4_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form5_drafts_lookup ON form5_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form6_drafts_lookup ON form6_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form7_drafts_lookup ON form7_monthly_drafts ("Department", "Portfolio Member Name");
CREATE INDEX IF NOT EXISTS idx_form8_drafts_lookup ON form8_monthly_drafts ("Department", "Portfolio Member Name");
