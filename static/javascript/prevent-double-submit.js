/**
 * Prevent Double Form Submission Handler
 * Automatically disables submit buttons and prevents multiple form submissions
 * Includes visual feedback and timeout safety
 */

(function() {
    'use strict';
    
    // Track submitted forms to prevent duplicates
    let submittedForms = new Set();
    let formSubmissionTimers = new Map();
    
    /**
     * Initialize double-submit prevention for a form
     * @param {HTMLFormElement} form - The form element
     * @param {Object} options - Configuration options
     */
    function initializeFormProtection(form, options = {}) {
        const config = {
            disableTime: 3000, // Time to keep button disabled (3 seconds)
            loadingText: 'Submitting...', // Text to show while submitting
            originalText: null, // Will store original button text
            showSpinner: true, // Show loading spinner
            preventMultipleSubmits: true, // Prevent multiple submissions
            ...options
        };
        
        if (!form || submittedForms.has(form.id)) {
            return;
        }
        
        // Find all submit buttons in the form
        const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
        
        // Store original button states
        const originalButtonStates = new Map();
        submitButtons.forEach(button => {
            originalButtonStates.set(button, {
                text: button.textContent || button.value,
                disabled: button.disabled,
                className: button.className
            });
        });
        
        /**
         * Disable submit buttons with visual feedback
         */
        function disableSubmitButtons() {
            submitButtons.forEach(button => {
                const originalState = originalButtonStates.get(button);
                
                // Disable button
                button.disabled = true;
                
                // Update text and add loading state
                if (button.tagName.toLowerCase() === 'button') {
                    button.textContent = config.loadingText;
                } else {
                    button.value = config.loadingText;
                }
                
                // Add loading visual styles
                if (config.showSpinner) {
                    button.classList.add('loading');
                    
                    // Add spinner if not already present
                    if (!button.querySelector('.spinner')) {
                        const spinner = document.createElement('i');
                        spinner.className = 'fas fa-spinner fa-spin spinner';
                        spinner.style.marginRight = '8px';
                        button.insertBefore(spinner, button.firstChild);
                    }
                }
                
                // Add visual feedback classes
                button.classList.add('btn-submitting');
                button.style.opacity = '0.7';
                button.style.cursor = 'not-allowed';
            });
        }
        
        /**
         * Re-enable submit buttons
         */
        function enableSubmitButtons() {
            submitButtons.forEach(button => {
                const originalState = originalButtonStates.get(button);
                
                // Restore original state
                button.disabled = originalState.disabled;
                
                if (button.tagName.toLowerCase() === 'button') {
                    button.textContent = originalState.text;
                } else {
                    button.value = originalState.text;
                }
                
                // Remove loading elements
                const spinner = button.querySelector('.spinner');
                if (spinner) {
                    spinner.remove();
                }
                
                // Restore original classes and styles
                button.classList.remove('loading', 'btn-submitting');
                button.style.opacity = '';
                button.style.cursor = '';
            });
        }
        
        /**
         * Handle form submission
         */
        function handleSubmit(event) {
            const formId = form.id || `form_${Date.now()}`;
            
            // Prevent multiple submissions if already submitted
            if (config.preventMultipleSubmits && submittedForms.has(formId)) {
                console.warn('Form submission prevented: Form already submitted');
                event.preventDefault();
                return false;
            }
            
            // Mark form as submitted
            submittedForms.add(formId);
            
            // Disable submit buttons immediately
            disableSubmitButtons();
            
            // Set a safety timer to re-enable buttons after specified time
            const timerId = setTimeout(() => {
                enableSubmitButtons();
                submittedForms.delete(formId);
                formSubmissionTimers.delete(formId);
                console.log('Form re-enabled after timeout');
            }, config.disableTime);
            
            formSubmissionTimers.set(formId, timerId);
            
            // Log submission attempt
            console.log(`Form submission initiated: ${formId}`);
        }
        
        /**
         * Handle successful form submission
         */
        function handleSuccess() {
            const formId = form.id || `form_${Date.now()}`;
            
            // Clear timeout as submission was successful
            if (formSubmissionTimers.has(formId)) {
                clearTimeout(formSubmissionTimers.get(formId));
                formSubmissionTimers.delete(formId);
            }
            
            // Keep button disabled until page redirect/reload
            console.log(`Form submitted successfully: ${formId}`);
        }
        
        /**
         * Handle form submission error
         */
        function handleError() {
            const formId = form.id || `form_${Date.now()}`;
            
            // Re-enable buttons on error
            enableSubmitButtons();
            submittedForms.delete(formId);
            
            // Clear timeout
            if (formSubmissionTimers.has(formId)) {
                clearTimeout(formSubmissionTimers.get(formId));
                formSubmissionTimers.delete(formId);
            }
            
            console.log(`Form submission error, buttons re-enabled: ${formId}`);
        }
        
        // Attach submit event listener
        form.addEventListener('submit', handleSubmit);
        
        // Expose methods for manual control
        form.doubleSubmitPrevention = {
            disable: disableSubmitButtons,
            enable: enableSubmitButtons,
            handleSuccess: handleSuccess,
            handleError: handleError,
            reset: () => {
                const formId = form.id || `form_${Date.now()}`;
                submittedForms.delete(formId);
                enableSubmitButtons();
            }
        };
        
        console.log(`Double-submit prevention initialized for form: ${form.id || 'unnamed'}`);
    }
    
    /**
     * Auto-initialize all forms on page load
     */
    function autoInitialize() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', autoInitialize);
            return;
        }
        
        // Find all forms and initialize protection
        const forms = document.querySelectorAll('form');
        forms.forEach((form, index) => {
            // Skip forms that already have protection
            if (form.doubleSubmitPrevention) {
                return;
            }
            
            // Assign ID if form doesn't have one
            if (!form.id) {
                form.id = `auto_form_${index}`;
            }
            
            initializeFormProtection(form);
        });
        
        console.log(`Auto-initialized double-submit prevention for ${forms.length} forms`);
    }
    
    // Add CSS for loading states
    function addLoadingStyles() {
        if (document.getElementById('prevent-double-submit-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'prevent-double-submit-styles';
        style.textContent = `
            .btn-submitting {
                position: relative;
                pointer-events: none;
            }
            
            .btn-submitting:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: inherit;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .spinner {
                animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize styles and auto-protection
    addLoadingStyles();
    autoInitialize();
    
    // Expose global API
    window.FormSubmissionProtection = {
        init: initializeFormProtection,
        autoInit: autoInitialize
    };
    
})();
