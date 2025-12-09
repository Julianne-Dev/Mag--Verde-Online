document.addEventListener('DOMContentLoaded', () => {
    
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    
    if (carouselContainer && prevButton && nextButton && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function moveToSlide(slideIndex) {
            if (slideIndex >= totalSlides) {
                slideIndex = 0;
            } else if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            }
            const offset = -slideIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
            currentSlide = slideIndex;
        }

        nextButton.addEventListener('click', () => {
            moveToSlide(currentSlide + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentSlide - 1);
        });

        moveToSlide(0);
    }

   

    function checkLoginState() {
        const isAdmin = sessionStorage.getItem('isAdminLoggedIn') === 'true';
        const loginButton = document.querySelector('.btn-login');

        if (isAdmin) {
            // Se estiver logado, adiciona a classe ao body para mostrar os botões de admin
            document.body.classList.add('admin-view');

            // Altera o botão de Login para Logout
            if (loginButton) {
                loginButton.textContent = 'Logout';
                loginButton.href = '#'; // Previne a navegação
                
                // Remove e adiciona o listener para evitar múltiplos eventos de clique
                const newLoginButton = loginButton.cloneNode(true);
                loginButton.parentNode.replaceChild(newLoginButton, loginButton);

                newLoginButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    sessionStorage.removeItem('isAdminLoggedIn');
                    alert('Você foi desconectado.');
                    window.location.reload(); // Recarrega a página para atualizar a visualização
                });
            }
        }
    }

    const loginForm = document.querySelector('.login-area form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const userField = document.getElementById('usuario');
            const passwordField = document.getElementById('senha');
            const username = userField.value;
            const password = passwordField.value;

            if (username === 'admin' && password === 'admin') {
                // Armazena o estado de login na sessão do navegador
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                window.location.href = 'index.html'; 
            } else {
                alert('Usuário ou senha inválidos!');
            }
        });
    }

    
    checkLoginState();

    
    function setupAdminActions(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.addEventListener('click', (event) => {
          
            if (event.target.classList.contains('btn-excluir')) {
                const confirmation = confirm('Tem certeza que deseja excluir este evento?');
                if (confirmation) {
                  
                    const eventItem = event.target.closest('.card-item, li');
                    if (eventItem) {
                        eventItem.remove();
                    }
                }
            }

           
            if (event.target.classList.contains('btn-editar')) {
                const eventItem = event.target.closest('.card-item, li');
                if (eventItem) {
                    const titleElement = eventItem.querySelector('h4');
                    const textElement = eventItem.querySelector('p, span');

                    const newTitle = prompt('Editar título/nome do evento:', titleElement ? titleElement.innerText : '');
                    const newText = prompt('Editar descrição do evento:', textElement.innerText);

                    if (titleElement && newTitle !== null) titleElement.innerText = newTitle;
                    if (newText !== null) textElement.innerText = newText;
                }
            }
        });
    }

    setupAdminActions('#proximos-eventos');
    setupAdminActions('#arquivo-eventos');
});
