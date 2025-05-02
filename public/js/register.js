    document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password })
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Register failed');
      })
      .then(data => {
        window.location.href = 'login.html';
      })
      .catch(err => {
        document.getElementById('message').textContent = 'Register failed';
      });
    });