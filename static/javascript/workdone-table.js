// workdone-table.js
// Centralized WORKDONE table logic for all faculty profile pages
// Requires: form-modal-mapper.js for getFormModalContent function

class WorkdoneTable {
  constructor(supabaseClient) {
    this.supabaseClient = supabaseClient;
    this.workdoneRows = [];
    
    // Complete form tables mapping
    this.formTables = [
      // Department Portfolio Forms
      { table: "form1-once in a year", portfolio: "Students Performance in Training & Placement Member (Yearly)" },
      { table: "form1-Weekly", portfolio: "Students Performance in Training & Placement Member (Weekly)" },
      { table: "form1-once in 15 days", portfolio: "Students Performance in Training & Placement Member (Bi-weekly)" },
      { table: "form1-once in a semester", portfolio: "Students Performance in Training & Placement Member (Semester)" },
      { table: "form2-daily", portfolio: "Class Advisor (Daily)" },
      { table: "form2-weekly", portfolio: "Class Advisor (Weekly)" },
      { table: "form2-once in a month", portfolio: "Class Advisor (Monthly)" },
      { table: "form2-once in a semester", portfolio: "Class Advisor (Semester)" },
      { table: "form3-Weekly", portfolio: "Faculty Information & Contribution Member (Weekly)" },
      { table: "form3- once in 15 days", portfolio: "Faculty Information & Contribution Member (Bi-weekly)" },
      { table: "form3-once in a semester", portfolio: "Faculty Information & Contribution Member (Semester)" },
      { table: "form4-Weekly", portfolio: "Course Outcome & Program Outcome Member (Exam Cell) (Weekly)" },
      { table: "form4-once in a month", portfolio: "Course Outcome & Program Outcome Member (Exam Cell) (Monthly)" },
      { table: "form4-once in a semester", portfolio: "Course Outcome & Program Outcome Member (Exam Cell) (Semester)" },
      { table: "form5-weekly", portfolio: "Continuous Improvement Member (Program Member) (Weekly)" },
      { table: "form5-Once in a 3 Months", portfolio: "Continuous Improvement Member (Program Member) (Quarterly)" },
      { table: "form5-once in a semester", portfolio: "Continuous Improvement Member (Program Member) (Semester)" },
      { table: "form6-once in a semester", portfolio: "Teaching & Learning Process Member (IQAC) (Semester)" },
      { table: "form7-Once in a Semester", portfolio: "Student Support System Member (Discipline & Extra Curricular) (Semester)" },
      { table: "form7-Once in 2 Months", portfolio: "Student Support System Member (Discipline & Extra Curricular) (Bi-monthly)" },
      { table: "form7-Weekly", portfolio: "Student Support System Member (Discipline & Extra Curricular) (Weekly)" },
      { table: "form8-weekly", portfolio: "Facilities & Technical Support Member (Lab Member) (Weekly)" },
      { table: "form8-once in 3 Months", portfolio: "Facilities & Technical Support Member (Lab Member) (Quarterly)" },
      { table: "form8-Once in Semester", portfolio: "Facilities & Technical Support Member (Lab Member) (Semester)" },
      // Core Scope Forms (ASP, AP, Professor)
      { table: "ASP", portfolio: "ASP Core Scope Form" },
      { table: "AP", portfolio: "AP Core Scope Form" },
      { table: "Prof", portfolio: "Professor Core Scope Form" },
    ];
  }

  // Helper function to compare strings (case-insensitive, trimmed)
  eq(a, b) {
    if (!a || !b) return false;
    return a.toString().trim().toLowerCase() === b.toString().trim().toLowerCase();
  }

  // Calculate status based on all status fields
  calculateStatus(row) {
    const statusFields = Object.keys(row).filter(key => key.startsWith('Status'));
    
    if (statusFields.length === 0) return 'PENDING';
    
    // All status fields must be filled and either "Completed and Updated" or "Not Applicable"
    for (const field of statusFields) {
      const value = row[field];
      if (!value || value.trim() === '') return 'PENDING';
      
      const normalizedValue = value.trim().toLowerCase();
      if (normalizedValue !== 'completed and updated' && normalizedValue !== 'not applicable') {
        return 'PENDING';
      }
    }
    
    return 'COMPLETED';
  }

