-- =====================================================
-- Form Control System - Database Schema
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to enable
-- form open/close control functionality
-- =====================================================

-- Drop existing tables if they exist (use with caution in production!)
DROP TABLE IF EXISTS formstatuslog CASCADE;
DROP TABLE IF EXISTS formstatus CASCADE;

-- Create formstatus table to control form availability
CREATE TABLE formstatus (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) UNIQUE NOT NULL,
    form_title VARCHAR(200) NOT NULL,
    is_open BOOLEAN DEFAULT true,
    close_message TEXT DEFAULT 'This form is currently closed for submissions.',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100) DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create formstatuslog table to track form status changes
CREATE TABLE formstatuslog (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) NOT NULL,
    old_status BOOLEAN,
    new_status BOOLEAN NOT NULL,
    changed_by VARCHAR(100) DEFAULT 'Admin',
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason TEXT
);

-- Insert initial form status records for all forms
INSERT INTO formstatus (form_name, form_title, is_open) VALUES
-- Faculty Forms
('faculty-form1', 'Students Performance in Training & Placement Member', true),
('faculty-form2', 'Class Advisor', true),
('faculty-form2-monthly', 'Class Advisor (Monthly)', true),
('faculty-form3', 'Faculty Information & Contribution Member', true),
('faculty-form4', 'Course Outcome & Program Outcome Member (Exam Cell)', true),
('faculty-form5', 'Continuous Improvement Member (Program Member)', true),
('faculty-form6', 'Teaching & Learning Process Member (IQAC)', true),
('faculty-form6-monthly', 'Teaching & Learning Process Member (IQAC) - Monthly', true),
('faculty-form7', 'Student Support System Member (Discipline & Extra Curricular)', true),
('faculty-form7-monthly', 'Student Support System Member - Monthly', true),
('faculty-form8', 'Facilities & Technical Support Member (Lab Member)', true),
('faculty-form8-monthly', 'Facilities & Technical Support Member - Monthly', true),

-- Special Faculty Role Forms
('form-ap', 'Assistant Professor Core Scope', true),
('form-asp', 'Associate Professor Core Scope', true),
('form-prof', 'Professor Core Scope', true),

-- Institution Forms
('institution-form1', 'Director – Students welfare & Admission', true),
('institution-form2', 'Head - HR', true),
('institution-form3', 'Principal', true),
('institution-form4', 'Dean - IQAC', true),
('institution-form5', 'Director - Academics', true),
('institution-form6', 'Controller of Examinations', true),
('institution-form7', 'Executive Dean – International Affairs', true),
('institution-form8', 'Head - Placements', true),
('institution-form9', 'Placement Officer', true),
('institution-form10', 'Head – Training', true),
('institution-form11', 'Training Officer', true),
('institution-form12', 'Head - RISE', true),
('institution-form13', 'IT Infra – Coordinator', true),
('institution-form14', 'Website – Coordinator', true),
('institution-form15', 'ERP Coordinator', true),
('institution-form16', 'Public Relations Officer', true),
('institution-form17', 'Logistics Coordinator', true);

-- Create indexes for better performance
CREATE INDEX idx_formstatus_form_name ON formstatus(form_name);
CREATE INDEX idx_formstatus_is_open ON formstatus(is_open);
CREATE INDEX idx_formstatuslog_form_name ON formstatuslog(form_name);
CREATE INDEX idx_formstatuslog_changed_at ON formstatuslog(changed_at);

-- Create a function to automatically log status changes
CREATE OR REPLACE FUNCTION log_form_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.is_open IS DISTINCT FROM NEW.is_open THEN
        INSERT INTO formstatuslog (form_name, old_status, new_status, changed_by, reason)
        VALUES (NEW.form_name, OLD.is_open, NEW.is_open, NEW.updated_by, 
                CASE 
                    WHEN NEW.is_open THEN 'Form opened for submissions'
                    ELSE 'Form closed for submissions'
                END);
    END IF;
    
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically log changes
DROP TRIGGER IF EXISTS trigger_log_form_status_change ON formstatus;
CREATE TRIGGER trigger_log_form_status_change
    BEFORE UPDATE ON formstatus
    FOR EACH ROW
    EXECUTE FUNCTION log_form_status_change();

-- Enable Row Level Security (RLS)
ALTER TABLE formstatus ENABLE ROW LEVEL SECURITY;
ALTER TABLE formstatuslog ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and authenticated write
CREATE POLICY "Allow public read access on formstatus" ON formstatus
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on formstatus" ON formstatus
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on formstatus" ON formstatus
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access on formstatuslog" ON formstatuslog
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on formstatuslog" ON formstatuslog
    FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON formstatus TO anon;
GRANT SELECT, INSERT ON formstatuslog TO anon;
GRANT USAGE ON SEQUENCE formstatus_id_seq TO anon;
GRANT USAGE ON SEQUENCE formstatuslog_id_seq TO anon;

-- Add comments for documentation
COMMENT ON TABLE formstatus IS 'Controls which forms are open or closed for submissions';
COMMENT ON TABLE formstatuslog IS 'Logs all form status changes for audit trail';
COMMENT ON COLUMN formstatus.is_open IS 'Whether the form accepts new submissions (true=open, false=closed)';
COMMENT ON COLUMN formstatus.close_message IS 'Message shown when form is closed';
