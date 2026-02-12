-- Simple SQL to add original_data column to hod-workdone table
-- Run this in your Supabase SQL Editor

ALTER TABLE "hod-workdone" ADD COLUMN IF NOT EXISTS original_data JSONB;