  // Load workdone data for a faculty by name
  async loadFacultyWorkdone(facultyName, designation = null) {
    if (!facultyName) {
      console.error('Faculty name is required');
      return [];
    }

    let allRows = [];
    let errors = [];

    // Show loading indicator
    const loadingBox = document.getElementById("workdoneLoadingBox");
    if (loadingBox) loadingBox.style.display = "";

    for (const entry of this.formTables) {
      try {
        // Skip core scope forms if designation doesn't match
        if (entry.table === "ASP" && designation?.toUpperCase() !== "ASP") continue;
        if (entry.table === "AP" && designation?.toUpperCase() !== "AP") continue;
        if (entry.table === "Prof" && !["PROF", "PROFESSOR"].includes(designation?.toUpperCase())) continue;

        const { data, error } = await this.supabaseClient
          .from(entry.table)
          .select("*");

        if (error) {
          console.warn(`Error fetching from ${entry.table}:`, error);
          errors.push(`${entry.table}: ${error.message}`);
          continue;
        }

        if (data && data.length > 0) {
          // Filter by faculty name (Portfolio Member Name field)
          const filtered = data.filter(row => {
            const memberName = row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['faculty_name'] || row['Faculty Name'] || row['Name'] || '';
            return this.eq(memberName, facultyName);
          });

          // Add portfolio info and calculate status
          filtered.forEach(row => {
            row._original = { ...row };
            row.portfolio = entry.portfolio;
            row.table = entry.table;
            row.status = this.calculateStatus(row);
            
            // Debug: log available fields for the first row
            if (filtered.indexOf(row) === 0) {
              console.log(`Available fields in ${entry.table}:`, Object.keys(row));
            }
          });

          allRows.push(...filtered);
        }
      } catch (err) {
        console.error(`Exception for ${entry.table}:`, err);
        errors.push(`${entry.table}: ${err.message}`);
      }
    }

    // Hide loading indicator
    if (loadingBox) loadingBox.style.display = "none";

    // Handle errors
    const errorBox = document.getElementById("workdoneErrorBox");
    if (errors.length > 0) {
      console.warn('Workdone fetch errors:', errors);
      if (errorBox) {
        errorBox.textContent = `Some tables failed to load: ${errors.join(', ')}`;
        errorBox.classList.remove("hidden");
      }
    } else if (errorBox) {
      errorBox.classList.add("hidden");
    }

    this.workdoneRows = allRows;
    return allRows;
  }

