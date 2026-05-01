-- Update Institution Form 3 tables to match the new schema

-- =========================================
-- Add missing columns to Institution-form3-monthly
-- =========================================
ALTER TABLE "Institution-form3-monthly" 
ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS user_id TEXT DEFAULT 'system',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =========================================
-- Add missing columns to Institution-form3-once in a semester  
-- =========================================
ALTER TABLE "Institution-form3-once in a semester"
ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS user_id TEXT DEFAULT 'system', 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =========================================
-- Create indexes for better performance
-- =========================================

-- Indexes for Monthly table
CREATE INDEX IF NOT EXISTS idx_institution_form3_monthly_submitted_at ON "Institution-form3-monthly" (submitted_at);
CREATE INDEX IF NOT EXISTS idx_institution_form3_monthly_input_id ON "Institution-form3-monthly" (input_id);
CREATE INDEX IF NOT EXISTS idx_institution_form3_monthly_portfolio ON "Institution-form3-monthly" ("Portfolio Name:");

-- Indexes for Semester table  
CREATE INDEX IF NOT EXISTS idx_institution_form3_semester_submitted_at ON "Institution-form3-once in a semester" (submitted_at);
CREATE INDEX IF NOT EXISTS idx_institution_form3_semester_input_id ON "Institution-form3-once in a semester" (input_id);
CREATE INDEX IF NOT EXISTS idx_institution_form3_semester_portfolio ON "Institution-form3-once in a semester" ("Portfolio Name:");