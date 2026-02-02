// workdone-table.js
// Centralized WORKDONE table logic for all faculty profile pages
// Requires: form-modal-mapper.js for getFormModalContent function

class WorkdoneTable {
  // Initialize workdone section for a faculty
  async initWorkdoneSection(facultyName, designation = null) {
    try {
      window._currentWorkdoneTable = this;
      const loadedRows = await this.loadFacultyWorkdone(facultyName, designation);
      this.renderWorkdoneTable(loadedRows);

      // Setup search functionality
      const searchInputInit = document.getElementById('workdoneSearch');
      if (searchInputInit) {
        searchInputInit.addEventListener('input', () => this.filterWorkdoneTable());
      }

      return loadedRows;
    } catch (error) {
      console.error('Error initializing workdone section:', error);
      const tbody = document.getElementById("facultyWorkdoneTable");
      if (tbody) {
        const isEditablePage = window.location.pathname.includes('faculty-profile') || 
                              document.title.includes('Faculty Profile') && 
                              document.querySelector('#editProfileBtn');
        const colspan = isEditablePage ? '5' : '4';
        tbody.innerHTML = `<tr><td colspan='${colspan}' class='text-center text-red-500 p-4'>Error loading workdone data: ${error.message}</td></tr>`;
      }
      return [];
    }
  }
  constructor(supabaseClient, onlyFacultyForms = false) {
    this.supabaseClient = supabaseClient;
    this.workdoneRows = [];
    this.onlyFacultyForms = onlyFacultyForms;
    
    // Faculty-only tables for HOD page
    const facultyOnlyTables = [
      "form1-monthly",
      "form2-monthly",
      "Form2-daily",
      "form3-monthly",
      "form4-monthly",
      "form5-monthly",
      "form6_monthly",
      "form7-monthly",
      "form8-monthly",
      "AP(Yearly)",
      "ASP(Yearly)",
      "Prof(Yearly)",
      "Core_scope",
      "AP_SH_Yearly",
      "ASP_SH_Yearly",
      "Prof_SH_Yearly",
      "Core_scope_SH"
    ];
    
    // All forms (Institution Level Forms + Faculty Forms)
    const allFormTables = [
      // Add Form 6 Once in 2 Months for IQAC workdone
      { table: "form6_once_in_2_month", portfolio: "Teaching & Learning Process Member (IQAC) (Once in 2 Months)" },
      // Add Form 6 Weekly for IQAC workdone
      { table: "Institution-form1-monthly", portfolio: "Director – Students welfare & Admission (Monthly)" },
      { table: "Institution-form1-once in six months", portfolio: "Director – Students welfare & Admission (Once in Six Months)" },
      { table: "Institution-form10", portfolio: "Head – Training" },
      { table: "Institution-form10 once in six months", portfolio: "Head – Training (Once in Six Months)" },
      { table: "Institution-form11", portfolio: "Training officer" },
      { table: "Institution-form12", portfolio: "Head - RISE" },
      { table: "Institution-form13-monthly", portfolio: "IT Infra – Coordinator (Monthly)" },
      { table: "Institution-form13-once in year", portfolio: "IT Infra – Coordinator (Once in Year)" },
      { table: "Institution-form13-oncein6months", portfolio: "IT Infra – Coordinator (Once in Six Months)" },
      { table: "Institution-form14-monthly", portfolio: "Website – Coordinator (Monthly)" },
      { table: "Institution-form14-oncein6months", portfolio: "Website – Coordinator (Once in Six Months)" },
      { table: "Institution-form15", portfolio: "ERP Coordinator" },
      { table: "Institution-form16", portfolio: "Public Relations officer" },
      { table: "Institution-form17", portfolio: "Logistics Coordinator" },
      { table: "Institution-form2", portfolio: "Head - HR" },
      { table: "Institution-form3-monthly", portfolio: "Principal (Monthly)" },
      { table: "Institution-form3-once in a semester", portfolio: "Principal (Once in a Semester)" },
      { table: "Institution-form4-monthly", portfolio: "Dean - IQAC (Monthly)" },
      { table: "Institution-form4-once in six months", portfolio: "Dean - IQAC (Once in Six Months)" },
      { table: "Institution-form5", portfolio: "Director - Academics" },
      { table: "Institution-form6-monthly", portfolio: "Controller of Examinations (Monthly)" },
      { table: "Institution-form6-oncein6months", portfolio: "Controller of Examinations (Once in Six Months)" },
      { table: "Institution-form7-monthly", portfolio: "Executive Dean – International Affairs (Monthly)" },
      { table: "Institution-form8", portfolio: "Head - Placements" },
      { table: "Institution-form9", portfolio: "Placement officer" },
      // Department Portfolio Forms (existing) - all form1 types use form1-monthly table
      { table: "form1-monthly", portfolio: "Students Performance in Training & Placement Member (Monthly)" },
      // NEW: Add support for new Form2-daily table (Postgres: "Form2-daily")
      { table: "Form2-daily", portfolio: "Class Advisor (Daily)" },
      { table: "form2-monthly", portfolio: "Class Advisor (Monthly)" },
      { table: "form2-weekly", portfolio: "Class Advisor (Weekly)" },
      { table: "form2-once in a month", portfolio: "Class Advisor (Monthly)" },
      { table: "form2-once in a semester", portfolio: "Class Advisor (Semester)" },
      { table: "form3-monthly", portfolio: "Faculty Information & Contribution Member (Monthly)" },
      { table: "form3-Weekly", portfolio: "Faculty Information & Contribution Member (Weekly)" },
      { table: "form3-once in a semester", portfolio: "Faculty Information & Contribution Member (Semester)" },
      { table: "form4-monthly", portfolio: "Course Outcome & Program Outcome Member (Exam Cell) (Monthly)" },
      { table: "form4-Weekly", portfolio: "Course Outcome & Program Outcome Member (Exam Cell) (Weekly)" },
      { table: "form4-once in a semester", portfolio: "Course Outcome & Program Outcome Member (Exam Cell) (Semester)" },
      { table: "form5-monthly", portfolio: "Continuous Improvement Member (Program Member) (Monthly)" },
      { table: "form5-Once in a 3 Months", portfolio: "Continuous Improvement Member (Program Member) (Quarterly)" },
      { table: "form6_monthly", portfolio: "Teaching & Learning Process Member (IQAC) (Monthly)" },
      { table: "form6-once in a semester", portfolio: "Teaching & Learning Process Member (IQAC) (Semester)" },
      { table: "form7-monthly", portfolio: "Student Support System Member (Discipline & Extra Curricular) (Monthly)" },
      { table: "form7-Once in a Semester", portfolio: "Student Support System Member (Discipline & Extra Curricular) (Semester)" },
      { table: "form7-Once in 2 Months", portfolio: "Student Support System Member (Discipline & Extra Curricular) (Bi-monthly)" },
      { table: "form8-monthly", portfolio: "Facilities & Technical Support Member (Lab Member) (Monthly)" },
      { table: "form8-weekly", portfolio: "Facilities & Technical Support Member (Lab Member) (Weekly)" },
      { table: "form8-once in 3 Months", portfolio: "Facilities & Technical Support Member (Lab Member) (Quarterly)" },
      // Core Scope Forms (ASP, AP, Professor)
      { table: "ASP(Yearly)", portfolio: "ASP Yearly Form" },
      { table: "AP(Yearly)", portfolio: "AP Yearly Form" },
      { table: "Prof(Yearly)", portfolio: "Prof Yearly Form" },
      { table: "Core_scope", portfolio: "Faculty Core Scope (Monthly)" },
      // S&H Faculty Forms
      { table: "AP_SH_Yearly", portfolio: "AP Yearly Form (S&H)" },
      { table: "ASP_SH_Yearly", portfolio: "ASP Yearly Form (S&H)" },
      { table: "Prof_SH_Yearly", portfolio: "Prof Yearly Form (S&H)" },
      { table: "Core_scope_SH", portfolio: "Faculty Core Scope (Monthly) (S&H)" },
    ];
    
    // Filter to only faculty forms if requested
    if (this.onlyFacultyForms) {
      this.formTables = allFormTables.filter(entry => facultyOnlyTables.includes(entry.table));
      console.log('WorkdoneTable: Loading ONLY faculty forms for HOD department view');
    } else {
      this.formTables = allFormTables;
      console.log('WorkdoneTable: Loading ALL forms (faculty + institutional)');
    }
  }

