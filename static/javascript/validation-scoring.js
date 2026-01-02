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
      if (key.toLowerCase().includes('status_') || key.toLowerCase() === 'status') {
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
      if (key.toLowerCase().includes('status_') || (key.toLowerCase() === 'status' && typeof rowData[key] === 'string')) {
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
      <!-- Form Content Section -->
      <div class="mb-6 pb-6 border-b-2 border-purple-200">
        ${formContent}
      </div>
      
      <!-- Validation Scoring Section -->
      <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
        <h4 class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Validation Scoring
        </h4>
        
        <div class="mb-4">
          <h5 class="font-semibold text-gray-700 mb-3">Score Each Status Field:</h5>
          <div class="bg-white p-4 rounded-lg max-h-96 overflow-y-auto shadow-inner">
            <table class="w-full text-sm">
              <thead class="bg-purple-100 sticky top-0">
                <tr>
                  <th class="px-2 py-2 text-left" style="width: 5%">#</th>
                  <th class="px-2 py-2 text-left" style="width: 35%">Field</th>
                  <th class="px-2 py-2 text-left" style="width: 30%">Status</th>
                  <th class="px-2 py-2 text-center" style="width: 30%">Score</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
    `;

    statusFields.forEach((field, idx) => {
      const fieldId = `score_field_${idx}`;
      const statusValue = (field.value || '').toLowerCase().trim();
      const isValidatable = statusValue.includes('completed') || statusValue.includes('complted');
      const disabledAttr = !isValidatable ? 'disabled' : '';
      const checkboxClass = !isValidatable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
      
      html += `
        <tr class="${!isValidatable ? 'bg-gray-50' : ''}">
          <td class="px-2 py-2">${idx + 1}</td>
          <td class="px-2 py-2 text-xs">${field.fieldName}</td>
          <td class="px-2 py-2">
            <span class="inline-block px-2 py-1 rounded text-xs ${this.getStatusColor(field.value)}">${field.value}</span>
          </td>
          <td class="px-2 py-2 text-center">
            <label class="inline-flex items-center gap-2 ${checkboxClass}">
              <input type="checkbox" 
                     id="${fieldId}" 
                     class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500" 
                     data-field="${field.fieldName}" 
                     ${disabledAttr}
                     onchange="window.validationScoring.updateScore('${fieldId}', '${field.fieldName}')">
              <span class="text-sm ${!isValidatable ? 'text-gray-400' : 'text-gray-700'}">
                ${isValidatable ? 'Validate' : 'Not Eligible'}
              </span>
            </label>
          </td>
        </tr>
      `;
    });

    html += `
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Validation Notes (Optional):</label>
          <textarea id="validationNotes" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500" rows="3" placeholder="Enter any notes or comments..."></textarea>
        </div>
        
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
        
        <div id="validationStatus" class="text-sm mb-4 mt-4"></div>
      </div>
    `;

    document.getElementById('validationModalContent').innerHTML = html;
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
    const submitBtn = document.querySelector('#validationModal button[type="submit"]');

    try {
      // Disable submit button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Validating...';
      }

      // Get validation data
      const totalFields = document.querySelectorAll('[id^="score_field_"]').length;
      const validatedFields = Object.values(this.fieldScores).reduce((sum, score) => sum + score, 0);
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
        status: this.currentRow.status || 'N/A',
        verified_by: validatedBy,
        verified_at: new Date().toISOString(),
        submitted_at: this.currentRow.submitted_at || null,
        total_fields: totalFields,
        validated_fields: validatedFields,
        validation_score: parseFloat(validationScore),
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

      // Reload tables
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
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Validation';
      }
    }
  }

  /**
   * Close validation modal
   */
  closeValidationModal() {
    const modal = document.getElementById('validationModal');
    if (modal) {
      modal.classList.add('hidden');
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
