/*
 * Universal file preview + view/replace helper
 * Enhances file inputs across form pages with a preview UI and view/replace buttons.
 * Works with existing draft code by reading/writing `window.draftFileUrls` and `window.uploadedFiles`.
 */
(function(){
    'use strict';

    // Ensure global containers
    window.draftFileUrls = window.draftFileUrls || {};
    window.uploadedFiles = window.uploadedFiles || {};

    function createPreviewForInput(fileInput){
        if (fileInput._fpEnhanced) return;
        fileInput._fpEnhanced = true;

        // Prefer an existing .file-preview element if present in markup
        let preview = null;
        if (fileInput.parentNode) {
            preview = fileInput.parentNode.querySelector('.file-preview');
            // sometimes preview is next sibling
            if (!preview && fileInput.nextElementSibling && fileInput.nextElementSibling.classList && fileInput.nextElementSibling.classList.contains('file-preview')) {
                preview = fileInput.nextElementSibling;
            }
        }

        // If no existing preview, create one
        let created = false;
        let nameSpan, viewBtn, replaceBtn, removeBtn;
        if (!preview) {
            created = true;
            const container = document.createElement('div');
            container.className = 'fp-container';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '6px';
            container.style.marginTop = '8px';

            preview = document.createElement('div');
            preview.className = 'file-preview';
            preview.style.display = 'none';
            preview.style.padding = '8px 10px';
            preview.style.borderRadius = '8px';
            preview.style.background = '#f0fdf4';
            preview.style.border = '2px solid #86efac';
            preview.style.fontSize = '0.9rem';

            nameSpan = document.createElement('span');
            nameSpan.className = 'filename-text';
            nameSpan.style.fontWeight = '600';
            nameSpan.style.color = '#166534';
            nameSpan.style.wordBreak = 'break-all';

            const actions = document.createElement('div');
            actions.style.display = 'flex';
            actions.style.gap = '8px';

            viewBtn = document.createElement('button');
            viewBtn.type = 'button';
            viewBtn.className = 'fp-btn-view';
            viewBtn.textContent = 'View';
            viewBtn.style.background = '#3b82f6';
            viewBtn.style.color = '#fff';
            viewBtn.style.padding = '6px 12px';
            viewBtn.style.border = 'none';
            viewBtn.style.borderRadius = '6px';

            replaceBtn = document.createElement('button');
            replaceBtn.type = 'button';
            replaceBtn.className = 'fp-btn-replace';
            replaceBtn.textContent = 'Replace';
            replaceBtn.style.background = '#f59e0b';
            replaceBtn.style.color = '#fff';
            replaceBtn.style.padding = '6px 12px';
            replaceBtn.style.border = 'none';
            replaceBtn.style.borderRadius = '6px';

            removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'fp-btn-remove';
            removeBtn.textContent = 'Remove';
            removeBtn.style.background = '#ef4444';
            removeBtn.style.color = '#fff';
            removeBtn.style.padding = '6px 12px';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '6px';

            actions.appendChild(viewBtn);
            actions.appendChild(replaceBtn);
            actions.appendChild(removeBtn);
            preview.appendChild(nameSpan);
            preview.appendChild(actions);

            // Insert preview after the file input
            fileInput.parentNode.insertBefore(container, fileInput.nextSibling);
            container.appendChild(preview);
        } else {
            // existing preview nodes
            nameSpan = preview.querySelector('.filename-text') || preview.querySelector('.file-name span') || preview.querySelector('[id^="file-name-"]');
            viewBtn = preview.querySelector('.btn-view') || preview.querySelector('.fp-btn-view');
            replaceBtn = preview.querySelector('.btn-replace') || preview.querySelector('.fp-btn-replace');
            removeBtn = preview.querySelector('.btn-remove') || preview.querySelector('.fp-btn-remove');
        }

        // Helper to derive key for storage maps
        function keyFor(input){
            return input.getAttribute('data-row') || input.name || input.id || input.dataset.fpKey || null;
        }

        // Update preview UI
        function setPreview(filename, url){
            const filenameEl = nameSpan || preview.querySelector('.filename-text') || preview.querySelector('.file-name span') || preview.querySelector('[id^="file-name-"]');
            if (filenameEl) filenameEl.textContent = filename || '';
            preview.style.display = filename ? 'flex' : 'none';
            const k = keyFor(fileInput);
            if (k) {
                if (url) {
                    window.uploadedFiles[k] = url;
                } else {
                    delete window.uploadedFiles[k];
                }
            }
        }

        // Expose a setter on the input so external code can programmatically set preview
        try {
            fileInput._fpSetPreview = setPreview;
        } catch (e) {
            // ignore
        }

        // If a draft URL is present on dataset, show it
        const initialKey = keyFor(fileInput);
        const initialUrl = fileInput.dataset && fileInput.dataset.fileUrl ? fileInput.dataset.fileUrl : (initialKey ? window.draftFileUrls[initialKey] : null);
        if (initialUrl) {
            const fn = (initialUrl.split('/').pop() || '').split('?')[0];
            setPreview(fn, initialUrl);
        }

        // View action
        if (viewBtn) {
            viewBtn.addEventListener('click', function(){
                const k = keyFor(fileInput);
                const url = (k && window.uploadedFiles[k]) || fileInput.dataset.fileUrl || (k && window.draftFileUrls[k]) || null;
                if (url) window.open(url, '_blank');
                else alert('No file available to view.');
            });
        }

        // Replace action
        if (replaceBtn) {
            replaceBtn.addEventListener('click', function(){
                fileInput.click();
            });
        }

        // Remove action - clear preview, inputs and draft mapping
        function doRemove() {
            const k = keyFor(fileInput);
            // hide preview
            preview.style.display = 'none';
            // clear filename display
            const filenameEl = nameSpan || preview.querySelector('.filename-text') || preview.querySelector('.file-name span');
            if (filenameEl) filenameEl.textContent = '';
            // clear input value
            try { fileInput.value = ''; } catch(e) {}
            // clear uploaded and draft maps
            if (k) {
                if (window.uploadedFiles && window.uploadedFiles[k]) delete window.uploadedFiles[k];
                if (window.draftFileUrls && window.draftFileUrls[k]) delete window.draftFileUrls[k];
            }

            // Reset upload buttons and check indicators in multiple possible locations
            try {
                // Try exact selector by data-row
                let uploadBtn = document.querySelector(`button.upload-btn[data-row="${k}"]`);
                // Try nearby upload button within same parent cell
                if (!uploadBtn && fileInput.parentNode) uploadBtn = fileInput.parentNode.querySelector('.upload-btn');

                // If still not found, look for any button within the same cell/tr whose text contains 'uploaded'
                if (!uploadBtn) {
                    const parentCell = fileInput.closest('td') || fileInput.parentNode;
                    if (parentCell) {
                        uploadBtn = Array.from(parentCell.querySelectorAll('button')).find(b => /uploaded/i.test((b.textContent||'').trim()));
                    }
                }

                if (!uploadBtn) {
                    const tr = fileInput.closest('tr');
                    if (tr) uploadBtn = Array.from(tr.querySelectorAll('button')).find(b => /uploaded/i.test((b.textContent||'').trim()));
                }

                // Fallback: find any upload button globally matching data-row or text
                if (!uploadBtn) {
                    uploadBtn = Array.from(document.querySelectorAll('button')).find(b => {
                        const txt = (b.textContent||'').trim();
                        return (b.classList && b.classList.contains('upload-btn') && b.getAttribute('data-row') === k) || /uploaded/i.test(txt);
                    });
                }

                if (uploadBtn) {
                    uploadBtn.textContent = 'Upload';
                    uploadBtn.className = 'upload-btn bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold px-3 py-1 rounded w-full transition';
                    uploadBtn.disabled = false;
                    uploadBtn.removeAttribute('disabled');
                }

                // Clear any checkmark or file-check indicators
                const checkEls = Array.from(document.querySelectorAll(`.checkmark[data-row="${k}"], .file-check[data-row="${k}"], .file-check, .checkmark`));
                checkEls.forEach(el => {
                    try { el.classList.add('hidden'); } catch(e) {}
                });
            } catch(e){}
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', doRemove);
        }

        // When user selects a file, update preview and store a temporary object URL
        fileInput.addEventListener('change', function(e){
            const f = fileInput.files && fileInput.files[0];
            if (!f) return setPreview(null, null);
            const filename = f.name;
            // Use a blob url for immediate preview; upload logic remains with page scripts
            const blobUrl = URL.createObjectURL(f);
            setPreview(filename, blobUrl);
            // Also save to uploadedFiles so view works before upload
            const k = keyFor(fileInput);
            if (k) window.uploadedFiles[k] = blobUrl;
            // If draftFileUrls exists and user replaces file, remove any draft URL mapping
            if (k && window.draftFileUrls && window.draftFileUrls[k]) {
                delete window.draftFileUrls[k];
            }
        });
    }

    function enhanceAll(){
        const inputs = Array.from(document.querySelectorAll('input[type=file]'));
        // Note: some templates use slightly different attribute ordering, so select both common patterns
        const fileInputs = Array.from(document.querySelectorAll('input[type=file]'));
        fileInputs.forEach(createPreviewForInput);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceAll);
    } else {
        enhanceAll();
    }

    // Periodically sync draft file URLs into enhanced previews so loaded drafts show View/Replace
    (function startDraftSync(){
        const processed = new Set();
        function syncOnce(){
            if (!window.draftFileUrls) return;
            // Set previews for keys present
            Object.keys(window.draftFileUrls).forEach(key => {
                const url = window.draftFileUrls[key];
                if (!url) return;
                // find input by data-row, name, or id
                let input = document.querySelector(`input[data-row="${key}"]`);
                if (!input) input = document.querySelector(`input[name="${key}"]`);
                if (!input) input = document.getElementById(key);
                if (input) {
                    // ensure it's enhanced
                    if (!input._fpEnhanced) createPreviewForInput(input);
                    // call setter if available
                    if (typeof input._fpSetPreview === 'function') {
                        const fn = (url.split('/').pop() || '').split('?')[0];
                        input._fpSetPreview(fn, url);
                        processed.add(key);
                    }
                }
            });

            // Clear previews for inputs whose draft URL was removed
            document.querySelectorAll('input[type=file]').forEach(input => {
                const k = (input.getAttribute('data-row') || input.name || input.id || input.dataset.fpKey || null);
                if (!k) return;
                const hasDraft = window.draftFileUrls && Object.prototype.hasOwnProperty.call(window.draftFileUrls, k);
                const filesPresent = input.files && input.files.length > 0;
                if (!hasDraft && !filesPresent) {
                    // No draft, no selected file -> clear preview and uploadedFiles
                    if (input._fpSetPreview) input._fpSetPreview(null, null);
                    if (window.uploadedFiles && window.uploadedFiles[k]) delete window.uploadedFiles[k];
                }
            });
        }
        // run periodically to catch draft loads that happen after DOMContentLoaded
        setInterval(syncOnce, 1200);
    })();

    // Expose enhancer for dynamic pages
    window.fpEnhanceAll = enhanceAll;

})();