  // Helper function to compare strings (case-insensitive, trimmed)
  eq(a, b) {
    if (!a || !b) return false;
    return a.toString().trim().toLowerCase() === b.toString().trim().toLowerCase();
  }

  // Calculate status based on verification tables (verified/not verified/rejected)
  // REMOVED - Verification column removed from faculty workdone table

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
        // Skip S&H forms if designation doesn't match
        if (entry.table === "ASP_SH_Yearly" && designation?.toUpperCase() !== "ASP") continue;
        if (entry.table === "AP_SH_Yearly" && designation?.toUpperCase() !== "AP") continue;
        if (entry.table === "Prof_SH_Yearly" && !["PROF", "PROFESSOR"].includes(designation?.toUpperCase())) continue;

        // Fetch all records with pagination (handle >1000 records)
        let allData = [];
        let rangeStart = 0;
        const rangeSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data, error, count } = await this.supabaseClient
            .from(entry.table)
            .select("*", { count: 'exact' })
            .range(rangeStart, rangeStart + rangeSize - 1);

          if (error) {
            console.warn(`Error fetching from ${entry.table}:`, error);
            errors.push(`${entry.table}: ${error.message}`);
            break;
          }

          if (data && data.length > 0) {
            allData = allData.concat(data);
          }

          // Check if there are more records
          hasMore = data && data.length === rangeSize;
          rangeStart += rangeSize;
        }

        const data = allData;
        const error = null;

        if (error) {
          continue;
        }

        if (data && data.length > 0) {
          // Filter by faculty name (Portfolio Member Name field, with and without colon)
          const filtered = data.filter(row => {
            const memberName = row['Portfolio Member Name:'] || row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['faculty_name'] || row['Faculty Name'] || row['Name'] || '';
            return this.eq(memberName, facultyName);
          });

          // Add portfolio info
          filtered.forEach(row => {
            row._original = { ...row };
            row.portfolio = entry.portfolio;
            row.table = entry.table;
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

    // Sort by timestamp - recently submitted/updated records first
    allRows.sort((a, b) => {
      // Try multiple timestamp fields (created_at, updated_at, etc.)
      const getTimestamp = (row) => {
        const fields = ['updated_at', 'created_at', 'submission_date', 'date_submitted', 'timestamp', 'last_modified'];
        for (const field of fields) {
          if (row[field]) {
            const date = new Date(row[field]);
            if (!isNaN(date.getTime())) {
              return date.getTime();
            }
          }
        }
        
        // Fallback: use current time (newest records will appear first)
        // This ensures recently processed records appear at top
        return Date.now();
      };
      
      const timestampA = getTimestamp(a);
      const timestampB = getTimestamp(b);
      
      // Sort in descending order (newest first)
      return timestampB - timestampA;
    });
    
    console.log('Sorted faculty workdone records - most recent submissions first');

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

    // Fetch verification data from both tables for this department
    let verifiedData = [];
    let rejectedData = [];
    let verifiedCompositeKeys = new Set(); // Use Set for faster lookup
    try {
      const [verifyRes, rejectRes] = await Promise.all([
        this.supabaseClient.from('Hod-workdone').select('*').eq('department', department),
        this.supabaseClient.from('Hod-workdone_reject').select('*').eq('department', department)
      ]);
      
      verifiedData = verifyRes.data || [];
      rejectedData = rejectRes.data || [];
      
      // Store composite keys (input_id + table_name) for quick lookup
      verifiedData.forEach(record => {
        if (record.input_id && record.table_name) {
          const key = `${record.input_id}__${record.table_name}`;
          verifiedCompositeKeys.add(key);
        }
      });
    } catch (err) {
      console.warn('Error fetching verification data:', err);
    }

    for (const entry of this.formTables) {
      try {
        // Skip institution forms for HOD department view
        if (entry.table.toLowerCase().startsWith('institution-')) {
          continue;
        }
        
        // Fetch all records with pagination (handle >1000 records)
        let allData = [];
        let rangeStart = 0;
        const rangeSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data: pageData, error: pageError } = await this.supabaseClient
            .from(entry.table)
            .select("*")
            .range(rangeStart, rangeStart + rangeSize - 1);

          if (pageError) {
            console.warn(`Error fetching from ${entry.table}:`, pageError);
            errors.push(`${entry.table}: ${pageError.message}`);
            break;
          }

          if (pageData && pageData.length > 0) {
            allData = allData.concat(pageData);
          }

          // Check if there are more records
          hasMore = pageData && pageData.length === rangeSize;
          rangeStart += rangeSize;
        }

        const data = allData;
        const error = null;

        if (error) {
          continue;
        }

        if (data && data.length > 0) {
          // Debug: Log data from form2-daily specifically
          if (entry.table === 'form2-daily') {
            console.log(`🔍 DEBUG: Found ${data.length} records in form2-daily table:`, data);
            console.log(`🔍 DEBUG: Looking for department: "${department}"`);
            data.forEach((row, idx) => {
              const rowDept = row['Department'] || row['Department:'] || row['department'] || row['department:'] || '';
              const rowMember = row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['faculty_name'] || row['Faculty Name'] || row['Name'] || '';
              console.log(`   📄 Record ${idx}: Department="${rowDept}", Member="${rowMember}", input_id="${row.input_id}"`);
              console.log(`   📄 All columns:`, Object.keys(row));
              console.log(`   📄 Department match:`, this.eq(rowDept, department));
            });
          }
          
          // Filter by department
          // For Institution forms (table name starts with 'Institution-'), include all records regardless of department
          const isInstitutionForm = entry.table.toLowerCase().startsWith('institution-');
          const filtered = data.filter(row => {
            if (isInstitutionForm) {
              // Institution forms don't have department - show them for all users
              return true;
            }
            const rowDept = row['Department'] || row['Department:'] || row['department'] || row['department:'] || '';
            return this.eq(rowDept, department);
          });
          
          // Debug: Log filtered results for form2-daily
          if (entry.table === 'form2-daily') {
            console.log(`🔍 DEBUG: After department filter, form2-daily has ${filtered.length} records for department "${department}"`);
          }
          
          // Debug: Log Institution form results
          if (isInstitutionForm && filtered.length > 0) {
            console.log(`📋 Institution form ${entry.table}: Found ${filtered.length} records`);
          }

          // Add portfolio info and calculate status, with frequency detection
          filtered.forEach(row => {
            row._original = { ...row };
            
            // Use the input_id directly from database (after schema update)
            // The input_id should now exist in all form tables after running the SQL
            if (!row.input_id) {
              console.warn('Row missing input_id from database:', entry.table, row);
              // Create a temporary ID for now
              row.input_id = row.id || `temp_${entry.table}_${Date.now()}_${Math.random()}`;
            }
            
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
            
            // Calculate verification status
            let verificationStatus = 'PENDING VERIFICATION';
            if (row.input_id) {
              // Check if rejected first (priority)
              const matchingReject = rejectedData.find(v => 
                v.input_id === row.input_id &&
                v.table_name?.toLowerCase() === row.table?.toLowerCase()
              );
              
              if (matchingReject) {
                verificationStatus = 'REJECTED';
                row.rejectedAt = matchingReject.rejected_at;
                row.rejectedBy = matchingReject.rejected_by;
                row.rejectionReason = matchingReject.Commands || 'No reason provided';
              } else {
                // Check if verified
                const matchingVerify = verifiedData.find(v => 
                  v.input_id === row.input_id &&
                  v.table_name?.toLowerCase() === row.table?.toLowerCase()
                );
                
                if (matchingVerify) {
                  verificationStatus = 'VERIFIED';
                  row.verifiedAt = matchingVerify.verified_at;
                  row.verifiedBy = matchingVerify.verified_by;
                }
              }
            }
            
            row.status = verificationStatus;
            row.verificationStatus = verificationStatus;
            
            // Add member name and department for display
            // For Institution forms, also check for "Portfolio Member Name:" with colon
            row.member = row['Portfolio Member Name:'] || row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['faculty_name'] || row['Faculty Name'] || row['Name'] || '';
            row.department = row['Department'] || row['Department:'] || row['department'] || row['department:'] || (entry.table.toLowerCase().startsWith('institution-') ? 'Institution' : department);
          });

          // Filter out already verified records based on composite key (input_id + table_name)
          const unverifiedRows = filtered.filter(row => {
            if (row.input_id && row.table) {
              const key = `${row.input_id}__${row.table}`;
              return !verifiedCompositeKeys.has(key);
            } else {
              console.warn('Row missing input_id or table:', row);
              return true; // Include records without input_id or table (shouldn't happen, but safe fallback)
            }
          });
          
          // Debug: Log final count for form2-daily
          if (entry.table === 'form2-daily') {
            console.log(`🔍 DEBUG: form2-daily final unverified count: ${unverifiedRows.length}`);
          }

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

    // Sort by timestamp - recently submitted/updated records first
    allRows.sort((a, b) => {
      // Try multiple timestamp fields (created_at, updated_at, etc.)
      const getTimestamp = (row) => {
        const fields = ['updated_at', 'created_at', 'submission_date', 'date_submitted', 'timestamp', 'last_modified'];
        for (const field of fields) {
          if (row[field]) {
            const date = new Date(row[field]);
            if (!isNaN(date.getTime())) {
              return date.getTime();
            }
          }
        }
        
        // Fallback: use current time (newest records will appear first)
        return Date.now();
      };
      
      const timestampA = getTimestamp(a);
      const timestampB = getTimestamp(b);
      
      // Sort in descending order (newest first)
      return timestampB - timestampA;
    });
    
    console.log('Sorted workdone records - most recent submissions first');

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

    // Sort by submitted_at timestamp - newest first
    const sortedRows = [...rows].sort((a, b) => {
      const aTime = new Date(a.submitted_at || a.created_at || a.updated_at || 0);
      const bTime = new Date(b.submitted_at || b.created_at || b.updated_at || 0);
      return bTime - aTime; // Newest first
    });

    // Store sorted rows globally for pagination
    window._sortedWorkdoneRows = sortedRows;

    // Render with pagination
    this.renderWorkdoneTableWithPagination(1);
  }

  async renderWorkdoneTableWithPagination(page = 1) {
    const itemsPerPage = 10;
    const rows = window._sortedWorkdoneRows || [];
    const totalItems = rows.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageRows = rows.slice(startIndex, endIndex);

    const tbody = document.getElementById("facultyWorkdoneTable");
    if (!tbody) {
      console.error('facultyWorkdoneTable element not found');
      return;
    }

    // Check if we're on faculty-profile.html (editable page)
    const isEditablePage = window.location.pathname.includes('faculty-profile') || 
                          document.title.includes('Faculty Profile') && 
                          document.querySelector('#editProfileBtn'); // Check for edit button

    // Add submission date column to header
    const thead = tbody.parentElement.querySelector('thead tr');
    if (thead && !Array.from(thead.children).find(th => th.textContent.trim() === 'Submission Date')) {
      // Insert after Portfolio Member Name
      const submittedAtTh = document.createElement('th');
      submittedAtTh.className = 'p-3 border-b border-gray-300';
      submittedAtTh.textContent = 'Submission Date';
      thead.insertBefore(submittedAtTh, thead.children[3]);
    }

    if (!currentPageRows || currentPageRows.length === 0) {
      const colspan = isEditablePage ? '5' : '4';
      tbody.innerHTML = `<tr><td colspan='${colspan}' class='text-center text-gray-400 p-4'>No workdone records found for this faculty.</td></tr>`;
      
      // Clear pagination if no data
      const paginationContainer = document.getElementById('workdonePagination');
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
      }
      return;
    }

    // Fetch edit request statuses if on editable page
    let editRequestMap = {};
    let allEditRequests = []; // Store all requests for fallback matching
    if (isEditablePage && window.editRequestSystem) {
      const facultyEmail = document.getElementById('facultyEmail')?.value || window.facultyEmail;
      console.log('🔍 Checking edit requests for faculty:', facultyEmail);
      
      if (facultyEmail) {
        // Get input_ids, handling both numeric and string types
        const inputIds = currentPageRows
          .map(r => r.input_id)
          .filter(id => id !== null && id !== undefined);
        
        console.log('📋 Input IDs on current page:', inputIds);
        console.log('📋 Input ID types:', inputIds.map(id => typeof id));
        
        try {
          // Fetch ALL edit requests for this faculty (not filtering by input_id in query)
          // to handle type mismatches and null input_ids
          const { data, error } = await this.supabaseClient
            .from('workdone_edit_requests')
            .select('*')
            .eq('faculty_email', facultyEmail)
            .order('requested_at', { ascending: false });
          
          console.log('📊 All edit requests for faculty:', data?.length || 0, data);
          if (error) console.error('Edit request fetch error:', error);
          
          if (data) {
            allEditRequests = data; // Store for fallback matching
            
            // Match requests to rows, handling type differences
            data.forEach(req => {
              const reqInputId = req.input_id;
              
              // Only match by input_id if it's not null
              if (reqInputId !== null && reqInputId !== undefined) {
                // Try to find matching input_id (handle string/number mismatch)
                const matchingRowInputId = inputIds.find(rowId => 
                  rowId == reqInputId || // Loose equality for type coercion
                  String(rowId) === String(reqInputId)
                );
                
                if (matchingRowInputId !== undefined && !editRequestMap[matchingRowInputId]) {
                  editRequestMap[matchingRowInputId] = req;
                  console.log(`  ✅ Matched by input_id: ${matchingRowInputId}, status="${req.status}"`);
                }
              }
            });
            
            console.log('📋 Edit request map (by input_id):', editRequestMap);
            console.log('📋 Requests with null input_id:', data.filter(r => r.input_id === null).map(r => ({ portfolio: r.portfolio, status: r.status })));
          }
        } catch (err) {
          console.warn('Could not fetch edit request statuses:', err);
        }
      }
    }

    let html = "";
    currentPageRows.forEach((row, idx) => {
      // For institution forms, hide department cell
      const isInstitutionForm = row.table && row.table.toLowerCase().startsWith('institution-');
      let departmentCell = '';
      if (!isInstitutionForm) {
        const department = row['Department'] || row['Department:'] || 'CSE';
        departmentCell = `<td class="px-4 py-2 border-b">${department}</td>`;
      } else {
        departmentCell = `<td class="px-4 py-2 border-b"></td>`;
      }
      // Format submitted_at
      let submittedAt = row.submitted_at || row.created_at || row.updated_at || '';
      if (submittedAt) {
        const d = new Date(submittedAt);
        if (!isNaN(d)) {
          submittedAt = d.toLocaleString();
        }
      } else {
        submittedAt = '<span class="text-gray-400">-</span>';
      }
      
      // Calculate the original index in the full sorted array
      const originalIndex = startIndex + idx;
      
      html += `<tr class="hover:bg-gray-50">
         ${departmentCell}
        <td class="px-4 py-2 border-b">${row.portfolio || '-'}</td>
        <td class="px-4 py-2 border-b">${row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['Faculty Name'] || row['Name'] || '-'}</td>
        <td class="px-4 py-2 border-b">${submittedAt}</td>
        <td class="px-4 py-2 border-b">
          <button onclick="viewRowDetails(${originalIndex})" class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">View</button>
        </td>`;
      // Add edit request button only for faculty-profile.html
      if (isEditablePage) {
        const rowInputId = row.input_id;
        const rowPortfolio = row.portfolio || row['Portfolio Name'] || row.table;
        const rowMemberName = row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['Faculty Name'] || row['Name'];
        
        // Try to find edit request by input_id first, then by portfolio + member name
        let editRequest = editRequestMap[rowInputId];
        
        // If not found by input_id, try to find by portfolio name (for rows without input_id)
        if (!editRequest && allEditRequests && allEditRequests.length > 0) {
          editRequest = allEditRequests.find(req => {
            const portfolioMatch = req.portfolio && rowPortfolio && 
              (req.portfolio.toLowerCase().includes(rowPortfolio.toLowerCase()) ||
               rowPortfolio.toLowerCase().includes(req.portfolio.toLowerCase()));
            const nameMatch = req.faculty_name && rowMemberName &&
              req.faculty_name.toLowerCase() === rowMemberName.toLowerCase();
            return portfolioMatch && nameMatch && !req.is_edit_completed;
          });
          if (editRequest) {
            console.log(`  ✅ Found request by portfolio+name match: portfolio="${editRequest.portfolio}", faculty="${editRequest.faculty_name}", status="${editRequest.status}"`);
          }
        }
        
        let editButtonHtml = '';
        
        // Debug: Log matching for each row
        console.log(`Row ${idx}: input_id=${rowInputId}, portfolio="${rowPortfolio}", member="${rowMemberName}", editRequest found=${!!editRequest}`, editRequest ? `status=${editRequest.status}` : '');
        
        if (editRequest) {
          if (editRequest.status === 'pending') {
            editButtonHtml = `<button disabled class="bg-yellow-500 text-white px-3 py-1 rounded text-sm cursor-not-allowed opacity-75">Request Pending</button>`;
          } else if (editRequest.status === 'approved' && !editRequest.is_edit_completed) {
            editButtonHtml = `<button onclick="requestEditWorkdone(${originalIndex})" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold animate-pulse">✓ Edit Now</button>`;
          } else if (editRequest.status === 'rejected') {
            editButtonHtml = `<button onclick="requestEditWorkdone(${originalIndex})" class="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Rejected - Retry</button>`;
          } else {
            editButtonHtml = `<button onclick="requestEditWorkdone(${originalIndex})" class="bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm">Request Edit</button>`;
          }
        } else {
          editButtonHtml = `<button onclick="requestEditWorkdone(${originalIndex})" class="bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm">Request Edit</button>`;
        }
        
        html += `<td class="px-4 py-2 border-b">${editButtonHtml}</td>`;
      }
      html += `</tr>`;
    });

    tbody.innerHTML = html;

    // Generate pagination UI
    this.generateWorkdonePagination(page, totalPages);

    // Apply filter if search exists
    this.filterWorkdoneTable();
  }

  generateWorkdonePagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('workdonePagination');
    if (!paginationContainer || totalPages <= 1) {
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
      }
      return;
    }

    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
      paginationHTML += `<button onclick="window._currentWorkdoneTable.renderWorkdoneTableWithPagination(${currentPage - 1})" 
                           class="mx-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded">Previous</button>`;
    }

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === currentPage;
      const buttonClass = isCurrentPage 
        ? 'mx-1 px-3 py-2 bg-purple-600 text-white rounded'
        : 'mx-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded';
      
      paginationHTML += `<button onclick="window._currentWorkdoneTable.renderWorkdoneTableWithPagination(${i})" 
                           class="${buttonClass}">${i}</button>`;
    }

    // Next button
    if (currentPage < totalPages) {
      paginationHTML += `<button onclick="window._currentWorkdoneTable.renderWorkdoneTableWithPagination(${currentPage + 1})" 
                           class="mx-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded">Next</button>`;
    }

    // Page info
    const totalItems = window._sortedWorkdoneRows ? window._sortedWorkdoneRows.length : 0;
    const startItem = (currentPage - 1) * 10 + 1;
    const endItem = Math.min(currentPage * 10, totalItems);
    
    paginationHTML += `<span class="mx-4 text-gray-600">Showing ${startItem}-${endItem} of ${totalItems} records</span>`;

    paginationContainer.innerHTML = paginationHTML;
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
      tbody.innerHTML = `<tr><td colspan='7' class='text-center text-gray-400 p-4'>No workdone records found for this department.</td></tr>`;
      return;
    }

    let html = "";
    rows.forEach((row, idx) => {
      const statusText = (row.status || 'PENDING VERIFICATION').toString();
      let statusClass = '';
      let statusSymbol = '';
      let statusTooltip = '';
      
      if (statusText === 'VERIFIED') {
        statusClass = 'text-green-600 font-bold text-xl';
        statusSymbol = '✓';
        statusTooltip = row.verifiedAt ? `Verified by ${row.verifiedBy || 'HOD'} on ${new Date(row.verifiedAt).toLocaleDateString()}` : 'Verified';
      } else if (statusText === 'REJECTED') {
        statusClass = 'text-red-600 font-bold text-xl';
        statusSymbol = '✗';
        statusTooltip = `Rejected by ${row.rejectedBy || 'HOD'} on ${new Date(row.rejectedAt).toLocaleDateString()}. Reason: ${row.rejectionReason || 'No reason'}`;
      } else {
        statusClass = 'text-orange-600 font-bold text-xl';
        statusSymbol = '⚠';
        statusTooltip = 'Pending verification by HOD';
      }

      // Format submission date
      let submissionDate = row.submitted_at || row.created_at || row.updated_at || '';
      if (submissionDate) {
        try {
          submissionDate = new Date(submissionDate).toLocaleString();
        } catch (e) {
          submissionDate = submissionDate.toString();
        }
      } else {
        submissionDate = '-';
      }

      // Simple verification check - you can enhance this to check against hod-workdone table
      const verifyButtonHtml = `<button class="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm" onclick="verifyRow(this, ${idx})">Verify</button>`;
      
      html += `<tr class="hover:bg-purple-50 transition border-b border-gray-200" data-row-idx="${idx}">
        <td class='p-3 border-r border-gray-200'>${row.department}</td>
        <td class='p-3 border-r border-gray-200'>${row.portfolio}</td>
        <td class='p-3 border-r border-gray-200'>${row.member}</td>
        <td class='p-3 border-r border-gray-200 text-center'><span class='${statusClass}' title='${statusTooltip}'>${statusSymbol}</span></td>
        <td class='p-3 border-r border-gray-200'>${submissionDate}</td>
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
    const searchInputFilter = document.getElementById('workdoneSearch');
    if (!searchInputFilter) return;
    const searchFilter = searchInputFilter.value.toLowerCase();

    // Date filter
    const startDateInput = document.getElementById('pendingStartDate');
    const endDateInput = document.getElementById('pendingEndDate');
    let startDate = startDateInput && startDateInput.value ? new Date(startDateInput.value) : null;
    let endDate = endDateInput && endDateInput.value ? new Date(endDateInput.value) : null;
    if (endDate) endDate.setHours(23,59,59,999); // include the whole end day

    // Try both table IDs (facultyWorkdoneTable for faculty profiles, workdoneTable for HOD view)
    let tableElementFilter = document.getElementById('facultyWorkdoneTable');
    if (!tableElementFilter) {
      tableElementFilter = document.getElementById('workdoneTable');
    }
    if (!tableElementFilter) {
      console.warn('No workdone table found for filtering');
      return;
    }
    const tableRows = Array.from(tableElementFilter.querySelectorAll('tr'));
    tableRows.forEach(row => {
      const memberCell = row.querySelector('td:nth-child(3)'); // Portfolio Member Name
      const departmentCell = row.querySelector('td:nth-child(1)'); // Department 
      const portfolioCell = row.querySelector('td:nth-child(2)'); // Portfolio Name
      const submittedAtCell = row.querySelector('td:nth-child(4)'); // Submission Date (column order changed)
      if (!memberCell || !departmentCell || !portfolioCell || !submittedAtCell) return;
      const memberText = memberCell.textContent.toLowerCase();
      const departmentText = departmentCell.textContent.toLowerCase();
      const portfolioText = portfolioCell.textContent.toLowerCase();
      const submittedAtText = submittedAtCell.textContent;
      let submittedAtDate = null;
      if (submittedAtText && submittedAtText.trim() && submittedAtText !== '-') {
        const d = new Date(submittedAtText);
        if (!isNaN(d)) submittedAtDate = d;
      }
      let dateMatch = true;
      if (startDate && submittedAtDate) dateMatch = submittedAtDate >= startDate;
      if (endDate && submittedAtDate) dateMatch = dateMatch && (submittedAtDate <= endDate);
      // If no date in row, hide if filter is set
      if ((startDate || endDate) && !submittedAtDate) dateMatch = false;
      const shouldShow = (memberText.includes(searchFilter) || departmentText.includes(searchFilter) || portfolioText.includes(searchFilter)) && dateMatch;
      row.style.display = shouldShow ? '' : 'none';
    });
  }

  // Initialize workdone section for HOD department view
  async initHodWorkdoneSection(department) {
    try {
      console.log('Initializing HOD workdone section for department:', department);
      
      // Store reference for functionality
      window._currentWorkdoneTable = this;
      
      const loadedRows = await this.loadDepartmentWorkdone(department);
      console.log('Loaded rows:', loadedRows.length);

      this.renderHodWorkdoneTable(loadedRows);

      // Setup search functionality
      const searchInputInit = document.getElementById('workdoneSearch');
      if (searchInputInit) {
        searchInputInit.addEventListener('input', () => this.filterWorkdoneTable());
      } else {
        console.warn('Search input not found');
      }

      return loadedRows;
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
  // Use sorted data if available, fallback to original
  const rows = window._sortedWorkdoneRows || window._workdoneRows;
  const row = rows && rows[idx];
  if (!row) {
    console.error('Row not found for index:', idx);
    console.log('Available rows:', rows);
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
  let html = getFormModalContent(row, details);
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

// Request edit for a workdone row
window.requestEditWorkdone = async function(idx) {
  // Use sorted data if available, fallback to original
  const rows = window._sortedWorkdoneRows || window._workdoneRows;
  const row = rows && rows[idx];
  if (!row) {
    console.error('Row not found for index:', idx);
    return;
  }
  
  // Check if edit request system is initialized
  if (!window.editRequestSystem) {
    alert('Edit request system not initialized. Please refresh the page.');
    return;
  }
  
  // Check if there's already a pending request
  const facultyEmail = document.getElementById('facultyEmail')?.value || window.facultyEmail;
  const facultyName = row['Portfolio Member Name'] || row['Portfolio Memeber Name'] || row['Faculty Name'] || row['Name'];
  const portfolioName = row.portfolio || row['Portfolio Name'] || row.table;
  
  // First try by input_id
  let existingRequest = null;
  if (row.input_id) {
    existingRequest = await window.editRequestSystem.checkEditRequestStatus(row.input_id, facultyEmail);
    console.log('Checked by input_id:', row.input_id, 'Result:', existingRequest);
  }
  
  // If not found by input_id, search by portfolio + faculty name
  if (!existingRequest && facultyEmail) {
    try {
      const { data, error } = await window.editRequestSystem.supabase
        .from('workdone_edit_requests')
        .select('*')
        .eq('faculty_email', facultyEmail)
        .order('requested_at', { ascending: false });
      
      if (data && data.length > 0) {
        // Find matching request by portfolio + name
        existingRequest = data.find(req => {
          const portfolioMatch = req.portfolio && portfolioName && 
            (req.portfolio.toLowerCase().includes(portfolioName.toLowerCase()) ||
             portfolioName.toLowerCase().includes(req.portfolio.toLowerCase()));
          const nameMatch = req.faculty_name && facultyName &&
            req.faculty_name.toLowerCase() === facultyName.toLowerCase();
          return portfolioMatch && nameMatch && !req.is_edit_completed;
        });
        
        if (existingRequest) {
          console.log('Found existing request by portfolio+name match:', existingRequest);
        }
      }
    } catch (err) {
      console.error('Error searching by portfolio+name:', err);
    }
  }
  
  if (existingRequest) {
    if (existingRequest.status === 'pending') {
      alert('You already have a pending edit request for this record. Please wait for approval.');
      return;
    } else if (existingRequest.status === 'approved' && !existingRequest.is_edit_completed) {
      // Open edit modal directly
      await window.editRequestSystem.openEditModal(existingRequest.request_id, row);
      return;
    } else if (existingRequest.status === 'rejected') {
      const retryConfirm = confirm(`Your previous edit request was rejected.\nReason: ${existingRequest.rejection_reason || 'No reason provided'}\n\nDo you want to submit a new request?`);
      if (!retryConfirm) return;
    }
  }
  
  // Prompt for reason
  const reason = prompt('Please provide a reason for editing this record:');
  if (!reason || reason.trim() === '') {
    alert('Edit request cancelled. A reason is required.');
    return;
  }
  
  // Show loading state
  const requestBtn = document.querySelector(`button[onclick="requestEditWorkdone(${idx})"]`);
  if (requestBtn) {
    requestBtn.disabled = true;
    requestBtn.textContent = 'Submitting...';
    requestBtn.classList.remove('bg-orange-500', 'hover:bg-orange-700');
    requestBtn.classList.add('bg-gray-400');
  }
  
  // Add table name and faculty info to row data
  const workdoneData = {
    ...row,
    table_name: row.table,
    faculty_email: facultyEmail,
    faculty_name: document.getElementById('facultyName')?.value || window.facultyName,
    department: row.Department || document.getElementById('facultyDepartment')?.value || window.facultyDepartment,
    designation: document.getElementById('facultyDesignation')?.value || window.facultyDesignation
  };
  
  // Submit edit request
  const result = await window.editRequestSystem.submitEditRequest(workdoneData, reason);
  
  if (result.success) {
    alert('Edit request submitted successfully! You will be notified once it is approved by HOD/IQAC/Principal.');
    
    // Reset button
    if (requestBtn) {
      requestBtn.disabled = false;
      requestBtn.textContent = 'Request Pending';
      requestBtn.classList.remove('bg-gray-400');
      requestBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
    }
  } else {
    alert('Failed to submit edit request: ' + result.error);
    
    // Reset button
    if (requestBtn) {
      requestBtn.disabled = false;
      requestBtn.textContent = 'Request Edit';
      requestBtn.classList.remove('bg-gray-400');
      requestBtn.classList.add('bg-orange-500', 'hover:bg-orange-700');
    }
  }
};

// Keep the old delete function commented out for reference
/*
window.deleteWorkdoneRow = function(idx) {
  // Use sorted data if available, fallback to original
  const rows = window._sortedWorkdoneRows || window._workdoneRows;
  const row = rows && rows[idx];
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
*/


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
  input_id: parseInt(row.input_id), // Ensure input_id is integer for hod-workdone
    table_name: row.table, // Store the source table name
    department: row.department,
    portfolio_name: row.portfolio,
    portfolio_member_name: row.member,
    status: row.status,
    verified_by: verified_by,
    verified_at: new Date().toISOString()
  };

  if (typeof supabaseClient !== 'undefined') {
    // Use upsert to avoid duplicate key errors
    supabaseClient
      .from('hod-workdone')
      .upsert([verificationData], { onConflict: ['input_id'] })
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
            window._allWorkdoneRows.splice(idx, 1);
            window._workdoneRows = window._allWorkdoneRows;
          }
          // Re-render the first table to show updated data
          if (typeof renderHodWorkdoneTableWithPagination === 'function') {
            renderHodWorkdoneTableWithPagination(workdoneCurrentPage || 1);
          } else if (typeof renderFilteredWorkdoneTable === 'function') {
            renderFilteredWorkdoneTable(workdoneCurrentPage || 1);
          }
          // Always reload verified workdone from DB after verification
          if (typeof loadVerifiedWorkdone === 'function') {
            loadVerifiedWorkdone();
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
