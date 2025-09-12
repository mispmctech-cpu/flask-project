-- Create FormStatus table to control form availability
CREATE TABLE FormStatus (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) UNIQUE NOT NULL,
    form_title VARCHAR(200) NOT NULL,
    is_open BOOLEAN DEFAULT true,
    close_message TEXT DEFAULT 'This form is currently closed for submissions.',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100) DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create FormStatusLog table to track form status changes
CREATE TABLE FormStatusLog (
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) NOT NULL,
    old_status BOOLEAN,
    new_status BOOLEAN NOT NULL,
    changed_by VARCHAR(100) DEFAULT 'Admin',
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason TEXT
);

-- Insert initial form status records for all forms
INSERT INTO FormStatus (form_name, form_title, is_open) VALUES
-- Faculty Forms
('faculty-form1', 'Faculty Form 1 - Basic Information', true),
('faculty-form2', 'Faculty Form 2 - Academic Qualifications', true),
('faculty-form3', 'Faculty Form 3 - Professional Experience', true),
('faculty-form4', 'Faculty Form 4 - Research & Publications', true),
('faculty-form5', 'Faculty Form 5 - Achievements & Awards', true),
('faculty-form6', 'Faculty Form 6 - Professional Development', true),
('faculty-form7', 'Faculty Form 7 - Service & Leadership', true),
('faculty-form8', 'Faculty Form 8 - Additional Information', true),

-- Special Faculty Role Forms
('form-ap', 'Assistant Professor Application Form', true),
('form-asp', 'Associate Professor Application Form', true),
('form-prof', 'Professor Application Form', true),

-- Institution Forms
('institution-form1', 'Institution Form 1 - Institution Overview', true),
('institution-form2', 'Institution Form 2 - Infrastructure Details', true),
('institution-form3', 'Institution Form 3 - Academic Programs', true),
('institution-form4', 'Institution Form 4 - Faculty Details', true),
('institution-form5', 'Institution Form 5 - Student Information', true),
('institution-form6', 'Institution Form 6 - Research Activities', true),
('institution-form7', 'Institution Form 7 - Industry Collaboration', true),
('institution-form8', 'Institution Form 8 - Quality Assurance', true),
('institution-form9', 'Institution Form 9 - Financial Information', true),
('institution-form10', 'Institution Form 10 - Governance Structure', true),
('institution-form11', 'Institution Form 11 - Alumni Network', true),
('institution-form12', 'Institution Form 12 - Community Outreach', true),
('institution-form13', 'Institution Form 13 - Technology Integration', true),
('institution-form14', 'Institution Form 14 - Environmental Initiatives', true),
('institution-form15', 'Institution Form 15 - International Relations', true),
('institution-form16', 'Institution Form 16 - Innovation Programs', true),
('institution-form17', 'Institution Form 17 - Logistics Coordinator', true);

-- Create indexes for better performance
CREATE INDEX idx_formstatus_form_name ON FormStatus(form_name);
CREATE INDEX idx_formstatus_is_open ON FormStatus(is_open);
CREATE INDEX idx_formstatuslog_form_name ON FormStatusLog(form_name);
CREATE INDEX idx_formstatuslog_changed_at ON FormStatusLog(changed_at);

-- Create a function to automatically log status changes
CREATE OR REPLACE FUNCTION log_form_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.is_open IS DISTINCT FROM NEW.is_open THEN
        INSERT INTO FormStatusLog (form_name, old_status, new_status, changed_by, reason)
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
CREATE TRIGGER trigger_log_form_status_change
    BEFORE UPDATE ON FormStatus
    FOR EACH ROW
    EXECUTE FUNCTION log_form_status_change();

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON FormStatus TO anon;
GRANT SELECT, INSERT ON FormStatusLog TO anon;
GRANT USAGE ON SEQUENCE formstatus_id_seq TO anon;
GRANT USAGE ON SEQUENCE formstatuslog_id_seq TO anon;

-- Add comments for documentation
COMMENT ON TABLE FormStatus IS 'Controls which forms are open or closed for submissions';
COMMENT ON TABLE FormStatusLog IS 'Logs all form status changes for audit trail';
COMMENT ON COLUMN FormStatus.is_open IS 'Whether the form accepts new submissions';
COMMENT ON COLUMN FormStatus.close_message IS 'Message shown when form is closed';
