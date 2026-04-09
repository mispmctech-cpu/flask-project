/**
 * Form Access Control System
 * Checks if a form is open/closed based on database status in Supabase
 * Include this file in all form pages that need access control
 */

(function() {
    'use strict';

    // Supabase configuration
    const SUPABASE_URL = "https://cbhodgwaazmjszkujrti.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU";

    // Create Supabase client (use existing if available)
    const supabaseAccessControl = window.supabase
        ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        : null;

    // Get the form ID from the current page filename
    function getFormIdFromPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        
        // Remove .html extension to get form ID
        const formId = filename.replace('.html', '');
        
        return formId;
    }

    // Check if the current form is open
    async function checkFormAccess() {
        if (!supabaseAccessControl) {
            console.error('Form Access Control: Supabase client not available');
            return;
        }

        const formId = getFormIdFromPage();
        
        // Skip check for admin pages and non-form pages
        if (formId.startsWith('admin') || 
            formId === 'notification' || 
            formId === 'index' || 
            formId === 'login' ||
            formId === 'dashboard' ||
            formId === '') {
            return;
        }

        console.log('Form Access Control: Checking access for form:', formId);

        try {
            const { data, error } = await supabaseAccessControl
                .from('formstatus')
                .select('is_open, close_message, form_title')
                .eq('form_name', formId)
                .single();

            if (error) {
                // If form not found in database, allow access (default open)
                if (error.code === 'PGRST116') {
                    console.log('Form Access Control: Form not found in database, allowing access');
                    return;
                }
                console.error('Form Access Control: Error checking form status:', error);
                return;
            }

            if (data && data.is_open === false) {
                // Form is closed - show blocked message
                showFormClosedMessage(data.close_message || 'This form is currently closed for submissions.', data.form_title || formId);
            } else {
                console.log('Form Access Control: Form is open, allowing access');
            }

        } catch (err) {
            console.error('Form Access Control: Exception checking form access:', err);
        }
    }

    // Show form closed overlay
    function showFormClosedMessage(message, formTitle) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'form-closed-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;

        overlay.innerHTML = `
            <div style="
                background: white;
                padding: 40px 50px;
                border-radius: 16px;
                text-align: center;
                max-width: 500px;
                margin: 20px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                ">
                    <svg width="40" height="40" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </div>
                <h2 style="
                    font-size: 24px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 8px;
                ">Form Currently Closed</h2>
                <p style="
                    font-size: 14px;
                    color: #6b7280;
                    margin-bottom: 16px;
                ">${formTitle}</p>
                <p style="
                    font-size: 16px;
                    color: #4b5563;
                    margin-bottom: 32px;
                    line-height: 1.6;
                ">${message}</p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="window.history.back()" style="
                        background: linear-gradient(135deg, #6366f1, #4f46e5);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s, box-shadow 0.2s;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(99, 102, 241, 0.4)';" 
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                        ← Go Back
                    </button>
                    <button onclick="window.location.href='index.html'" style="
                        background: #f3f4f6;
                        color: #374151;
                        border: 1px solid #d1d5db;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#e5e7eb';" 
                       onmouseout="this.style.background='#f3f4f6';">
                        Home
                    </button>
                </div>
                <p style="
                    font-size: 12px;
                    color: #9ca3af;
                    margin-top: 24px;
                ">Please contact the administrator if you believe this is an error.</p>
            </div>
        `;

        // Hide the form content
        document.body.style.overflow = 'hidden';
        
        // Add overlay to body
        document.body.appendChild(overlay);

        // Disable all form inputs
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.style.pointerEvents = 'none';
            form.style.opacity = '0.3';
        });
    }

    // Run check when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkFormAccess);
    } else {
        // DOM already loaded
        checkFormAccess();
    }

    // Expose function globally for manual checks
    window.checkFormAccess = checkFormAccess;
    window.getFormIdFromPage = getFormIdFromPage;

})();
