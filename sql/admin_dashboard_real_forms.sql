-- =====================================================
-- ADMIN DASHBOARD SETUP - BASED ON EXISTING FORM TABLES
-- =====================================================
-- This creates proper FormStatus table based on your existing form tables

-- =====================================================
-- 1. FIRST - CHECK WHAT FORM TABLES AND COLUMNS EXIST
-- =====================================================
SELECT 'EXISTING FORM TABLES:' as info;
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND (tablename LIKE '%form%' OR tablename LIKE '%Form%')
ORDER BY tablename;

-- Check existing FormStatus table structure
SELECT 'FORMSTATUS TABLE STRUCTURE:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'FormStatus'
ORDER BY ordinal_position;

-- =====================================================
-- 2. ADD MISSING COLUMNS TO EXISTING FORMSTATUS TABLE
-- =====================================================
-- Add columns if they don't exist
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS table_name text;
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS category text DEFAULT 'faculty';
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS frequency text;
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS form_type text;
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS target_roles text[];
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS created_at timestamp DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public."FormStatus" ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT CURRENT_TIMESTAMP;

-- Add unique constraint on table_name if it doesn't exist
DO $$
BEGIN
    ALTER TABLE public."FormStatus" ADD CONSTRAINT FormStatus_table_name_key UNIQUE (table_name);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

-- =====================================================
-- 3. UPDATE EXISTING FORMSTATUS WITH YOUR ACTUAL FORM TABLES
-- =====================================================

-- First, let's update existing records with table names if they exist
UPDATE public."FormStatus" 
SET table_name = CASE 
    WHEN form_name LIKE 'Faculty Form 1%' AND description LIKE '%Weekly%' THEN 'form1-Weekly'
    WHEN form_name LIKE 'Faculty Form 1%' AND description LIKE '%Bi-weekly%' THEN 'form1-once in 15 days'
    WHEN form_name LIKE 'Faculty Form 2%' AND description LIKE '%Daily%' THEN 'form2-daily'
    WHEN form_name LIKE 'Faculty Form 2%' AND description LIKE '%Weekly%' THEN 'form2-weekly'
    WHEN form_name LIKE 'Faculty Form 3%' THEN 'form3-Weekly'
    WHEN form_name LIKE 'Faculty Form 4%' THEN 'form4-Weekly'
    WHEN form_name LIKE 'Faculty Form 5%' THEN 'form5-Once in a 3 Months'
    WHEN form_name LIKE 'Faculty Form 6%' THEN 'form6-weekly'
    WHEN form_name LIKE 'Faculty Form 7%' THEN 'form7-Weekly'
    WHEN form_name LIKE 'Faculty Form 8%' THEN 'form8-Once in Semester'
    WHEN form_name LIKE 'Institution Form 1%' THEN 'Institution-form1-monthly'
    WHEN form_name LIKE 'Institution Form 2%' THEN 'Institution-form2'
    ELSE form_name
END,
display_name = COALESCE(form_name, 'Unknown Form'),
category = CASE 
    WHEN form_name LIKE 'Faculty%' THEN 'faculty'
    WHEN form_name LIKE 'Institution%' THEN 'institution'
    ELSE 'faculty'
END
WHERE table_name IS NULL OR table_name = '';

