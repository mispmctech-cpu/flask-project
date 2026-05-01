-- Create faculty_report_assignments table for storing HOD's category assignments to faculty
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS faculty_report_assignments (
    id SERIAL PRIMARY KEY,
    faculty_email TEXT UNIQUE NOT NULL,
    faculty_name TEXT,
    department TEXT NOT NULL,
    categories TEXT[] DEFAULT '{}',
    assigned_by TEXT DEFAULT 'HOD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_faculty_report_assignments_email ON faculty_report_assignments(faculty_email);
CREATE INDEX IF NOT EXISTS idx_faculty_report_assignments_dept ON faculty_report_assignments(department);

-- Enable Row Level Security
ALTER TABLE faculty_report_assignments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations on faculty_report_assignments" 
ON faculty_report_assignments 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Grant permissions
GRANT ALL ON faculty_report_assignments TO anon;
GRANT ALL ON faculty_report_assignments TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE faculty_report_assignments_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE faculty_report_assignments_id_seq TO authenticated;
