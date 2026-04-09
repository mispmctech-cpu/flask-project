-- =====================================================
-- ADMIN PAGES DATABASE SETUP - SAFE VERSION
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- This creates all tables needed for the admin dashboard

-- Drop existing tables if they exist (uncomment if you want to recreate)
-- DROP TABLE IF EXISTS public."FormStatusLog" CASCADE;
-- DROP TABLE IF EXISTS public."Notifications" CASCADE;
-- DROP TABLE IF EXISTS public."Forms" CASCADE;
-- DROP TABLE IF EXISTS public."FormStatus" CASCADE;
-- DROP TABLE IF EXISTS public."SystemSettings" CASCADE;
-- DROP TABLE IF EXISTS public."Departments" CASCADE;
-- DROP TABLE IF EXISTS public."Management" CASCADE;
-- DROP TABLE IF EXISTS public."IQAC" CASCADE;
-- DROP TABLE IF EXISTS public."Principal" CASCADE;
-- DROP TABLE IF EXISTS public."HOD" CASCADE;
-- DROP TABLE IF EXISTS public."Faculty" CASCADE;
-- DROP TABLE IF EXISTS public."Admin" CASCADE;

-- =====================================================
-- 1. ADMIN TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Admin" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  role character varying(50) NULL DEFAULT 'SUPER_ADMIN'::character varying,
  department character varying(50) NULL DEFAULT 'ADMINISTRATION'::character varying,
  is_active boolean NULL DEFAULT true,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  last_login timestamp without time zone NULL,
  CONSTRAINT Admin_pkey PRIMARY KEY (id),
  CONSTRAINT Admin_email_key UNIQUE (email)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_email ON public."Admin" USING btree (email);
CREATE INDEX IF NOT EXISTS idx_admin_active ON public."Admin" USING btree (is_active);

-- =====================================================
-- 2. FACULTY TABLE - Standard Structure
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Faculty" (
  id serial NOT NULL,
  name character varying(100) NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  employee_id character varying(50) NULL,
  department character varying(50) NULL,
  designation character varying(100) NULL,
  username character varying(100) NULL,
  phone character varying(20) NULL,
  date_of_joining date NULL,
  qualification character varying(200) NULL,
  experience_years integer NULL DEFAULT 0,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Faculty_pkey PRIMARY KEY (id),
  CONSTRAINT Faculty_email_key UNIQUE (email)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_faculty_email ON public."Faculty" USING btree (email);
CREATE INDEX IF NOT EXISTS idx_faculty_department ON public."Faculty" USING btree (department);
CREATE INDEX IF NOT EXISTS idx_faculty_employee_id ON public."Faculty" USING btree (employee_id);

-- =====================================================
-- 3. HOD TABLE - Standard Structure
-- =====================================================
CREATE TABLE IF NOT EXISTS public."HOD" (
  id serial NOT NULL,
  name character varying(100) NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  employee_id character varying(50) NULL,
  department character varying(50) NULL,
  phone character varying(20) NULL,
  date_of_joining date NULL,
  qualification character varying(200) NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT HOD_pkey PRIMARY KEY (id),
  CONSTRAINT HOD_email_key UNIQUE (email)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hod_email ON public."HOD" USING btree (email);
CREATE INDEX IF NOT EXISTS idx_hod_department ON public."HOD" USING btree (department);
CREATE INDEX IF NOT EXISTS idx_hod_employee_id ON public."HOD" USING btree (employee_id);

-- =====================================================
-- 4. PRINCIPAL TABLE - Standard Structure
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Principal" (
  id serial NOT NULL,
  name character varying(100) NULL,
  email character varying(255) NULL,
  password character varying(255) NULL,
  employee_id character varying(50) NULL,
  phone character varying(20) NULL,
  date_of_joining date NULL,
  qualification character varying(200) NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Principal_pkey PRIMARY KEY (id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_principal_email ON public."Principal" USING btree (email);
CREATE INDEX IF NOT EXISTS idx_principal_employee_id ON public."Principal" USING btree (employee_id);

-- =====================================================
-- 5. IQAC TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."IQAC" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  employee_id character varying(50) NULL,
  phone character varying(20) NULL,
  designation character varying(100) NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT IQAC_pkey PRIMARY KEY (id),
  CONSTRAINT IQAC_email_key UNIQUE (email)
);

-- =====================================================
-- 6. MANAGEMENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Management" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  employee_id character varying(50) NULL,
  designation character varying(100) NULL,
  phone character varying(20) NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Management_pkey PRIMARY KEY (id),
  CONSTRAINT Management_email_key UNIQUE (email)
);

