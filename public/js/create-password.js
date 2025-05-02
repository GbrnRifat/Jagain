document.getElementById('create-password-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    user_id: parseInt(localStorage.getItem('user_id')),  
    entry_name: document.getElementById('entry_name').value,
    entry_username: document.getElementById('entry_username').value,
    etalase: document.getElementById('etalase').value,
    entry_password: document.getElementById('entry_password').value
  };
  console.log("user_id:", localStorage.getItem('user_id'));

  const response = await fetch('http://localhost:5000/api/stored-passwords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert('Password berhasil disimpan!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Gagal menyimpan password!');
  }
});