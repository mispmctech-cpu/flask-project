/**
 * Month Filter System
 * Filters month dropdown options based on admin settings in localStorage
 * This file should be included in all faculty and institution forms
 */

(function() {
    'use strict';

    // Function to filter month dropdowns
    function filterMonthDropdowns() {
        // Get enabled months from localStorage
        const enabledMonthsStr = localStorage.getItem('enabledMonths');
        
        // If no settings found, allow all months (default behavior)
        if (!enabledMonthsStr) {
            console.log('No month filter settings found. All months enabled by default.');
            return;
        }

        let enabledMonths;
        try {
            enabledMonths = JSON.parse(enabledMonthsStr);
        } catch (e) {
            console.error('Error parsing enabled months:', e);
            return;
        }

        // Find all month select elements (both "Month" and "Month:" attribute names)
        const monthSelects = document.querySelectorAll('select[name="Month"], select[name="Month:"]');
        
        if (monthSelects.length === 0) {
            console.log('No month dropdowns found on this page.');
            return;
        }

        console.log(`Found ${monthSelects.length} month dropdown(s). Enabled months:`, enabledMonths);

        // Filter each month dropdown
        monthSelects.forEach(function(select) {
            // Get all option elements
            const options = Array.from(select.options);
            
            // Keep track of currently selected value
            const currentValue = select.value;
            
            // Filter options
            options.forEach(function(option) {
                const monthValue = option.value;
                
                // Skip empty/placeholder options
                if (!monthValue || monthValue === '' || monthValue.toLowerCase() === 'select') {
                    option.disabled = false;
                    option.style.display = '';
                    return;
                }

                // Check if this month is enabled
                if (enabledMonths.includes(monthValue)) {
                    // Month is enabled - show it
                    option.disabled = false;
                    option.style.display = '';
                } else {
                    // Month is disabled - hide it
                    option.disabled = true;
                    option.style.display = 'none';
                    
                    // If this was the selected value, reset selection
                    if (monthValue === currentValue) {
                        select.value = '';
                    }
                }
            });

            // Add visual indicator to the dropdown if months are restricted
            if (enabledMonths.length < 12) {
                select.style.borderColor = '#f59e0b'; // Orange border to indicate restriction
                select.title = `Only ${enabledMonths.length} month(s) are currently available for selection`;
            } else {
                select.style.borderColor = ''; // Reset to default
                select.title = '';
            }
        });

        // Show notification if months are restricted
        if (enabledMonths.length < 12 && enabledMonths.length > 0) {
            showMonthRestrictionNotice(enabledMonths);
        } else if (enabledMonths.length === 0) {
            showNoMonthsAvailableNotice();
        }
    }

    // Show a notice that some months are restricted
    function showMonthRestrictionNotice(enabledMonths) {
        // Check if notice already exists
        if (document.getElementById('month-restriction-notice')) {
            return;
        }

        const notice = document.createElement('div');
        notice.id = 'month-restriction-notice';
        notice.className = 'fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg z-50';
        notice.style.maxWidth = '300px';
        notice.innerHTML = `
            <div class="flex items-start">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <div>
                    <p class="font-semibold">Month Selection Restricted</p>
                    <p class="text-sm mt-1">Only ${enabledMonths.length} of 12 months are currently available for selection.</p>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-xs underline mt-2">Dismiss</button>
                </div>
            </div>
        `;

        document.body.appendChild(notice);

        // Auto-dismiss after 8 seconds
        setTimeout(function() {
            if (notice.parentElement) {
                notice.remove();
            }
        }, 8000);
    }

    // Show notice when no months are available
    function showNoMonthsAvailableNotice() {
        // Check if notice already exists
        if (document.getElementById('month-restriction-notice')) {
            return;
        }

        const notice = document.createElement('div');
        notice.id = 'month-restriction-notice';
        notice.className = 'fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50';
        notice.style.maxWidth = '300px';
        notice.innerHTML = `
            <div class="flex items-start">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <div>
                    <p class="font-semibold">Form Submission Disabled</p>
                    <p class="text-sm mt-1">No months are currently available for selection. Please contact the administrator.</p>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-xs underline mt-2">Dismiss</button>
                </div>
            </div>
        `;

        document.body.appendChild(notice);
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', filterMonthDropdowns);
    } else {
        filterMonthDropdowns();
    }

    // Also run when localStorage changes (for multi-tab synchronization)
    window.addEventListener('storage', function(e) {
        if (e.key === 'enabledMonths') {
            console.log('Month settings changed in another tab. Reapplying filters...');
            filterMonthDropdowns();
        }
    });

    // Re-run periodically in case dropdowns are dynamically added
    setInterval(filterMonthDropdowns, 2000);

})();