-- =====================================================
-- 7. DEPARTMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Departments" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  code character varying(10) NOT NULL,
  description text NULL,
  is_active boolean NULL DEFAULT true,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Departments_pkey PRIMARY KEY (id),
  CONSTRAINT Departments_name_key UNIQUE (name),
  CONSTRAINT Departments_code_key UNIQUE (code)
);

-- =====================================================
-- 8. FORMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Forms" (
  id serial NOT NULL,
  form_name character varying(100) NOT NULL,
  form_type character varying(50) NOT NULL,
  description text NULL,
  is_active boolean NULL DEFAULT true,
  created_by integer NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Forms_pkey PRIMARY KEY (id),
  CONSTRAINT Forms_form_name_key UNIQUE (form_name)
);

-- =====================================================
-- 9. FORM STATUS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."FormStatus" (
  id serial NOT NULL,
  form_id integer NOT NULL,
  user_id integer NOT NULL,
  user_type character varying(20) NOT NULL,
  status character varying(20) NOT NULL DEFAULT 'PENDING'::character varying,
  submitted_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at timestamp without time zone NULL,
  reviewed_by integer NULL,
  comments text NULL,
  CONSTRAINT FormStatus_pkey PRIMARY KEY (id),
  CONSTRAINT FormStatus_form_id_fkey FOREIGN KEY (form_id) REFERENCES public."Forms"(id) ON DELETE CASCADE
);

-- =====================================================
-- 10. NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Notifications" (
  id serial NOT NULL,
  title character varying(200) NOT NULL,
  message text NOT NULL,
  type character varying(20) NULL DEFAULT 'INFO'::character varying,
  target_role character varying(20) NULL,
  target_user_id integer NULL,
  is_read boolean NULL DEFAULT false,
  created_by integer NOT NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamp without time zone NULL,
  CONSTRAINT Notifications_pkey PRIMARY KEY (id)
);

-- =====================================================
-- 11. SYSTEM SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."SystemSettings" (
  id serial NOT NULL,
  setting_key character varying(100) NOT NULL,
  setting_value text NULL,
  description text NULL,
  updated_by integer NULL,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT SystemSettings_pkey PRIMARY KEY (id),
  CONSTRAINT SystemSettings_setting_key_key UNIQUE (setting_key)
);

-- =====================================================
-- SAMPLE DATA INSERT
-- =====================================================

