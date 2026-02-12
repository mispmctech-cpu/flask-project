// Reusable draft system for institution forms
// Usage: initInstitutionDraft({formId, draftTable, rows, bucket, fileFieldPrefix, supabaseClient, formType})
(function(){
  async function uploadFileToStorage(supabaseClient, file, path, bucket){
    if(!file) return null;
    const { data, error } = await supabaseClient.storage.from(bucket).upload(path, file, { upsert: true });
    if(error) throw error;
    const { data: urlData } = supabaseClient.storage.from(bucket).getPublicUrl(path);
    return urlData.publicUrl;
  }

  function showDraftPopupInternal(modalId, month){
    const modal = document.getElementById(modalId);
    if(!modal) return;
    const info = modal.querySelector('#draftMonthInfo');
    if(info) info.textContent = month || 'Unknown';
    modal.classList.add('show');
  }

  async function initInstitutionDraft(config){
    const {
      formId,
      draftTable,
      rows = 10,
      bucket,
      fileFieldPrefix = 'Upload the scanned file_',
      supabaseClient,
      formType = null,
      modalId = 'draftModal',
      bannerId = 'draftBanner',
      saveBtnId = 'saveDraftBtn'
    } = config;

    if(!formId || !draftTable || !supabaseClient) return;

    window.draftFileUrls = window.draftFileUrls || {};

    async function checkForDraft(){
      const form = document.getElementById(formId);
      if(!form) return;
      const member = form.querySelector('input[name="Portfolio Member Name:"]')?.value || form.querySelector('input[name="Portfolio Member Name"]')?.value;
      if(!member) return;
      let query = supabaseClient.from(draftTable).select('*').eq('Portfolio Member Name', member).order('created_at', { ascending: false }).limit(1);
      if(formType) query = query.eq('form_type', formType);
      const { data: drafts, error } = await query;
      if(error || !drafts || drafts.length === 0) return;
      window.pendingDraft = drafts[0];
      showDraftPopupInternal(modalId, drafts[0].Month);
    }

    function loadDraftData(draft){
      const form = document.getElementById(formId);
      if(!form || !draft) return;
      if(draft.Month){
        const monthSelect = form.querySelector('select[name="Month:"]');
        if(monthSelect) monthSelect.value = draft.Month;
      }
      const draftData = draft.draft_data || {};
      for(let i=1;i<=rows;i++){
        const status = form.querySelector(`select[name=\"Status_${i}\"]`);
        const desc = form.querySelector(`input[name=\"Description_${i}\"]`);
        if(status && draftData[`Status_${i}`]) status.value = draftData[`Status_${i}`];
        if(desc && draftData[`Description_${i}`]) desc.value = draftData[`Description_${i}`];
        if(draftData[`${fileFieldPrefix}${i}`]){
          window.draftFileUrls[i] = draftData[`${fileFieldPrefix}${i}`];
          const check = document.querySelector(`.file-check[data-row=\"${i}\"]`);
          if(check) check.classList.remove('hidden');
        }
      }
      const banner = document.getElementById(bannerId);
      if(banner){ banner.classList.remove('hidden'); setTimeout(()=>banner.classList.add('hidden'),5000); }
    }

    async function saveAsDraft(){
      const form = document.getElementById(formId);
      if(!form) return;
      const formData = new FormData(form);
      const portfolio = formData.get('Portfolio Name:') || formData.get('Portfolio Name');
      const member = formData.get('Portfolio Member Name:') || formData.get('Portfolio Member Name');
      const month = formData.get('Month:') || formData.get('Month');
      if(!member || !month){ alert('Please fill in Portfolio Member Name and Month to save as draft'); return; }
      const saveBtn = document.getElementById(saveBtnId);
      const originalText = saveBtn?.innerHTML || 'Save as Draft';
      if(saveBtn){ saveBtn.disabled = true; saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...'; }
      try{
        const draftData = {};
        for(let i=1;i<=rows;i++){
          draftData[`Status_${i}`] = formData.get(`Status_${i}`);
          draftData[`Description_${i}`] = formData.get(`Description_${i}`);
          const check = document.querySelector(`.file-check[data-row=\"${i}\"]`);
          const isUploaded = check && !check.classList.contains('hidden');
          if(isUploaded && window.draftFileUrls[i]){
            draftData[`${fileFieldPrefix}${i}`] = window.draftFileUrls[i];
          } else {
            const fileInput = form.querySelector(`input.file-input[data-row=\"${i}\"]`);
            const file = fileInput && fileInput.files && fileInput.files[0];
            if(file && file.size>0){
              const ts = Date.now();
              const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g,'_');
              const path = `${formId}_draft_${i}_${ts}_${safe}`;
              try{
                draftData[`${fileFieldPrefix}${i}`] = await uploadFileToStorage(supabaseClient, file, path, bucket);
                window.draftFileUrls[i] = draftData[`${fileFieldPrefix}${i}`];
              }catch(err){ console.error('upload error', err); draftData[`${fileFieldPrefix}${i}`] = null; }
            } else { draftData[`${fileFieldPrefix}${i}`] = null; }
          }
        }
        // check existing
        let query = supabaseClient.from(draftTable).select('*').eq('Portfolio Member Name', member).order('created_at', { ascending: false }).limit(1).single();
        if(formType) query = supabaseClient.from(draftTable).select('*').eq('Portfolio Member Name', member).eq('form_type', formType).order('created_at', { ascending: false }).limit(1).single();
        const { data: existing, error: selErr } = await query;
        if(existing){
          const existingData = existing.draft_data || {};
          for(let i=1;i<=rows;i++){ const key = `${fileFieldPrefix}${i}`; if(!draftData[key] && existingData[key]) { draftData[key] = existingData[key]; window.draftFileUrls[i] = existingData[key]; } }
          const { error } = await supabaseClient.from(draftTable).update({"Portfolio Name": portfolio, "Month": month, "draft_data": draftData, "updated_at": new Date().toISOString()}).eq('id', existing.id);
          if(error) throw error;
        } else {
          const payload = { "Portfolio Name": portfolio, "Portfolio Member Name": member, "Month": month, "draft_data": draftData };
          if(formType) payload.form_type = formType;
          const { error } = await supabaseClient.from(draftTable).insert([payload]);
          if(error) throw error;
        }
        if(saveBtn){ saveBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Draft Saved!'; saveBtn.className = 'bg-green-600 text-white'; }
        setTimeout(()=>{ if(saveBtn){ saveBtn.innerHTML = originalText; saveBtn.className = 'bg-blue-600 hover:bg-blue-700 text-white'; saveBtn.disabled = false; } }, 1500);
      }catch(err){ alert('Failed to save draft: '+ err.message); if(saveBtn){ saveBtn.innerHTML = originalText; saveBtn.disabled = false; } }
    }

    // wire up modal handlers
    document.addEventListener('click', function(e){
      if(e.target && e.target.id === 'draftAcceptBtn'){
        document.getElementById(modalId).classList.remove('show');
        if(window.pendingDraft) loadDraftData(window.pendingDraft);
        window.pendingDraft = null;
      }
      if(e.target && e.target.id === 'draftDeclineBtn'){
        document.getElementById(modalId).classList.remove('show');
        window.pendingDraft = null;
      }
    });

    // expose helpers on window for templates
    window.initInstitutionDraft = window.initInstitutionDraft || initInstitutionDraft;
    window._internalLoadDraft = loadDraftData;
    window._internalCheckForDraft = checkForDraft;
    window._internalSaveAsDraft = saveAsDraft;

    // auto-check after short delay
    setTimeout(()=> checkForDraft(), 900);

    // attach save button if exists
    const saveBtn = document.getElementById(saveBtnId);
    if(saveBtn) saveBtn.addEventListener('click', saveAsDraft);

    // return public API
    return { checkForDraft, loadDraftData, saveAsDraft };
  }

  window.initInstitutionDraft = initInstitutionDraft;
})();