  // Load workdone data for a department (for workdone.html HOD view)
  async loadDepartmentWorkdone(department) {
    if (!department) {
      console.error('Department is required');
      return [];
    }

    let allRows = [];
    let errors = [];

    // Show loading indicator
    const loadingBox = document.getElementById("loadingBox");
    if (loadingBox) loadingBox.style.display = "";

    // First, get all verified records for this department to exclude them
    let verifiedInputIds = new Set(); // Use Set for faster lookup
    try {
      const { data: verifiedData, error: verifiedError } = await this.supabaseClient
        .from('hod-workdone')
        .select('input_id, table_name')
        .eq('department', department);
      
      if (!verifiedError && verifiedData) {
        // Store verified input_ids for quick lookup
        verifiedData.forEach(record => {
          if (record.input_id) {
            verifiedInputIds.add(`${record.table_name}_${record.input_id}`);
          }
        });
        console.log(`Found ${verifiedInputIds.size} verified records to exclude`);
      }
    } catch (err) {
      console.warn('Error fetching verified records:', err);
    }

    for (const entry of this.formTables) {
      try {
        const { data, error } = await this.supabaseClient
          .from(entry.table)
          .select("*");

        if (error) {
          console.warn(`Error fetching from ${entry.table}:`, error);
          errors.push(`${entry.table}: ${error.message}`);
          continue;
        }

        if (data && data.length > 0) {
          // Filter by department
          const filtered = data.filter(row => {
            const rowDept = row['Department'] || row['Department:'] || row['department'] || row['department:'] || '';
            return this.eq(rowDept, department);
          });

          // Add portfolio info and calculate status, with frequency detection
          filtered.forEach(row => {
            row._original = { ...row };
            
            // Store the input_id (record's unique ID from database)
            row.input_id = row.id; // Store the database record ID as input_id
            
            // Add frequency to portfolio name based on table name
            let frequency = '';
            const tableName = entry.table.toLowerCase();
            if (tableName.includes('weekly')) frequency = ' (Weekly)';
            else if (tableName.includes('daily')) frequency = ' (Daily)';
            else if (tableName.includes('month') && tableName.includes('once in a month')) frequency = ' (Monthly)';
            else if (tableName.includes('semester')) frequency = ' (Semester)';
            else if (tableName.includes('year')) frequency = ' (Yearly)';
            else if (tableName.includes('3 months') || tableName.includes('once in 3')) frequency = ' (Once in 3 Months)';
            else if (tableName.includes('15 days') || tableName.includes('once in 15')) frequency = ' (Once in 15 Days)';
            else if (tableName.includes('2 months') || tableName.includes('once in 2')) frequency = ' (Once in 2 Months)';
            
            row.portfolio = entry.portfolio + frequency;
            row.table = entry.table;
            row.status = this.calculateStatus(row);
            
            // Add member name and department for display
            row.member = row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['faculty_name'] || row['Faculty Name'] || row['Name'] || '';
            row.department = row['Department'] || row['Department:'] || row['department'] || row['department:'] || department;
          });

          // Filter out already verified records based on input_id
          const unverifiedRows = filtered.filter(row => {
            if (!row.input_id) {
              console.warn('Row missing input_id:', row);
              return true; // Include records without input_id (shouldn't happen, but safe fallback)
            }
            
            const recordKey = `${entry.table}_${row.input_id}`;
            const isAlreadyVerified = verifiedInputIds.has(recordKey);
            return !isAlreadyVerified;
          });

          console.log(`${entry.table}: ${filtered.length} total, ${unverifiedRows.length} unverified`);
          allRows.push(...unverifiedRows);
        }
      } catch (err) {
        console.error(`Exception for ${entry.table}:`, err);
        errors.push(`${entry.table}: ${err.message}`);
      }
    }

    // Hide loading indicator
    if (loadingBox) loadingBox.style.display = "none";

    // Handle errors
    const errorBox = document.getElementById("errorBox");
    if (errors.length > 0) {
      console.warn('Workdone fetch errors:', errors);
      if (errorBox) {
        errorBox.textContent = `Some tables failed to load: ${errors.join(', ')}`;
        errorBox.classList.remove("hidden");
      }
    } else if (errorBox) {
      errorBox.classList.add("hidden");
    }

    this.workdoneRows = allRows;
    return allRows;
  }

  // Render workdone table
  renderWorkdoneTable(rows) {
    window._workdoneRows = rows; // Global access for modal

    const tbody = document.getElementById("facultyWorkdoneTable");
    if (!tbody) {
      console.error('facultyWorkdoneTable element not found');
      return;
    }

    // Check if we're on faculty-profile.html (editable page)
    const isEditablePage = window.location.pathname.includes('faculty-profile') || 
                          document.title.includes('Faculty Profile') && 
                          document.querySelector('#editProfileBtn'); // Check for edit button

    if (!rows || rows.length === 0) {
      const colspan = isEditablePage ? '6' : '5'; // Extra column for delete button
      tbody.innerHTML = `<tr><td colspan='${colspan}' class='text-center text-gray-400 p-4'>No workdone records found for this faculty.</td></tr>`;
      return;
    }

    let html = "";
    rows.forEach((row, idx) => {
      const statusClass = row.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
      
      // Get department from the row data, fallback to a default
      const department = row['Department'] || row['Department:'] || 'CSE'; // Default department
      
      html += `<tr class="hover:bg-gray-50">
        <td class="px-4 py-2 border-b">${department}</td>
        <td class="px-4 py-2 border-b">${row.portfolio || '-'}</td>
        <td class="px-4 py-2 border-b">${row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['Faculty Name'] || row['Name'] || '-'}</td>
        <td class="px-4 py-2 border-b">
          <span class="px-2 py-1 rounded text-xs font-medium ${statusClass}">${row.status || 'PENDING'}</span>
        </td>
        <td class="px-4 py-2 border-b">
          <button onclick="viewRowDetails(${idx})" class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">View</button>
        </td>`;
      
      // Add delete button only for faculty-profile.html
      if (isEditablePage) {
        html += `<td class="px-4 py-2 border-b">
          <button onclick="deleteWorkdoneRow(${idx})" class="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Delete</button>
        </td>`;
      }
      
      html += `</tr>`;
    });

    tbody.innerHTML = html;
    
    // Apply filter if search exists
    this.filterWorkdoneTable();
  }

