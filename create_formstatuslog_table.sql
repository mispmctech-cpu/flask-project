-- Create FormStatusLog table to match the existing formstatus table structure
CREATE TABLE IF NOT EXISTS public.formstatuslog (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) NOT NULL,
    previous_status BOOLEAN DEFAULT NULL,
    new_status BOOLEAN NOT NULL,
    changed_by VARCHAR(100) DEFAULT 'Admin',
    changed_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reason TEXT DEFAULT NULL
);

-- Create index for better performance on queries
CREATE INDEX IF NOT EXISTS idx_formstatuslog_form_name ON public.formstatuslog(form_name);
CREATE INDEX IF NOT EXISTS idx_formstatuslog_changed_at ON public.formstatuslog(changed_at DESC);

-- Enable Row Level Security (RLS) if needed
ALTER TABLE public.formstatuslog ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access (adjust as needed for your security requirements)
CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON public.formstatuslog
    FOR SELECT USING (true);

-- Create policy to allow insert access (adjust as needed for your security requirements)
CREATE POLICY IF NOT EXISTS "Enable insert access for all users" ON public.formstatuslog
    FOR INSERT WITH CHECK (true);
