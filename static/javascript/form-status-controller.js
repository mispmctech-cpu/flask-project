// Form Status Utility - Include this in all form pages
// This script checks if a form is open or closed and shows appropriate message

class FormStatusController {
    constructor(supabaseClient, formName) {
        this.supabase = supabaseClient;
        this.formName = formName;
        this.isFormOpen = true;
        this.closeMessage = 'This form is currently closed for submissions.';
    }

    // Check if form is open
    async checkFormStatus() {
        try {
            const { data, error } = await this.supabase
                .from('FormStatus')
                .select('is_open, close_message, form_title')
                .eq('form_name', this.formName)
                .single();

            if (error) {
                console.error('Error checking form status:', error);
                // Default to open if can't check status
                return { isOpen: true, message: '', title: '' };
            }

            this.isFormOpen = data.is_open;
            this.closeMessage = data.close_message || 'This form is currently closed for submissions.';
            
            return {
                isOpen: data.is_open,
                message: data.close_message,
                title: data.form_title
            };

        } catch (error) {
            console.error('Error checking form status:', error);
            // Default to open if can't check status
            return { isOpen: true, message: '', title: '' };
        }
    }

    // Show form closed message
    showClosedMessage(message, title = '') {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'form-closed-overlay';
        overlay.className = 'fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50';
        
        overlay.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
                <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <i class="fas fa-lock text-red-600 text-xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        ${title || 'Form Currently Unavailable'}
                    </h3>
                    <div class="text-sm text-gray-500 mb-6">
                        <p>${message}</p>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button onclick="window.history.back()" 
                                class="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                            <i class="fas fa-arrow-left mr-2"></i>Go Back
                        </button>
                        <button onclick="location.reload()" 
                                class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            <i class="fas fa-refresh mr-2"></i>Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Disable form interactions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.style.pointerEvents = 'none';
            form.style.opacity = '0.5';
        });
    }

    // Hide form and show message
    hideForm() {
        const mainContent = document.querySelector('form, .form-container, main, .container');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
    }

    // Initialize form status checking
    async initialize() {
        const status = await this.checkFormStatus();
        
        if (!status.isOpen) {
            this.showClosedMessage(status.message, status.title);
            this.hideForm();
            return false;
        }
        
        return true;
    }

    // Check status periodically (optional)
    startPeriodicCheck(intervalMinutes = 5) {
        setInterval(async () => {
            const status = await this.checkFormStatus();
            if (!status.isOpen && document.getElementById('form-closed-overlay') === null) {
                this.showClosedMessage(status.message, status.title);
                this.hideForm();
            }
        }, intervalMinutes * 60 * 1000);
    }
}

// Global function to initialize form status checking
function initializeFormStatusCheck(supabaseClient, formName) {
    const controller = new FormStatusController(supabaseClient, formName);
    
    // Check status when page loads
    document.addEventListener('DOMContentLoaded', async function() {
        const isOpen = await controller.initialize();
        
        if (isOpen) {
            // Start periodic checking (every 2 minutes)
            controller.startPeriodicCheck(2);
        }
    });
    
    return controller;
}