  // Render workdone table for HOD view (workdone.html) with verify buttons
  renderHodWorkdoneTable(rows) {
    console.log('Rendering HOD workdone table with', rows.length, 'rows');
    window._workdoneRows = rows; // Global access for modal

    const tbody = document.getElementById("workdoneTable");
    if (!tbody) {
      console.error('workdoneTable element not found');
      return;
    }

    if (!rows || rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan='6' class='text-center text-gray-400 p-4'>No workdone records found for this department.</td></tr>`;
      return;
    }

    let html = "";
    rows.forEach((row, idx) => {
      const statusText = (row.status || '').toString().toUpperCase();
      let statusClass = '';
      if (statusText === 'COMPLETED') {
        statusClass = 'text-green-600 font-bold uppercase';
      } else if (statusText === 'PENDING') {
        statusClass = 'text-red-600 font-bold uppercase';
      } else {
        statusClass = 'font-bold uppercase';
      }

      // Simple verification check - you can enhance this to check against hod-workdone table
      const verifyButtonHtml = `<button class="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm" onclick="verifyRow(this, ${idx})">Verify</button>`;
      
      html += `<tr class="hover:bg-purple-50 transition border-b border-gray-200" data-row-idx="${idx}">
        <td class='p-3 border-r border-gray-200'>${row.department}</td>
        <td class='p-3 border-r border-gray-200'>${row.portfolio}</td>
        <td class='p-3 border-r border-gray-200'>${row.member}</td>
        <td class='p-3 border-r border-gray-200'><span class='${statusClass}'>${statusText}</span></td>
        <td class='p-3 text-center'>${verifyButtonHtml}</td>
        <td class='p-3 text-center'><button class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded" onclick="viewRowDetails(${idx})">View</button></td>
      </tr>`;
    });

    tbody.innerHTML = html;
    console.log('Table rendered successfully');
    
    // Apply filter if search exists (with error handling)
    try {
      this.filterWorkdoneTable();
    } catch (err) {
      console.warn('Filter function failed:', err);
    }
  }

  // Filter workdone table by search
  filterWorkdoneTable() {
    const searchInput = document.getElementById('workdoneSearch');
    if (!searchInput) return;

    const search = searchInput.value.toLowerCase();
    
    // Try both table IDs (facultyWorkdoneTable for faculty profiles, workdoneTable for HOD view)
    let tableElement = document.getElementById('facultyWorkdoneTable');
    if (!tableElement) {
      tableElement = document.getElementById('workdoneTable');
    }
    
    if (!tableElement) {
      console.warn('No workdone table found for filtering');
      return;
    }
    
    const rows = Array.from(tableElement.querySelectorAll('tr'));
    
    rows.forEach(row => {
      const memberCell = row.querySelector('td:nth-child(3)'); // Portfolio Member Name
      const departmentCell = row.querySelector('td:nth-child(1)'); // Department 
      const portfolioCell = row.querySelector('td:nth-child(2)'); // Portfolio Name
      
      if (!memberCell || !departmentCell || !portfolioCell) return;
      
      const memberText = memberCell.textContent.toLowerCase();
      const departmentText = departmentCell.textContent.toLowerCase();
      const portfolioText = portfolioCell.textContent.toLowerCase();
      const shouldShow = memberText.includes(search) || departmentText.includes(search) || portfolioText.includes(search);
      
      row.style.display = shouldShow ? '' : 'none';
    });
  }

  // Initialize workdone section for a faculty
  async initWorkdoneSection(facultyName, designation = null) {
    try {
      // Store reference for delete functionality
      window._currentWorkdoneTable = this;
      
      const rows = await this.loadFacultyWorkdone(facultyName, designation);
      this.renderWorkdoneTable(rows);
      
      // Setup search functionality
      const searchInput = document.getElementById('workdoneSearch');
      if (searchInput) {
        searchInput.addEventListener('input', () => this.filterWorkdoneTable());
      }
      
      return rows;
    } catch (error) {
      console.error('Error initializing workdone section:', error);
      const tbody = document.getElementById("facultyWorkdoneTable");
      if (tbody) {
        const isEditablePage = window.location.pathname.includes('faculty-profile') || 
                              document.title.includes('Faculty Profile') && 
                              document.querySelector('#editProfileBtn');
        const colspan = isEditablePage ? '6' : '5';
        tbody.innerHTML = `<tr><td colspan='${colspan}' class='text-center text-red-500 p-4'>Error loading workdone data: ${error.message}</td></tr>`;
      }
      return [];
    }
  }

  // Initialize workdone section for HOD department view
  async initHodWorkdoneSection(department) {
    try {
      console.log('Initializing HOD workdone section for department:', department);
      
      // Store reference for functionality
      window._currentWorkdoneTable = this;
      
      const rows = await this.loadDepartmentWorkdone(department);
      console.log('Loaded rows:', rows.length);
      
      this.renderHodWorkdoneTable(rows);
      
      // Setup search functionality
      const searchInput = document.getElementById('workdoneSearch');
      if (searchInput) {
        console.log('Setting up search functionality');
        searchInput.addEventListener('input', () => this.filterWorkdoneTable());
      } else {
        console.warn('Search input not found');
      }
      
      return rows;
    } catch (error) {
      console.error('Error initializing HOD workdone section:', error);
      const tbody = document.getElementById("workdoneTable");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan='6' class='text-center text-red-500 p-4'>Error loading workdone data: ${error.message}</td></tr>`;
      }
      return [];
    }
  }
}

