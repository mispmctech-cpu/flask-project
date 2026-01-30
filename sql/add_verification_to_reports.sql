-- Add verification_status column to daily_reports table
ALTER TABLE daily_reports
ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS verified_by VARCHAR(255),
ADD COLUMN IF NOT EXISTS verification_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS verification_comments TEXT;

-- Create an index on verification_status for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_reports_verification_status ON daily_reports(verification_status);
CREATE INDEX IF NOT EXISTS idx_daily_reports_department_verification ON daily_reports(department, verification_status);

-- Note: Similarly add verification columns to other category-specific tables if they exist:
-- daily_reports done above

-- Academic reports
ALTER TABLE academic_reports
ADD COLUMN verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN verified_by VARCHAR(255),
ADD COLUMN verification_date TIMESTAMP,
ADD COLUMN verification_comments TEXT;

CREATE INDEX IF NOT EXISTS idx_academic_reports_verification_status ON academic_reports(verification_status);
CREATE INDEX IF NOT EXISTS idx_academic_reports_department_verification ON academic_reports(department, verification_status);

-- Activity reports
ALTER TABLE activity_reports
ADD COLUMN verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN verified_by VARCHAR(255),
ADD COLUMN verification_date TIMESTAMP,
ADD COLUMN verification_comments TEXT;

CREATE INDEX IF NOT EXISTS idx_activity_reports_verification_status ON activity_reports(verification_status);
CREATE INDEX IF NOT EXISTS idx_activity_reports_department_verification ON activity_reports(department, verification_status);

-- Achievement reports
ALTER TABLE achievement_reports
ADD COLUMN verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN verified_by VARCHAR(255),
ADD COLUMN verification_date TIMESTAMP,
ADD COLUMN verification_comments TEXT;

CREATE INDEX IF NOT EXISTS idx_achievement_reports_verification_status ON achievement_reports(verification_status);
CREATE INDEX IF NOT EXISTS idx_achievement_reports_department_verification ON achievement_reports(department, verification_status);

-- Disciplinary reports
ALTER TABLE disciplinary_reports
ADD COLUMN verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN verified_by VARCHAR(255),
ADD COLUMN verification_date TIMESTAMP,
ADD COLUMN verification_comments TEXT;

CREATE INDEX IF NOT EXISTS idx_disciplinary_reports_verification_status ON disciplinary_reports(verification_status);
CREATE INDEX IF NOT EXISTS idx_disciplinary_reports_department_verification ON disciplinary_reports(department, verification_status);
