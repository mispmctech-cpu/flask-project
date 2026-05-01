-- Updated daily_reports table schema for Category 1: Attendance
-- Run this in Supabase SQL Editor

-- Option 1: If you need to CREATE the table fresh
CREATE TABLE IF NOT EXISTS daily_reports (
    id SERIAL PRIMARY KEY,
    department TEXT NOT NULL,
    hod_name TEXT,
    report_date DATE NOT NULL,
    faculty_od TEXT,
    faculty_leave TEXT,
    faculty_absent TEXT,
    student_attendance JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Option 2: If table already exists and you need to DROP unused columns
-- ALTER TABLE daily_reports DROP COLUMN IF EXISTS total_faculty;
-- ALTER TABLE daily_reports DROP COLUMN IF EXISTS faculty_present;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_reports_department ON daily_reports(department);
CREATE INDEX IF NOT EXISTS idx_daily_reports_date ON daily_reports(report_date);

-- Enable Row Level Security
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on daily_reports" 
ON daily_reports 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Grant permissions
GRANT ALL ON daily_reports TO anon;
GRANT ALL ON daily_reports TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE daily_reports_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE daily_reports_id_seq TO authenticated;

/*
STUDENT_ATTENDANCE JSON Structure:
[
  {
    "class_section": "I Year / CSE / A",
    "year": "I Year",
    "class_name": "CSE",
    "section": "A",
    "total_students": 60,
    "students_present": 55,
    "students_od": 2,
    "students_leave": 1,
    "students_absent": 2,
    "attendance_percent": "91.67%"
  }
]
*/
