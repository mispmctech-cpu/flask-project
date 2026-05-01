# Quick Fix for Verification Error

## The Problem
You're getting this error: "Failed to verify record: Could not find the 'original_data' column of 'hod-workdone' in the schema cache"

## The Solution

### Step 1: Add the Missing Column (Choose ONE method)

#### Method A: Using Supabase Dashboard (RECOMMENDED)
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to "Table Editor" 
4. Find the `hod-workdone` table
5. Click "Add Column" 
6. Enter these details:
   - **Name**: `original_data`
   - **Type**: `JSONB`
   - **Nullable**: ✅ (checked)
   - **Default**: (leave empty)
7. Click "Save"

#### Method B: Using SQL Editor
1. Go to your Supabase Dashboard
2. Go to "SQL Editor"
3. Run this command:
   ```sql
   ALTER TABLE "hod-workdone" ADD COLUMN IF NOT EXISTS original_data JSONB;
   ```

### Step 2: Test the Fix
1. Go back to your workdone page
2. Try to verify a record
3. It should work now! ✅

## What This Does
- The `original_data` column stores the complete form data when a record is verified
- This ensures that verified records always show the exact data that was verified
- Prevents the mismatch issue you were experiencing

## If You Skip Step 1
The verification will still work, but without storing the original data. The view function has been updated to handle both cases gracefully.

---

**Need Help?** 
- Check your browser console for any error messages
- Make sure your Flask app is running
- Refresh the page after adding the column
