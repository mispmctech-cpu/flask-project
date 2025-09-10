-- Complete schema for hod-workdone table with all required columns
CREATE TABLE IF NOT EXISTS public."hod-workdone" (
  id SERIAL NOT NULL,
  department TEXT NOT NULL,
  portfolio_name TEXT NOT NULL,
  portfolio_member_name TEXT NOT NULL,
  status TEXT NOT NULL,
  verified_by TEXT NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  documents TEXT NULL,
  view_link TEXT NULL,
  input_id UUID NOT NULL DEFAULT gen_random_uuid(),
  table_name TEXT NULL,  -- This column tracks which form table the record came from
  CONSTRAINT hod_workdone_pkey PRIMARY KEY (id),
  CONSTRAINT hod_workdone_input_id_unique UNIQUE (input_id)
) TABLESPACE pg_default;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_hod_workdone_input_id ON public."hod-workdone" USING btree (input_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_hod_workdone_table_name ON public."hod-workdone" USING btree (table_name) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_hod_workdone_department ON public."hod-workdone" USING btree (department) TABLESPACE pg_default;
