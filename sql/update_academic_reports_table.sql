-- Updated academic_reports table schema for Category 2: Academics
-- Run this in Supabase SQL Editor

-- Option 1: If you need to CREATE the table fresh
CREATE TABLE IF NOT EXISTS academic_reports (
    id SERIAL PRIMARY KEY,
    department TEXT NOT NULL,
    hod_name TEXT,
    report_date DATE NOT NULL,
    academics JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_academic_reports_department ON academic_reports(department);
CREATE INDEX IF NOT EXISTS idx_academic_reports_date ON academic_reports(report_date);

-- Enable Row Level Security
ALTER TABLE academic_reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on academic_reports" 
ON academic_reports 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Grant permissions
GRANT ALL ON academic_reports TO anon;
GRANT ALL ON academic_reports TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE academic_reports_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE academic_reports_id_seq TO authenticated;

/*
ACADEMICS JSON Structure:
[
  {
    "class_section": "II Year / IT / A",
    "year": "II Year",
    "class_name": "IT",
    "section": "A",
    "timetable": [
      {
        "hour": 1,
        "subject": "Data Structures",
        "faculty_name": "Dr. Smith",
        "topics_covered": "Binary Trees",
        "teaching_aid": "PPT, Board"
      },
      {
        "hour": 2,
        "subject": "DBMS",
        "faculty_name": "Prof. Johnson",
        "topics_covered": "Normalization",
        "teaching_aid": "Live Demo"
      }
      // ... hours 3-8
    ]
  }
]
*/
