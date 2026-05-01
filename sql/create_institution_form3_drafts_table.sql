-- Create institution_form3_drafts table for saving draft data
-- This table stores drafts for both monthly and semester forms

CREATE TABLE IF NOT EXISTS institution_form3_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_name TEXT,
    portfolio_member_name TEXT NOT NULL,
    form_type TEXT NOT NULL CHECK (form_type IN ('monthly', 'semester')),
    draft_data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups by portfolio member name and form type
CREATE INDEX IF NOT EXISTS idx_institution_form3_drafts_member_type 
ON institution_form3_drafts(portfolio_member_name, form_type);

-- Enable Row Level Security
ALTER TABLE institution_form3_drafts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on institution_form3_drafts" 
ON institution_form3_drafts 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Grant permissions
GRANT ALL ON institution_form3_drafts TO anon;
GRANT ALL ON institution_form3_drafts TO authenticated;

-- Comments
COMMENT ON TABLE institution_form3_drafts IS 'Stores draft data for PRINCIPAL form (institution-form3) - both monthly and semester sections';
COMMENT ON COLUMN institution_form3_drafts.form_type IS 'Type of form: monthly or semester';
COMMENT ON COLUMN institution_form3_drafts.draft_data IS 'JSONB containing all form fields including Portfolio Name:, Portfolio Member Name:, Month:, Status_N, Description_N, Upload the scanned file_N';
