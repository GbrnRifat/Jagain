const user_id = localStorage.getItem("user_id");

async function loadForm() {
  const res = await fetch(`http://localhost:5000/api/users/${user_id}`);
  const user = await res.json();
  document.getElementById("edit_username").value = user.name;
  document.getElementById("edit_email").value = user.email;
  document.getElementById("edit_password").value = user.password;
}

document.getElementById("edit-profile-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updated = {
    name: document.getElementById("edit_username").value,
    email: document.getElementById("edit_email").value,
    password: document.getElementById("edit_password").value
  };

  const res = await fetch(`http://localhost:5000/api/users/${user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updated)
  });

  if (res.ok) {
    alert("Profile updated!");
    window.location.href = "dashboard.html";
  } else {
    alert("Update failed.");
  }
});

document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("edit_password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.innerHTML = type === "password" ? "<i class='fas fa-eye'></i>" : "<i class='fas fa-eye-slash'></i>";
});

loadForm();

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

fetch('/api/users/update-profile', {
method: 'PUT',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
user_id: localStorage.getItem('user_id'),
name: document.getElementById('name').value,
email: document.getElementById('email').value,
password: document.getElementById('password').value
})
})
.then(response => response.json())
.then(data => {
alert(data.message);
});


