/**
 * Form Draft System - Reusable draft save/load functionality for faculty forms
 * Include this script after Supabase is initialized
 */

// Global object to store draft file URLs
window.draftFileUrls = {};

/**
 * Initialize the draft system for a form
 * @param {Object} config - Configuration object
 * @param {string} config.formId - The ID of the form element
 * @param {string} config.draftTableName - The Supabase table name for drafts
 * @param {number} config.numRows - Number of rows in the form
 * @param {string} config.storageBucket - Storage bucket name for file uploads
 * @param {string} config.filePrefix - Prefix for uploaded files
 * @param {Object} config.supabase - Supabase client instance
 */
function initDraftSystem(config) {
    const {
        formId,
        draftTableName,
        numRows,
        storageBucket,
        filePrefix,
        supabase
    } = config;

    // Check for draft after auto-fill completes
    setTimeout(() => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const dept = form.querySelector('input[name="Department"]')?.value;
        const member = form.querySelector('input[name="Portfolio Member Name"]')?.value;
        
        if (dept && member) {
            checkForDraft();
        }
    }, 1000);

    // Check for draft and show popup
    async function checkForDraft() {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const dept = form.querySelector('input[name="Department"]')?.value;
        const member = form.querySelector('input[name="Portfolio Member Name"]')?.value;
        
        if (!dept || !member) return;

        try {
            const { data: drafts, error } = await supabase
                .from(draftTableName)
                .select('*')
                .eq('Department', dept)
                .eq('Portfolio Member Name', member)
                .order('created_at', { ascending: false })
                .limit(1);
            
            if (error || !drafts || drafts.length === 0) return;
            
            // Show popup asking if user wants to use draft
            showDraftPopup(drafts[0]);
        } catch (err) {
            console.error('Error checking for draft:', err);
        }
    }

    function showDraftPopup(draft) {
        const modal = document.getElementById('draftModal');
        if (!modal) return;
        
        const draftMonth = draft.Month || 'Unknown';
        const draftMonthInfo = document.getElementById('draftMonthInfo');
        if (draftMonthInfo) draftMonthInfo.textContent = draftMonth;
        
        modal.classList.add('show');
        
        // Store draft for later use
        window.pendingDraft = draft;
    }

    // Load draft data into form
    function loadDraftData(draft) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Populate month if saved
        if (draft.Month) {
            const monthSelect = form.querySelector('select[name="Month"]');
            if (monthSelect) monthSelect.value = draft.Month;
        }
        
        for (let i = 1; i <= numRows; i++) {
            const statusSelect = form.querySelector(`select[name="Status_${i}"]`);
            const descInput = form.querySelector(`input[name="Description_${i}"]`);
            
            if (statusSelect && draft[`Status_${i}`]) {
                statusSelect.value = draft[`Status_${i}`];
            }
            if (descInput && draft[`Description_${i}`]) {
                descInput.value = draft[`Description_${i}`];
            }
            
            if (draft[`Upload The Scanned File_${i}`]) {
                // Store draft file URL for later use during submission
                window.draftFileUrls[i] = draft[`Upload The Scanned File_${i}`];
                
                const uploadBtn = document.querySelector(`button.upload-btn[data-row="${i}"]`);
                const checkMark = document.querySelector(`.file-check[data-row="${i}"]`);
                
                if (uploadBtn) {
                    uploadBtn.textContent = 'Uploaded';
                    uploadBtn.className = 'bg-green-200 text-green-800 font-semibold px-3 py-1 rounded w-full';
                    uploadBtn.disabled = true;
                }
                if (checkMark) {
                    checkMark.classList.remove('hidden');
                }
                
                // Show file preview
                const preview = document.getElementById(`file-preview-${i}`);
                if (preview) {
                    preview.innerHTML = `
                        <span class="file-name text-green-700"><i class="fas fa-file mr-2"></i>Draft file loaded</span>
                        <div class="file-actions">
                            <button type="button" class="btn-view" onclick="viewFile(${i})">View</button>
                            <button type="button" class="btn-replace" onclick="replaceFile(${i})">Replace</button>
                        </div>
                    `;
                    preview.style.display = 'flex';
                }
            }
        }
        
        const banner = document.getElementById('draftBanner');
        if (banner) {
            banner.classList.remove('hidden');
            setTimeout(() => banner.classList.add('hidden'), 5000);
        }
    }

    // Save as Draft function
    async function saveAsDraft() {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const formData = new FormData(form);
        
        const dept = formData.get('Department');
        const portfolio = formData.get('Portfolio Name');
        const member = formData.get('Portfolio Member Name');
        const month = formData.get('Month');
        
        if (!dept || !member || !month) {
            alert('Please fill in Department, Portfolio Member Name, and Month to save as draft');
            return;
        }
        
        const saveDraftBtn = document.getElementById('saveDraftBtn');
        if (!saveDraftBtn) return;
        
        const originalText = saveDraftBtn.innerHTML;
        saveDraftBtn.disabled = true;
        saveDraftBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
        
        try {
            const draftData = {
                "Department": dept,
                "Portfolio Name": portfolio,
                "Portfolio Member Name": member,
                "Month": month
            };
            
            for (let i = 1; i <= numRows; i++) {
                draftData[`Status_${i}`] = formData.get(`Status_${i}`) || '';
                draftData[`Description_${i}`] = formData.get(`Description_${i}`) || '';
                
                const uploadBtn = document.querySelector(`button.upload-btn[data-row='${i}']`);
                const isAlreadyUploaded = uploadBtn && uploadBtn.textContent.trim() === 'Uploaded';
                
                if (isAlreadyUploaded && window.draftFileUrls[i]) {
                    // Keep existing draft file URL
                    draftData[`Upload The Scanned File_${i}`] = window.draftFileUrls[i];
                } else if (isAlreadyUploaded && window.uploadedFiles && window.uploadedFiles[i]) {
                    // Use newly uploaded file URL
                    draftData[`Upload The Scanned File_${i}`] = window.uploadedFiles[i];
                } else {
                    const fileInput = document.querySelector(`input.file-input-row[data-row='${i}']`);
                    const file = fileInput && fileInput.files[0];
                    if (file && file.size > 0) {
                        const ts = Date.now();
                        const path = `${filePrefix}_draft_${i}_${ts}_${file.name}`;
                        try {
                            const url = await uploadFileToStorageForDraft(file, path, storageBucket, uploadBtn, supabase);
                            draftData[`Upload The Scanned File_${i}`] = url;
                        } catch (err) {
                            console.error(`File upload error for row ${i}:`, err);
                            draftData[`Upload The Scanned File_${i}`] = null;
                        }
                    } else {
                        draftData[`Upload The Scanned File_${i}`] = null;
                    }
                }
            }
            
            // Check for existing draft
            const { data: existing, error: selectError } = await supabase
                .from(draftTableName)
                .select('*')
                .eq('Department', dept)
                .eq('Portfolio Member Name', member)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            
            if (existing) {
                // Preserve existing file URLs if not overwritten
                for (let i = 1; i <= numRows; i++) {
                    const fileKey = `Upload The Scanned File_${i}`;
                    if (!draftData[fileKey] && existing[fileKey]) {
                        draftData[fileKey] = existing[fileKey];
                    }
                }
                
                const { error } = await supabase
                    .from(draftTableName)
                    .update(draftData)
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from(draftTableName)
                    .insert([draftData]);
                if (error) throw error;
            }
            
            saveDraftBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Draft Saved!';
            saveDraftBtn.className = 'bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-2xl shadow-xl text-xl tracking-wide transition-all duration-200';
            
            setTimeout(() => {
                saveDraftBtn.innerHTML = originalText;
                saveDraftBtn.className = 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-2xl shadow-xl text-xl tracking-wide transition-all duration-200';
                saveDraftBtn.disabled = false;
            }, 2000);
            
        } catch (err) {
            alert('Failed to save draft: ' + err.message);
            saveDraftBtn.innerHTML = originalText;
            saveDraftBtn.disabled = false;
        }
    }

    // Helper function for file upload during draft save
    async function uploadFileToStorageForDraft(file, path, bucket, uploadBtn, supabase) {
        if (!file) return null;
        const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
        if (error) throw error;
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
        if (uploadBtn) {
            uploadBtn.textContent = 'Uploaded';
            uploadBtn.className = 'bg-green-200 text-green-800 font-semibold px-3 py-1 rounded w-full';
            uploadBtn.disabled = true;
        }
        return urlData.publicUrl;
    }

    // Setup event listeners
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', saveAsDraft);
    }

    const draftAcceptBtn = document.getElementById('draftAcceptBtn');
    if (draftAcceptBtn) {
        draftAcceptBtn.addEventListener('click', function() {
            document.getElementById('draftModal').classList.remove('show');
            if (window.pendingDraft) {
                loadDraftData(window.pendingDraft);
                window.pendingDraft = null;
            }
        });
    }

    const draftDeclineBtn = document.getElementById('draftDeclineBtn');
    if (draftDeclineBtn) {
        draftDeclineBtn.addEventListener('click', function() {
            document.getElementById('draftModal').classList.remove('show');
            window.pendingDraft = null;
        });
    }

    // Expose functions globally
    window.checkForDraft = checkForDraft;
    window.loadDraftData = loadDraftData;
    window.saveAsDraft = saveAsDraft;
}