// Global functions for modal (required by HTML pages)
window.viewRowDetails = function(idx) {
  console.log('viewRowDetails called with index:', idx);
  const row = window._workdoneRows && window._workdoneRows[idx];
  if (!row) {
    console.error('Row not found for index:', idx);
    console.log('Available rows:', window._workdoneRows);
    return;
  }
  
  console.log('Row found:', row);
  const details = row._original || row;
  
  // Use form-modal-mapper.js function
  if (typeof getFormModalContent !== 'function') {
    console.error('getFormModalContent function not found. Make sure form-modal-mapper.js is included.');
    console.log('Available global functions:', Object.keys(window).filter(key => typeof window[key] === 'function'));
    return;
  }
  
  console.log('Generating modal content...');
  const html = getFormModalContent(row, details);
  const modalContent = document.getElementById('viewModalContent');
  const modal = document.getElementById('viewModal');
  
  if (modalContent && modal) {
    console.log('Modal elements found, showing modal');
    modalContent.innerHTML = html;
    modal.classList.remove('hidden');
  } else {
    console.error('Modal elements not found');
    console.log('modalContent:', modalContent, 'modal:', modal);
  }
};

window.deleteWorkdoneRow = function(idx) {
  const row = window._workdoneRows && window._workdoneRows[idx];
  if (!row) {
    console.error('Row not found for index:', idx);
    return;
  }
  
  // Get table name and row ID for deletion
  const tableName = row.table;
  
  // Try multiple possible ID field names (prioritizing input_id which was found in database)
  const possibleIdFields = [
    'input_id', // Primary key field found in your database
    'id', 'Id', 'ID', 
    'record_id', 'Record_Id', 'Record_ID',
    'row_id', 'Row_Id', 'Row_ID',
    '_id', 'uuid', 'UUID',
    'primary_key', 'Primary_Key',
    'key', 'Key'
  ];
  
  let rowId = null;
  let foundIdField = null;
  
  // Try to find a valid ID field
  for (const field of possibleIdFields) {
    if (row[field] !== undefined && row[field] !== null && row[field] !== '') {
      rowId = row[field];
      foundIdField = field;
      console.log(`Using ID field: ${field} with value: ${rowId}`);
      break;
    }
  }
  
  if (!tableName) {
    alert('Error: Could not determine table name for deletion.');
    return;
  }
  
  if (!rowId) {
    // If no ID found, show available fields for debugging
    console.log('Available row fields:', Object.keys(row));
    console.log('Row values:', row);
    alert('Error: Could not determine record ID for deletion. Please check the console for all available fields.');
    return;
  }
  
  // Confirm deletion
  const portfolioName = row.portfolio || 'Unknown Portfolio';
  const memberName = row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || 'Unknown Member';
  
  if (!confirm(`Are you sure you want to delete this workdone record?\n\nPortfolio: ${portfolioName}\nMember: ${memberName}\nTable: ${tableName}\nID: ${rowId}`)) {
    return;
  }
  
  // Perform deletion
  deleteFromSupabase(tableName, rowId, idx, foundIdField);
};

