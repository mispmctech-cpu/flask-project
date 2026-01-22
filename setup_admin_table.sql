-- Create Admin Table
-- Run this in your Supabase SQL Editor

-- First, drop the table if it exists (optional, uncomment if needed)
-- DROP TABLE IF EXISTS public."Admin";

-- Create the Admin table with the exact schema you specified
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_email ON public."Admin" USING btree (email);
CREATE INDEX IF NOT EXISTS idx_admin_active ON public."Admin" USING btree (is_active);

-- Insert a default admin account for testing
INSERT INTO public."Admin" (name, email, password, role, department, is_active)
VALUES ('Administrator', 'admin@pmctech.org', 'admin123', 'SUPER_ADMIN', 'ADMINISTRATION', true)
ON CONFLICT (email) DO NOTHING;

-- Display the created table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'Admin'
ORDER BY ordinal_position;

-- Display any existing admin records
SELECT * FROM public."Admin";
