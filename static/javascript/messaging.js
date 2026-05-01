
// messaging.js (Supabase version)
// Uses Supabase to store and fetch notifications for all users

const supabase = window.supabase.createClient(
  "https://cbhodgwaazmjszkujrti.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaG9kZ3dhYXptanN6a3VqcnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzY4NzEsImV4cCI6MjA3MTI1Mjg3MX0.sBRdfiWJJmZtLWsHCcNyxm1VcwkGwZWsIeeMlS49XTU"
);

function getUsername() {
  return localStorage.getItem('pmc_username') || 'User';
}

function getRole() {
  if (window.location.href.includes('as=hod')) return 'HOD';
  if (window.location.href.includes('iqac')) return 'IQAC';
  if (window.location.href.includes('faculty')) return 'Faculty';
  if (window.location.href.includes('principal')) return 'Principal';
  if (window.location.href.includes('management')) return 'Management';
  return 'User';
}

async function fetchMessages() {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Supabase fetch error:', error);
  }
  if (!error) renderMessages(data);
}

async function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;
  const { data, error, status, statusText } = await supabase.from('notifications').insert([
    {
      message: text,
      sender: getUsername(),
      role: getRole(),
      audience: 'all'
    }
  ]);
  const errorDivId = 'messageErrorDiv';
  let errorDiv = document.getElementById(errorDivId);
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = errorDivId;
    errorDiv.className = 'text-red-600 font-semibold mb-2';
    const modal = document.getElementById('messagingModal');
    if (modal) {
      modal.querySelector('.flex.gap-2').before(errorDiv);
    }
  }
  if (error) {
    console.error('Supabase insert error:', error);
    errorDiv.textContent = `Failed to send message: ${error.message || error}
Status: ${status || ''} ${statusText || ''}`;
  } else if (data && data.length > 0) {
    errorDiv.className = 'text-green-600 font-semibold mb-2';
    errorDiv.textContent = 'Message posted successfully!';
  } else {
    errorDiv.textContent = '';
  }
  input.value = '';
  fetchMessages();
}

async function deleteMessage(id) {
  // Only IQAC, Principal, Management can delete
  const role = getRole();
  if (["IQAC","Principal","Management"].includes(role)) {
    await supabase.from('notifications').delete().eq('id', id);
    fetchMessages();
  }
}

async function clearMessages() {
  const role = getRole();
  if (["IQAC","Principal","Management"].includes(role)) {
    // Bulk delete all
    const { data } = await supabase.from('notifications').select('id');
    if (data && data.length > 0) {
      const ids = data.map(m => m.id);
      await supabase.from('notifications').delete().in('id', ids);
      fetchMessages();
    }
  }
}

function canDeleteMessage(msg) {
  const role = getRole();
  // Only IQAC, Principal, Management can delete
  return ["IQAC","Principal","Management"].includes(role);
}

function renderMessages(messages) {
  const list = document.getElementById('messageList');
  if (!list) return;
  list.innerHTML = '';
  (messages || []).forEach(m => {
    const div = document.createElement('div');
    div.className = 'mb-2 p-2 rounded bg-gray-100 flex justify-between items-center';
    div.innerHTML = `<div><span class='font-bold text-pmcPurple'>${m.role}:</span> <span style='color:#111'>${m.message}</span></div>`;
    if (canDeleteMessage(m)) {
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.title = 'Delete';
      delBtn.className = 'ml-2 text-red-500 hover:text-red-700 text-lg';
      delBtn.onclick = () => deleteMessage(m.id);
      div.appendChild(delBtn);
    }
    list.appendChild(div);
  });
  list.scrollTop = list.scrollHeight;
}

function openMessagingModal() {
  document.getElementById('messagingModal').classList.remove('hidden');
  fetchMessages();
}

function closeMessagingModal() {
  document.getElementById('messagingModal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  // Always fetch messages if modal is already open (e.g. after reload)
  const modal = document.getElementById('messagingModal');
  if (modal && !modal.classList.contains('hidden')) {
    fetchMessages();
  }
});
