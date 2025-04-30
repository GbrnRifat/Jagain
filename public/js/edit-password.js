const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`http://localhost:5000/api/stored-passwords/${id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('password_id').value = data.id;
    document.getElementById('entry_name').value = data.entry_name;
    document.getElementById('entry_username').value = data.entry_username;
    document.getElementById('etalase').value = data.etalase;
    document.getElementById('entry_password').value = data.entry_password;
  });

document.getElementById('edit-password-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const payload = {
    entry_name: entry_name.value,
    entry_username: entry_username.value,
    etalase: etalase.value,
    entry_password: entry_password.value
  };

  const response = await fetch(`http://localhost:5000/api/stored-passwords/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    alert('Berhasil diupdate!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Gagal update.');
  }
});