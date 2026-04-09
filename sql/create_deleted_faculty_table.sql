-- Create Deleted_Faculty table to store audit trail of deleted faculty records
-- This table stores all deleted faculty information for recovery and audit purposes

CREATE TABLE Deleted_Faculty (
    id SERIAL PRIMARY KEY,
    
    -- Original faculty data (matching Faculty table structure)
    original_faculty_id INTEGER,  -- Store the original Faculty table ID
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
    deleted_by TEXT,  -- Who deleted the record (admin username/email)
    deletion_reason TEXT,  -- Optional reason for deletion
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_deleted_faculty_original_id ON Deleted_Faculty(original_faculty_id);
CREATE INDEX idx_deleted_faculty_deleted_at ON Deleted_Faculty(deleted_at);
CREATE INDEX idx_deleted_faculty_email ON Deleted_Faculty(email);
CREATE INDEX idx_deleted_faculty_employee_id ON Deleted_Faculty("EmployeeID");

-- Add comments for documentation
COMMENT ON TABLE Deleted_Faculty IS 'Audit table storing deleted faculty records for recovery and tracking purposes';
COMMENT ON COLUMN Deleted_Faculty.original_faculty_id IS 'Original ID from the Faculty table';
COMMENT ON COLUMN Deleted_Faculty.deleted_at IS 'Timestamp when the faculty record was deleted';
COMMENT ON COLUMN Deleted_Faculty.deleted_by IS 'User/Admin who performed the deletion';
COMMENT ON COLUMN Deleted_Faculty.deletion_reason IS 'Optional reason for the deletion';
