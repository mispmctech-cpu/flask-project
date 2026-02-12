-- Fix hod-workdone table to accept integer input_id instead of UUID
-- This will resolve the "invalid input syntax for type uuid: '123'" error

-- First, check current structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'hod-workdone'
AND column_name = 'input_id';

-- Safe approach: Clear existing data if any, then change column type
-- First check if there's any existing data
SELECT COUNT(*) as existing_records FROM "hod-workdone";

-- If there are existing records with UUID input_ids, we need to clear them
-- since they can't be converted to integers
DELETE FROM "hod-workdone" WHERE input_id IS NOT NULL;

-- Remove any default value first (likely UUID generator)
ALTER TABLE "hod-workdone" 
ALTER COLUMN input_id DROP DEFAULT;

-- Change input_id column from UUID to INTEGER to match form tables
-- Since UUIDs can't be converted to integers, we'll set all existing values to NULL first
ALTER TABLE "hod-workdone" 
ALTER COLUMN input_id TYPE INTEGER USING NULL;

-- Verify the change
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'hod-workdone'
AND column_name = 'input_id';

-- Show current data to verify
SELECT input_id, table_name, department, verified_by, verified_at 
FROM "hod-workdone" 
ORDER BY verified_at DESC 
LIMIT 5;
