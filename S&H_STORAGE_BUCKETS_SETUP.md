# S&H Faculty Forms - Storage Buckets Setup Guide

## Required Storage Buckets

You need to create the following storage buckets in Supabase before the S&H forms will work:

### 1. **Ap_SH**
   - **Purpose:** Assistant Professor S&H yearly form files
   - **Public Access:** Yes (or configure policies as needed)
   - **File Size Limit:** 10MB (recommended)

### 2. **Asp_SH_files**
   - **Purpose:** Associate Professor S&H yearly form files
   - **Public Access:** Yes (or configure policies as needed)
   - **File Size Limit:** 10MB (recommended)

### 3. **Professor_SH**
   - **Purpose:** Professor S&H yearly form files
   - **Public Access:** Yes (or configure policies as needed)
   - **File Size Limit:** 10MB (recommended)

### 4. **form1-files-sh**
   - **Purpose:** Faculty Core Scope S&H monthly form files
   - **Public Access:** Yes (or configure policies as needed)
   - **File Size Limit:** 10MB (recommended)

---

## How to Create Buckets in Supabase

### Method 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"** or **"Create bucket"**
4. For each bucket:
   - Enter the bucket name (exactly as listed above)
   - Set **Public bucket** to **ON** (or configure RLS policies)
   - Click **"Create bucket"**

### Method 2: Using SQL (Supabase SQL Editor)

Run this SQL in your Supabase SQL Editor:

```sql
-- Create storage buckets for S&H faculty forms
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('Ap_SH', 'Ap_SH', true, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']),
  ('Asp_SH_files', 'Asp_SH_files', true, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']),
  ('Professor_SH', 'Professor_SH', true, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']),
  ('form1-files-sh', 'form1-files-sh', true, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'])
ON CONFLICT (id) DO NOTHING;
```

### Method 3: Using Supabase CLI

```bash
# Create buckets using Supabase CLI
supabase storage create Ap_SH --public
supabase storage create Asp_SH_files --public
supabase storage create Professor_SH --public
supabase storage create form1-files-sh --public
```

---

## Storage Policies (Optional - if not using public buckets)

If you prefer to use Row Level Security (RLS) instead of public buckets, create these policies:

```sql
-- Policy for Ap_SH bucket
CREATE POLICY "Allow public uploads to Ap_SH"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'Ap_SH');

CREATE POLICY "Allow public reads from Ap_SH"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Ap_SH');

-- Policy for Asp_SH_files bucket
CREATE POLICY "Allow public uploads to Asp_SH_files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'Asp_SH_files');

CREATE POLICY "Allow public reads from Asp_SH_files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Asp_SH_files');

-- Policy for Professor_SH bucket
CREATE POLICY "Allow public uploads to Professor_SH"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'Professor_SH');

CREATE POLICY "Allow public reads from Professor_SH"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Professor_SH');

-- Policy for form1-files-sh bucket
CREATE POLICY "Allow public uploads to form1-files-sh"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'form1-files-sh');

CREATE POLICY "Allow public reads from form1-files-sh"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'form1-files-sh');
```

---

## Verify Buckets Are Created

After creating the buckets, verify they exist:

1. Go to **Storage** in Supabase dashboard
2. You should see all 4 buckets listed:
   - ✅ Ap_SH
   - ✅ Asp_SH_files
   - ✅ Professor_SH
   - ✅ form1-files-sh

---

## Troubleshooting

### Error: "Failed to fetch"
- **Cause:** Bucket doesn't exist
- **Solution:** Create the bucket using one of the methods above

### Error: "new row violates row-level security policy"
- **Cause:** Bucket exists but RLS policies are blocking access
- **Solution:** Either make the bucket public OR create the RLS policies shown above

### Error: "The resource already exists"
- **Cause:** Bucket already exists
- **Solution:** This is fine, you can skip creating it

---

## File Path Patterns

Once buckets are created, files will be stored with these patterns:

- **AP_SH_Yearly:** `apyearlysh_{row_number}_{timestamp}_{filename}`
- **ASP_SH_Yearly:** `aspyearlysh_{row_number}_{timestamp}_{filename}`
- **Prof_SH_Yearly:** `profyearlysh_{row_number}_{timestamp}_{filename}`
- **Core_scope_SH:** `corescopesh_{row_number}_{timestamp}_{filename}`

Draft files use the same pattern with `_draft_` in the path.

