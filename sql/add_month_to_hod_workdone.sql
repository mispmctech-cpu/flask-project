-- Add month column to Hod-workdone table for filtering validation records by month

ALTER TABLE public."Hod-workdone"
ADD COLUMN IF NOT EXISTS month TEXT;

-- Create index for faster month-based queries
CREATE INDEX IF NOT EXISTS "Hod-workdone_month_idx" 
ON public."Hod-workdone" USING btree (month);

-- Add comment
COMMENT ON COLUMN public."Hod-workdone".month IS 'Month when the form was submitted/validated (e.g., January, February)';
