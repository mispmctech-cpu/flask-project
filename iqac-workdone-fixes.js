// IQAC Workdone Page Fixes
// This file contains improved functions to replace the problematic ones

// Improved view function for IQAC workdone that handles field name variations
function viewIQACRowDetailsFixed(idx) {
  const row = window._iqacRows && window._iqacRows[idx];
  if (!row) return;
  
  // Form tables mapping (same as original)
  const formTables = [
    {table: 'form1-once in a year', portfolio: 'Students Performance in Training & Placement Member (Yearly)'},
    {table: 'form1-Weekly', portfolio: 'Students Performance in Training & Placement Member (Weekly)'},
    {table: 'form1-once in 15 days', portfolio: 'Students Performance in Training & Placement Member (Bi-weekly)'},
    {table: 'form1-once in a semester', portfolio: 'Students Performance in Training & Placement Member (Semester)'},
    {table: 'form2-daily', portfolio: 'Class Advisor (Daily)'},
    {table: 'form2-weekly', portfolio: 'Class Advisor (Weekly)'},
    {table: 'form2-once in a month', portfolio: 'Class Advisor (Monthly)'},
    {table: 'form2-once in a semester', portfolio: 'Class Advisor (Semester)'},
    {table: 'form3-Weekly', portfolio: 'Faculty Information & Contribution Member (Weekly)'},
    {table: 'form3- once in 15 days', portfolio: 'Faculty Information & Contribution Member (Bi-weekly)'},
    {table: 'form3-once in a semester', portfolio: 'Faculty Information & Contribution Member (Semester)'},
    {table: 'form4-Weekly', portfolio: 'Course Outcome & Program Outcome Member (Exam Cell) (Weekly)'},
    {table: 'form4-once in a month', portfolio: 'Course Outcome & Program Outcome Member (Exam Cell) (Monthly)'},
    {table: 'form4-once in a semester', portfolio: 'Course Outcome & Program Outcome Member (Exam Cell) (Semester)'},
    {table: 'form5-weekly', portfolio: 'Continuous Improvement Member (Program Member) (Weekly)'},
    {table: 'form5-Once in a 3 Months', portfolio: 'Continuous Improvement Member (Program Member) (Quarterly)'},
    {table: 'form5-once in a semester', portfolio: 'Continuous Improvement Member (Program Member) (Semester)'},
    {table: 'form6-once in a semester', portfolio: 'Teaching & Learning Process Member (IQAC) (Semester)'},
    {table: 'form7-Once in a Semester', portfolio: 'Student Support System Member (Discipline & Extra Curricular) (Semester)'},
    {table: 'form7-Once in 2 Months', portfolio: 'Student Support System Member (Discipline & Extra Curricular) (Bi-monthly)'},
    {table: 'form7-Weekly', portfolio: 'Student Support System Member (Discipline & Extra Curricular) (Weekly)'},
    {table: 'form8-weekly', portfolio: 'Facilities & Technical Support Member (Lab Member) (Weekly)'},
    {table: 'form8-once in 3 Months', portfolio: 'Facilities & Technical Support Member (Lab Member) (Quarterly)'},
    {table: 'form8-Once in Semester', portfolio: 'Facilities & Technical Support Member (Lab Member) (Semester)'},
    {table: 'ASP', portfolio: 'ASP Core Scope Form'},
    {table: 'AP', portfolio: 'AP Core Scope Form'},
    {table: 'Prof', portfolio: 'Professor Core Scope Form'}
  ];

  // Find matching table
  let matchTable = null;
  let matchPortfolio = (row.portfolio_name || '').toLowerCase();
  let portfolioLabel = row.portfolio_name || '';
  
  for (const ft of formTables) {
    if ((ft.portfolio || '').toLowerCase() === matchPortfolio) {
      matchTable = ft.table;
      portfolioLabel = ft.portfolio;
      break;
    }
  }
  
  if (!matchTable) {
    for (const ft of formTables) {
      if (matchPortfolio.includes((ft.portfolio || '').toLowerCase().split('(')[0].trim())) {
        matchTable = ft.table;
        portfolioLabel = ft.portfolio;
        break;
      }
    }
  }

  if (matchTable) {
    // Try multiple possible field name variations
    const memberNameFields = [
      'Portfolio Member Name',
      'Portfolio Memeber Name', // with typo
      'faculty_name',
      'Faculty Name', 
      'Name'
    ];
    
    const deptFields = [
      'Department',
      'department',
      'Department:',
      'department:'
    ];
    
    // Get all records from the table first
    supabaseClient
      .from(matchTable)
      .select('*')
      .then(({ data: origRows, error }) => {
        if (error) {
          console.warn(`Error querying ${matchTable}:`, error);
        }
        
        let orig = null;
        if (origRows && origRows.length > 0) {
          // Try to find matching record by member name and department
          const memberName = row.portfolio_member_name;
          const department = row.department;
          
          if (memberName) {
            orig = origRows.find(r => {
              // Check member name match
              const memberMatch = memberNameFields.some(field => {
                const val = r[field];
                return val && val.toString().trim().toLowerCase() === memberName.toString().trim().toLowerCase();
              });
              
              // Check department match if available
              let deptMatch = true;
              if (department) {
                deptMatch = deptFields.some(field => {
                  const val = r[field];
                  return val && val.toString().trim().toLowerCase() === department.toString().trim().toLowerCase();
                });
              }
              
              return memberMatch && deptMatch;
            });
          }
          
          // If no exact match, try just member name
          if (!orig && memberName) {
            orig = origRows.find(r => {
              return memberNameFields.some(field => {
                const val = r[field];
                return val && val.toString().trim().toLowerCase() === memberName.toString().trim().toLowerCase();
              });
            });
          }
          
          // If still no match, use first record
          if (!orig) orig = origRows[0];
        }
        
        // If no original data found, show the row data as fallback
        if (!orig) {
          showFallbackRowData(row);
          return;
        }
        
        const modalContext = {
          portfolio: portfolioLabel,
          table: matchTable,
          department: row.department,
          member: row.portfolio_member_name
        };
        
        let html = getFormModalContent(modalContext, orig);
        showModal(html);
      });
  } else {
    // fallback: show the verification record data
    showFallbackRowData(row);
  }
}

