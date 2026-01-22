-- Check existing table structures in your database
-- Run this to see what columns actually exist in your main tables

-- Check Admin table structure
SELECT 'Admin' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'Admin'
ORDER BY ordinal_position;

-- Check Faculty table structure  
SELECT 'Faculty' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'Faculty'
ORDER BY ordinal_position;

-- Check HOD table structure
SELECT 'HOD' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'HOD'
ORDER BY ordinal_position;

-- Check Principal table structure
SELECT 'Principal' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'Principal'
ORDER BY ordinal_position;

-- Check IQAC table structure
SELECT 'IQAC' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'IQAC'
ORDER BY ordinal_position;

-- Check Management table structure
SELECT 'Management' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'Management'
ORDER BY ordinal_position;