-- 1. Insert sample Admin data
INSERT INTO public."Admin" (name, email, password, role, department, is_active) VALUES
('Super Admin', 'admin@college.edu', 'admin123', 'SUPER_ADMIN', 'ADMINISTRATION', true),
('Assistant Admin', 'admin2@college.edu', 'admin123', 'ADMIN', 'ADMINISTRATION', true),
('System Admin', 'sysadmin@college.edu', 'admin123', 'SYSTEM_ADMIN', 'IT', true)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert sample Departments
INSERT INTO public."Departments" (name, code, description, is_active) VALUES
('Computer Science and Engineering', 'CSE', 'Department of Computer Science and Engineering', true),
('Electronics and Communication Engineering', 'ECE', 'Department of Electronics and Communication Engineering', true),
('Mechanical Engineering', 'MECH', 'Department of Mechanical Engineering', true),
('Civil Engineering', 'CIVIL', 'Department of Civil Engineering', true),
('Electrical and Electronics Engineering', 'EEE', 'Department of Electrical and Electronics Engineering', true),
('Information Technology', 'IT', 'Department of Information Technology', true),
('Aeronautical Engineering', 'AERO', 'Department of Aeronautical Engineering', true),
('Chemical Engineering', 'CHEM', 'Department of Chemical Engineering', true),
('AI and Data Science', 'AIDS', 'Department of Artificial Intelligence and Data Science', true),
('AI and Machine Learning', 'AIML', 'Department of Artificial Intelligence and Machine Learning', true),
('Computer Science and Business Systems', 'CSBS', 'Department of Computer Science and Business Systems', true),
('Master of Computer Applications', 'MCA', 'Department of Master of Computer Applications', true),
('Master of Business Administration', 'MBA', 'Department of Master of Business Administration', true),
('Science and Humanities', 'S&H', 'Department of Science and Humanities', true),
('Management Studies', 'MCO', 'Department of Management Studies', true)
ON CONFLICT (name) DO NOTHING;

-- 3. Insert sample Faculty data (using existing column names)
INSERT INTO public."Faculty" (
  name, email, password, employee_id, 
  department, designation, 
  username, phone, qualification, experience_years
) VALUES
('Dr. John Smith', 'john.smith@college.edu', 'faculty123', 'EMP001', 
 'CSE', 'Professor', 'jsmith', '9876543210', 'Ph.D in Computer Science', 10),
('Dr. Jane Doe', 'jane.doe@college.edu', 'faculty123', 'EMP002',
 'ECE', 'Associate Professor', 'jdoe', '9876543211', 'Ph.D in Electronics', 8),
('Prof. Mike Johnson', 'mike.johnson@college.edu', 'faculty123', 'EMP003',
 'MECH', 'Assistant Professor', 'mjohnson', '9876543212', 'M.Tech in Mechanical', 5)
ON CONFLICT (email) DO NOTHING;

-- 4. Insert sample HOD data (using existing column names)
INSERT INTO public."HOD" (
  name, email, password, employee_id,
  department, phone, qualification
) VALUES
('Dr. Sarah Wilson', 'sarah.wilson@college.edu', 'hod123', 'HOD001',
 'CSE', '9876540001', 'Ph.D in Computer Science'),
('Dr. Robert Brown', 'robert.brown@college.edu', 'hod123', 'HOD002',
 'ECE', '9876540002', 'Ph.D in Electronics'),
('Dr. Lisa Davis', 'lisa.davis@college.edu', 'hod123', 'HOD003',
 'MECH', '9876540003', 'Ph.D in Mechanical Engineering')
ON CONFLICT (email) DO NOTHING;

-- 5. Insert sample Principal data (using existing column names)
INSERT INTO public."Principal" (
  name, email, password, 
  employee_id, phone, qualification
) VALUES
('Dr. Principal Name', 'principal@college.edu', 'principal123', 
 'PRIN001', '9876500001', 'Ph.D in Administration')
ON CONFLICT (email) DO NOTHING;

-- 6. Insert sample IQAC data
INSERT INTO public."IQAC" (name, email, password, employee_id, phone, designation) VALUES
('Dr. IQAC Coordinator', 'iqac@college.edu', 'iqac123', 'IQAC001', '9876550001', 'IQAC Coordinator')
ON CONFLICT (email) DO NOTHING;

-- 7. Insert sample Management data
INSERT INTO public."Management" (name, email, password, employee_id, designation, phone) VALUES
('Management Head', 'management@college.edu', 'mgmt123', 'MGMT001', 'Management Head', '9876560001'),
('Finance Manager', 'finance@college.edu', 'mgmt123', 'MGMT002', 'Finance Manager', '9876560002')
ON CONFLICT (email) DO NOTHING;

