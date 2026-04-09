-- STEP 1: Simple FormStatus table creation (minimal version)
-- Execute this first to test basic table creation

CREATE TABLE FormStatus (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) UNIQUE NOT NULL,
    form_title VARCHAR(200),
    is_open BOOLEAN DEFAULT true,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100) DEFAULT 'Admin'
);

-- STEP 2: Insert a few test records
INSERT INTO FormStatus (form_name, form_title, is_open) VALUES
('faculty-form1', 'Faculty Form 1', true),
('faculty-form2', 'Faculty Form 2', true),
('institution-form1', 'Institution Form 1', true);

-- STEP 3: Grant permissions (CRITICAL!)
GRANT ALL ON FormStatus TO authenticated;
GRANT ALL ON FormStatus TO anon;
GRANT USAGE ON SEQUENCE formstatus_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE formstatus_id_seq TO anon;

-- STEP 4: Disable RLS if it's causing issues
ALTER TABLE FormStatus DISABLE ROW LEVEL SECURITY;

-- STEP 5: Test query
SELECT * FROM FormStatus LIMIT 5;
