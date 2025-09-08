-- =====================================================
-- CHECK AND UPDATE EXISTING ADMIN USER
-- =====================================================
-- This works with existing admin users

-- =====================================================
-- 1. CHECK EXISTING ADMIN USERS
-- =====================================================
SELECT 'Existing Admin Users:' as info;
SELECT input_id, name, email, 
       CASE WHEN password IS NOT NULL THEN 'Password Set' ELSE 'No Password' END as password_status
FROM public."Admin" 
LIMIT 10;

-- =====================================================
-- 2. UPDATE EXISTING ADMIN USER (if needed)
-- =====================================================
-- Update the existing admin user to ensure it has the right password
UPDATE public."Admin" 
SET password = 'admin123',
    name = COALESCE(name, 'Super Admin')
WHERE email = 'admin@college.edu';

-- If no admin@college.edu exists, try updating the first admin user
UPDATE public."Admin" 
SET password = 'admin123',
    email = 'admin@college.edu',
    name = COALESCE(name, 'Super Admin')
WHERE input_id = (
    SELECT MIN(input_id) 
    FROM public."Admin" 
    WHERE email != 'admin@college.edu' OR email IS NULL
) AND NOT EXISTS (
    SELECT 1 FROM public."Admin" WHERE email = 'admin@college.edu'
);

-- =====================================================
-- 3. ADD SAMPLE USERS (Only if they don't exist)
-- =====================================================

-- Check if faculty user exists, if not add one
INSERT INTO public."Faculty" (
  department, email, "Name", "Username", password, "Designation", "EmployeeID", 
  "Qualification"
) 
SELECT 'CSE', 'john.smith@college.edu', 'Dr. John Smith', 'johnsmith', 'faculty123', 'Professor', 'EMP001', 'Ph.D in Computer Science'
WHERE NOT EXISTS (
    SELECT 1 FROM public."Faculty" WHERE email = 'john.smith@college.edu'
);

-- Check if HOD user exists, if not add one
INSERT INTO public."HOD" (
  department, email, "Name", "Username", password, "Designation", "EmployeeID", 
  "Qualification"
) 
SELECT 'CSE', 'sarah.wilson@college.edu', 'Dr. Sarah Wilson', 'sarahwilson', 'hod123', 'HOD', 'HOD001', 'Ph.D in Computer Science'
WHERE NOT EXISTS (
    SELECT 1 FROM public."HOD" WHERE email = 'sarah.wilson@college.edu'
);

-- Check if Principal user exists, if not add one
INSERT INTO public."Principal" (
  "Name", "Email", "Password"
) 
SELECT 'Dr. Principal Name', 'principal@college.edu', 'principal123'
WHERE NOT EXISTS (
    SELECT 1 FROM public."Principal" WHERE "Email" = 'principal@college.edu'
);

-- Check if IQAC user exists, if not add one
INSERT INTO public."IQAC" (
  username, password, "Name", email
) 
SELECT 'iqac', 'iqac123', 'Dr. IQAC Coordinator', 'iqac@college.edu'
WHERE NOT EXISTS (
    SELECT 1 FROM public."IQAC" WHERE email = 'iqac@college.edu'
);

-- Check if Management user exists, if not add one
INSERT INTO public."Management" (
  email, password
) 
SELECT 'management@college.edu', 'management123'
WHERE NOT EXISTS (
    SELECT 1 FROM public."Management" WHERE email = 'management@college.edu'
);

-- =====================================================
-- 4. FINAL VERIFICATION
-- =====================================================
SELECT 'Setup Complete!' as status;

-- Show admin user that can be used for login
SELECT 'ADMIN LOGIN CREDENTIALS:' as info;
SELECT 
    input_id,
    name,
    email,
    CASE 
        WHEN password = 'admin123' THEN 'Password: admin123 ✓'
        WHEN password IS NOT NULL THEN 'Custom Password Set'
        ELSE 'No Password Set ❌'
    END as login_info
FROM public."Admin" 
WHERE email = 'admin@college.edu' 
   OR input_id = (SELECT MIN(input_id) FROM public."Admin")
LIMIT 1;

-- Show user counts
SELECT 'USER COUNTS:' as info;
SELECT 
  'Admin' as user_type, 
  COUNT(*) as count 
FROM public."Admin"
UNION ALL
SELECT 'Faculty', COUNT(*) FROM public."Faculty"
UNION ALL  
SELECT 'HOD', COUNT(*) FROM public."HOD"
UNION ALL
SELECT 'Principal', COUNT(*) FROM public."Principal"
UNION ALL
SELECT 'IQAC', COUNT(*) FROM public."IQAC"  
UNION ALL
SELECT 'Management', COUNT(*) FROM public."Management";

-- Show available login credentials
SELECT 'AVAILABLE LOGIN ACCOUNTS:' as info;
SELECT 'admin@college.edu / admin123' as credentials
WHERE EXISTS (SELECT 1 FROM public."Admin" WHERE email = 'admin@college.edu')
UNION ALL
SELECT 'First Admin Account / admin123' as credentials
WHERE NOT EXISTS (SELECT 1 FROM public."Admin" WHERE email = 'admin@college.edu')
  AND EXISTS (SELECT 1 FROM public."Admin");
