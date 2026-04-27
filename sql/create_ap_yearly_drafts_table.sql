-- Create AP_Yearly_drafts table for saving draft submissions
CREATE TABLE IF NOT EXISTS public."AP_Yearly_drafts" (
    id BIGSERIAL PRIMARY KEY,
    "Department" TEXT,
    "Portfolio Name" TEXT,
    "Portfolio Member Name" TEXT,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ap_yearly_drafts_lookup 
ON public."AP_Yearly_drafts" ("Department", "Portfolio Member Name");

ALTER TABLE public."AP_Yearly_drafts" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for authenticated users" ON public."AP_Yearly_drafts"
    FOR ALL USING (true) WITH CHECK (true);

COMMENT ON TABLE public."AP_Yearly_drafts" IS 'Stores draft versions of AP Yearly forms before final submission. Month is stored for reference but not used for draft matching.';
