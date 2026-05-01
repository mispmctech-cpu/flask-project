-- Create Institution Form 7 tables with proper schema including submitted_at
-- This script handles existing tables by adding missing columns

-- =========================================
-- Drop existing tables if they exist (to ensure clean schema)
-- =========================================
DROP TABLE IF EXISTS "Institution-form7-monthly";
DROP TABLE IF EXISTS "Institution-form7-once in a semester";
DROP TABLE IF EXISTS "Institution-form7-once in a year";

-- =========================================
-- Institution Form 7 - Monthly Table
-- =========================================
CREATE TABLE "Institution-form7-monthly" (
    id SERIAL PRIMARY KEY,
    "Portfolio Name:" TEXT,
    "Portfolio Member Name:" TEXT,
    "Month:" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload the scanned file_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload the scanned file_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload the scanned file_3" TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT DEFAULT 'system',
    input_id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- Institution Form 7 - Once in a Semester Table
-- =========================================
CREATE TABLE "Institution-form7-once in a semester" (
    id SERIAL PRIMARY KEY,
    "Portfolio Name:" TEXT,
    "Portfolio Member Name:" TEXT,
    "Month:" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload the scanned file_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload the scanned file_2" TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT DEFAULT 'system',
    input_id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- Institution Form 7 - Once in a Year Table
-- =========================================
CREATE TABLE "Institution-form7-once in a year" (
    id SERIAL PRIMARY KEY,
    "Portfolio Name:" TEXT,
    "Portfolio Member Name:" TEXT,
    "Month:" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload the scanned file_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload the scanned file_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload the scanned file_3" TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT DEFAULT 'system',
    input_id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- Create indexes AFTER tables are created
-- =========================================

-- Indexes for Monthly table
CREATE INDEX IF NOT EXISTS idx_institution_form7_monthly_submitted_at ON "Institution-form7-monthly" (submitted_at);
CREATE INDEX IF NOT EXISTS idx_institution_form7_monthly_input_id ON "Institution-form7-monthly" (input_id);
CREATE INDEX IF NOT EXISTS idx_institution_form7_monthly_portfolio ON "Institution-form7-monthly" ("Portfolio Name:");

-- Indexes for Semester table
CREATE INDEX IF NOT EXISTS idx_institution_form7_semester_submitted_at ON "Institution-form7-once in a semester" (submitted_at);
CREATE INDEX IF NOT EXISTS idx_institution_form7_semester_input_id ON "Institution-form7-once in a semester" (input_id);
CREATE INDEX IF NOT EXISTS idx_institution_form7_semester_portfolio ON "Institution-form7-once in a semester" ("Portfolio Name:");

-- Indexes for Year table
CREATE INDEX IF NOT EXISTS idx_institution_form7_year_submitted_at ON "Institution-form7-once in a year" (submitted_at);
CREATE INDEX IF NOT EXISTS idx_institution_form7_year_input_id ON "Institution-form7-once in a year" (input_id);
CREATE INDEX IF NOT EXISTS idx_institution_form7_year_portfolio ON "Institution-form7-once in a year" ("Portfolio Name:");

-- =========================================
-- Enable Row Level Security (if needed)
-- =========================================
-- ALTER TABLE "Institution-form7-monthly" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "Institution-form7-once in a semester" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "Institution-form7-once in a year" ENABLE ROW LEVEL SECURITY;

-- =========================================
-- Create policies for access (if RLS is enabled)
-- =========================================
-- CREATE POLICY "Allow all operations for Institution form 7 monthly" ON "Institution-form7-monthly" FOR ALL USING (true);
-- CREATE POLICY "Allow all operations for Institution form 7 semester" ON "Institution-form7-once in a semester" FOR ALL USING (true);
-- CREATE POLICY "Allow all operations for Institution form 7 year" ON "Institution-form7-once in a year" FOR ALL USING (true);

-- =========================================
-- Sample data insertion (optional - for testing)
-- =========================================
-- INSERT INTO "Institution-form7-monthly" (
--     "Portfolio Name:", "Portfolio Member Name:", "Month:",
--     "Status_1", "Description_1", "Status_2", "Description_2", "Status_3", "Description_3"
-- ) VALUES (
--     'Executive Dean - International Affairs', 'John Doe', 'January',
--     'Completed and Updated', 'Professional bodies activities completed', 
--     'Under Process', 'MOU activities in progress',
--     'Yet to be Completed', 'Renewal process pending'
-- );