-- Now insert the remaining forms that don't exist
INSERT INTO public."FormStatus" (table_name, display_name, is_open, description, category, frequency) VALUES
-- Faculty Forms (based on your table names)
('form1-Weekly', 'Faculty Form 1 - Weekly', true, 'Weekly faculty submission form', 'faculty', 'Weekly'),
('form1-once in 15 days', 'Faculty Form 1 - Bi-weekly', true, 'Bi-weekly faculty submission', 'faculty', 'Once in 15 days'),
('form1-once in a semester', 'Faculty Form 1 - Semester', true, 'Semester faculty form', 'faculty', 'Once in a semester'),
('form1-once in a year', 'Faculty Form 1 - Yearly', true, 'Yearly faculty form', 'faculty', 'Once in a year'),
('form2-daily', 'Faculty Form 2 - Daily', true, 'Daily faculty activities', 'faculty', 'Daily'),
('form2-once in a month', 'Faculty Form 2 - Monthly', true, 'Monthly faculty report', 'faculty', 'Once in a month'),
('form2-once in a semester', 'Faculty Form 2 - Semester', true, 'Semester faculty report', 'faculty', 'Once in a semester'),
('form2-weekly', 'Faculty Form 2 - Weekly', true, 'Weekly faculty report', 'faculty', 'Weekly'),
('form3- once in 15 days', 'Faculty Form 3 - Bi-weekly', false, 'Bi-weekly academic form', 'faculty', 'Once in 15 days'),
('form3-Weekly', 'Faculty Form 3 - Weekly', true, 'Weekly academic form', 'faculty', 'Weekly'),
('form3-once in a semester', 'Faculty Form 3 - Semester', true, 'Semester academic form', 'faculty', 'Once in a semester'),
('form4-Weekly', 'Faculty Form 4 - Weekly', true, 'Weekly teaching form', 'faculty', 'Weekly'),
('form4-once in a month', 'Faculty Form 4 - Monthly', true, 'Monthly teaching report', 'faculty', 'Once in a month'),
('form4-once in a semester', 'Faculty Form 4 - Semester', true, 'Semester teaching report', 'faculty', 'Once in a semester'),
('form5-Once in a 3 Months', 'Faculty Form 5 - Quarterly', true, 'Quarterly development form', 'faculty', 'Once in 3 months'),
('form5-once in a semester', 'Faculty Form 5 - Semester', true, 'Semester development form', 'faculty', 'Once in a semester'),
('form5-weekly', 'Faculty Form 5 - Weekly', false, 'Weekly development activities', 'faculty', 'Weekly'),
('form6-once in 2 month', 'Faculty Form 6 - Bi-monthly', false, 'Bi-monthly administrative form', 'faculty', 'Once in 2 months'),
('form6-once in a semester', 'Faculty Form 6 - Semester', true, 'Semester administrative form', 'faculty', 'Once in a semester'),
('form6-weekly', 'Faculty Form 6 - Weekly', true, 'Weekly administrative tasks', 'faculty', 'Weekly'),
('form7-Once in 2 Months', 'Faculty Form 7 - Bi-monthly', true, 'Bi-monthly feedback form', 'faculty', 'Once in 2 months'),
('form7-Once in a Semester', 'Faculty Form 7 - Semester', true, 'Semester feedback form', 'faculty', 'Once in a semester'),
('form7-Weekly', 'Faculty Form 7 - Weekly', true, 'Weekly feedback form', 'faculty', 'Weekly'),
('form8-Once in Semester', 'Faculty Form 8 - Semester', true, 'Semester extension activities', 'faculty', 'Once in semester'),
('form8-once in 3 Months', 'Faculty Form 8 - Quarterly', true, 'Quarterly extension activities', 'faculty', 'Once in 3 months'),
('form8-weekly', 'Faculty Form 8 - Weekly', false, 'Weekly extension activities', 'faculty', 'Weekly'),

