-- Create Core_scope_drafts table for saving draft submissions
CREATE TABLE IF NOT EXISTS public."Core_scope_drafts" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
    "Designation" TEXT,
    "Month" TEXT,
    "Status_1" TEXT,
    "Description_1" TEXT,
    "Upload The Scanned File_1" TEXT,
    "Status_2" TEXT,
    "Description_2" TEXT,
    "Upload The Scanned File_2" TEXT,
    "Status_3" TEXT,
    "Description_3" TEXT,
    "Upload The Scanned File_3" TEXT,
    "Status_4" TEXT,
    "Description_4" TEXT,
    "Upload The Scanned File_4" TEXT,
    "Status_5" TEXT,
    "Description_5" TEXT,
    "Upload The Scanned File_5" TEXT,
    "Status_6" TEXT,
    "Description_6" TEXT,
    "Upload The Scanned File_6" TEXT,
    "Status_7" TEXT,
    "Description_7" TEXT,
    "Upload The Scanned File_7" TEXT,
    "Status_8" TEXT,
    "Description_8" TEXT,
    "Upload The Scanned File_8" TEXT,
    "Status_9" TEXT,
    "Description_9" TEXT,
    "Upload The Scanned File_9" TEXT,
    "Status_10" TEXT,
    "Description_10" TEXT,
    "Upload The Scanned File_10" TEXT,
    "Status_11" TEXT,
    "Description_11" TEXT,
    "Upload The Scanned File_11" TEXT,
    "Status_12" TEXT,
    "Description_12" TEXT,
    "Upload The Scanned File_12" TEXT,
    "Status_13" TEXT,
    "Description_13" TEXT,
    "Upload The Scanned File_13" TEXT,
    "Status_14" TEXT,
    "Description_14" TEXT,
    "Upload The Scanned File_14" TEXT,
    "Status_15" TEXT,
    "Description_15" TEXT,
    "Upload The Scanned File_15" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_core_scope_drafts_lookup 
ON public."Core_scope_drafts" ("Department", "Portfolio Member Name");

-- Enable RLS (Row Level Security)
ALTER TABLE public."Core_scope_drafts" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security needs)
CREATE POLICY "Enable all operations for authenticated users" ON public."Core_scope_drafts"
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Add comment
COMMENT ON TABLE public."Core_scope_drafts" IS 'Stores draft versions of Faculty Core Scope forms before final submission. Month is stored for reference but not used for draft matching.';
