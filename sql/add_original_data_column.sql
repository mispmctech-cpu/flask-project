-- Add original_data column to hod-workdone table to store complete original record data
-- This will help resolve the issue where verified workdone shows wrong data

-- Add the original_data column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'hod-workdone' AND column_name = 'original_data') THEN
        ALTER TABLE "hod-workdone" ADD COLUMN original_data JSONB;
        RAISE NOTICE 'Added original_data column to hod-workdone table';
    ELSE
        RAISE NOTICE 'original_data column already exists in hod-workdone table';
    END IF;
END $$;

-- Add comment to explain the purpose
COMMENT ON COLUMN "hod-workdone".original_data IS 'Stores the complete original form data as JSON for verified records';

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'hod-workdone' 
ORDER BY ordinal_position;
