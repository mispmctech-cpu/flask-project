-- Check the current structure of form tables to see what ID columns exist
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('form2-daily', 'form1-Weekly', 'form3-Weekly', 'form4-Weekly', 'form5-weekly')
AND (column_name LIKE '%id%' OR column_name = 'id')
ORDER BY table_name, column_name;

-- If input_id already exists as integer, we can use it directly
-- OR rename the existing column and create a new UUID one
-- Let's first check what's there
