-- Quick fix: Add input_id to the most commonly used form tables first
-- You can run these one by one in Supabase SQL Editor

-- Add input_id to form2-daily (most common daily submissions)
ALTER TABLE "form2-daily" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form2-daily" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_form2_daily_input_id ON "form2-daily" (input_id);

-- Add input_id to form1-Weekly 
ALTER TABLE "form1-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form1-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_form1_Weekly_input_id ON "form1-Weekly" (input_id);

-- Add input_id to form3-Weekly
ALTER TABLE "form3-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form3-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_form3_Weekly_input_id ON "form3-Weekly" (input_id);

-- Add input_id to form4-Weekly
ALTER TABLE "form4-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form4-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_form4_Weekly_input_id ON "form4-Weekly" (input_id);

-- Add input_id to form5-weekly
ALTER TABLE "form5-weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form5-weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_form5_weekly_input_id ON "form5-weekly" (input_id);

-- Verification query - run this to check if columns were added successfully
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE column_name = 'input_id' 
AND table_schema = 'public'
AND table_name IN ('form2-daily', 'form1-Weekly', 'form3-Weekly', 'form4-Weekly', 'form5-weekly')
ORDER BY table_name;
