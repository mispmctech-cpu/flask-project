-- Since input_id already exists as integer, we'll use it directly
-- No need to modify the database structure

-- Just verify the existing columns (run this to check):
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('form2-daily', 'form1-Weekly', 'form3-Weekly', 'form4-Weekly', 'form5-weekly', 'hod-workdone')
AND column_name IN ('id', 'input_id')
ORDER BY table_name, column_name;

-- The existing integer input_id should work fine for our purposes
-- We just need to update the JavaScript to use the existing integer input_id values
