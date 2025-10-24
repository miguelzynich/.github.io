/* === SCRIPT GLOBAL DO PORTFÓLIO === */

// Espera o conteúdo da página carregar antes de executar qualquer script
document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    let darkModeToggle; // Vamos declarar o botão aqui

    // --- Funções do Dark Mode ---
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    function injetarBotaoVoltar() {
        const headerContainer = document.querySelector('.main-header .container');
        
        if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
            return; 
        }

        if (headerContainer) {
            const backButton = document.createElement('a');
            backButton.href = 'index.html';
            backButton.className = 'back-button';
            backButton.setAttribute('aria-label', 'Voltar para a página inicial');
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-arrow-left';
            backButton.appendChild(icon);
            
            headerContainer.prepend(backButton);
        }
    }

    function injetarBotaoDarkMode() {
        const button = document.createElement('button');
        button.id = 'darkModeToggle';
        button.className = 'dark-mode-button';
        button.setAttribute('aria-label', 'Alternar Tema');
        
        const iconSun = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconSun.classList.add('icon-sun');
        iconSun.setAttribute('viewBox', '0 0 24 24');
        iconSun.setAttribute('fill', 'none');
        iconSun.setAttribute('stroke', 'currentColor');
        iconSun.setAttribute('stroke-width', '2');
        iconSun.setAttribute('stroke-linecap', 'round');
        iconSun.setAttribute('stroke-linejoin', 'round');
        iconSun.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        
        const iconMoon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconMoon.classList.add('icon-moon');
        iconMoon.setAttribute('viewBox', '0 0 24 24');
        iconMoon.setAttribute('fill', 'none');
        iconMoon.setAttribute('stroke', 'currentColor');
        iconMoon.setAttribute('stroke-width', '2');
        iconMoon.setAttribute('stroke-linecap', 'round');
        iconMoon.setAttribute('stroke-linejoin', 'round');
        iconMoon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

        button.appendChild(iconSun);
        button.appendChild(iconMoon);
        
        document.body.appendChild(button);
        
        darkModeToggle = button;

        darkModeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    // --- Lógica do Modal do Currículo ---
    const openCvBtn = document.getElementById('openCvModalBtn');
    const closeCvBtn = document.getElementById('closeCvModalBtn');
    const cvOverlay = document.getElementById('cvModalOverlay');

    if (openCvBtn && cvOverlay) {
        openCvBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            cvOverlay.classList.add('visible');
        });
    }

    if (closeCvBtn && cvOverlay) {
        closeCvBtn.addEventListener('click', () => {
            cvOverlay.classList.remove('visible');
        });
    }

    if (cvOverlay) {
        cvOverlay.addEventListener('click', (event) => {
            if (event.target === cvOverlay) {
                cvOverlay.classList.remove('visible');
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cvOverlay && cvOverlay.classList.contains('visible')) {
            cvOverlay.classList.remove('visible');
        }
    }); 

    
    injetarBotaoVoltar();
    injetarBotaoDarkMode();

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});


/* === SCRIPT GLOBAL DO PORTFÓLIO === */

