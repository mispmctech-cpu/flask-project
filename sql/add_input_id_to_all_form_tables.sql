-- Add input_id column to ALL form tables to enable proper tracking
-- This will allow us to track which specific submissions have been verified

-- List of all form tables that need input_id column
SET @tables = '
form1-once in a year,
form1-Weekly,
form1-once in 15 days,
form1-once in a semester,
form2-daily,
form2-weekly,
form2-once in a month,
form2-once in a semester,
form3-Weekly,
form3- once in 15 days,
form3-once in a semester,
form4-Weekly,
form4-once in a month,
form4-once in a semester,
form5-weekly,
form5-Once in a 3 Months,
form5-once in a semester,
form6-once in a semester,
form7-Once in a Semester,
form7-Once in 2 Months,
form7-Weekly,
form8-weekly,
form8-once in 3 Months,
form8-Once in Semester,
ASP,
AP,
Prof
';

-- Add input_id to form1-once in a year
ALTER TABLE "form1-once in a year" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form1-once in a year" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form1-once in a year" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form1_once_in_a_year_input_id ON "form1-once in a year" (input_id);

-- Add input_id to form1-Weekly
ALTER TABLE "form1-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form1-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form1-Weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form1_Weekly_input_id ON "form1-Weekly" (input_id);

-- Add input_id to form1-once in 15 days
ALTER TABLE "form1-once in 15 days" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form1-once in 15 days" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form1-once in 15 days" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form1_once_in_15_days_input_id ON "form1-once in 15 days" (input_id);

-- Add input_id to form1-once in a semester
ALTER TABLE "form1-once in a semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form1-once in a semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form1-once in a semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form1_once_in_a_semester_input_id ON "form1-once in a semester" (input_id);

-- Add input_id to form2-daily
ALTER TABLE "form2-daily" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form2-daily" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form2-daily" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form2_daily_input_id ON "form2-daily" (input_id);

-- Add input_id to form2-weekly
ALTER TABLE "form2-weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form2-weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form2-weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form2_weekly_input_id ON "form2-weekly" (input_id);

-- Add input_id to form2-once in a month
ALTER TABLE "form2-once in a month" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form2-once in a month" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form2-once in a month" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form2_once_in_a_month_input_id ON "form2-once in a month" (input_id);

-- Add input_id to form2-once in a semester
ALTER TABLE "form2-once in a semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form2-once in a semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form2-once in a semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form2_once_in_a_semester_input_id ON "form2-once in a semester" (input_id);

-- Add input_id to form3-Weekly
ALTER TABLE "form3-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form3-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form3-Weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form3_Weekly_input_id ON "form3-Weekly" (input_id);

-- Add input_id to form3- once in 15 days
ALTER TABLE "form3- once in 15 days" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form3- once in 15 days" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form3- once in 15 days" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form3_once_in_15_days_input_id ON "form3- once in 15 days" (input_id);

-- Add input_id to form3-once in a semester
ALTER TABLE "form3-once in a semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form3-once in a semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form3-once in a semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form3_once_in_a_semester_input_id ON "form3-once in a semester" (input_id);

-- Add input_id to form4-Weekly
ALTER TABLE "form4-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form4-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form4-Weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form4_Weekly_input_id ON "form4-Weekly" (input_id);

-- Add input_id to form4-once in a month
ALTER TABLE "form4-once in a month" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form4-once in a month" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form4-once in a month" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form4_once_in_a_month_input_id ON "form4-once in a month" (input_id);

-- Add input_id to form4-once in a semester
ALTER TABLE "form4-once in a semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form4-once in a semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form4-once in a semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form4_once_in_a_semester_input_id ON "form4-once in a semester" (input_id);

-- Add input_id to form5-weekly
ALTER TABLE "form5-weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form5-weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form5-weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form5_weekly_input_id ON "form5-weekly" (input_id);

-- Add input_id to form5-Once in a 3 Months
ALTER TABLE "form5-Once in a 3 Months" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form5-Once in a 3 Months" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form5-Once in a 3 Months" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form5_Once_in_a_3_Months_input_id ON "form5-Once in a 3 Months" (input_id);

-- Add input_id to form5-once in a semester
ALTER TABLE "form5-once in a semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form5-once in a semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form5-once in a semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form5_once_in_a_semester_input_id ON "form5-once in a semester" (input_id);

-- Add input_id to form6-once in a semester
ALTER TABLE "form6-once in a semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form6-once in a semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form6-once in a semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form6_once_in_a_semester_input_id ON "form6-once in a semester" (input_id);

-- Add input_id to form7-Once in a Semester
ALTER TABLE "form7-Once in a Semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form7-Once in a Semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form7-Once in a Semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form7_Once_in_a_Semester_input_id ON "form7-Once in a Semester" (input_id);

-- Add input_id to form7-Once in 2 Months
ALTER TABLE "form7-Once in 2 Months" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form7-Once in 2 Months" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form7-Once in 2 Months" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form7_Once_in_2_Months_input_id ON "form7-Once in 2 Months" (input_id);

-- Add input_id to form7-Weekly
ALTER TABLE "form7-Weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form7-Weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form7-Weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form7_Weekly_input_id ON "form7-Weekly" (input_id);

-- Add input_id to form8-weekly
ALTER TABLE "form8-weekly" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form8-weekly" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form8-weekly" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form8_weekly_input_id ON "form8-weekly" (input_id);

-- Add input_id to form8-once in 3 Months
ALTER TABLE "form8-once in 3 Months" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form8-once in 3 Months" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form8-once in 3 Months" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form8_once_in_3_Months_input_id ON "form8-once in 3 Months" (input_id);

-- Add input_id to form8-Once in Semester
ALTER TABLE "form8-Once in Semester" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "form8-Once in Semester" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "form8-Once in Semester" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_form8_Once_in_Semester_input_id ON "form8-Once in Semester" (input_id);

-- Add input_id to ASP
ALTER TABLE "ASP" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "ASP" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "ASP" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ASP_input_id ON "ASP" (input_id);

-- Add input_id to AP
ALTER TABLE "AP" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "AP" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "AP" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_AP_input_id ON "AP" (input_id);

-- Add input_id to Prof
ALTER TABLE "Prof" ADD COLUMN IF NOT EXISTS input_id UUID DEFAULT gen_random_uuid();
UPDATE "Prof" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
ALTER TABLE "Prof" ALTER COLUMN input_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_Prof_input_id ON "Prof" (input_id);

-- Verification: Check that all tables now have input_id column
-- Run these queries to verify the changes were successful:

-- SELECT table_name, column_name, data_type 
-- FROM information_schema.columns 
-- WHERE column_name = 'input_id' 
-- AND table_schema = 'public'
-- ORDER BY table_name;
