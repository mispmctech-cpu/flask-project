-- Add input_id column to hod-workdone table for unique submission tracking
-- This will allow us to properly track which specific submissions have been verified

-- Add input_id column as a UUID with default value
ALTER TABLE "hod-workdone" 
ADD COLUMN input_id UUID DEFAULT gen_random_uuid();

-- Add table_name column to track which form table the record came from
ALTER TABLE "hod-workdone" 
ADD COLUMN table_name TEXT;

-- Create an index on input_id for faster queries
CREATE INDEX IF NOT EXISTS idx_hod_workdone_input_id ON "hod-workdone" (input_id);

-- Create an index on table_name for faster queries
CREATE INDEX IF NOT EXISTS idx_hod_workdone_table_name ON "hod-workdone" (table_name);

-- Update existing records to have unique input_ids (they will get auto-generated UUIDs)
UPDATE "hod-workdone" SET input_id = gen_random_uuid() WHERE input_id IS NULL;

-- Make input_id NOT NULL after updating existing records
ALTER TABLE "hod-workdone" ALTER COLUMN input_id SET NOT NULL;

-- Add a unique constraint to ensure input_id is always unique
ALTER TABLE "hod-workdone" ADD CONSTRAINT hod_workdone_input_id_unique UNIQUE (input_id);

-- Optional: Add similar input_id to other workdone-related tables if they exist
-- Uncomment the following lines if you have other workdone tables that need this feature

-- For faculty-workdone table (if it exists):
-- ALTER TABLE "faculty-workdone" ADD COLUMN input_id UUID DEFAULT gen_random_uuid();
-- CREATE INDEX IF NOT EXISTS idx_faculty_workdone_input_id ON "faculty-workdone" (input_id);
-- UPDATE "faculty-workdone" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
-- ALTER TABLE "faculty-workdone" ALTER COLUMN input_id SET NOT NULL;
-- ALTER TABLE "faculty-workdone" ADD CONSTRAINT faculty_workdone_input_id_unique UNIQUE (input_id);

-- For admin-workdone table (if it exists):
-- ALTER TABLE "admin-workdone" ADD COLUMN input_id UUID DEFAULT gen_random_uuid();
-- CREATE INDEX IF NOT EXISTS idx_admin_workdone_input_id ON "admin-workdone" (input_id);
-- UPDATE "admin-workdone" SET input_id = gen_random_uuid() WHERE input_id IS NULL;
-- ALTER TABLE "admin-workdone" ALTER COLUMN input_id SET NOT NULL;
-- ALTER TABLE "admin-workdone" ADD CONSTRAINT admin_workdone_input_id_unique UNIQUE (input_id);