async function deleteFromSupabase(tableName, rowId, rowIndex, idFieldName) {
  try {
    // Show loading state
    const deleteBtn = document.querySelector(`button[onclick="deleteWorkdoneRow(${rowIndex})"]`);
    if (deleteBtn) {
      deleteBtn.disabled = true;
      deleteBtn.textContent = 'Deleting...';
      deleteBtn.classList.remove('bg-red-500', 'hover:bg-red-700');
      deleteBtn.classList.add('bg-gray-400');
    }
    
    // Get supabase client (should be available globally)
    if (typeof supabaseClient === 'undefined') {
      throw new Error('Supabase client not found. Make sure it is initialized.');
    }
    
    // Use the identified ID field name, or try common ones (prioritizing input_id)
    const idColumnsToTry = idFieldName ? [idFieldName] : ['input_id', 'id', 'Id', 'ID', 'record_id', 'Record_Id'];
    let deleteResult = null;
    let lastError = null;
    
    for (const idColumn of idColumnsToTry) {
      try {
        console.log(`Attempting to delete from ${tableName} where ${idColumn} = ${rowId}`);
        
        const { data, error } = await supabaseClient
          .from(tableName)
          .delete()
          .eq(idColumn, rowId);
        
        if (!error) {
          deleteResult = { data, error };
          console.log(`Successfully deleted using ${idColumn} field`);
          break;
        } else {
          console.log(`Failed with ${idColumn}:`, error);
          lastError = error;
        }
      } catch (err) {
        console.log(`Exception with ${idColumn}:`, err);
        lastError = err;
        continue;
      }
    }
    
    if (!deleteResult || lastError) {
      throw lastError || new Error('Could not delete record with any ID column name');
    }
    
    // Remove from local array
    if (window._workdoneRows && window._workdoneRows[rowIndex]) {
      window._workdoneRows.splice(rowIndex, 1);
    }
    
    // Re-render table
    const workdoneTable = window._currentWorkdoneTable;
    if (workdoneTable) {
      workdoneTable.renderWorkdoneTable(window._workdoneRows);
    } else {
      // Fallback: reload the workdone section
      location.reload();
    }
    
    alert('Record deleted successfully!');
    
  } catch (error) {
    console.error('Delete error:', error);
    alert(`Failed to delete record: ${error.message}`);
    
    // Reset button state
    const deleteBtn = document.querySelector(`button[onclick="deleteWorkdoneRow(${rowIndex})"]`);
    if (deleteBtn) {
      deleteBtn.disabled = false;
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.remove('bg-gray-400');
      deleteBtn.classList.add('bg-red-500', 'hover:bg-red-700');
    }
  }
}

window.closeViewModal = function() {
  const modal = document.getElementById('viewModal');
  const modalContent = document.getElementById('viewModalContent');
  
  if (modal) modal.classList.add('hidden');
  if (modalContent) modalContent.innerHTML = '';
};

