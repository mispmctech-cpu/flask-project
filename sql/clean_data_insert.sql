-- =====================================================
-- SIMPLE DATA INSERT - NO CONFLICTS
-- =====================================================
-- This adds data without ON CONFLICT clauses

-- =====================================================
-- 1. DELETE EXISTING TEST DATA (Optional - uncomment if needed)
-- =====================================================
-- DELETE FROM public."Admin" WHERE email LIKE '%college.edu';
-- DELETE FROM public."Faculty" WHERE email LIKE '%college.edu';
-- DELETE FROM public."HOD" WHERE email LIKE '%college.edu';
-- DELETE FROM public."Principal" WHERE "Email" LIKE '%college.edu';
-- DELETE FROM public."IQAC" WHERE email LIKE '%college.edu';
-- DELETE FROM public."Management" WHERE email LIKE '%college.edu';

-- =====================================================
-- 2. ADD ADMIN USER (Simple insert)
-- =====================================================
INSERT INTO public."Admin" (name, email, password) VALUES
('Super Admin', 'admin@college.edu', 'admin123');

-- =====================================================
-- 3. ADD FACULTY USERS
-- =====================================================
INSERT INTO public."Faculty" (
  department, email, "Name", "Username", password, "Designation", "EmployeeID", 
  "Qualification"
) VALUES
('CSE', 'john.smith@college.edu', 'Dr. John Smith', 'johnsmith', 'faculty123', 'Professor', 'EMP001', 'Ph.D in Computer Science'),
('ECE', 'jane.doe@college.edu', 'Dr. Jane Doe', 'janedoe', 'faculty123', 'Associate Professor', 'EMP002', 'Ph.D in Electronics'),
('MECH', 'mike.johnson@college.edu', 'Prof. Mike Johnson', 'mikejohnson', 'faculty123', 'Assistant Professor', 'EMP003', 'M.Tech in Mechanical');

-- =====================================================
-- 4. ADD HOD USERS
-- =====================================================
INSERT INTO public."HOD" (
  department, email, "Name", "Username", password, "Designation", "EmployeeID", 
  "Qualification"
) VALUES
('CSE', 'sarah.wilson@college.edu', 'Dr. Sarah Wilson', 'sarahwilson', 'hod123', 'HOD', 'HOD001', 'Ph.D in Computer Science'),
('ECE', 'robert.brown@college.edu', 'Dr. Robert Brown', 'robertbrown', 'hod123', 'HOD', 'HOD002', 'Ph.D in Electronics'),
('MECH', 'lisa.davis@college.edu', 'Dr. Lisa Davis', 'lisadavis', 'hod123', 'HOD', 'HOD003', 'Ph.D in Mechanical Engineering');

-- =====================================================
-- 5. ADD PRINCIPAL USER
-- =====================================================
INSERT INTO public."Principal" (
  "Name", "Email", "Password"
) VALUES
('Dr. Principal Name', 'principal@college.edu', 'principal123');

-- =====================================================
-- 6. ADD IQAC USER
-- =====================================================
INSERT INTO public."IQAC" (
  username, password, "Name", email
) VALUES
('iqac', 'iqac123', 'Dr. IQAC Coordinator', 'iqac@college.edu');

-- =====================================================
-- 7. ADD MANAGEMENT USER
-- =====================================================
INSERT INTO public."Management" (
  email, password
) VALUES
('management@college.edu', 'management123');

-- =====================================================
-- 8. VERIFICATION QUERIES
-- =====================================================
SELECT 'Setup Complete!' as message;

-- Count users by type
SELECT 
  'Admin' as user_type, 
  COUNT(*) as count 
FROM public."Admin" WHERE email LIKE '%college.edu'
UNION ALL
SELECT 'Faculty', COUNT(*) FROM public."Faculty" WHERE email LIKE '%college.edu'
UNION ALL  
SELECT 'HOD', COUNT(*) FROM public."HOD" WHERE email LIKE '%college.edu'
UNION ALL
SELECT 'Principal', COUNT(*) FROM public."Principal" WHERE "Email" LIKE '%college.edu'
UNION ALL
SELECT 'IQAC', COUNT(*) FROM public."IQAC" WHERE email LIKE '%college.edu'  
UNION ALL
SELECT 'Management', COUNT(*) FROM public."Management" WHERE email LIKE '%college.edu';

-- Show sample data
SELECT 'Sample Users Created:' as info;
SELECT 'Admin: admin@college.edu / admin123' as credentials;
SELECT 'Faculty: john.smith@college.edu / faculty123' as credentials;
SELECT 'HOD: sarah.wilson@college.edu / hod123' as credentials;
SELECT 'Principal: principal@college.edu / principal123' as credentials;
SELECT 'IQAC: iqac@college.edu / iqac123' as credentials;
SELECT 'Management: management@college.edu / management123' as credentials;