-- 8. Insert sample Forms
INSERT INTO public."Forms" (form_name, form_type, description, is_active, created_by) VALUES
('Faculty Form 1', 'FACULTY', 'Basic Information Form', true, 1),
('Faculty Form 2', 'FACULTY', 'Academic Details Form', true, 1),
('Faculty Form 3', 'FACULTY', 'Research Publications Form', true, 1),
('Institution Form 1', 'INSTITUTION', 'Institution Details Form', true, 1),
('Institution Form 2', 'INSTITUTION', 'Infrastructure Form', true, 1)
ON CONFLICT (form_name) DO NOTHING;

-- 9. Insert sample System Settings
INSERT INTO public."SystemSettings" (setting_key, setting_value, description, updated_by) VALUES
('ACADEMIC_YEAR', '2024-25', 'Current Academic Year', 1),
('INSTITUTION_NAME', 'Sample College of Engineering', 'Name of the Institution', 1),
('NOTIFICATION_EMAIL', 'notifications@college.edu', 'Email for system notifications', 1),
('MAX_FILE_SIZE', '10', 'Maximum file upload size in MB', 1)
ON CONFLICT (setting_key) DO NOTHING;

-- =====================================================
-- CREATE TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to all tables with updated_at column
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON public."Admin" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public."Faculty" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hod_updated_at BEFORE UPDATE ON public."HOD" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_principal_updated_at BEFORE UPDATE ON public."Principal" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_iqac_updated_at BEFORE UPDATE ON public."IQAC" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_management_updated_at BEFORE UPDATE ON public."Management" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public."Departments" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON public."Forms" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public."SystemSettings" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE 'Admin Pages Database Setup Complete!';
    RAISE NOTICE 'Created tables: Admin, Faculty, HOD, Principal, IQAC, Management, Departments, Forms, FormStatus, Notifications, SystemSettings';
    RAISE NOTICE 'Sample data inserted for all user types';
    RAISE NOTICE 'You can now test the admin login with: admin@college.edu / admin123';
END $$;

