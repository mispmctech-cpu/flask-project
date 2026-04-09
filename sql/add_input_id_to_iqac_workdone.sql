-- Add input_id column to iqac-workdone table
-- This will resolve the "Could not find the 'input_id' column of 'iqac-workdone' in the schema cache" error

-- First check current structure of iqac-workdone table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'iqac-workdone'
ORDER BY column_name;

-- Add input_id column as INTEGER to match form tables
ALTER TABLE "iqac-workdone" 
ADD COLUMN input_id INTEGER;

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'iqac-workdone'
AND column_name = 'input_id';

-- Show current data structure
SELECT COUNT(*) as total_records FROM "iqac-workdone";

-- Create index for better performance on input_id lookups
CREATE INDEX IF NOT EXISTS idx_iqac_workdone_input_id ON "iqac-workdone" (input_id);
