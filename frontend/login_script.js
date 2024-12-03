document.addEventListener('DOMContentLoaded', () => {
    // Handle Registration Form Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const data = {
          username: formData.get('username'),
          password: formData.get('password'),
        };
  
        try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            window.location.href = 'login.html'; // Redirect to login page after successful registration
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    }
  
    // Handle Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const data = {
          username: formData.get('username'),
          password: formData.get('password'),
        };
  
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            window.location.href = 'index.html'; // Redirect to the main application page after successful login
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    }
  });
  