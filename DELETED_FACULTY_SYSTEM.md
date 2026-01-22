# Deleted Faculty Management System

This system provides a comprehensive solution for managing deleted faculty records with audit trails and recovery capabilities.

## 📋 Overview

The Deleted Faculty Management System consists of:
1. **Audit Trail Storage** - Automatically backs up deleted faculty records
2. **Recovery System** - Allows restoration of accidentally deleted records
3. **Admin Interface** - Provides easy management of deleted records
4. **Comprehensive Logging** - Tracks who deleted what and when

## 🗃️ Database Schema

### Deleted_Faculty Table
```sql
CREATE TABLE Deleted_Faculty (
    id SERIAL PRIMARY KEY,
    
    -- Original faculty data
    original_faculty_id INTEGER,
    department TEXT,
    email TEXT,
    "Name" TEXT,
    "Username" TEXT,
    password TEXT,
    "Upload Image" TEXT,
    "Designation" TEXT,
    "EmployeeID" TEXT,
    "Salary" TEXT,
    "Experience" TEXT,
    "Qualification" TEXT,
    
    -- Audit fields
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_by TEXT,
    deletion_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes for Performance
- `idx_deleted_faculty_original_id` - On original_faculty_id
- `idx_deleted_faculty_deleted_at` - On deleted_at
- `idx_deleted_faculty_email` - On email
- `idx_deleted_faculty_employee_id` - On EmployeeID

## 🔧 Setup Instructions

### 1. Create the Database Table
Run the SQL script to create the `Deleted_Faculty` table:
```bash
# Execute the SQL file in your Supabase database
# File: sql/create_deleted_faculty_table.sql
```

### 2. Set Up Row Level Security (RLS)
```sql
-- Enable RLS on the table
ALTER TABLE Deleted_Faculty ENABLE ROW LEVEL SECURITY;

-- Create policy for admins
CREATE POLICY "Admin access to deleted faculty" ON Deleted_Faculty
    FOR ALL USING (auth.role() = 'admin');
```

### 3. Grant Permissions
```sql
-- Grant necessary permissions to your application role
GRANT ALL ON Deleted_Faculty TO anon;
GRANT ALL ON Deleted_Faculty TO authenticated;
```

## 🚀 Features

### Automatic Backup on Deletion
- When a faculty member is deleted, their complete record is automatically stored
- Includes all original data plus deletion metadata
- Tracks who performed the deletion and when

### Admin Interface
- **View All Deleted Records** - Browse all deleted faculty with pagination
- **Search & Filter** - Find records by name, email, department, or date
- **Statistics Dashboard** - View deletion statistics and trends
- **Restore Functionality** - One-click restoration of deleted records

### Audit Trail
Each deleted record includes:
- Original faculty data
- Deletion timestamp
- Admin who performed the deletion
- Reason for deletion (optional)
- Original faculty table ID

## 📱 Usage

### Deleting Faculty (Automatic)
When using the admin panel to delete faculty:
1. Select faculty member to delete
2. Confirm deletion
3. System automatically:
   - Backs up record to `Deleted_Faculty`
   - Removes from main `Faculty` table
   - Shows confirmation with audit info

### Viewing Deleted Records
1. Navigate to **Admin Panel > Deleted Faculty**
2. Use search/filter options to find records
3. View detailed information about each deletion

### Restoring Faculty
1. Go to deleted faculty page
2. Find the record to restore
3. Click **Restore** button
4. Confirm restoration
5. Record is moved back to main Faculty table

## 🔍 API Endpoints

### Get Deleted Faculty
```javascript
const { data, error } = await supabaseClient
    .from('Deleted_Faculty')
    .select('*')
    .order('deleted_at', { ascending: false });
```

### Restore Faculty
```javascript
// First insert back to Faculty table
const { error: insertError } = await supabaseClient
    .from('Faculty')
    .insert([facultyRecord]);

// Then remove from Deleted_Faculty
const { error: deleteError } = await supabaseClient
    .from('Deleted_Faculty')
    .delete()
    .eq('id', recordId);
```

## 📊 Statistics & Reporting

The system provides several statistics:
- **Total Deleted** - All-time deletion count
- **Monthly Deletions** - Current month's deletions
- **Recoverable Records** - Records that can be restored

## 🔒 Security Considerations

1. **Access Control** - Only admins can view/restore deleted records
2. **Audit Logging** - All operations are logged with timestamps
3. **Data Integrity** - Complete faculty data is preserved
4. **Permission Checks** - Proper role-based access control

## 🛠️ Maintenance

### Regular Cleanup
Consider implementing periodic cleanup of very old deleted records:
```sql
-- Delete records older than 2 years (optional)
DELETE FROM Deleted_Faculty 
WHERE deleted_at < NOW() - INTERVAL '2 years';
```

### Backup Strategy
- Regular database backups include deleted faculty records
- Consider separate archival for long-term deleted records

## 📝 Files Involved

1. **SQL Schema**: `sql/create_deleted_faculty_table.sql`
2. **Admin Interface**: `templates/admin-deleted-faculty.html`
3. **Updated Delete Function**: Modified `deleteFaculty()` in `admin-users.html`
4. **Documentation**: This README file

## 🔄 Future Enhancements

Potential improvements:
1. **Bulk Operations** - Restore multiple records at once
2. **Advanced Filters** - More sophisticated search options
3. **Export Functionality** - Export deleted records to CSV/PDF
4. **Approval Workflow** - Require approval for deletions
5. **Soft Delete Option** - Mark as deleted without moving to separate table

## ⚠️ Important Notes

1. **Test First** - Always test the system in a development environment
2. **Backup Data** - Ensure you have database backups before implementing
3. **User Training** - Train administrators on the new functionality
4. **Monitor Usage** - Keep track of deletion patterns and frequency

## 🆘 Troubleshooting

### Common Issues

1. **Table Doesn't Exist**
   - Ensure the SQL script was run successfully
   - Check table permissions

2. **Restore Fails**
   - Check for duplicate email/employee ID constraints
   - Verify data integrity of deleted record

3. **Access Denied**
   - Verify user has admin privileges
   - Check Row Level Security policies

### Contact & Support

For issues or questions:
- Check the browser console for error messages
- Verify Supabase connection and permissions
- Review the audit logs for deletion patterns
