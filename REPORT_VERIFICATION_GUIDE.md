# Faculty Report Verification Workflow Guide

## Overview
This document explains the new three-tier reporting system where faculty reports go through HOD verification before reaching IQAC.

## System Flow

```
FACULTY SUBMITS REPORT → HOD VERIFIES REPORT → IQAC SEES VERIFIED REPORTS
(Status: pending)        (Status: verified/rejected)   (Only verified shown)
```

## Components

### 1. Database Schema Changes
File: `sql/add_verification_to_reports.sql`

Added columns to all reporting tables:
- `verification_status` (VARCHAR): pending, verified, or rejected
- `verified_by` (VARCHAR): Name of HOD who verified
- `verification_date` (TIMESTAMP): When verification occurred
- `verification_comments` (TEXT): Optional feedback

### 2. Faculty Report Submission
Files: 
- `templates/reporting.html` (main)
- `templates/reporting-academics.html`
- `templates/reporting-activities.html`
- `templates/reporting-achievements.html`
- `templates/reporting-disciplinary.html`

**Changes:**
- When faculty submits a report, it now includes:
  ```javascript
  verification_status: 'pending',
  verified_by: null,
  verification_date: null,
  verification_comments: null
  ```
- Report is saved but NOT visible to IQAC until verified

### 3. HOD Report Verification Dashboard
File: `templates/hod-report-verification.html` (NEW)

**Features:**
- View all pending reports from their department
- Filter by status (Pending, Verified, Rejected)
- Filter by date range
- View detailed report contents
- Approve (Verify) reports with optional comments
- Reject reports with required feedback

**Access:**
- HOD clicks "✓ Verify Faculty Reports" button in Reports Modal
- URL: `hod-report-verification.html`

**Workflow:**
1. HOD sees all pending reports
2. Clicks "View" to see full report details
3. Reviews faculty details and student attendance
4. Clicks "Approve & Verify" to approve OR "Reject" to send back
5. If rejected, status changes to "rejected" and faculty can resubmit

### 4. IQAC Reports Dashboard
File: `templates/iqac-reports-dashboard.html`

**Changes:**
- Modified `loadReports()` function to add filter:
  ```javascript
  query = query.eq('verification_status', 'verified');
  ```
- Only verified reports are visible to IQAC
- Pending and rejected reports are completely hidden

**Access:**
- IQAC navigates to "Daily Reports" from main dashboard
- Only sees reports with `verification_status = 'verified'`

## Report Lifecycle

### Stage 1: PENDING (Faculty Submitted)
- Faculty fills out report form and clicks "Submit Report"
- Record created with `verification_status = 'pending'`
- **Visible to:** HOD only (in verification dashboard)
- **Visible to:** Faculty (in their submission history)
- **NOT visible to:** IQAC

### Stage 2: VERIFIED (HOD Approved)
- HOD reviews report in verification dashboard
- HOD clicks "Approve & Verify" and adds comments
- Record updated with:
  - `verification_status = 'verified'`
  - `verified_by = HOD name`
  - `verification_date = current timestamp`
  - `verification_comments = optional feedback`
- **Visible to:** IQAC (in reports dashboard)
- **Visible to:** HOD (as completed)
- **Visible to:** Faculty (as verified)

### Stage 3: REJECTED (HOD Rejected)
- HOD reviews report and clicks "Reject"
- Record updated with:
  - `verification_status = 'rejected'`
  - `verified_by = HOD name`
  - `verification_date = current timestamp`
  - `verification_comments = required reason for rejection`
- Faculty notified to resubmit with corrections
- Report cycles back to PENDING after faculty resubmits
- **Visible to:** HOD (as rejected)
- **Visible to:** Faculty (to see feedback)
- **NOT visible to:** IQAC

## SQL Execution

To activate the verification system, run:
```sql
ALTER TABLE daily_reports
ADD COLUMN verification_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN verified_by VARCHAR(255),
ADD COLUMN verification_date TIMESTAMP,
ADD COLUMN verification_comments TEXT;

CREATE INDEX idx_daily_reports_verification_status ON daily_reports(verification_status);
CREATE INDEX idx_daily_reports_department_verification ON daily_reports(department, verification_status);
```

Then apply the same to:
- `academic_reports` table
- `activity_reports` table
- `achievement_reports` table
- `disciplinary_reports` table

## User Interactions

### For Faculty
1. Navigate to relevant reporting form (Attendance, Academics, etc.)
2. Fill out form and click "Submit Report"
3. Report enters pending state
4. Wait for HOD verification
5. If rejected, review feedback and resubmit
6. If approved, report goes to IQAC

### For HOD
1. Navigate to Reports Modal in HOD dashboard
2. Click "✓ Verify Faculty Reports"
3. Filter and review pending reports
4. Click "View" on any report
5. Review all details including student attendance
6. Add comments (optional for approval, required for rejection)
7. Click "Approve & Verify" or "Reject"
8. System updated automatically

### For IQAC
1. Navigate to "Daily Reports" in IQAC dashboard
2. Only verified reports from all departments are visible
3. Can filter by date, department, category
4. Can view all report details
5. Can export reports for analysis

## Benefits

1. **Quality Control**: HOD ensures data accuracy before IQAC review
2. **Accountability**: Tracks who verified and when
3. **Feedback Loop**: Rejection with comments helps faculty improve
4. **Clean Data**: IQAC only sees validated reports
5. **Audit Trail**: Complete history of verification process

## Troubleshooting

**Q: Why can't I see reports in IQAC dashboard?**
A: Check if reports have `verification_status = 'verified'`. Pending or rejected reports won't show.

**Q: Faculty submitted but I don't see it in verification dashboard?**
A: The report might still be saving. Refresh the page. Check department filter matches.

**Q: How do I change a verified report's status?**
A: Current system allows verification in one direction only. To revert, contact database admin to manually update the record.

**Q: Can faculty see feedback when their report is rejected?**
A: Not yet. Consider creating a "rejected reports view" for faculty to see feedback.

## Future Enhancements

1. Faculty notification when report is rejected
2. Email alerts for HOD when new reports pending
3. Auto-approval for reports from trusted faculty
4. Department-level verification metrics
5. Re-submission tracking for rejected reports