-- Institution Forms  
('Institution-form1-monthly', 'Institution Form 1 - Monthly', true, 'Monthly infrastructure report', 'institution', 'Monthly'),
('Institution-form1-once in six months', 'Institution Form 1 - Semi-annual', true, 'Semi-annual infrastructure report', 'institution', 'Once in six months'),
('Institution-form2', 'Institution Form 2', true, 'General institutional form', 'institution', 'As needed'),
('Institution-form3', 'Institution Form 3', true, 'Budget and planning form', 'institution', 'As needed'),
('Institution-form4-monthly', 'Institution Form 4 - Monthly', true, 'Monthly quality report', 'institution', 'Monthly'),
('Institution-form4-once in six months', 'Institution Form 4 - Semi-annual', false, 'Semi-annual quality report', 'institution', 'Once in six months'),
('Institution-form5', 'Institution Form 5', false, 'External relations form', 'institution', 'As needed'),
('Institution-form6-monthly', 'Institution Form 6 - Monthly', true, 'Monthly technology report', 'institution', 'Monthly'),
('Institution-form6-oncein6months', 'Institution Form 6 - Semi-annual', true, 'Semi-annual technology report', 'institution', 'Once in six months'),
('Institution-form7-monthly', 'Institution Form 7 - Monthly', true, 'Monthly services report', 'institution', 'Monthly'),
('Institution-form8', 'Institution Form 8', true, 'Library and resources form', 'institution', 'As needed'),
('Institution-form9', 'Institution Form 9', false, 'Alumni network form', 'institution', 'As needed'),
('Institution-form10', 'Institution Form 10', true, 'Research and development form', 'institution', 'As needed'),
('Institution-form10 once in six months', 'Institution Form 10 - Semi-annual', true, 'Semi-annual R&D report', 'institution', 'Once in six months'),
('Institution-form11', 'Institution Form 11', false, 'Industry partnerships form', 'institution', 'As needed'),
('Institution-form12', 'Institution Form 12', true, 'Safety and security form', 'institution', 'As needed'),
('Institution-form13-monthly', 'Institution Form 13 - Monthly', true, 'Monthly compliance report', 'institution', 'Monthly'),
('Institution-form13-once in year', 'Institution Form 13 - Yearly', true, 'Yearly compliance report', 'institution', 'Once in year'),
('Institution-form13-oncein6months', 'Institution Form 13 - Semi-annual', false, 'Semi-annual compliance report', 'institution', 'Once in six months'),
('Institution-form14-monthly', 'Institution Form 14 - Monthly', false, 'Monthly international relations', 'institution', 'Monthly'),
('Institution-form14-oncein6months', 'Institution Form 14 - Semi-annual', false, 'Semi-annual international relations', 'institution', 'Once in six months'),
('Institution-form15', 'Institution Form 15', true, 'Innovation hub form', 'institution', 'As needed'),
('Institution-form16', 'Institution Form 16', false, 'Entrepreneurship programs form', 'institution', 'As needed'),
('Institution-form17', 'Institution Form 17', true, 'Digital transformation form', 'institution', 'As needed'),

-- Special Forms
('AP', 'Associate Professor Form', true, 'Associate Professor portfolio form', 'faculty', 'As needed'),
('ASP', 'Assistant Professor Form', true, 'Assistant Professor portfolio form', 'faculty', 'As needed'),
('Prof', 'Professor Form', true, 'Professor portfolio form', 'faculty', 'As needed')

