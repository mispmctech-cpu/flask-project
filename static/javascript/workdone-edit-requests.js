/**
 * Workdone Edit Request System
 * Handles request-based editing with HOD/IQAC/Principal approval
 */

class WorkdoneEditRequestSystem {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
    this.currentEditRequest = null;
    this.pendingRequests = [];
  }

  /**
   * Submit an edit request for a workdone record
   */
  async submitEditRequest(workdoneData, reason) {
    try {
      // Get input_id from multiple possible sources
      const inputId = workdoneData.input_id || workdoneData.id || workdoneData['input_id'] || null;
      
      console.log('📝 Submitting edit request:');
      console.log('  workdoneData keys:', Object.keys(workdoneData));
      console.log('  input_id found:', inputId);
      
      // Validate input_id is present
      if (!inputId) {
        console.error('❌ No input_id found in workdone data');
        console.log('  Available data:', workdoneData);
        throw new Error('Cannot submit edit request: Record has no input_id. Please refresh and try again.');
      }
      
      const requestData = {
        input_id: inputId,
        workdone_table_name: workdoneData.table_name || workdoneData.table || 'IQAC Workdone',
        faculty_name: workdoneData.faculty_name || workdoneData['Portfolio Member Name'],
        faculty_email: workdoneData.faculty_email || window.facultyEmail,
        department: workdoneData.department || workdoneData.Department,
        portfolio: workdoneData.portfolio || workdoneData['Portfolio Name'],
        designation: workdoneData.designation || workdoneData.Designation || window.facultyDesignation,
        request_reason: reason,
        original_data: workdoneData,
        status: 'pending',
        requested_at: new Date().toISOString()
      };
      
      console.log('  Request data to insert:', requestData);

      const { data, error } = await this.supabase
        .from('workdone_edit_requests')
        .insert([requestData])
        .select()
        .single();

      if (error) throw error;

      // Send notifications to HOD, IQAC, and Principal
      await this.sendEditRequestNotifications(requestData);

      return { success: true, data };
    } catch (error) {
      console.error('Error submitting edit request:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send notifications to approvers
   */
  async sendEditRequestNotifications(requestData) {
    const notificationMessage = `Edit request from ${requestData.faculty_name} (${requestData.department}) for ${requestData.portfolio}. Reason: ${requestData.request_reason}`;

    const notifications = [];

    // Notification for HOD
    notifications.push({
      recipient_role: 'hod',
      department: requestData.department,
      message: notificationMessage,
      type: 'edit_request',
      sender: requestData.faculty_name,
      created_at: new Date().toISOString()
    });

    // Notification for IQAC
    notifications.push({
      recipient_role: 'iqac',
      message: notificationMessage,
      type: 'edit_request',
      sender: requestData.faculty_name,
      created_at: new Date().toISOString()
    });

    // Notification for Principal
    notifications.push({
      recipient_role: 'principal',
      message: notificationMessage,
      type: 'edit_request',
      sender: requestData.faculty_name,
      created_at: new Date().toISOString()
    });

    try {
      await this.supabase.from('notifications').insert(notifications);
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  }

  /**
   * Check if user has pending edit requests for a workdone record
   */
  async checkEditRequestStatus(inputId, facultyEmail) {
    try {
      const { data, error } = await this.supabase
        .from('workdone_edit_requests')
        .select('*')
        .eq('input_id', inputId)
        .eq('faculty_email', facultyEmail)
        .order('requested_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        return data[0];
      }

      return null;
    } catch (error) {
      console.error('Error checking edit request status:', error);
      return null;
    }
  }

  /**
   * Get all pending edit requests for faculty
   */
  async getPendingEditRequests(facultyEmail) {
    try {
      const { data, error } = await this.supabase
        .from('workdone_edit_requests')
        .select('*')
        .eq('faculty_email', facultyEmail)
        .eq('status', 'approved')
        .eq('is_edit_completed', false)
        .order('approved_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error getting pending edit requests:', error);
      return [];
    }
  }

  /**
   * Open edit modal for approved request
   */
  async openEditModal(requestId, workdoneData) {
    const request = await this.getRequestById(requestId);
    
    if (!request || request.status !== 'approved') {
      alert('This edit request is not approved or has already been completed.');
      return;
    }

    this.currentEditRequest = request;
    this.showEditForm(workdoneData);
  }

  /**
   * Get request by ID
   */
  async getRequestById(requestId) {
    try {
      const { data, error } = await this.supabase
        .from('workdone_edit_requests')
        .select('*')
        .eq('request_id', requestId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting request:', error);
      return null;
    }
  }

  /**
   * Show edit form in modal
   */
  showEditForm(workdoneData) {
    const modal = document.getElementById('editWorkdoneModal') || this.createEditModal();
    const formContainer = document.getElementById('editWorkdoneForm');
    
    // First show original data using form-modal-mapper if available
    let originalDataHtml = '';
    if (typeof getFormModalContent === 'function' && this.currentEditRequest && this.currentEditRequest.original_data) {
      try {
        const rowData = {
          table: this.currentEditRequest.workdone_table_name,
          portfolio: this.currentEditRequest.portfolio,
          ...this.currentEditRequest.original_data
        };
        originalDataHtml = `
          <div class="mb-6 border rounded p-4 bg-gray-50">
            <h4 class="text-lg font-bold text-purple-700 mb-3">Current Data</h4>
            ${getFormModalContent(rowData, this.currentEditRequest.original_data)}
          </div>
          <div class="border-t pt-4">
            <h4 class="text-lg font-bold text-purple-700 mb-3">Edit Form</h4>
          </div>
        `;
      } catch (err) {
        console.error('Error rendering original data:', err);
      }
    }
    
    // Populate form with editable fields
    formContainer.innerHTML = originalDataHtml + this.generateEditFormFields(workdoneData);
    
    modal.classList.remove('hidden');
  }

  /**
   * Create edit modal if it doesn't exist
   */
  createEditModal() {
    const modalHTML = `
      <div id="editWorkdoneModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 hidden">
        <div class="bg-white rounded-lg shadow-lg max-w-6xl w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
          <button onclick="closeEditWorkdoneModal()" class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold z-10">&times;</button>
          <h3 class="text-2xl font-bold text-purple-700 mb-4">Edit Workdone Record</h3>
          <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-4 text-sm">
            <strong>✓ Approved:</strong> This edit request has been approved. All changes will be tracked and logged.
          </div>
          <form id="editWorkdoneForm" class="space-y-4">
            <!-- Form fields will be populated dynamically -->
          </form>
          <div class="mt-6 flex gap-4 sticky bottom-0 bg-white pt-4 border-t">
            <button type="button" id="cancelEditBtn" onclick="closeEditWorkdoneModal()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold">
              Cancel
            </button>
            <button type="button" id="saveEditBtn" onclick="saveEditedWorkdone()" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <span id="saveEditBtnText">💾 Save Changes</span>
              <span id="saveEditSpinner" class="hidden">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </button>
          </div>
          <div id="editWorkdoneStatus" class="mt-4 text-center font-semibold"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    return document.getElementById('editWorkdoneModal');
  }

  /**
   * Generate form fields based on workdone data
   */
  generateEditFormFields(data) {
    const fields = [];
    const excludeFields = ['id', 'created_at', 'input_id', 'submitted_at', 'table', 'portfolio', 'original', 'Original', 'updated_at', '_original'];
    
    // Define field order priority
    const headerFields = ['Department', 'Portfolio Name', 'Portfolio Member Name', 'Month', 'Semester', 'Year', 'Designation'];
    const numberedFieldPattern = /^(.*?)_(\d+)$/; // Matches fields like Status_1, Description_2, etc.
    
    // Separate fields into categories
    const headers = [];
    const numberedFields = {};
    const otherFields = [];
    
    for (const [key, value] of Object.entries(data)) {
      if (excludeFields.includes(key)) continue;
      
      if (headerFields.includes(key)) {
        headers.push({ key, value, order: headerFields.indexOf(key) });
      } else {
        const match = key.match(numberedFieldPattern);
        if (match) {
          const baseName = match[1];
          const number = parseInt(match[2]);
          if (!numberedFields[number]) {
            numberedFields[number] = [];
          }
          numberedFields[number].push({ key, value, baseName, number });
        } else {
          otherFields.push({ key, value });
        }
      }
    }
    
    // Sort and render header fields
    headers.sort((a, b) => a.order - b.order);
    headers.forEach(({ key, value }) => {
      const fieldType = this.getFieldType(key, value);
      fields.push(`
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">${this.formatFieldName(key)}</label>
          ${this.generateInputField(key, value || '', fieldType)}
        </div>
      `);
    });
    
    // Render numbered fields in order (grouped by number)
    const sortedNumbers = Object.keys(numberedFields).sort((a, b) => parseInt(a) - parseInt(b));
    sortedNumbers.forEach(num => {
      const group = numberedFields[num];
      
      // Add section divider
      fields.push(`
        <div class="col-span-full border-t-2 border-purple-200 pt-4 mt-4">
          <h4 class="text-md font-bold text-purple-700">Section ${num}</h4>
        </div>
      `);
      
      // Sort within group: Status, Description, Upload file
      group.sort((a, b) => {
        const order = { 'Status': 1, 'Description': 2, 'Upload The Scanned File': 3 };
        const orderA = order[a.baseName] || 999;
        const orderB = order[b.baseName] || 999;
        return orderA - orderB;
      });
      
      group.forEach(({ key, value }) => {
        const fieldType = this.getFieldType(key, value);
        fields.push(`
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">${this.formatFieldName(key)}</label>
            ${this.generateInputField(key, value || '', fieldType)}
          </div>
        `);
      });
    });
    
    // Render other fields at the end
    otherFields.forEach(({ key, value }) => {
      const fieldType = this.getFieldType(key, value);
      fields.push(`
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">${this.formatFieldName(key)}</label>
          ${this.generateInputField(key, value || '', fieldType)}
        </div>
      `);
    });
    
    return `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">${fields.join('')}</div>`;
  }

  /**
   * Determine field type
   */
  getFieldType(fieldName, value) {
    const lowerField = fieldName.toLowerCase();
    
    if (lowerField.includes('status')) return 'status';
    if (lowerField.includes('date')) return 'date';
    if (lowerField.includes('file') || lowerField.includes('upload') || lowerField.includes('screenshot')) return 'file';
    if (typeof value === 'number') return 'number';
    if (lowerField.includes('description') || lowerField.includes('details')) return 'textarea';
    
    return 'text';
  }

  /**
   * Generate input field HTML
   */
  generateInputField(name, value, type) {
    if (type === 'status') {
      const statusOptions = ['Completed', 'Inprogress', 'Yet to be Completed', 'Not Applicable'];
      const currentValue = value || '';
      return `
        <select name="${name}" class="w-full border border-gray-300 rounded px-3 py-2 bg-white">
          <option value="">-- Select Status --</option>
          ${statusOptions.map(option => 
            `<option value="${option}" ${currentValue === option ? 'selected' : ''}>${option}</option>`
          ).join('')}
        </select>
      `;
    } else if (type === 'textarea') {
      return `<textarea name="${name}" class="w-full border border-gray-300 rounded px-3 py-2" rows="3">${value}</textarea>`;
    } else if (type === 'file') {
      // Check if file exists
      const hasFile = value && value !== 'null' && value.trim() !== '' && value !== '-';
      
      return `
        <div class="space-y-2">
          ${hasFile ? `
            <div class="bg-green-50 border border-green-400 rounded p-3">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm font-semibold text-green-700">Current File Available</span>
                </div>
                <a href="${value}" target="_blank" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold">
                  View File
                </a>
              </div>
              <p class="text-xs text-green-700 ml-7">To keep this file, leave the upload field below empty</p>
              <div class="mt-3 flex items-center gap-2 pl-7">
                <input type="checkbox" id="remove_${name}" name="remove_${name}" class="w-4 h-4 text-red-600 border-gray-300 rounded cursor-pointer file-remove-checkbox" data-field="${name}">
                <label for="remove_${name}" class="text-sm font-medium text-red-600 cursor-pointer">☒ Remove this file</label>
              </div>
            </div>
          ` : `
            <div class="bg-yellow-50 border border-yellow-300 rounded p-3 text-sm text-yellow-700">
              ⚠️ No file uploaded yet - please upload a file
            </div>
          `}
          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ${hasFile ? 'Replace with new file (optional):' : 'Upload File:'}
            </label>
            <input type="file" name="${name}" data-original="${value || ''}" class="w-full border border-gray-300 rounded px-3 py-2 bg-white file-input-field" accept="image/*,.pdf">
            ${hasFile ? `<p class="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>` : ''}
          </div>
        </div>
      `;
    } else {
      return `<input type="${type}" name="${name}" value="${value}" class="w-full border border-gray-300 rounded px-3 py-2">`;
    }
  }

  /**
   * Format field name for display
   */
  formatFieldName(fieldName) {
    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  /**
   * Save edited workdone record
   */
  async saveEditedWorkdone(editedData, originalData) {
    try {
      if (!this.currentEditRequest) {
        throw new Error('No active edit request');
      }

      const changes = this.detectChanges(originalData, editedData);
      
      if (changes.length === 0) {
        alert('No changes detected.');
        return { success: false };
      }

      // Clean editedData - remove any fields that shouldn't be in database
      const cleanedData = {};
      const invalidPatterns = /^_|data-|original/i;
      const metadataFields = ['table', 'portfolio', 'department', 'table_name', 'designation', 'faculty_name', 'faculty_email', 'submitted_at', 'input_id'];
      
      for (const [key, value] of Object.entries(editedData)) {
        const lowerKey = key.toLowerCase();
        // Skip invalid patterns and metadata fields (keep only form fields)
        if (!invalidPatterns.test(key) && !metadataFields.includes(key) && !metadataFields.includes(lowerKey)) {
          cleanedData[key] = value;
        } else {
          console.log(`Removing invalid/metadata field before save: ${key}`);
        }
      }
      
      console.log('Cleaned data for database update:', cleanedData);
      
      // Update the original workdone table using composite key matching
      // Get the correct table name from original data (more reliable)
      const requestTableName = this.currentEditRequest.workdone_table_name;
      const originalTableName = originalData.table || originalData.table_name;
      const tableName = originalTableName || requestTableName;
      const inputId = this.currentEditRequest.input_id;
      
      console.log('🔄 UPDATING DATABASE:');
      console.log('  Table from request:', requestTableName);
      console.log('  Table from original data:', originalTableName);
      console.log('  Using table:', tableName);
      console.log('  Input ID from request:', inputId);
      console.log('  Original data keys:', Object.keys(originalData));
      console.log('  Data to update:', cleanedData);
      
      // Use composite key matching for better reliability
      // Match on: Portfolio Member Name + Month + Department (more reliable than just input_id)
      const portfolioMemberName = originalData['Portfolio Member Name'] || cleanedData['Portfolio Member Name'];
      const month = originalData['Month'] || cleanedData['Month'];
      const department = originalData['Department'] || originalData['department'];
      
      console.log('🔑 Composite key match criteria:');
      console.log('  Portfolio Member Name:', portfolioMemberName);
      console.log('  Month:', month);
      console.log('  Department:', department);
      
      // FIRST: Check what records actually exist for this user
      console.log('🔍 Checking existing records for this user...');
      let existingRecords = null;
      let checkError = null;
      let tableHasInputId = true; // Assume true, will be set to false if query fails or no input_id in records
      
      // Try to find records by Portfolio Member Name first (works for all tables)
      console.log('  Trying to find by Portfolio Member Name...');
      const nameResult = await this.supabase
        .from(tableName)
        .select('*')
        .ilike('Portfolio Member Name', `%${portfolioMemberName}%`);
      
      if (nameResult.data && nameResult.data.length > 0) {
        existingRecords = nameResult.data;
        // Check if the table has input_id by looking at the first record
        tableHasInputId = nameResult.data[0].hasOwnProperty('input_id');
        console.log('  Found', existingRecords.length, 'records by name. Table has input_id:', tableHasInputId);
      } else if (nameResult.error) {
        checkError = nameResult.error;
        console.log('  Name query failed:', nameResult.error.message);
      }
      
      // If name query failed or no results, try by input_id as fallback (if we have one)
      if ((!existingRecords || existingRecords.length === 0) && inputId) {
        console.log('  Trying to find by input_id:', inputId);
        const result = await this.supabase
          .from(tableName)
          .select('*')
          .eq('input_id', inputId);
        
        if (result.data && result.data.length > 0) {
          existingRecords = result.data;
          tableHasInputId = true;
        } else if (result.error) {
          // Check if error is because column doesn't exist
          if (result.error.message?.includes('does not exist') || result.error.code === '42703') {
            console.log('  ⚠️ Table does not have input_id column');
            tableHasInputId = false;
          }
          if (!checkError) checkError = result.error;
        }
      }
      
      console.log('  tableHasInputId:', tableHasInputId);
      
      if (checkError && (!existingRecords || existingRecords.length === 0)) {
        console.error('❌ Error checking records:', checkError);
        // Don't throw - continue with fallback approach
        console.log('⚠️ Query failed but continuing with composite key matching');
      }
      
      // Find the exact record matching Portfolio Member Name + Month
      let matchingRecord = null;
      if (existingRecords && existingRecords.length > 0) {
        console.log('📊 Found', existingRecords.length, 'records for', portfolioMemberName);
        console.log('  Sample record:', existingRecords[0]);
        console.log('  All months:', existingRecords.map(r => r.Month));
        console.log('  All departments:', existingRecords.map(r => r.Department));
        
        // Find the exact record matching month and department
        matchingRecord = existingRecords.find(r => 
          r.Month && r.Month.toLowerCase() === month.toLowerCase() &&
          r.Department && r.Department.toLowerCase() === department.toLowerCase()
        );
        
        if (matchingRecord) {
          console.log('✅ Found exact matching record with input_id:', matchingRecord.input_id);
        } else {
          console.log('⚠️ No exact match for Month:', month, 'and Department:', department);
        }
      } else {
        console.log('⚠️ No records found for Portfolio Member Name like:', portfolioMemberName);
      }
      
      let updateResult = null;
      let updateError = null;
      
      // If we found the matching record AND table has input_id, use input_id based update
      if (matchingRecord && matchingRecord.input_id && tableHasInputId) {
        console.log('🔄 Updating using input_id:', matchingRecord.input_id);
        
        // Prepare upsert data - ONLY include fields that exist in the original record
        // This prevents errors from trying to insert columns that don't exist in the table
        const upsertData = {
          input_id: matchingRecord.input_id
        };
        
        // Copy only fields that exist in the original record (matching record from DB)
        for (const key of Object.keys(cleanedData)) {
          // Only include if the field exists in the matching record from database
          if (matchingRecord.hasOwnProperty(key)) {
            let value = cleanedData[key];
            const originalValue = matchingRecord[key];
            
            // Handle type conversion to prevent bigint errors
            // If the original value was a number, convert empty string to null
            if (typeof originalValue === 'number') {
              if (value === '' || value === null || value === undefined) {
                value = null;
              } else if (typeof value === 'string') {
                const parsed = parseFloat(value);
                value = isNaN(parsed) ? null : parsed;
              }
            }
            // If original value was null and new value is empty string, keep it null
            else if (originalValue === null && value === '') {
              value = null;
            }
            
            upsertData[key] = value;
          } else {
            console.log(`  Skipping field "${key}" - not in table schema`);
          }
        }
        
        // Add Department if it exists in the table
        if (matchingRecord.hasOwnProperty('Department') && department) {
          upsertData['Department'] = department;
        }
        
        console.log('📝 Upsert data (filtered to match table schema):', upsertData);
        
        // First try direct UPDATE by input_id (more reliable than upsert when no unique constraint)
        console.log('🔄 Trying direct UPDATE by input_id first...');
        let result = await this.supabase
          .from(tableName)
          .update(upsertData)
          .eq('input_id', matchingRecord.input_id)
          .select();
        
        // If direct update fails (RLS or other issue), try upsert as fallback
        if (result.error || !result.data || result.data.length === 0) {
          console.log('⚠️ Direct update failed, trying upsert...', result.error);
          
          // Check if table has unique constraint on input_id before upsert
          result = await this.supabase
            .from(tableName)
            .upsert(upsertData, { 
              onConflict: 'input_id',
              ignoreDuplicates: false 
            })
            .select();
          
          // If upsert also fails with 409, it means no unique constraint - use delete+insert
          if (result.error && (result.error.code === '23505' || result.error.code === '409' || result.error.message?.includes('duplicate') || result.error.message?.includes('conflict'))) {
            console.log('⚠️ Upsert failed (no unique constraint on input_id) - using delete+insert...');
            result = { data: null, error: result.error }; // Will trigger delete+insert below
          }
        }
        
        updateResult = result.data;
        updateError = result.error;
        
        console.log('Upsert response:', { data: updateResult, error: updateError });
      } else if (inputId && tableHasInputId) {
        // We have input_id from request but couldn't fetch the record
        // Try direct update by input_id
        console.log('🔄 Using input_id from request for update:', inputId);
        
        // Build update data from original data keys (since we couldn't fetch the schema)
        const updateData = { ...cleanedData };
        
        // First try direct update
        let result = await this.supabase
          .from(tableName)
          .update(updateData)
          .eq('input_id', inputId)
          .select();
        
        if (result.error || !result.data || result.data.length === 0) {
          console.log('⚠️ Direct update by input_id failed, trying delete+insert...');
          
          // Delete existing record
          const deleteResult = await this.supabase
            .from(tableName)
            .delete()
            .eq('input_id', inputId);
          
          if (!deleteResult.error) {
            // Insert with all the original fields plus changes
            const insertData = {
              input_id: inputId,
              ...originalData,
              ...cleanedData
            };
            
            // Remove metadata fields
            delete insertData.table;
            delete insertData.portfolio;
            delete insertData.table_name;
            delete insertData.faculty_email;
            delete insertData.designation;
            
            console.log('📝 Insert data:', insertData);
            
            result = await this.supabase
              .from(tableName)
              .insert([insertData])
              .select();
            
            if (result.data && result.data.length > 0) {
              console.log('✅ Delete + Insert successful!', result.data);
            }
          } else {
            console.error('❌ Delete failed:', deleteResult.error);
          }
        }
        
        updateResult = result.data;
        updateError = result.error;
      } else if (matchingRecord && !tableHasInputId) {
        // Table doesn't have input_id - use composite key update with matched record
        console.log('🔄 Table has no input_id - using composite key update with matched record');
        
        // Build update data from matching record schema
        const updateData = {};
        for (const key of Object.keys(cleanedData)) {
          if (matchingRecord.hasOwnProperty(key)) {
            let value = cleanedData[key];
            const originalValue = matchingRecord[key];
            
            // Handle type conversion
            if (typeof originalValue === 'number') {
              if (value === '' || value === null || value === undefined) {
                value = null;
              } else if (typeof value === 'string') {
                const parsed = parseFloat(value);
                value = isNaN(parsed) ? null : parsed;
              }
            } else if (originalValue === null && value === '') {
              value = null;
            }
            
            updateData[key] = value;
          }
        }
        
        console.log('📝 Update data (composite key):', updateData);
        
        // Build the query with composite key matching
        let query = this.supabase
          .from(tableName)
          .update(updateData);
        
        // Match on Portfolio Member Name
        if (matchingRecord['Portfolio Member Name']) {
          query = query.eq('Portfolio Member Name', matchingRecord['Portfolio Member Name']);
        }
        // Match on Month if exists
        if (matchingRecord['Month']) {
          query = query.eq('Month', matchingRecord['Month']);
        }
        // Match on Department if exists
        if (matchingRecord['Department']) {
          query = query.eq('Department', matchingRecord['Department']);
        }
        
        const result = await query.select();
        updateResult = result.data;
        updateError = result.error;
        
        console.log('Composite key update response:', { data: updateResult, error: updateError });
      } else {
        // Fallback: Try composite key match with regular update (last resort)
        console.log('🔄 Fallback: Using composite key match (no matched record)...');
        let query = this.supabase
          .from(tableName)
          .update(cleanedData);
        
        if (portfolioMemberName) {
          query = query.eq('Portfolio Member Name', portfolioMemberName);
        }
        if (month) {
          query = query.eq('Month', month);
        }
        if (department) {
          query = query.eq('Department', department);
        }
        
        const result = await query.select();
        updateResult = result.data;
        updateError = result.error;
      }

      if (updateError) {
        console.error('❌ Database update/upsert error:', updateError);
        console.log('  Error details - code:', updateError.code, 'status:', updateError.status, 'message:', updateError.message);
        
        // If update fails due to RLS, 409 conflict, or other issues, try delete + insert approach
        const shouldTryDeleteInsert = 
          updateError.code === '42501' || 
          updateError.code === '409' ||
          updateError.code === '23505' ||
          updateError.status === 409 ||
          updateError.message?.includes('policy') ||
          updateError.message?.includes('conflict') ||
          updateError.message?.includes('duplicate') ||
          updateError.message?.includes('Conflict');
        
        if (shouldTryDeleteInsert && matchingRecord) {
          console.log('⚠️ Trying delete + insert fallback...');
          
          // Build delete query based on whether table has input_id
          let deleteResult;
          if (tableHasInputId && matchingRecord.input_id) {
            deleteResult = await this.supabase
              .from(tableName)
              .delete()
              .eq('input_id', matchingRecord.input_id);
          } else {
            // Delete by composite key
            let deleteQuery = this.supabase.from(tableName).delete();
            if (matchingRecord['Portfolio Member Name']) {
              deleteQuery = deleteQuery.eq('Portfolio Member Name', matchingRecord['Portfolio Member Name']);
            }
            if (matchingRecord['Month']) {
              deleteQuery = deleteQuery.eq('Month', matchingRecord['Month']);
            }
            if (matchingRecord['Department']) {
              deleteQuery = deleteQuery.eq('Department', matchingRecord['Department']);
            }
            deleteResult = await deleteQuery;
          }
          
          if (!deleteResult.error) {
            // Build insert data using ONLY fields that exist in the table
            const insertData = {};
            
            // Only add input_id if table has it
            if (tableHasInputId && matchingRecord.input_id) {
              insertData.input_id = matchingRecord.input_id;
            }
            
            // Copy ALL fields from matching record first (to preserve original data)
            for (const key of Object.keys(matchingRecord)) {
              if (key !== 'input_id' || tableHasInputId) {
                insertData[key] = matchingRecord[key];
              }
            }
            
            // Then apply the changes from cleanedData
            for (const key of Object.keys(cleanedData)) {
              if (matchingRecord.hasOwnProperty(key)) {
                let value = cleanedData[key];
                const originalValue = matchingRecord[key];
                
                // Handle type conversion
                if (typeof originalValue === 'number') {
                  if (value === '' || value === null || value === undefined) {
                    value = null;
                  } else if (typeof value === 'string') {
                    const parsed = parseFloat(value);
                    value = isNaN(parsed) ? null : parsed;
                  }
                } else if (originalValue === null && value === '') {
                  value = null;
                }
                
                insertData[key] = value;
              }
            }
            
            // Add Department only if it exists in table
            if (matchingRecord.hasOwnProperty('Department') && department) {
              insertData['Department'] = department;
            }
            
            console.log('📝 Insert data (filtered):', insertData);
            
            const insertResult = await this.supabase
              .from(tableName)
              .insert([insertData])
              .select();
            
            if (insertResult.data && insertResult.data.length > 0) {
              console.log('✅ Delete + Insert successful!', insertResult.data);
              updateResult = insertResult.data;
              updateError = null;
            } else {
              console.error('❌ Insert after delete failed:', insertResult.error);
              throw insertResult.error || new Error('Insert after delete failed');
            }
          } else {
            console.error('❌ Delete failed:', deleteResult.error);
            throw updateError;
          }
        } else {
          throw updateError;
        }
      }
      
      console.log('✅ Update query executed');
      console.log('  Rows affected:', updateResult ? updateResult.length : 0);
      console.log('  Updated data:', updateResult);
      
      // Check if update was successful
      if (!updateResult || updateResult.length === 0) {
        console.error('⚠️ Update returned no rows - RLS may be blocking');
        console.log('💡 Tip: Disable RLS on', tableName, 'table in Supabase or add UPDATE policy');
        throw new Error(`Failed to update record in ${tableName}. RLS may be blocking the update. Please disable RLS on this table.`);
      }
      
      console.log('✅ Original table updated successfully!', updateResult);

      // Log each change
      for (const change of changes) {
        await this.logEdit(change);
      }

      // Mark edit request as completed
      await this.supabase
        .from('workdone_edit_requests')
        .update({
          edited_data: cleanedData,
          edited_at: new Date().toISOString(),
          is_edit_completed: true
        })
        .eq('request_id', this.currentEditRequest.request_id);

      this.currentEditRequest = null;
      return { success: true };
    } catch (error) {
      console.error('Error saving edited workdone:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Detect changes between original and new data
   */
  detectChanges(originalData, newData) {
    const changes = [];
    
    for (const [key, newValue] of Object.entries(newData)) {
      const oldValue = originalData[key];
      
      if (oldValue !== newValue) {
        changes.push({
          field_changed: key,
          old_value: String(oldValue || ''),
          new_value: String(newValue || ''),
          old_file_url: key.toLowerCase().includes('file') || key.toLowerCase().includes('upload') ? oldValue : null,
          new_file_url: key.toLowerCase().includes('file') || key.toLowerCase().includes('upload') ? newValue : null
        });
      }
    }
    
    return changes;
  }

  /**
   * Log edit to database
   */
  async logEdit(change) {
    const logData = {
      request_id: this.currentEditRequest.request_id,
      input_id: this.currentEditRequest.input_id,
      workdone_table_name: this.currentEditRequest.workdone_table_name,
      faculty_name: this.currentEditRequest.faculty_name,
      faculty_email: this.currentEditRequest.faculty_email,
      department: this.currentEditRequest.department,
      portfolio: this.currentEditRequest.portfolio,
      designation: this.currentEditRequest.designation,
      edited_by: this.currentEditRequest.faculty_name,
      edited_by_email: this.currentEditRequest.faculty_email,
      approved_by: this.currentEditRequest.approved_by,
      approved_by_role: this.currentEditRequest.approved_by_role,
      field_changed: change.field_changed,
      old_value: change.old_value,
      new_value: change.new_value,
      old_file_url: change.old_file_url,
      new_file_url: change.new_file_url,
      old_data: this.currentEditRequest.original_data,
      new_data: this.currentEditRequest.edited_data,
      edit_reason: this.currentEditRequest.request_reason,
      edited_at: new Date().toISOString()
    };

    try {
      await this.supabase.from('workdone_edit_logs').insert([logData]);
    } catch (error) {
      console.error('Error logging edit:', error);
    }
  }

  /**
   * Upload file to Supabase storage
   */
  async uploadFile(file, folder = 'workdone-edits') {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Try to upload to Supabase storage
      const { data, error } = await this.supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (error) {
        console.warn('Supabase storage upload failed, using direct file reference:', error);
        // If storage fails, return a placeholder or skip upload
        // You need to create the 'uploads' bucket in Supabase Storage first
        return null;
      }

      const { data: urlData } = this.supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }
}

// Global functions for modal controls
window.closeEditWorkdoneModal = function() {
  const modal = document.getElementById('editWorkdoneModal');
  if (modal) {
    modal.classList.add('hidden');
  }
};

window.saveEditedWorkdone = async function() {
  const form = document.getElementById('editWorkdoneForm');
  const statusDiv = document.getElementById('editWorkdoneStatus');
  const saveBtn = document.getElementById('saveEditBtn');
  const cancelBtn = document.getElementById('cancelEditBtn');
  const saveBtnText = document.getElementById('saveEditBtnText');
  const saveSpinner = document.getElementById('saveEditSpinner');
  
  if (!form || !window.editRequestSystem || !window.editRequestSystem.currentEditRequest) {
    alert('Error: Edit system not initialized properly');
    return;
  }
  
  // Disable buttons and show loading state
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.classList.add('opacity-75', 'cursor-not-allowed');
    saveBtn.classList.remove('hover:bg-green-700');
  }
  if (cancelBtn) {
    cancelBtn.disabled = true;
    cancelBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
  if (saveBtnText) saveBtnText.textContent = 'Saving...';
  if (saveSpinner) saveSpinner.classList.remove('hidden');
  
  statusDiv.textContent = 'Saving changes...';
  statusDiv.className = 'mt-4 text-center font-semibold text-blue-600';
  
  const formData = new FormData(form);
  const editedData = {};
  const originalData = window.editRequestSystem.currentEditRequest.original_data;
  
  // Get all file input fields to track original values
  const fileInputs = form.querySelectorAll('input[type="file"]');
  const fileFieldOriginals = {};
  fileInputs.forEach(input => {
    const fieldName = input.name;
    const originalValue = input.getAttribute('data-original');
    if (originalValue && originalValue !== 'null' && originalValue !== '') {
      fileFieldOriginals[fieldName] = originalValue;
    }
  });
  
  // Get all actual fields from original data to know what columns exist in database
  const validFields = new Set(Object.keys(originalData));
  
  console.log('Valid database fields:', Array.from(validFields));
  console.log('Form fields:', Array.from(formData.keys()));
  
  // Process form data and handle file uploads
  for (const [key, value] of formData.entries()) {
    // Skip fields that start with underscore or contain invalid patterns
    const lowerKey = key.toLowerCase();
    if (key.startsWith('_') || lowerKey.includes('data-') || lowerKey === 'original' || lowerKey === 'table' || lowerKey === 'portfolio') {
      console.log(`Skipping invalid field: ${key}`);
      continue;
    }
    
    // Skip if not a valid database field
    if (!validFields.has(key)) {
      console.log(`Skipping non-database field: ${key}`);
      continue;
    }
    
    // Check if this is a file input field
    const fileInput = form.querySelector(`input[name="${key}"][type="file"]`);
    
    // Check if user wants to remove this file
    const removeCheckbox = form.querySelector(`input[name="remove_${key}"][type="checkbox"]`);
    const shouldRemove = removeCheckbox && removeCheckbox.checked;
    
    if (shouldRemove) {
      // User explicitly checked "Remove this file" - set to null
      console.log(`Removing file: ${key}`);
      editedData[key] = null;
    } else if (fileInput && value instanceof File && value.size > 0) {
      // User selected a new file - upload it
      statusDiv.textContent = `Uploading ${key}...`;
      const fileUrl = await window.editRequestSystem.uploadFile(value);
      if (fileUrl) {
        editedData[key] = fileUrl;
      } else {
        // Upload failed, keep original if exists
        if (fileFieldOriginals[key]) {
          editedData[key] = fileFieldOriginals[key];
        } else {
          alert(`Warning: File upload failed for ${key}. Please try again or create a Supabase storage bucket named 'uploads'.`);
          statusDiv.textContent = 'File upload failed';
          statusDiv.className = 'mt-4 text-center font-semibold text-red-600';
          return;
        }
      }
    } else if (fileInput && (!value || value.size === 0)) {
      // No new file selected - keep original file
      if (fileFieldOriginals[key]) {
        editedData[key] = fileFieldOriginals[key];
      } else {
        editedData[key] = originalData[key] || '';
      }
    } else if (!fileInput) {
      // Regular text/textarea/number/select field
      editedData[key] = value;
    }
  }
  
  // Ensure all original fields are preserved if not in formData
  // BUT only if they were editable fields (exclude metadata fields)
  const metadataFields = ['input_id', 'submitted_at', 'faculty_email', 'faculty_name', 'department', 'table_name', 'designation'];
  for (const fieldName of validFields) {
    if (!(fieldName in editedData) && !metadataFields.includes(fieldName)) {
      const lowerFieldName = fieldName.toLowerCase();
      // Skip if it's a lowercase duplicate or metadata
      if (!lowerFieldName.startsWith('_') && lowerFieldName !== 'original' && lowerFieldName !== 'table' && lowerFieldName !== 'portfolio') {
        editedData[fieldName] = originalData[fieldName];
      }
    }
  }
  
  console.log('Final editedData to save:', editedData);
  console.log('Keys being saved:', Object.keys(editedData));
  
  statusDiv.textContent = 'Updating original table...';
  const result = await window.editRequestSystem.saveEditedWorkdone(editedData, originalData);
  
  if (result.success) {
    // Keep button disabled on success
    if (saveBtnText) saveBtnText.textContent = '✅ Saved!';
    if (saveSpinner) saveSpinner.classList.add('hidden');
    
    statusDiv.textContent = '✅ Original table updated successfully! Changes saved to ' + (window.editRequestSystem.currentEditRequest?.workdone_table_name || 'database');
    statusDiv.className = 'mt-4 text-center font-semibold text-green-600';
    
    setTimeout(() => {
      closeEditWorkdoneModal();
      // Reload workdone table
      if (window.location.reload) {
        window.location.reload();
      }
    }, 1500);
  } else {
    // Re-enable buttons on error so user can retry
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      saveBtn.classList.add('hover:bg-green-700');
    }
    if (cancelBtn) {
      cancelBtn.disabled = false;
      cancelBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    if (saveBtnText) saveBtnText.textContent = '💾 Save Changes';
    if (saveSpinner) saveSpinner.classList.add('hidden');
    
    statusDiv.textContent = 'Error: ' + (result.error || 'Unknown error');
    statusDiv.className = 'mt-4 text-center font-semibold text-red-600';
  }
};

// Initialize global edit request system
if (typeof window !== 'undefined') {
  window.initEditRequestSystem = function(supabaseClient) {
    window.editRequestSystem = new WorkdoneEditRequestSystem(supabaseClient);
    return window.editRequestSystem;
  };
}
