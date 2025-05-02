const togglePassword = document.querySelector("#togglePassword");
const displayPassword = document.querySelector("#display_password");

togglePassword.addEventListener("click", function () {
  const type = displayPassword.getAttribute("type") === "password" ? "text" : "password";
  displayPassword.setAttribute("type", type);
  this.innerHTML = type === "password"
    ? "<i class='fas fa-eye'></i>"
    : "<i class='fas fa-eye-slash'></i>";
});

const user_id = localStorage.getItem("user_id");

async function loadUserData() {
if (!user_id) {
alert("User ID not found. Please login.");
return;
}

const res = await fetch(`http://localhost:5000/api/profile/${user_id}`);
const user = await res.json();

document.getElementById("display_username").value = user.name;
document.getElementById("display_email").value = user.email;
document.getElementById("display_password").value = user.password;
}

loadUserData();

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


