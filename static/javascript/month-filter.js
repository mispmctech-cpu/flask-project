/**
 * Month Filter System
 * Filters month dropdown options based on admin settings in localStorage
 * This file should be included in all faculty and institution forms
 */


(function() {
    'use strict';

    // Supabase config (same as admin-dashboard.html)
    const SUPABASE_URL = "https://cbhodgwaazmjszkujrti.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU";
    const supabaseClient = window.supabase
        ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        : null;

    // Fetch enabled months from Supabase (global)
    async function fetchEnabledMonths() {
        if (!supabaseClient) return null;
        try {
            const { data, error } = await supabaseClient
                .from('month_control')
                .select('enabled_months')
                .eq('id', 1)
                .single();
            if (error) throw error;
            return data && data.enabled_months ? data.enabled_months : [];
        } catch (err) {
            console.error('Error fetching enabled months from Supabase:', err);
            return null;
        }
    }

    // Fetch faculty's assigned months from Faculty table
    async function fetchFacultyAssignedMonths() {
        if (!supabaseClient) return null;
        try {
            // Get faculty email from localStorage (set during login as 'email')
            const facultyEmail = localStorage.getItem('email');
            console.log('[Month Filter] Looking for faculty with email:', facultyEmail);
            
            if (!facultyEmail) {
                console.warn('[Month Filter] Faculty email not found in localStorage. No month assignment filtering will be applied.');
                return null;
            }
            
            // Fetch the faculty record
            const { data, error } = await supabaseClient
                .from('Faculty')
                .select('input_id, assigned_forms, "Name", email')
                .eq('email', facultyEmail)
                .single();
            
            if (error) {
                console.error('[Month Filter] Error fetching faculty record:', error);
                return null;
            }
            
            console.log('[Month Filter] Faculty found:', {
                name: data?.Name,
                email: data?.email,
                assigned_forms: data?.assigned_forms,
                input_id: data?.input_id
            });
            
            // Parse comma-separated assigned_forms and return as array
            if (!data || !data.assigned_forms || data.assigned_forms.trim() === '') {
                console.log('[Month Filter] Faculty has NO assigned months (assigned_forms is empty)');
                return [];
            }
            
            const assignedArray = data.assigned_forms
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
            
            console.log('[Month Filter] Faculty assigned months:', assignedArray);
            return assignedArray;
        } catch (err) {
            console.error('[Month Filter] Error fetching faculty assigned months:', err);
            return null;
        }
    }

    // Function to filter month dropdowns
    async function filterMonthDropdowns() {
        let enabledMonths = await fetchEnabledMonths();
        let assignedMonths = await fetchFacultyAssignedMonths();
        
        console.log('[Month Filter] Enabled months (global):', enabledMonths);
        console.log('[Month Filter] Assigned months (faculty):', assignedMonths);
        
        if (!enabledMonths) {
            // fallback: all months enabled
            enabledMonths = [
                "January","February","March","April","May","June","July","August","September","October","November","December"
            ];
            console.log('[Month Filter] Using fallback: all 12 months enabled');
        }

        // If faculty has assigned months, use ONLY those assigned months (filtered by enabled)
        // If faculty has NO assigned_forms, show all enabled months (backward compatibility)
        let visibleMonths = enabledMonths;
        
        if (assignedMonths !== null && assignedMonths !== undefined) {
            if (assignedMonths.length > 0) {
                // Faculty HAS assigned months - show intersection of enabled AND assigned
                visibleMonths = enabledMonths.filter(month => assignedMonths.includes(month));
                console.log('[Month Filter] Intersection of enabled + assigned:', visibleMonths);
            } else {
                // Faculty has NO months assigned (empty assigned_forms) - show NO months
                visibleMonths = [];
                console.log('[Month Filter] Faculty has empty assigned_forms - showing 0 months');
            }
        } else {
            console.log('[Month Filter] Unable to fetch faculty assignments, showing all enabled months');
        }

        console.log('[Month Filter] Final visible months:', visibleMonths);

        // Find all month select elements (both "Month" and "Month:" attribute names)
        const monthSelects = document.querySelectorAll('select[name="Month"], select[name="Month:"]');
        if (monthSelects.length === 0) {
            console.log('[Month Filter] No month dropdowns found on this page.');
            return;
        }
        
        console.log('[Month Filter] Found', monthSelects.length, 'month dropdown(s)');

        // Filter each month dropdown
        monthSelects.forEach(function(select, index) {
            const options = Array.from(select.options);
            const currentValue = select.value;
            let hiddenCount = 0;
            
            options.forEach(function(option) {
                const monthValue = option.value;
                if (!monthValue || monthValue === '' || monthValue.toLowerCase() === 'select') {
                    option.disabled = false;
                    option.style.display = '';
                    return;
                }
                if (visibleMonths.includes(monthValue)) {
                    option.disabled = false;
                    option.style.display = '';
                } else {
                    option.disabled = true;
                    option.style.display = 'none';
                    hiddenCount++;
                    if (monthValue === currentValue) {
                        select.value = '';
                    }
                }
            });
            
            console.log(`[Month Filter] Select #${index}: Hidden ${hiddenCount} months, Showing ${visibleMonths.length} months`);
            
            if (visibleMonths.length < 12) {
                select.style.borderColor = '#f59e0b';
                select.title = `Only ${visibleMonths.length} month(s) are available for you to select`;
            } else {
                select.style.borderColor = '';
                select.title = '';
            }
        });
        // Pop-up notices disabled to avoid interrupting form entry.
    }

    // Show a notice that some months are restricted based on faculty assignment
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
                    <p class="font-semibold">Limited Months Available</p>
                    <p class="text-sm mt-1">Only ${enabledMonths.length} of 12 months are assigned to you. Please select from the available options.</p>
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

    // Wait for Supabase to be loaded, then run filtering
    function initFilterMonths() {
        if (!window.supabase) {
            // Supabase not yet loaded, retry after 500ms
            console.warn('Supabase not loaded yet, retrying...');
            setTimeout(initFilterMonths, 500);
            return;
        }
        
        // Add debug info to console
        const email = localStorage.getItem('email');
        console.log('[Month Filter] Faculty Email:', email);
        console.log('[Month Filter] Starting month filtering...');
        
        filterMonthDropdowns();
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFilterMonths);
    } else {
        initFilterMonths();
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
