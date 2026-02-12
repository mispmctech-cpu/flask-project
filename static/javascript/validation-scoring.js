/**
 * Validation Scoring System for HOD Workdone
 * Handles validation with scoring for each status field
 */

class ValidationScoring {
  constructor(supabaseClient) {
    this.supabaseClient = supabaseClient;
    this.currentRow = null;
    this.currentRowIndex = null;
    this.fieldScores = {};
  }

  /**
   * Count total status fields in a row's original data
   */
  countStatusFields(rowData) {
    let count = 0;
    for (const key in rowData) {
      if (key.toLowerCase().includes('status_') || key.toLowerCase().includes('status-') || key.toLowerCase() === 'status') {
        count++;
      }
    }
    return count;
  }

  /**
   * Extract all status fields from row data
   */
  extractStatusFields(rowData) {
    const statusFields = [];
    for (const key in rowData) {
      if (key.toLowerCase().includes('status_') || key.toLowerCase().includes('status-') || (key.toLowerCase() === 'status' && typeof rowData[key] === 'string')) {
        statusFields.push({
          fieldName: key,
          value: rowData[key] || 'N/A',
          score: 0 // Default score
        });
      }
    }
    return statusFields;
  }

  /**
   * Open validation modal with scoring interface - MERGED WITH VIEW
   */
  openValidationModal(row, rowIndex) {
    this.currentRow = row;
    this.currentRowIndex = rowIndex;
    this.fieldScores = {};

    const modal = document.getElementById('validationModal');
    if (!modal) {
      console.error('Validation modal not found');
      return;
    }

    // Get the form content from form-modal-mapper.js
    const originalData = row._original || row;
    let formContent = '';
    
    if (typeof getFormModalContent === 'function') {
      formContent = getFormModalContent(row, originalData);
    } else {
      console.warn('getFormModalContent not available, showing basic view');
      formContent = '<div class="text-gray-500">Form content mapper not loaded</div>';
    }

    // Extract status fields for validation scoring
    const statusFields = this.extractStatusFields(originalData);
    const totalFields = statusFields.length;

    // Build combined modal content: Form content + Validation scoring
    let html = `
      <div class="mb-6">
        ${formContent}
      </div>
      
      <!-- Scoring Summary at Bottom -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-purple-700" id="validatedCount">0</div>
            <div class="text-sm text-gray-600">Validated</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-700">${totalFields}</div>
            <div class="text-sm text-gray-600">Total Fields</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-700" id="validationPercentage">0%</div>
            <div class="text-sm text-gray-600">Score</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('validationModalContent').innerHTML = html;
    modal.classList.remove('hidden');
    
    // Now inject Score column and checkboxes into the table
    setTimeout(() => {
      const table = document.querySelector('#validationModalContent table');
      if (table) {
        // Add Score header
        const thead = table.querySelector('thead tr');
        if (thead) {
          const th = document.createElement('th');
          th.className = 'px-3 py-3 text-center font-bold text-purple-700 text-sm bg-purple-100 border border-purple-300';
          th.textContent = 'Score';
          thead.appendChild(th);
        }
        
        // Add checkboxes to each row
        const tbody = table.querySelector('tbody');
        if (tbody) {
          const rows = tbody.querySelectorAll('tr');
          rows.forEach((row, idx) => {
            if (idx < statusFields.length) {
              const field = statusFields[idx];
              const fieldId = `score_field_${idx}`;
              const statusValue = (field.value || '').toLowerCase().trim();
              const isValidatable = statusValue === 'completed' || statusValue === 'complted' || statusValue === 'completed and updated' || statusValue === 'not applicable';
              const disabledAttr = !isValidatable ? 'disabled' : '';
              const checkboxClass = !isValidatable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
              
              const td = document.createElement('td');
              td.className = 'px-3 py-2 text-center border';
              const label = document.createElement('label');
              label.className = `inline-flex items-center justify-center ${checkboxClass}`;
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.id = fieldId;
              checkbox.className = 'w-5 h-5 text-purple-600 rounded focus:ring-purple-500';
              checkbox.dataset.field = field.fieldName;
              if (disabledAttr) checkbox.disabled = true;
              checkbox.onchange = () => window.validationScoring.updateScore(fieldId, field.fieldName);
              
              label.appendChild(checkbox);
              td.appendChild(label);
              row.appendChild(td);
            }
          });
        }
      }
    }, 50);
    modal.classList.remove('hidden');

    // Initialize scores
    this.updateTotalScore(totalFields);
  }

  /**
   * Get status color class
   */
  getStatusColor(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('completed') || s.includes('done')) return 'bg-green-100 text-green-800';
    if (s.includes('progress') || s.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('not') || s.includes('applicable')) return 'bg-gray-100 text-gray-800';
    return 'bg-blue-100 text-blue-800';
  }

  /**
   * Update score for a field (checkbox version)
   */
  updateScore(fieldId, fieldName) {
    const checkbox = document.getElementById(fieldId);
    if (!checkbox) return;

    const score = checkbox.checked ? 1 : 0;
    this.fieldScores[fieldName] = score;

    // Count total fields
    const totalFields = document.querySelectorAll('[id^="score_field_"]').length;
    this.updateTotalScore(totalFields);
  }

  /**
   * Update total score display
   */
  updateTotalScore(totalFields) {
    const validatedCount = Object.values(this.fieldScores).reduce((sum, score) => sum + score, 0);
    const percentage = totalFields > 0 ? ((validatedCount / totalFields) * 100).toFixed(1) : 0;

    const validatedCountEl = document.getElementById('validatedCount');
    const percentageEl = document.getElementById('validationPercentage');

    if (validatedCountEl) validatedCountEl.textContent = validatedCount;
    if (percentageEl) percentageEl.textContent = `${percentage}%`;
  }

  /**
   * Submit validation
   */
  async submitValidation() {
    if (!this.currentRow) {
      alert('No row selected for validation');
      return;
    }

    const statusBox = document.getElementById('validationStatus');
    const submitBtn = document.getElementById('submitValidationBtn');

    try {
      // Disable submit button and show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin h-5 w-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Validating...';
      }

      // Get validation data
      const totalFields = document.querySelectorAll('[id^="score_field_"]').length;
      const validatedFields = Object.values(this.fieldScores).reduce((sum, score) => sum + score, 0);
      
      // Check if at least 1 field is validated
      if (validatedFields === 0) {
        if (statusBox) {
          statusBox.innerHTML = '<span class="text-red-600 font-semibold">⚠ Please validate at least 1 field before submitting</span>';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Validation';
        }
        return;
      }
      
      const validationScore = totalFields > 0 ? ((validatedFields / totalFields) * 100).toFixed(2) : 0;
      const validationNotes = document.getElementById('validationNotes')?.value || '';
      const validatedBy = localStorage.getItem('Name') || localStorage.getItem('name') || 'HOD';

      // Determine validation status
      let validationStatus = 'pending';
      if (validatedFields === totalFields) validationStatus = 'validated';
      else if (validatedFields > 0) validationStatus = 'partial';

      // Prepare validation data
      const validationData = {
        input_id: parseInt(this.currentRow.input_id),
        table_name: this.currentRow.table,
        department: this.currentRow.department,
        portfolio_name: this.currentRow.portfolio,
        portfolio_member_name: this.currentRow.member,
        month: this.currentRow.month || this.currentRow.Month || new Date().toLocaleString('en-US', { month: 'long' }),
        status: this.currentRow.status || 'N/A',
        verified_by: validatedBy,
        verified_at: new Date().toISOString(),
        submitted_at: this.currentRow.submitted_at || null,
        total_fields: totalFields,
        validated_fields: validatedFields,
        validation_score: Math.round(parseFloat(validationScore)), // Round to integer for database
        field_scores: this.fieldScores,
        validation_notes: validationNotes,
        validation_status: validationStatus
      };

      if (statusBox) {
        statusBox.innerHTML = '<span class="text-blue-600">Submitting validation...</span>';
      }

      // Check for existing validation
      const { data: existing } = await this.supabaseClient
        .from('Hod-workdone')
        .select('id')
        .eq('input_id', validationData.input_id)
        .eq('table_name', validationData.table_name)
        .single();

      let result;
      if (existing) {
        // Update existing validation
        result = await this.supabaseClient
          .from('Hod-workdone')
          .update(validationData)
          .eq('id', existing.id);
      } else {
        // Insert new validation
        result = await this.supabaseClient
          .from('Hod-workdone')
          .insert([validationData]);
      }

      if (result.error) {
        throw result.error;
      }

      if (statusBox) {
        statusBox.innerHTML = `<span class="text-green-600 font-semibold">✓ Validation submitted successfully! Score: ${validatedFields}/${totalFields} (${validationScore}%)</span>`;
      }

      // Remove from pending list
      if (window._allWorkdoneRows && this.currentRowIndex !== null) {
        window._allWorkdoneRows.splice(this.currentRowIndex, 1);
        window._filteredWorkdoneRows = window._allWorkdoneRows;
        window._workingWorkdoneRows = window._allWorkdoneRows;
      }

      // Close modal and reload tables
      setTimeout(() => {
        this.closeValidationModal();
        if (typeof renderFilteredWorkdoneTable === 'function') {
          renderFilteredWorkdoneTable(window.workdoneCurrentPage || 1);
        }
        if (typeof loadValidatedWorkdone === 'function') {
          loadValidatedWorkdone();
        }
      }, 1500);

    } catch (error) {
      console.error('Validation error:', error);
      if (statusBox) {
        statusBox.innerHTML = `<span class="text-red-600">Error: ${error.message}</span>`;
      }
      // Re-enable button on error
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Validation';
      }
    }
  }

  /**
   * Close validation modal and reset state
   */
  closeValidationModal() {
    const modal = document.getElementById('validationModal');
    if (modal) {
      modal.classList.add('hidden');
    }
    
    // Clear modal content to ensure fresh state on next open
    const modalContent = document.getElementById('validationModalContent');
    if (modalContent) {
      modalContent.innerHTML = '';
    }
    
    const statusBox = document.getElementById('validationStatus');
    if (statusBox) {
      statusBox.innerHTML = '';
    }
    
    // Reset button state by ID
    const submitBtn = document.getElementById('submitValidationBtn');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Validation';
    }
    
    this.currentRow = null;
    this.currentRowIndex = null;
    this.fieldScores = {};
  }
}

// Global instance
window.validationScoring = null;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof supabaseClient !== 'undefined') {
    window.validationScoring = new ValidationScoring(supabaseClient);
  }
});
