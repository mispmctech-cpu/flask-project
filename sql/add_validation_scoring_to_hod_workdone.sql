-- Add validation scoring columns to Hod-workdone table
-- Run this in your Supabase SQL Editor

ALTER TABLE public."Hod-workdone"
ADD COLUMN IF NOT EXISTS total_fields INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS validated_fields INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS validation_score DECIMAL(5,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS field_scores JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS validation_notes TEXT,
ADD COLUMN IF NOT EXISTS validation_status TEXT DEFAULT 'pending';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS "Hod-workdone_validation_status_idx" 
ON public."Hod-workdone" USING btree (validation_status);

-- Add comments for documentation
COMMENT ON COLUMN public."Hod-workdone".total_fields IS 'Total number of status fields in the form';
COMMENT ON COLUMN public."Hod-workdone".validated_fields IS 'Number of fields validated by HOD';
COMMENT ON COLUMN public."Hod-workdone".validation_score IS 'Percentage score (validated_fields / total_fields * 100)';
COMMENT ON COLUMN public."Hod-workdone".field_scores IS 'JSON object storing individual field scores {field_name: score}';
COMMENT ON COLUMN public."Hod-workdone".validation_notes IS 'HOD notes during validation';
COMMENT ON COLUMN public."Hod-workdone".validation_status IS 'Status: pending, validated, partial';
