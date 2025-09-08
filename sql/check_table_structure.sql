-- =====================================================
-- TABLE STRUCTURE DISCOVERY AND FIX SCRIPT
-- =====================================================
-- This script will check existing table structures and fix them

-- Check existing table structures
DO $$
BEGIN
    -- Check if Faculty table exists and show its structure
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Faculty') THEN
        RAISE NOTICE 'Faculty table exists. Checking structure...';
        
        -- Show existing columns
        RAISE NOTICE 'Existing Faculty columns:';
        FOR rec IN 
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'Faculty'
            ORDER BY ordinal_position
        LOOP
            RAISE NOTICE 'Column: %, Type: %, Nullable: %, Default: %', 
                rec.column_name, rec.data_type, rec.is_nullable, COALESCE(rec.column_default, 'NULL');
        END LOOP;
    ELSE
        RAISE NOTICE 'Faculty table does not exist yet.';
    END IF;
    
    -- Check HOD table
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'HOD') THEN
        RAISE NOTICE 'HOD table exists. Checking structure...';
        
        FOR rec IN 
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'HOD'
            ORDER BY ordinal_position
        LOOP
            RAISE NOTICE 'HOD Column: %, Type: %, Nullable: %, Default: %', 
                rec.column_name, rec.data_type, rec.is_nullable, COALESCE(rec.column_default, 'NULL');
        END LOOP;
    ELSE
        RAISE NOTICE 'HOD table does not exist yet.';
    END IF;
END $$;
