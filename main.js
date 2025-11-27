/* === SCRIPT GLOBAL DO PORTFÓLIO (VERSÃO ESTÁVEL CORRIGIDA) === */

document.addEventListener('DOMContentLoaded', () => {

    // 1. VOLTAMOS A USAR O <body>
    const body = document.body;
    let darkModeToggle;

    // --- Funções do Dark Mode (USANDO O BODY) ---
    // Elas estão DENTRO do DOMContentLoaded, assim como o botão
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    // --- Função para Injetar o Botão de Voltar (Sua versão) ---
    function injetarBotaoVoltar() {
        const headerContainer = document.querySelector('.main-header .container');

        if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
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

    // --- Função para Injetar o Botão de Dark Mode ---
    function injetarBotaoDarkMode() {
        if (document.getElementById('darkModeToggle')) return;

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
            if (body.classList.contains('dark-mode')) {
                disableDarkMode(); // <-- Agora vai achar
            } else {
                enableDarkMode(); // <-- Agora vai achar
            }
        });
    }

    // --- Lógica do Modal do Currículo (CORRIGIDO) ---
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

    // O 'keydown' e 'click' SÓ SÃO ADICIONADOS SE O MODAL EXISTIR
    if (cvOverlay) {
        cvOverlay.addEventListener('click', (event) => {
            if (event.target === cvOverlay) {
                cvOverlay.classList.remove('visible');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && cvOverlay.classList.contains('visible')) {
                cvOverlay.classList.remove('visible');
            }
        });
    }

    // --- FUNÇÃO: INJETAR PROJETOS RECOMENDADOS ---
    async function injetarProjetosRecomendados() {
        const currentPage = window.location.pathname;
        const footer = document.querySelector('#contact');

        if ((currentPage.endsWith('/') || currentPage.endsWith('index.html')) || !footer) {
            return;
        }

        try {
            const response = await fetch('index.html');
            if (!response.ok) return;
            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const projectCards = doc.querySelectorAll('#projects .project-card');

            let projects = [];
            projectCards.forEach(card => {
                const link = card;
                const img = card.querySelector('img');

                if (link && img) {
                    const projectPath = link.getAttribute('href');
                    if (projectPath && !currentPage.endsWith(projectPath)) {
                        projects.push({
                            href: projectPath,
                            imgSrc: img.getAttribute('src'),
                            alt: img.getAttribute('alt')
                        });
                    }
                }
            });

            if (projects.length > 0) {
                projects.sort(() => 0.5 - Math.random());
                const projectsToShow = projects.slice(0, 2);
                const section = document.createElement('section');
                section.className = 'recommended-projects';

                let projectsHTML = '<div class="container">';
                projectsHTML += '<h2 class="section-title">Outros Projetos</h2>';
                projectsHTML += '<div class="project-grid">';

                projectsToShow.forEach(project => {
                    projectsHTML += `
                        <a href="${project.href}" class="project-card" aria-label="Ver projeto">
                            <div class="project-image-wrapper">
                                <img src="${project.imgSrc}" alt="${project.alt}">
                            </div>
                        </a>
                    `;
                });

                projectsHTML += '</div></div>';
                section.innerHTML = projectsHTML;
                footer.before(section);
            }
        } catch (error) {
            console.error('Erro ao carregar projetos recomendados:', error);
        }
    }

    // --- LÓGICA DO MODAL DE IMAGEM (ZOOM) ---
    var modal = document.getElementById("imageModal");

    if (modal) {
        var modalImg = document.getElementById("modalImage");
        var images = document.querySelectorAll(".zoomable-image");
        var span = document.getElementsByClassName("modal-close")[0];

        var currentScale = 1;
        var currentX = 0;
        var currentY = 0;
        var isDragging = false;
        var startX, startY;
        var baseImgWidth, baseImgHeight;

        function applyTransform() {
            modalImg.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
        }

        function clampPan() {
            const viewportWidth = modal.clientWidth;
            const viewportHeight = modal.clientHeight;
            const zoomedWidth = baseImgWidth * currentScale;
            const zoomedHeight = baseImgHeight * currentScale;

            const boundaryX = Math.max(0, (zoomedWidth - viewportWidth) / 2);
            const boundaryY = Math.max(0, (zoomedHeight - viewportHeight) / 2);

            currentX = Math.max(-boundaryX, Math.min(boundaryX, currentX));
            currentY = Math.max(-boundaryY, Math.min(boundaryY, currentY));
        }

        images.forEach(function (img) {
            img.onclick = function () {
                modal.style.display = "block";
                modalImg.src = this.src;

                modalImg.onload = () => {
                    baseImgWidth = modalImg.offsetWidth;
                    baseImgHeight = modalImg.offsetHeight;
                    currentScale = 1;
                    currentX = 0;
                    currentY = 0;
                    applyTransform();
                    modalImg.addEventListener('wheel', handleZoom);
                    modalImg.addEventListener('mousedown', handleMouseDown);
                    modalImg.addEventListener('mouseup', handleMouseUp);
                    modalImg.addEventListener('mousemove', handleMouseMove);
                    modalImg.addEventListener('mouseleave', handleMouseUp);
                }
            }
        });

        function closeModal() {
            modal.style.display = "none";
            modalImg.removeEventListener('wheel', handleZoom);
            modalImg.removeEventListener('mousedown', handleMouseDown);
            modalImg.removeEventListener('mouseup', handleMouseUp);
            modalImg.removeEventListener('mousemove', handleMouseMove);
            modalImg.removeEventListener('mouseleave', handleMouseUp);
            modalImg.onload = null;
        }

        span.onclick = closeModal;
        modal.onclick = function (event) {
            if (event.target == modal) {
                closeModal();
            }
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        function handleZoom(event) {
            event.preventDefault();
            const scaleFactor = 1.1;

            if (event.deltaY < 0) { // Zoom in
                currentScale *= scaleFactor;
            } else { // Zoom out
                currentScale /= scaleFactor;
            }
            currentScale = Math.max(1, Math.min(currentScale, 5));

            if (currentScale === 1) {
                currentX = 0;
                currentY = 0;
            }

            clampPan();
            applyTransform();
        }

        function handleMouseDown(event) {
            if (currentScale === 1) return; // Corrigido de 'return.'

            isDragging = true;
            modalImg.classList.add('dragging');
            startX = event.clientX - currentX;
            startY = event.clientY - currentY;
            event.preventDefault();
        }

        function handleMouseUp() {
            isDragging = false;
            modalImg.classList.remove('dragging');
        }

        function handleMouseMove(event) {
            if (!isDragging) return;
            event.preventDefault();
            currentX = event.clientX - startX;
            currentY = event.clientY - startY;

            clampPan();
            applyTransform();
        }
    } // Fim do 'if (modal)'


    // --- INICIALIZAÇÃO DE TUDO ---

    injetarBotaoVoltar();
    injetarBotaoDarkMode();
    injetarProjetosRecomendados();

    // SCRIPT DE VERIFICAÇÃO INICIAL (O original, que causa o "atraso")
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

})

/* --- ANIMAÇÃO DE SCROLL (REVEAL) --- */
document.addEventListener("DOMContentLoaded", () => {

    // Configuração do Observador
    const observerOptions = {
        root: null,      // Observa a viewport (tela)
        rootMargin: '0px 0px -250px 0px',    
        threshold: 0.1   // Dispara quando 10% do elemento aparecer
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que faz aparecer
                entry.target.classList.add('scroll-visible');

                // (Opcional) Para de observar depois que apareceu uma vez
                // Se quiser que a animação repita ao subir e descer, remova a linha abaixo
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona tudo que tem a classe .scroll-hidden e manda vigiar
    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});     