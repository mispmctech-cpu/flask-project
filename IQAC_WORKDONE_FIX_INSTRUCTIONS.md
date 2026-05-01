# IQAC Workdone Page Fix Instructions

## Issues Identified:
1. **Missing `input_id` column** in `iqac-workdone` table causing "Could not find the 'input_id' column" error
2. **View function showing null data** due to exact field name matching that doesn't account for variations
3. **Accept button not handling confirmation** and error states properly

## Fix Steps:

### Step 1: Fix Database Schema
Run the SQL script to add the missing `input_id` column:
```sql
-- In Supabase SQL Editor, run:
sql/add_input_id_to_iqac_workdone.sql
```

### Step 2: Fix Accept Function 
The accept function has been updated to:
- Include `input_id` in the insert operation
- Add proper confirmation dialog
- Handle loading states and error recovery
- Reset button state on error

### Step 3: Fix View Functions
The view functions have been improved to:
- Handle multiple field name variations (`Portfolio Member Name`, `Portfolio Memeber Name`, etc.)
- Try flexible department matching
- Show fallback data when original form data isn't found
- Provide better error handling and user feedback

### Step 4: Implementation Options

#### Option A: Replace Functions (Recommended)
1. Open `templates/iqac-workdone.html`
2. Replace `viewIQACRowDetails` function with `viewIQACRowDetailsFixed` from `iqac-workdone-fixes.js`
3. Replace `acceptRow` function with `acceptRowFixed` from `iqac-workdone-fixes.js`

#### Option B: Include Fix File
Add this line in the `<head>` section of `iqac-workdone.html`:
```html
<script src="../iqac-workdone-fixes.js"></script>
```

Then update the onclick handlers:
- Change `onclick="viewIQACRowDetails(${globalIdx})"` to `onclick="viewIQACRowDetailsFixed(${globalIdx})"`
- Change `onclick="acceptRow(this)"` to `onclick="acceptRowFixed(this)"`

## Expected Results After Fix:
1. ✅ Accept button will work without "input_id column" error
2. ✅ View function will show actual form data instead of null values
3. ✅ Confirmation dialog before accepting records
4. ✅ Proper error handling and button state management
5. ✅ Fallback display when original form data cannot be found

## Technical Details:
- **Root Cause**: Form tables use different field names (`Portfolio Member Name` vs `Portfolio Memeber Name`)
- **Solution**: Flexible field name matching with multiple variations
- **Database**: Added `input_id INTEGER` column to `iqac-workdone` table for consistency
- **UI**: Improved user experience with confirmations and proper error states

Run these fixes and test the Accept and View functionality in the IQAC workdone page.
