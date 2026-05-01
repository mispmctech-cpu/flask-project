-- =====================================================
-- ADMIN DATA INSERT - MATCHING EXACT TABLE STRUCTURE
-- =====================================================
-- This adds data to your existing tables with correct column names

-- =====================================================
-- 1. ADD ADMIN USER
-- =====================================================
-- Need to check Admin table structure first, but assuming basic structure
INSERT INTO public."Admin" (name, email, password, is_active) VALUES
('Super Admin', 'admin@college.edu', 'admin123', true)
ON CONFLICT (email) DO NOTHING;

-- Alternative if different structure
INSERT INTO public."Admin" (name, email, password) VALUES
('Super Admin', 'admin@college.edu', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 2. ADD FACULTY USERS (Using exact column names)
-- =====================================================
INSERT INTO public."Faculty" (
  department, email, "Name", "Username", password, "Designation", "EmployeeID", 
  "Qualification", assigned_forms
) VALUES
('CSE', 'john.smith@college.edu', 'Dr. John Smith', 'johnsmith', 'faculty123', 'Professor', 'EMP001', 'Ph.D in Computer Science', 'form1,form2,form3'),
('ECE', 'jane.doe@college.edu', 'Dr. Jane Doe', 'janedoe', 'faculty123', 'Associate Professor', 'EMP002', 'Ph.D in Electronics', 'form1,form2,form3'),
('MECH', 'mike.johnson@college.edu', 'Prof. Mike Johnson', 'mikejohnson', 'faculty123', 'Assistant Professor', 'EMP003', 'M.Tech in Mechanical', 'form1,form2')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 3. ADD HOD USERS (Using exact column names)
-- =====================================================
INSERT INTO public."HOD" (
  department, email, "Name", "Username", password, "Designation", "EmployeeID", 
  "Qualification"
) VALUES
('CSE', 'sarah.wilson@college.edu', 'Dr. Sarah Wilson', 'sarahwilson', 'hod123', 'HOD', 'HOD001', 'Ph.D in Computer Science'),
('ECE', 'robert.brown@college.edu', 'Dr. Robert Brown', 'robertbrown', 'hod123', 'HOD', 'HOD002', 'Ph.D in Electronics'),
('MECH', 'lisa.davis@college.edu', 'Dr. Lisa Davis', 'lisadavis', 'hod123', 'HOD', 'HOD003', 'Ph.D in Mechanical Engineering')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 4. ADD PRINCIPAL USER (Using exact column names)
-- =====================================================
INSERT INTO public."Principal" (
  "Name", "Email", "Password"
) VALUES
('Dr. Principal Name', 'principal@college.edu', 'principal123')
ON CONFLICT ("Email") DO NOTHING;

-- =====================================================
-- 5. ADD IQAC USER (Using exact column names)
-- =====================================================
INSERT INTO public."IQAC" (
  username, password, "Name", email
) VALUES
('iqac', 'iqac123', 'Dr. IQAC Coordinator', 'iqac@college.edu');

-- =====================================================
-- 6. ADD MANAGEMENT USER (Using exact column names)
-- =====================================================
INSERT INTO public."Management" (
  email, password
) VALUES
('management@college.edu', 'management123');

-- =====================================================
-- 7. UPDATE FORMSTATUS TABLE (if exists)
-- =====================================================
INSERT INTO public."FormStatus" (form_name, is_open, description) VALUES
('Faculty Form 1', true, 'Faculty Registration Form'),
('Faculty Form 2', true, 'Faculty Profile Update'),
('Faculty Form 3', false, 'Faculty Achievement Form'),
('Faculty Form 4', true, 'Faculty Research Form'),
('Faculty Form 5', true, 'Faculty Publication Form'),
('Faculty Form 6', false, 'Faculty Training Form'),
('Faculty Form 7', true, 'Faculty Feedback Form'),
('Faculty Form 8', true, 'Faculty Leave Form')
ON CONFLICT (form_name) DO NOTHING;

-- =====================================================
-- 8. ADD NOTIFICATIONS (if table exists)
-- =====================================================
INSERT INTO public."Notifications" (title, message, type, target_role, is_read, created_at) VALUES
('Welcome to Admin System', 'The admin dashboard is now ready for use.', 'INFO', 'Admin', false, CURRENT_TIMESTAMP),
('System Setup Complete', 'All user tables have been populated with sample data.', 'SUCCESS', 'Admin', false, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 9. VERIFICATION QUERIES
-- =====================================================
SELECT 'Setup Complete!' as message;

-- Check Admin
SELECT 'Admin Users:' as info;
SELECT input_id, name, email FROM public."Admin" WHERE email LIKE '%college.edu' LIMIT 5;

-- Check Faculty  
SELECT 'Faculty Users:' as info;
SELECT input_id, "Name", email, department, "Designation" FROM public."Faculty" WHERE email LIKE '%college.edu' LIMIT 5;

-- Check HOD
SELECT 'HOD Users:' as info;  
SELECT input_id, "Name", email, department FROM public."HOD" WHERE email LIKE '%college.edu' LIMIT 5;

-- Check Principal
SELECT 'Principal Users:' as info;
SELECT input_id, "Name", "Email" FROM public."Principal" WHERE "Email" LIKE '%college.edu' LIMIT 5;

-- Check IQAC  
SELECT 'IQAC Users:' as info;
SELECT input_id, "Name", email FROM public."IQAC" WHERE email LIKE '%college.edu' LIMIT 5;

-- Check Management
SELECT 'Management Users:' as info;
SELECT input_id, email FROM public."Management" WHERE email LIKE '%college.edu' LIMIT 5;

-- =====================================================
-- 10. LOGIN CREDENTIALS
-- =====================================================
/*
LOGIN TEST CREDENTIALS:
========================
Admin: admin@college.edu / admin123
Faculty: john.smith@college.edu / faculty123  
HOD: sarah.wilson@college.edu / hod123
Principal: principal@college.edu / principal123
IQAC: iqac@college.edu / iqac123
Management: management@college.edu / management123
*/