// Global verify function for HOD workdone.html
window.verifyRow = function(btn, idx) {
  const row = window._workdoneRows && window._workdoneRows[idx];
  if (!row) {
    console.error('Row not found for index:', idx);
    return;
  }

  // Confirm verification
  if (!confirm(`Are you sure you want to verify this workdone record?\n\nPortfolio: ${row.portfolio}\nMember: ${row.member}\nDepartment: ${row.department}`)) {
    return;
  }

  // Get HOD name from localStorage
  const verified_by = localStorage.getItem('Name') || localStorage.getItem('name') || 'HOD';

  // Show loading state
  btn.disabled = true;
  btn.textContent = 'Verifying...';
  btn.classList.remove('bg-green-500', 'hover:bg-green-700');
  btn.classList.add('bg-gray-400');

  // Insert into hod-workdone table
  const verificationData = {
    input_id: row.input_id, // Store the original record's input_id
    table_name: row.table, // Store the source table name
    department: row.department,
    portfolio_name: row.portfolio,
    portfolio_member_name: row.member,
    status: row.status,
    verified_by: verified_by,
    verified_at: new Date().toISOString()
  };

  if (typeof supabaseClient !== 'undefined') {
    supabaseClient
      .from('hod-workdone')
      .insert([verificationData])
      .then(({ data, error }) => {
        if (error) {
          console.error('Verification error:', error);
          alert(`Failed to verify record: ${error.message}`);
          
          // Reset button state
          btn.disabled = false;
          btn.textContent = 'Verify';
          btn.classList.remove('bg-gray-400');
          btn.classList.add('bg-green-500', 'hover:bg-green-700');
        } else {
          console.log('Verification successful:', data);
          
          // Remove the verified row from the unverified workdone arrays based on input_id
          if (window._allWorkdoneRows && window._allWorkdoneRows[idx]) {
            // Remove from main array by index
            window._allWorkdoneRows.splice(idx, 1);
            
            // Update filtered rows if they exist - find by input_id and table
            if (window._filteredWorkdoneRows) {
              const filteredIdx = window._filteredWorkdoneRows.findIndex(r => 
                r.input_id === row.input_id && r.table === row.table
              );
              if (filteredIdx !== -1) {
                window._filteredWorkdoneRows.splice(filteredIdx, 1);
              }
            }
            
            // Update working rows if they exist - find by input_id and table
            if (window._workingWorkdoneRows) {
              const workingIdx = window._workingWorkdoneRows.findIndex(r => 
                r.input_id === row.input_id && r.table === row.table
              );
              if (workingIdx !== -1) {
                window._workingWorkdoneRows.splice(workingIdx, 1);
              }
            }
            
            // Update _workdoneRows reference
            window._workdoneRows = window._allWorkdoneRows;
          }
          
          // Re-render the first table to show updated data
          if (typeof renderHodWorkdoneTableWithPagination === 'function') {
            renderHodWorkdoneTableWithPagination(workdoneCurrentPage || 1);
          } else if (typeof renderFilteredWorkdoneTable === 'function') {
            renderFilteredWorkdoneTable(workdoneCurrentPage || 1);
          }
          
          // Add to verified workdone table if arrays exist
          if (window._allVerifiedRows) {
            const verifiedRecord = {
              input_id: row.input_id,
              table_name: row.table,
              department: row.department,
              portfolio_name: row.portfolio,
              portfolio_member_name: row.member,
              status: row.status,
              verified_by: verified_by,
              verified_at: new Date().toISOString()
            };
            
            // Add to beginning of verified arrays (with duplicate check)
            const existsInVerified = window._allVerifiedRows.some(existing => 
              existing.input_id === verifiedRecord.input_id
            );
            
            if (!existsInVerified) {
              window._allVerifiedRows.unshift(verifiedRecord);
              if (window._filteredVerifiedRows) {
                window._filteredVerifiedRows.unshift(verifiedRecord);
              }
              if (window._workingVerifiedRows) {
                window._workingVerifiedRows.unshift(verifiedRecord);
              }
              window._verifiedRows = window._allVerifiedRows;
            }
            
            // Re-render verified table
            if (typeof renderVerifiedWorkdoneTableWithPagination === 'function') {
              renderVerifiedWorkdoneTableWithPagination(verifiedCurrentPage || 1);
            }
          }
          
          alert('Record verified successfully!');
        }
      })
      .catch(err => {
        console.error('Verification exception:', err);
        alert(`Failed to verify record: ${err.message}`);
        
        // Reset button state
        btn.disabled = false;
        btn.textContent = 'Verify';
        btn.classList.remove('bg-gray-400');
        btn.classList.add('bg-green-500', 'hover:bg-green-700');
      });
  } else {
    console.error('Supabase client not found');
    alert('Error: Database connection not available');
    
    // Reset button state
    btn.disabled = false;
    btn.textContent = 'Verify';
    btn.classList.remove('bg-gray-400');
    btn.classList.add('bg-green-500', 'hover:bg-green-700');
  }
};

// Create modal HTML if not present
function ensureModalExists() {
  if (!document.getElementById('viewModal')) {
    const modalHtml = `
    <div id="viewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 hidden">
      <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onclick="closeViewModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold">&times;</button>
        <div id="viewModalContent"></div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
}

// Initialize modal immediately when script loads
ensureModalExists();

// Export for use in HTML pages
window.WorkdoneTable = WorkdoneTable;