// Helper function to show fallback data when original form data can't be found
function showFallbackRowData(row) {
  let html = '<div class="mb-4 p-3 bg-blue-100 text-blue-800 rounded">Showing verification record data:</div>';
  html += '<table class="min-w-full text-left">';
  
  for (const [key, value] of Object.entries(row)) {
    if (key === 'id') continue; // Skip internal ID
    
    let cellContent = '';
    if (typeof value === 'string' && value.startsWith('http')) {
      cellContent = `<a href='${value}' target='_blank' class='inline-block bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded shadow' style='text-decoration:none;'>View File</a>`;
    } else if (value === '' || value === null || value === undefined) {
      cellContent = "<span class='text-gray-400'>Not provided</span>";
    } else {
      cellContent = value;
    }
    
    html += `<tr><th class="pr-4 py-2 text-gray-700 font-semibold align-top">${key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</th><td class="py-2">${cellContent}</td></tr>`;
  }
  
  html += '</table>';
  showModal(html);
}

// Improved accept function that confirms before action
function acceptRowFixed(btn) {
  let row;
  try {
    row = JSON.parse(btn.getAttribute('data-row').replace(/&#39;/g, "'"));
  } catch (e) {
    alert('Failed to parse row data.');
    return;
  }
  
  // Show confirmation dialog
  const confirmMsg = `Are you sure you want to accept this workdone record?\n\nPortfolio: ${row.portfolio_name}\nMember: ${row.portfolio_member_name}\nDepartment: ${row.department}`;
  if (!confirm(confirmMsg)) {
    return;
  }
  
  // Disable button and show loading state
  btn.disabled = true;
  btn.textContent = 'Accepting...';
  btn.classList.remove('bg-blue-600', 'hover:bg-blue-800');
  btn.classList.add('bg-gray-400');
  
  // Get accepted_by (from localStorage or fallback)
  const accepted_by = localStorage.getItem('Name') || localStorage.getItem('name') || 'IQAC';
  
  // Robust mapping for submitted_at
  let submitted_at = row.submitted_at || row.created_at || row.timestamp || row.updated_at || row.submission_date || row.date_submitted;
  if (!submitted_at) submitted_at = new Date().toISOString();
  
  // Insert into iqac-workdone table (with input_id)
  supabaseClient
    .from('iqac-workdone')
    .insert([{
      input_id: row.input_id, // Include input_id for proper tracking
      department: row.department,
      portfolio_name: row.portfolio_name,
      portfolio_member_name: row.portfolio_member_name,
      status: row.status,
      verified_by: row.verified_by,
      verified_at: row.verified_at,
      accepted_by: accepted_by,
      accepted_at: new Date().toISOString(),
      submitted_at: submitted_at
    }])
    .then(({ error }) => {
      if (error) {
        console.error('Acceptance error:', error);
        alert('Failed to record acceptance: ' + (error.message || error));
        
        // Reset button state
        btn.disabled = false;
        btn.textContent = 'Accept';
        btn.classList.remove('bg-gray-400');
        btn.classList.add('bg-blue-600', 'hover:bg-blue-800');
      } else {
        console.log('Acceptance successful');
        
        // Remove the row from the table
        btn.closest('tr').remove();
        
        // Reload accepted workdone table
        loadAcceptedWorkdone();
      }
    });
}

// Improved reject function for IQAC workdone
function rejectRowFixed(btn) {
  let row;
  try {
    row = JSON.parse(btn.getAttribute('data-row').replace(/&#39;/g, "'"));
  } catch (e) {
    alert('Failed to parse row data.');
    return;
  }
  // Show confirmation dialog
  const confirmMsg = `Are you sure you want to reject this workdone record?\n\nPortfolio: ${row.portfolio_name}\nMember: ${row.portfolio_member_name}\nDepartment: ${row.department}`;
  if (!confirm(confirmMsg)) {
    return;
  }
  // Disable button and show loading state
  btn.disabled = true;
  btn.textContent = 'Rejecting...';
  btn.classList.remove('bg-red-600', 'hover:bg-red-800');
  btn.classList.add('bg-gray-400');
  // Get rejected_by (from localStorage or fallback)
  const rejected_by = localStorage.getItem('Name') || localStorage.getItem('name') || 'IQAC';
  // Robust mapping for submitted_at
  let submitted_at = row.submitted_at || row.created_at || row.timestamp || row.updated_at || row.submission_date || row.date_submitted;
  if (!submitted_at) submitted_at = new Date().toISOString();
  // Insert into iqac-workdone-reject table
  supabaseClient
    .from('iqac-workdone-reject')
    .insert([{
      input_id: row.input_id,
      department: row.department,
      portfolio_name: row.portfolio_name,
      portfolio_member_name: row.portfolio_member_name,
      status: row.status,
      rejected_by: rejected_by,
      rejected_at: new Date().toISOString(),
      submitted_at: submitted_at,
      commands: row.commands || null,
      documents: row.documents || null
    }])
    .then(({ error }) => {
      if (error) {
        console.error('Rejection error:', error);
        alert('Failed to record rejection: ' + (error.message || error));
        btn.disabled = false;
        btn.textContent = 'Reject';
        btn.classList.remove('bg-gray-400');
        btn.classList.add('bg-red-600', 'hover:bg-red-800');
      } else {
        console.log('Rejection successful');
        btn.closest('tr').remove();
        loadRejectedIQACWorkdone();
      }
    });
}

// Instructions for implementation:
console.log('IQAC Workdone Fixes loaded. To implement:');
console.log('1. Run sql/add_input_id_to_iqac_workdone.sql in Supabase');
console.log('2. Replace viewIQACRowDetails with viewIQACRowDetailsFixed');
console.log('3. Replace acceptRow with acceptRowFixed');
console.log('4. Replace rejectRow with rejectRowFixed');
