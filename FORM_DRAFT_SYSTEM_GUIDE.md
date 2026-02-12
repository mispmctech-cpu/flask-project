# Faculty Forms Draft System Setup Guide

This guide explains how to set up and use the draft functionality for faculty forms (Form 1 - Form 8).

## Overview

The draft system allows faculty members to:
- **Save progress** on forms without submitting
- **Resume later** from where they left off
- **Automatic file preservation** - uploaded files are retained in drafts
- **One draft per user** - per department and member name

## Database Setup

### 1. Run the SQL Schema

Execute the SQL script to create all draft tables:

```sql
-- Go to Supabase SQL Editor and run:
sql/create_form_draft_tables.sql
```

This creates 8 draft tables:
| Table | Form | Rows |
|-------|------|------|
| `form1_monthly_drafts` | Form 1 - HOD Form | 18 |
| `form2_monthly_drafts` | Form 2 - Class Advisor | 11 |
| `form3_monthly_drafts` | Form 3 - Faculty Achievements | 14 |
| `form4_monthly_drafts` | Form 4 - Examination | 17 |
| `form5_monthly_drafts` | Form 5 - Projects | 12 |
| `form6_monthly_drafts` | Form 6 - Activities | 16 |
| `form7_monthly_drafts` | Form 7 - Library | 9 |
| `form8_monthly_drafts` | Form 8 - Sports | 13 |

### 2. Verify Tables

In Supabase, go to Table Editor and confirm all draft tables are created with columns:
- `id` (Primary Key)
- `Department`
- `Portfolio Name`
- `Portfolio Member Name`
- `Month`
- `Status_1` through `Status_N`
- `Description_1` through `Description_N`
- `Upload The Scanned File_1` through `Upload The Scanned File_N`
- `created_at`

## How It Works

### User Flow

1. **Form Opens** → System checks for existing draft (1 second delay for autofill)
2. **Draft Found** → Modal popup asks user to "Load Draft" or "Start Fresh"
3. **Load Draft** → All fields and file status restored
4. **Save Draft** → Blue "Save as Draft" button saves current progress
5. **Submit** → Form submitted, draft automatically deleted

### Technical Implementation

Each form includes:

```html
<!-- CSS for draft modal -->
.draft-modal { ... }
.draft-modal.show { display: flex; }
.draft-modal-content { ... }

<!-- HTML for draft UI -->
<div id="draftBanner">...</div>
<div id="draftModal">...</div>
<button id="saveDraftBtn">Save as Draft</button>
```

```javascript
// JavaScript functions
window.draftFileUrls = {};     // Stores file URLs from draft
checkForDraft()                // Checks for existing draft
showDraftPopup(draft)          // Shows the modal
loadDraftData(draft)           // Populates form with draft data
saveAsDraft()                  // Saves current form to draft table

// After successful submission:
await supabase.from('formX_monthly_drafts').delete()...
```

## File Handling

### Draft Files
- Files uploaded during draft save are stored in `form5-files` bucket
- File path format: `formX_draft_N_timestamp_filename`
- URLs stored in `Upload The Scanned File_N` columns

### Submission Files
- On final submit, if no new file uploaded, draft file URL is used
- This prevents needing to re-upload files

```javascript
// In submission loop:
if (file && file.size > 0) {
    fileUrl = await uploadFileToStorage(file, ...);
} else {
    fileUrl = window.draftFileUrls[i] || '';
}
```

## Troubleshooting

### Draft Not Loading
1. Check browser console for errors
2. Verify draft table exists in Supabase
3. Confirm Department and Portfolio Member Name match exactly

### Files Not Showing
1. Check `window.draftFileUrls` in console
2. Verify file URLs in draft table
3. Confirm storage bucket is accessible

### Draft Not Saving
1. Check required fields (Department, Member Name, Month)
2. Look for Supabase errors in console
3. Verify RLS policies allow insert/update

## Storage Buckets

All draft files use the `form5-files` bucket. Ensure it exists and has public access:

```sql
-- In Supabase Storage settings, create bucket if not exists
-- Enable public access for file viewing
```

## Security Notes

- Drafts are identified by Department + Portfolio Member Name
- Only one draft per user per form
- Drafts are automatically deleted after successful submission
- RLS policies allow anonymous access (same as main forms)

## Quick Reference

| Form | Table | Rows | Form ID |
|------|-------|------|---------|
| 1 | form1_monthly_drafts | 18 | facultyForm1 |
| 2 | form2_monthly_drafts | 11 | facultyForm2 |
| 3 | form3_monthly_drafts | 14 | facultyForm3 |
| 4 | form4_monthly_drafts | 17 | facultyForm4 |
| 5 | form5_monthly_drafts | 12 | facultyForm5 |
| 6 | form6_monthly_drafts | 16 | facultyForm6 |
| 7 | form7_monthly_drafts | 9 | facultyForm7 |
| 8 | form8_monthly_drafts | 13 | facultyForm8 |
