// supabase-notifications.js
// Simple notification posting for Supabase

// Load Supabase client
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

async function postNotification() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  const errorDivId = 'notificationErrorDiv';
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
  // Debug: Check Supabase client
  if (!supabase || typeof supabase.from !== 'function') {
    errorDiv.textContent = 'Supabase client not initialized. Check script order and API key.';
    errorDiv.className = 'text-red-600 font-semibold mb-2';
    return;
  }
  if (!text) {
    errorDiv.textContent = 'Message cannot be empty.';
    return;
  }
  try {
    // Use .select() to return inserted row
    const response = await supabase.from('notifications').insert([
      {
        message: text,
        sender: getUsername(),
        role: getRole(),
        audience: 'all',
        created_at: new Date().toISOString()
      }
    ]).select();
    // Show full response and inserted row
    if (response.error) {
      errorDiv.textContent = 'Supabase error: ' + JSON.stringify(response.error, null, 2);
      errorDiv.className = 'text-red-600 font-semibold mb-2';
    } else if (response.data && response.data.length > 0) {
      errorDiv.textContent = 'Notification posted!';
      errorDiv.className = 'text-green-600 font-semibold mb-2';
      input.value = '';
    } else {
      errorDiv.textContent = 'Unknown error. Full response: ' + JSON.stringify(response, null, 2);
      errorDiv.className = 'text-red-600 font-semibold mb-2';
    }
  } catch (e) {
    errorDiv.textContent = 'Exception: ' + e;
    errorDiv.className = 'text-red-600 font-semibold mb-2';
  }
}

// Usage: wire your modal send button to postNotification()
// Fetch and display notifications from Supabase
async function fetchNotifications() {
  const listDiv = document.getElementById('notificationList');
  if (!listDiv) return;
  listDiv.innerHTML = '<span class="text-gray-400">Loading...</span>';
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('id, message, sender, role, created_at, audience')
      .order('created_at', { ascending: false });
    if (error) {
      listDiv.innerHTML = `<span class="text-red-600">Error loading notifications:<br>${error.message || error}<br>Status: ${error.status || ''} ${error.statusText || ''}</span>`;
      return;
    }
    if (!data || data.length === 0) {
      listDiv.innerHTML = '<span class="text-gray-400">No notifications found.</span>';
      return;
    }
    listDiv.innerHTML = '';
    data.forEach(n => {
      if (!n.message) return;
      const div = document.createElement('div');
      div.className = 'mb-2 p-2 rounded bg-gray-100 flex flex-col';
  const localTime = n.created_at ? new Date(n.created_at + 'Z').toLocaleString() : '';
  div.innerHTML = `<span class='font-bold text-pmcPurple'>${n.role}:</span> <span style='color:#111'>${n.message}</span><span class='text-xs text-gray-500'>${n.sender} | ${localTime}</span>`;
      listDiv.appendChild(div);
    });
  } catch (e) {
    listDiv.innerHTML = '<span class="text-red-600">Exception: ' + e + '</span>';
  }
}

// Call fetchNotifications when modal opens
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('messagingModal');
  if (modal) {
    modal.addEventListener('transitionend', () => {
      if (!modal.classList.contains('hidden')) fetchNotifications();
    });
  }
});

// Or call fetchNotifications directly when opening modal
window.openNotificationModal = function() {
  document.getElementById('messagingModal').classList.remove('hidden');
  setTimeout(fetchNotifications, 100); // Ensure DOM is ready
}
// <button onclick="postNotification()">Send</button>
