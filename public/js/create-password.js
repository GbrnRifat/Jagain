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

const user_id = localStorage.getItem("user_id");
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