/**
 * Get the draft modal HTML to be inserted into the page
 */
function getDraftModalHTML() {
    return `
    <!-- Draft loaded banner -->
    <div id="draftBanner" class="hidden fixed top-4 right-4 bg-blue-100 border-2 border-blue-500 text-blue-800 px-6 py-3 rounded-lg shadow-lg z-50">
        <i class="fas fa-info-circle mr-2"></i>Draft loaded - Continue editing or submit when ready
    </div>
    
    <!-- Draft Popup Modal -->
    <div id="draftModal" class="draft-modal">
        <div class="draft-modal-content">
            <h2 class="text-2xl font-bold text-purple-900 mb-4">
                <i class="fas fa-file-alt text-blue-600 mr-2"></i>Draft Found!
            </h2>
            <p class="text-gray-700 mb-2">You have a saved draft for this form.</p>
            <p class="text-sm text-gray-600 mb-6">
                <span class="font-semibold">Saved Month:</span> <span id="draftMonthInfo" class="text-blue-600"></span>
            </p>
            <p class="text-gray-700 mb-6">Would you like to load it and continue where you left off?</p>
            <div class="flex gap-4 justify-end">
                <button id="draftDeclineBtn" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-all">
                    <i class="fas fa-times mr-2"></i>Start Fresh
                </button>
                <button id="draftAcceptBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                    <i class="fas fa-check mr-2"></i>Load Draft
                </button>
            </div>
        </div>
    </div>
    `;
}

/**
 * Get the draft CSS styles
 */
function getDraftModalCSS() {
    return `
    /* Draft Popup Modal */
    .draft-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        align-items: center;
        justify-content: center;
    }
    .draft-modal.show {
        display: flex;
    }
    .draft-modal-content {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    `;
}
