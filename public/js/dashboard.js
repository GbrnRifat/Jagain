let allPasswords = [];

const user_id = localStorage.getItem('user_id');

async function loadPasswords() {
  if (!user_id) {
    alert('User not logged in!');
    return;
  }

  const response = await fetch(`http://localhost:5000/api/stored-passwords/user/${user_id}`);
  const passwords = await response.json();
  allPasswords = passwords;

  const grouped = {};
  passwords.forEach(item => {
    if (!grouped[item.etalase]) grouped[item.etalase] = [];
    grouped[item.etalase].push(item);
  });

  document.getElementById('password-count').innerText = `${passwords.length} passwords.`;

  const container = document.getElementById('passwords-container');
  container.innerHTML = '';

  for (const [etalase, items] of Object.entries(grouped)) {
    let html = `
      <div class="mb-4">
        <h6 class="d-flex justify-content-between align-items-center">
          <span style="padding: 5px;border-radius: 5px;background: white;color: black;font-weight: bold;">${etalase}</span>
          <small>${items.length}</small>
        </h6>
    `;

    items.forEach(item => {
      html += `
        <div class="password-item d-flex justify-content-between align-items-center">
          <span onclick="showEditForm(${item.stored_id}, '${item.entry_name}', '${item.entry_username}', '${item.etalase}', '${item.entry_password}')">
            ${item.entry_name}
          </span>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="copyToClipboard('${item.entry_password}')">
              <i class="fas fa-copy"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deletePassword(${item.stored_id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML += html;
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Password copied!'))
    .catch(err => console.error('Failed to copy text:', err));
}

function showEditForm(id, name, username, etalase, password) {
  document.getElementById('edit_stored_id').value = id;
  document.getElementById('edit_entry_name').value = name;
  document.getElementById('edit_entry_username').value = username;
  document.getElementById('edit_etalase').value = etalase;
  document.getElementById('edit_entry_password').value = password;
  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

document.getElementById('edit-password-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const id = document.getElementById('edit_stored_id').value;

  const updated = {
    entry_name: document.getElementById('edit_entry_name').value,
    entry_username: document.getElementById('edit_entry_username').value,
    etalase: document.getElementById('edit_etalase').value,
    entry_password: document.getElementById('edit_entry_password').value
  };

  const response = await fetch(`http://localhost:5000/api/stored-passwords/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  });

  if (response.ok) {
    alert('Password updated!');
    closeModal();
    loadPasswords();
  } else {
    alert('Failed to update password!');
  }
});

async function deletePassword(id) {
  if (!confirm('Are you sure you want to delete this password?')) return;
  const response = await fetch(`http://localhost:5000/api/stored-passwords/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    alert('Password deleted!');
    loadPasswords();
  } else {
    alert('Failed to delete!');
  }
}

window.onload = loadPasswords;

async function loadHeaderInfo() {
  if (!user_id) {
    alert("User ID not found.");
    return;
  }

  const res = await fetch(`http://localhost:5000/api/dashboard-info/${user_id}`);
  const data = await res.json();

  document.getElementById("greeting").textContent = `Hello, ${data.name}`;
  document.getElementById("password-count").textContent = `You have ${data.passwordCount} passwords.`;
  
}

loadHeaderInfo();
function renderPasswords(filteredPasswords) {
  const grouped = {};
  filteredPasswords.forEach(item => {
    if (!grouped[item.etalase]) grouped[item.etalase] = [];
    grouped[item.etalase].push(item);
  });

  const container = document.getElementById('passwords-container');
  container.innerHTML = '';

  for (const [etalase, items] of Object.entries(grouped)) {
    let html = `
      <div class="mb-4">
        <h6 class="d-flex justify-content-between align-items-center">
          <span style="padding: 5px;border-radius: 5px;background: white;color: black;font-weight: bold;">${etalase}</span>
          <small>${items.length}</small>
        </h6>
    `;

    items.forEach(item => {
      html += `
        <div class="password-item d-flex justify-content-between align-items-center">
          <span onclick="showEditForm(${item.stored_id}, '${item.entry_name}', '${item.entry_username}', '${item.etalase}', '${item.entry_password}')">
            ${item.entry_name}
          </span>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="copyToClipboard('${item.entry_password}')">
              <i class="fas fa-copy"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deletePassword(${item.stored_id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML += html;
  }
}

document.getElementById('search-input').addEventListener('input', function (e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = allPasswords.filter(p => 
    p.entry_name.toLowerCase().includes(keyword) ||
    p.entry_username.toLowerCase().includes(keyword) ||
    p.etalase.toLowerCase().includes(keyword)
  );
  renderPasswords(filtered);
});


