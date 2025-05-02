document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user_id) {
        console.log("Login successful. User ID:", data.user_id);
        localStorage.setItem('user_id', data.user_id);
        window.location.href = 'dashboard.html';
      } else {
        throw new Error(data.message || 'Invalid login');
      }
    })
    .catch(err => {
      document.getElementById('message').textContent = err.message || 'Login failed';
    });
  });