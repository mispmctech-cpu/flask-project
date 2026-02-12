-- Create DeletedFaculty table following the same naming pattern as other tables
-- This matches the pattern used by Faculty, HOD, Principal tables

CREATE TABLE "DeletedFaculty" (
    id SERIAL PRIMARY KEY,
    
    -- Original faculty data (matching Faculty table structure exactly)
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

-- Create indexes for better performance
CREATE INDEX idx_deletedfaculty_original_id ON "DeletedFaculty"(original_faculty_id);
CREATE INDEX idx_deletedfaculty_deleted_at ON "DeletedFaculty"(deleted_at);
CREATE INDEX idx_deletedfaculty_email ON "DeletedFaculty"(email);
CREATE INDEX idx_deletedfaculty_employee_id ON "DeletedFaculty"("EmployeeID");

-- Grant permissions (matching other tables)
ALTER TABLE "DeletedFaculty" ENABLE ROW LEVEL SECURITY;
