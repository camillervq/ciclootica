// Configuração do Login com Google
function handleCredentialResponse(response) {
    // Enviar o token para seu backend para verificação
    const token = response.credential;
    
    fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login bem-sucedido
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/minha-conta';
            
            // Enviar e-mail de confirmação
            fetch('/send-confirmation-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.user.email }),
            });
        } else {
            alert('Falha no login: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao fazer login com Google');
    });
}

// Configuração do Modal de Login
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (loginBtn && loginModal && closeModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
        });
        
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }
    
    // Verificar se o usuário já está logado
    const user = localStorage.getItem('user');
    if (user) {
        // Atualizar UI para mostrar que está logado
        const userIcon = document.querySelector('.user-icon');
        if (userIcon) {
            userIcon.textContent = '✅';
        }
    }
});