document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    let darkModeToggle; 

    // --- Funções do Dark Mode ---
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    // --- Função para Injetar o Botão de Voltar ---
    function injetarBotaoVoltar() {
        const headerContainer = document.querySelector('.main-header .container');
        
        if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
            return;
        }

        if (headerContainer && typeof(FontAwesome) !== 'undefined') {
            const backButton = document.createElement('a');
            backButton.href = 'index.html';
            backButton.className = 'back-button';
            backButton.setAttribute('aria-label', 'Voltar para a página inicial');
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-arrow-left';
            backButton.appendChild(icon);
            
            headerContainer.prepend(backButton);
        }
    }

    // --- Função para Injetar o Botão de Dark Mode ---
    function injetarBotaoDarkMode() {
        const button = document.createElement('button');
        button.id = 'darkModeToggle';
        button.className = 'dark-mode-button';
        button.setAttribute('aria-label', 'Alternar Tema');
        
        const iconSun = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconSun.classList.add('icon-sun');
        iconSun.setAttribute('viewBox', '0 0 24 24');
        iconSun.setAttribute('fill', 'none');
        iconSun.setAttribute('stroke', 'currentColor');
        iconSun.setAttribute('stroke-width', '2');
        iconSun.setAttribute('stroke-linecap', 'round');
        iconSun.setAttribute('stroke-linejoin', 'round');
        iconSun.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        
        const iconMoon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconMoon.classList.add('icon-moon');
        iconMoon.setAttribute('viewBox', '0 0 24 24');
        iconMoon.setAttribute('fill', 'none');
        iconMoon.setAttribute('stroke', 'currentColor');
        iconMoon.setAttribute('stroke-width', '2');
        iconMoon.setAttribute('stroke-linecap', 'round');
        iconMoon.setAttribute('stroke-linejoin', 'round');
        iconMoon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

        button.appendChild(iconSun);
        button.appendChild(iconMoon);
        
        document.body.appendChild(button);
        
        darkModeToggle = button; 

        darkModeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    // --- Lógica do Modal do Currículo (da página index.html) ---
    const openCvBtn = document.getElementById('openCvModalBtn');
    const closeCvBtn = document.getElementById('closeCvModalBtn');
    const cvOverlay = document.getElementById('cvModalOverlay');

    if (openCvBtn && cvOverlay) {
        openCvBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            cvOverlay.classList.add('visible');
        });
    }

    if (closeCvBtn && cvOverlay) {
        closeCvBtn.addEventListener('click', () => {
            cvOverlay.classList.remove('visible');
        });
    }

    if (cvOverlay) {
        cvOverlay.addEventListener('click', (event) => {
            if (event.target === cvOverlay) {
                cvOverlay.classList.remove('visible');
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cvOverlay && cvOverlay.classList.contains('visible')) {
            cvOverlay.classList.remove('visible');
        }
    }); 

    // --- NOVA FUNÇÃO: INJETAR PROJETOS RECOMENDADOS ---
    async function injetarProjetosRecomendados() {
        const currentPage = window.location.pathname;
        const footer = document.querySelector('#contact');

        // 1. Só executa se NÃO estiver na home e se o footer existir
        if ((currentPage.endsWith('/') || currentPage.endsWith('index.html')) || !footer) {
            return;
        }

        try {
            // 2. Busca o conteúdo da index.html
            const response = await fetch('index.html');
            if (!response.ok) return; // Falha silenciosamente se não encontrar a home
            const htmlText = await response.text();

            // 3. Parseia o HTML e encontra os projetos
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const projectCards = doc.querySelectorAll('.project-card');

            let projects = [];
            projectCards.forEach(card => {
                const link = card.querySelector('a');
                const img = card.querySelector('img');
                
                if (link && img) {
                    const projectPath = new URL(link.href).pathname;
                    // 4. Filtra o projeto da PÁGINA ATUAL
                    if (!currentPage.endsWith(projectPath)) {
                        projects.push({
                            href: link.getAttribute('href'), // Mantém o link relativo
                            imgSrc: img.getAttribute('src'),
                            alt: img.getAttribute('alt')
                        });
                    }
                }
            });

            // 5. Se houver outros projetos para mostrar...
            if (projects.length > 0) {
                // 6. Embaralha e seleciona 2 projetos
                projects.sort(() => 0.5 - Math.random());
                const projectsToShow = projects.slice(0, 2);

                // 7. Cria o HTML da nova seção
                const section = document.createElement('section');
                section.className = 'recommended-projects'; // Classe para o CSS
                
                let projectsHTML = '<div class="container">';
                projectsHTML += '<h2 class="section-title">Outros Projetos</h2>';
                projectsHTML += '<div class="project-grid">'; // Reutiliza a classe do grid
                
                projectsToShow.forEach(project => {
                    projectsHTML += `
                        <div class="project-card">
                            <a href="${project.href}">
                                <img src="${project.imgSrc}" alt="${project.alt}">
                            </a>
                        </div>
                    `;
                });
                
                projectsHTML += '</div></div>';
                section.innerHTML = projectsHTML;

                // 8. Injeta a nova seção antes do footer
                footer.before(section);
            }
        } catch (error) {
            console.error('Erro ao carregar projetos recomendados:', error);
        }
    }

    // --- INICIALIZAÇÃO ---
    injetarBotaoVoltar();
    injetarBotaoDarkMode();
    injetarProjetosRecomendados(); // Chama a nova função

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});