-- =====================================================
-- 5. IQAC TABLE (Updated to match application structure)
-- =====================================================
CREATE TABLE IF NOT EXISTS public."IQAC" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  employee_id character varying(50) NULL,
  designation character varying(100) NULL,
  phone character varying(20) NULL,
  department character varying(50) NULL DEFAULT 'IQAC'::character varying,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT IQAC_pkey PRIMARY KEY (id),
  CONSTRAINT IQAC_email_key UNIQUE (email),
  CONSTRAINT IQAC_employee_id_key UNIQUE (employee_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_iqac_email ON public."IQAC" USING btree (email);

-- =====================================================
-- 6. MANAGEMENT TABLE (Updated to match application structure)
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Management" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  designation character varying(100) NULL,
  phone character varying(20) NULL,
  department character varying(50) NULL DEFAULT 'MANAGEMENT'::character varying,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Management_pkey PRIMARY KEY (id),
  CONSTRAINT Management_email_key UNIQUE (email)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_management_email ON public."Management" USING btree (email);

-- =====================================================
-- 7. DEPARTMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Departments" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  code character varying(20) NOT NULL,
  description text NULL,
  established_year integer NULL,
  is_active boolean NULL DEFAULT true,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Departments_pkey PRIMARY KEY (id),
  CONSTRAINT Departments_name_key UNIQUE (name),
  CONSTRAINT Departments_code_key UNIQUE (code)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_departments_code ON public."Departments" USING btree (code);
CREATE INDEX IF NOT EXISTS idx_departments_active ON public."Departments" USING btree (is_active);

-- =====================================================
-- 8. FORMS TABLE (for form management)
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Forms" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  description text NULL,
  form_type character varying(50) NULL,
  is_enabled boolean NULL DEFAULT true,
  target_roles text[] NULL, -- Array of roles who can access this form
  created_by integer NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Forms_pkey PRIMARY KEY (id),
  CONSTRAINT Forms_name_key UNIQUE (name),
  CONSTRAINT Forms_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."Admin"(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_forms_enabled ON public."Forms" USING btree (is_enabled);
CREATE INDEX IF NOT EXISTS idx_forms_type ON public."Forms" USING btree (form_type);

-- =====================================================
-- 8b. FORM STATUS TABLE (Referenced in admin dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS public."FormStatus" (
  id serial NOT NULL,
  form_name character varying(100) NOT NULL,
  is_open boolean NULL DEFAULT true,
  description text NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT FormStatus_pkey PRIMARY KEY (id),
  CONSTRAINT FormStatus_form_name_key UNIQUE (form_name)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_formstatus_open ON public."FormStatus" USING btree (is_open);

-- =====================================================
-- 9. NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Notifications" (
  id serial NOT NULL,
  title character varying(200) NOT NULL,
  message text NOT NULL,
  notification_type character varying(50) NULL DEFAULT 'GENERAL'::character varying,
  priority character varying(20) NULL DEFAULT 'NORMAL'::character varying,
  target_roles text[] NULL, -- Array of roles to receive notification
  target_departments text[] NULL, -- Array of departments to receive notification
  can_view text[] NULL, -- Roles that can view
  can_delete text[] NULL, -- Roles that can delete
  start_date timestamp without time zone NULL,
  end_date timestamp without time zone NULL,
  is_active boolean NULL DEFAULT true,
  created_by integer NULL,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Notifications_pkey PRIMARY KEY (id),
  CONSTRAINT Notifications_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."Admin"(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_active ON public."Notifications" USING btree (is_active);
CREATE INDEX IF NOT EXISTS idx_notifications_dates ON public."Notifications" USING btree (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public."Notifications" USING btree (notification_type);

-- =====================================================
-- 10. FORM STATUS LOG TABLE (for audit trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS public."FormStatusLog" (
  id serial NOT NULL,
  form_name character varying(100) NOT NULL,
  old_status boolean NULL,
  new_status boolean NOT NULL,
  changed_by integer NULL,
  changed_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  reason text NULL,
  CONSTRAINT FormStatusLog_pkey PRIMARY KEY (id),
  CONSTRAINT FormStatusLog_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public."Admin"(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_formstatuslog_date ON public."FormStatusLog" USING btree (changed_at);
CREATE INDEX IF NOT EXISTS idx_formstatuslog_form ON public."FormStatusLog" USING btree (form_name);

-- =====================================================
-- 11. SYSTEM SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."SystemSettings" (
  id serial NOT NULL,
  setting_key character varying(100) NOT NULL,
  setting_value text NULL,
  description text NULL,
  category character varying(50) NULL DEFAULT 'GENERAL'::character varying,
  is_editable boolean NULL DEFAULT true,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT SystemSettings_pkey PRIMARY KEY (id),
  CONSTRAINT SystemSettings_setting_key_key UNIQUE (setting_key)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_systemsettings_key ON public."SystemSettings" USING btree (setting_key);
CREATE INDEX IF NOT EXISTS idx_systemsettings_category ON public."SystemSettings" USING btree (category);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default admin
INSERT INTO public."Admin" (name, email, password, role, department, is_active)
VALUES ('Administrator', 'admin@pmctech.org', 'admin123', 'SUPER_ADMIN', 'ADMINISTRATION', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample faculty data (using lowercase column names)
INSERT INTO public."Faculty" (name, email, password, employee_id, department, designation, username) VALUES
('Dr. John Smith', 'john.smith@pmctech.org', 'faculty123', 'F001', 'CSE', 'Professor', 'johnsmith'),
('Dr. Jane Doe', 'jane.doe@pmctech.org', 'faculty123', 'F002', 'ECE', 'Associate Professor', 'janedoe'),
('Mr. Mike Johnson', 'mike.johnson@pmctech.org', 'faculty123', 'F003', 'MECH', 'Assistant Professor', 'mikejohnson')
ON CONFLICT (email) DO NOTHING;

-- Insert sample HOD data (using lowercase column names)
INSERT INTO public."HOD" (name, email, password, employee_id, department) VALUES
('Dr. Alice Brown', 'alice.brown@pmctech.org', 'hod123', 'H001', 'CSE'),
('Dr. Bob Wilson', 'bob.wilson@pmctech.org', 'hod123', 'H002', 'ECE')
ON CONFLICT (email) DO NOTHING;

-- Insert sample Principal data (using lowercase column names)
INSERT INTO public."Principal" (name, email, password, employee_id) VALUES
('Dr. Principal Singh', 'principal@pmctech.org', 'principal123', 'P001')
ON CONFLICT (email) DO NOTHING;

-- Insert sample IQAC data  
INSERT INTO public."IQAC" (name, email, password, employee_id, designation) VALUES
('Dr. IQAC Head', 'iqac@pmctech.org', 'iqac123', 'I001', 'IQAC Coordinator')
ON CONFLICT (email) DO NOTHING;

-- Insert sample Management data
INSERT INTO public."Management" (name, email, password, designation) VALUES
('Mr. Management Head', 'management@pmctech.org', 'management123', 'Director')
ON CONFLICT (email) DO NOTHING;

-- Insert default departments
INSERT INTO public."Departments" (name, code, description, is_active) VALUES
('Aeronautical Engineering', 'AERO', 'Department of Aeronautical Engineering', true),
('Artificial Intelligence & Data Science', 'AIDS', 'Department of AI & Data Science', true),
('Artificial Intelligence & Machine Learning', 'AIML', 'Department of AI & Machine Learning', true),
('Chemical Engineering', 'CHEM', 'Department of Chemical Engineering', true),
('Civil Engineering', 'CIVIL', 'Department of Civil Engineering', true),
('Computer Science & Business Systems', 'CSBS', 'Department of Computer Science & Business Systems', true),
('Computer Science & Engineering', 'CSE', 'Department of Computer Science & Engineering', true),
('Electronics & Communication Engineering', 'ECE', 'Department of Electronics & Communication Engineering', true),
('Electrical & Electronics Engineering', 'EEE', 'Department of Electrical & Electronics Engineering', true),
('Information Technology', 'IT', 'Department of Information Technology', true),
('Master of Business Administration', 'MBA', 'Department of Management Studies', true),
('Master of Computer Applications', 'MCA', 'Department of Computer Applications', true),
('Master of Computer Applications', 'MCO', 'Department of Computer Applications', true),
('Mechanical Engineering', 'MECH', 'Department of Mechanical Engineering', true),
('Science & Humanities V1', 'S&H V1', 'Department of Science & Humanities', true),
('Science & Humanities V2', 'S&H V2', 'Department of Science & Humanities', true),
('Science & Humanities V3', 'S&H V3', 'Department of Science & Humanities', true),
('Science & Humanities V4', 'S&H V4', 'Department of Science & Humanities', true)
ON CONFLICT (code) DO NOTHING;

-- Insert default forms for FormStatus table
INSERT INTO public."FormStatus" (form_name, is_open, description) VALUES
('Faculty Form 1', true, 'Faculty Registration Form'),
('Faculty Form 2', true, 'Faculty Profile Update'),
('Faculty Form 3', false, 'Faculty Achievement Form'),
('Faculty Form 4', true, 'Faculty Research Form'),
('Faculty Form 5', true, 'Faculty Publication Form'),
('Faculty Form 6', false, 'Faculty Training Form'),
('Faculty Form 7', true, 'Faculty Feedback Form'),
('Faculty Form 8', true, 'Faculty Leave Form'),
('Institution Form 1', true, 'Institutional Registration'),
('Institution Form 2', false, 'Institutional Profile')
ON CONFLICT (form_name) DO NOTHING;

-- Insert default forms
INSERT INTO public."Forms" (name, description, form_type, is_enabled, target_roles) VALUES
('Faculty Form 1', 'Faculty Registration Form', 'FACULTY', true, '{"Faculty", "HOD"}'),
('Faculty Form 2', 'Faculty Profile Update', 'FACULTY', true, '{"Faculty"}'),
('Faculty Form 3', 'Faculty Achievement Form', 'FACULTY', true, '{"Faculty"}'),
('Faculty Form 4', 'Faculty Research Form', 'FACULTY', true, '{"Faculty"}'),
('Faculty Form 5', 'Faculty Publication Form', 'FACULTY', true, '{"Faculty"}'),
('Faculty Form 6', 'Faculty Training Form', 'FACULTY', true, '{"Faculty"}'),
('Faculty Form 7', 'Faculty Feedback Form', 'FACULTY', true, '{"Faculty"}'),
('Faculty Form 8', 'Faculty Leave Form', 'FACULTY', true, '{"Faculty", "HOD"}'),
('Institution Form 1', 'Institutional Registration', 'INSTITUTION', true, '{"Admin", "Management"}'),
('Institution Form 2', 'Institutional Profile', 'INSTITUTION', true, '{"Admin", "Management"}')
ON CONFLICT (name) DO NOTHING;

-- Insert default system settings
INSERT INTO public."SystemSettings" (setting_key, setting_value, description, category) VALUES
('system_name', 'PMC Tech Admin System', 'System display name', 'GENERAL'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode', 'SYSTEM'),
('max_file_upload_size', '10485760', 'Maximum file upload size in bytes (10MB)', 'FILES'),
('session_timeout', '3600', 'Session timeout in seconds (1 hour)', 'SECURITY'),
('password_min_length', '6', 'Minimum password length', 'SECURITY'),
('email_notifications', 'true', 'Enable email notifications', 'NOTIFICATIONS')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert sample notification
INSERT INTO public."Notifications" (title, message, notification_type, priority, target_roles, is_active, created_by)
SELECT 
  'Welcome to Admin System', 
  'The admin system has been successfully set up and is ready for use.',
  'SYSTEM',
  'HIGH',
  '{"Admin", "Management", "Principal", "IQAC", "HOD", "Faculty"}',
  true,
  (SELECT id FROM public."Admin" WHERE email = 'admin@pmctech.org' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM public."Admin" WHERE email = 'admin@pmctech.org');

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (Optional - Uncomment if needed)
-- =====================================================

-- Enable RLS on all tables
-- ALTER TABLE public."Admin" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Faculty" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."HOD" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Principal" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."IQAC" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Management" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Departments" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Forms" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Notifications" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."FormStatusLog" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."SystemSettings" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check table creation
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('Admin', 'Faculty', 'HOD', 'Principal', 'IQAC', 'Management', 'Departments', 'Forms', 'Notifications', 'FormStatusLog', 'SystemSettings')
ORDER BY tablename;

-- Check record counts
SELECT 'Admin' as table_name, COUNT(*) as record_count FROM public."Admin"
UNION ALL
SELECT 'Faculty', COUNT(*) FROM public."Faculty"
UNION ALL
SELECT 'HOD', COUNT(*) FROM public."HOD"
UNION ALL
SELECT 'Principal', COUNT(*) FROM public."Principal"
UNION ALL
SELECT 'IQAC', COUNT(*) FROM public."IQAC"
UNION ALL
SELECT 'Management', COUNT(*) FROM public."Management"
UNION ALL
SELECT 'Departments', COUNT(*) FROM public."Departments"
UNION ALL
SELECT 'Forms', COUNT(*) FROM public."Forms"
UNION ALL
SELECT 'Notifications', COUNT(*) FROM public."Notifications"
UNION ALL
SELECT 'SystemSettings', COUNT(*) FROM public."SystemSettings";

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your admin dashboard database is now ready!
-- Default admin login: admin@pmctech.org / admin123