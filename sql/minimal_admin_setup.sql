-- =====================================================
-- MINIMAL ADMIN SETUP - BASIC VERSION
-- =====================================================
-- This creates only essential tables with basic column names

-- =====================================================
-- 1. ADMIN TABLE - MINIMAL
-- =====================================================
CREATE TABLE IF NOT EXISTS public."Admin" (
  id serial NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  is_active boolean NULL DEFAULT true,
  created_at timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT Admin_pkey PRIMARY KEY (id),
  CONSTRAINT Admin_email_key UNIQUE (email)
);

-- =====================================================
-- 2. INSERT BASIC ADMIN USER
-- =====================================================
INSERT INTO public."Admin" (name, email, password, is_active) VALUES
('Super Admin', 'admin@college.edu', 'admin123', true)
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 3. VERIFICATION
-- =====================================================
SELECT 'Setup Complete!' as status;
SELECT * FROM public."Admin" WHERE email = 'admin@college.edu';