ON CONFLICT (table_name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  is_open = EXCLUDED.is_open,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  frequency = EXCLUDED.frequency;

-- =====================================================
-- 4. CREATE FORMSTATUSLOG TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public."FormStatusLog" (
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  table_name text NOT NULL,
  form_name text NOT NULL,
  old_status boolean NULL,
  new_status boolean NOT NULL,
  changed_by bigint NULL,
  changed_at timestamp DEFAULT CURRENT_TIMESTAMP,
  reason text NULL,
  CONSTRAINT FormStatusLog_pkey PRIMARY KEY (id)
);

-- =====================================================
-- 5. CREATE OTHER NECESSARY TABLES
-- =====================================================

-- Notifications table
CREATE TABLE IF NOT EXISTS public."Notifications" (
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  priority text DEFAULT 'normal',
  target_role text NULL,
  target_department text NULL,
  is_active boolean DEFAULT true,
  is_read boolean DEFAULT false,
  created_by bigint NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamp NULL,
  CONSTRAINT Notifications_pkey PRIMARY KEY (id)
);

-- System Settings table
CREATE TABLE IF NOT EXISTS public."SystemSettings" (
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  setting_key text NOT NULL,
  setting_value text NULL,
  description text NULL,
  category text DEFAULT 'general',
  is_editable boolean DEFAULT true,
  data_type text DEFAULT 'string',
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT SystemSettings_pkey PRIMARY KEY (id),
  CONSTRAINT SystemSettings_setting_key_key UNIQUE (setting_key)
);

-- =====================================================
-- 6. ADD SAMPLE NOTIFICATIONS
-- =====================================================
INSERT INTO public."Notifications" (title, message, type, priority, target_role, is_active) VALUES
('System Ready', 'Admin dashboard is fully operational with all form controls active', 'success', 'high', 'admin', true),
('Forms Management', 'Faculty and Institution forms are now manageable through admin panel', 'info', 'normal', 'admin', true),
('Welcome Message', 'Welcome to PMC Tech Admin Dashboard - All systems operational', 'info', 'normal', 'all', true);

-- =====================================================
-- 7. ADD SYSTEM SETTINGS
-- =====================================================
INSERT INTO public."SystemSettings" (setting_key, setting_value, description, category) VALUES
('system_name', 'PMC Tech Admin System', 'System display name', 'general'),
('academic_year', '2024-25', 'Current academic year', 'academic'),
('semester', 'Odd Semester', 'Current semester', 'academic'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode', 'system')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- =====================================================
-- 8. ADD SAMPLE ACTIVITY LOGS
-- =====================================================
INSERT INTO public."FormStatusLog" (table_name, form_name, old_status, new_status, changed_by, reason) VALUES
('form3- once in 15 days', 'Faculty Form 3 - Bi-weekly', true, false, 1, 'Temporarily disabled for updates'),
('form5-weekly', 'Faculty Form 5 - Weekly', true, false, 1, 'Under review by academic committee'),
('Institution-form4-once in six months', 'Institution Form 4 - Semi-annual', true, false, 1, 'Pending management approval'),
('Institution-form5', 'Institution Form 5', false, true, 1, 'Re-enabled after review'),
('form6-once in 2 month', 'Faculty Form 6 - Bi-monthly', true, false, 1, 'Administrative review in progress');

-- =====================================================
-- 9. CREATE INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_formstatus_open ON public."FormStatus" (is_open);
CREATE INDEX IF NOT EXISTS idx_formstatus_category ON public."FormStatus" (category);
CREATE INDEX IF NOT EXISTS idx_notifications_active ON public."Notifications" (is_active);
CREATE INDEX IF NOT EXISTS idx_formlog_date ON public."FormStatusLog" (changed_at DESC);

-- =====================================================
-- 10. VERIFICATION
-- =====================================================
SELECT 'ADMIN DASHBOARD SETUP COMPLETE!' as status;

-- Show form counts by category and status
SELECT 
    'FORM STATUS SUMMARY:' as info,
    category,
    COUNT(*) as total_forms,
    SUM(CASE WHEN is_open THEN 1 ELSE 0 END) as open_forms,
    SUM(CASE WHEN NOT is_open THEN 1 ELSE 0 END) as closed_forms
FROM public."FormStatus"
GROUP BY category
ORDER BY category;

-- Show recent activity
SELECT 'RECENT FORM ACTIVITIES:' as info;
SELECT form_name, 
       CASE WHEN new_status THEN 'OPENED' ELSE 'CLOSED' END as action,
       reason,
       changed_at
FROM public."FormStatusLog" 
ORDER BY changed_at DESC 
LIMIT 5;

-- Show notification count
SELECT 'SYSTEM STATUS:' as info;
SELECT COUNT(*) as active_notifications FROM public."Notifications" WHERE is_active = true;
SELECT COUNT(*) as total_forms FROM public."FormStatus";
SELECT COUNT(*) as open_forms FROM public."FormStatus" WHERE is_open = true;

-- =====================================================
-- YOUR ADMIN DASHBOARD IS NOW READY!
-- =====================================================
-- The FormStatus table now reflects your actual form tables
-- Admin can now control all your existing forms
-- Dashboard will show real statistics from your data
-- =====================================================
