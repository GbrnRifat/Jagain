const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#entry_password");

togglePassword.addEventListener("click", function () {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.innerHTML = type === "password" ? "<i class='fas fa-eye'></i>" : "<i class='fas fa-eye-slash'></i>";
});

document.getElementById('create-password-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    user_id: 1, 
    entry_name: document.getElementById('entry_name').value,
    entry_username: document.getElementById('entry_username').value,
    etalase: document.getElementById('etalase').value,
    entry_password: document.getElementById('entry_password').value
  };

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