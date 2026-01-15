document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    let darkModeToggle;

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

    const path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('index.html')) {
        return;
    }

    if (headerContainer) {
        const backButton = document.createElement('a');
        backButton.href = 'index.html'; // Fallback padrão
        backButton.className = 'back-button';
        backButton.setAttribute('aria-label', 'Voltar para a página inicial');

        backButton.addEventListener('click', (e) => {
            if (document.referrer && document.referrer.includes(window.location.hostname)) {
                e.preventDefault(); 
                history.back();     
            }
        });

        const icon = document.createElement('i');
        icon.className = 'fas fa-arrow-left';
        backButton.appendChild(icon);

        headerContainer.prepend(backButton);
    }
}

// Não esqueça de chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', injetarBotaoVoltar);
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

            if (event.deltaY < 0) { 
                currentScale *= scaleFactor;
            } else {
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
            if (currentScale === 1) return; 

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
    } 



    injetarBotaoVoltar();
    injetarBotaoDarkMode();
    injetarProjetosRecomendados();

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

})

document.addEventListener("DOMContentLoaded", () => {

    // Configuração do Observador
    const observerOptions = {
        root: null,     
        rootMargin: '0px 0px -250px 0px',    
        threshold: 0.1   
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona tudo que tem a classe .scroll-hidden e manda vigiar
    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));
})     




document.addEventListener('DOMContentLoaded', () => {
    console.log("Main.js carregado com sucesso!");

    // 1. Pegando os elementos pelo ID
    const btnMenu = document.getElementById('btn-menu-projetos');
    const btnFechar = document.getElementById('btn-fechar-overlay');
    const overlay = document.getElementById('project-overlay');
    const links = document.querySelectorAll('.menu-link');

    // 2. Verificação de Segurança (Debug)
    if (!btnMenu) {
        console.error("ERRO CRÍTICO: Não achei o botão de abrir! Verifique se o ID 'btn-menu-projetos' está no <button> do Header.");
        return; // Para o código aqui se não achar o botão
    }
    
    if (!overlay) {
        console.error("ERRO: Não achei a div do overlay.");
        return;
    }

    function toggleMenu() {
        const estaAberto = overlay.classList.contains('active');
        
        if (estaAberto) {
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Destrava o scroll
        } else {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava o scroll
        }
    }

    btnMenu.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    if (btnFechar) {
        btnFechar.addEventListener('click', toggleMenu);
    }

    links.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});

function injetarBotaoVoltar() {
    const headerContainer = document.querySelector('.main-header .container');
    const path = window.location.pathname;
    
    const isEnglish = path.includes('/en/');

    if (path.endsWith('/') || path.endsWith('index.html')) return;

    if (headerContainer) {
        const backButton = document.createElement('a');
        
        backButton.href = 'index.html'; 
        
        backButton.className = 'back-button';
        
        const labelText = isEnglish ? 'Back to Home' : 'Voltar para a página inicial';
        backButton.setAttribute('aria-label', labelText);

        backButton.innerHTML = '<i class="fas fa-arrow-left"></i>'; 

        backButton.addEventListener('click', (e) => {
            if (document.referrer && document.referrer.includes(window.location.hostname)) {
                e.preventDefault();
                history.back();
            }
        });

        headerContainer.prepend(backButton);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn-load-more-projects');
    const grid = document.querySelector('.project-grid');
    const projectSection = document.getElementById('projects');

    if (btn && grid) {
        btn.addEventListener('click', function() {
            const isOpen = grid.classList.toggle('is-open');
            btn.textContent = isOpen ? '-' : '+';

            if (!isOpen) {
                const targetPos = projectSection.getBoundingClientRect().top + window.pageYOffset - 80;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });

            }
        });
    }
});document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const modalWrapper = document.querySelector(".modal-image-wrapper");
    const modalTitle = document.getElementById("modalTitle");
    const modalCounter = document.getElementById("modalCounter");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.querySelector(".modal-prev");
    const nextBtn = document.querySelector(".modal-next");

    // Coleta as imagens da página
    const zoomableImages = Array.from(document.querySelectorAll('.zoomable-image'));
    let currentIndex = 0;
    let isZoomed = false;

    if (zoomableImages.length === 0) return;

    // --- FUNÇÕES ---

    // Atualiza o conteúdo da modal
    function updateModal(index) {
        // Reseta o zoom ao trocar de imagem
        resetZoom();

        const img = zoomableImages[index];
        const src = img.getAttribute('data-zoom-src') || img.src;
        const title = img.alt || "Visualização";

        modalImg.src = src;
        modalTitle.textContent = title;
        modalCounter.textContent = `${index + 1} / ${zoomableImages.length}`;
        currentIndex = index;
    }

    // Liga/Desliga o Zoom
    function toggleZoom(e) {
        if(e) e.stopPropagation();
        
        isZoomed = !isZoomed;
        
        if (isZoomed) {
            modalImg.classList.add('is-zoomed');
            modalWrapper.classList.add('is-zoomed');
        } else {
            resetZoom();
        }
    }

    // Reseta o Zoom para o padrão
    function resetZoom() {
        isZoomed = false;
        modalImg.classList.remove('is-zoomed');
        modalWrapper.classList.remove('is-zoomed');
    }

    // Fecha a Modal
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Destrava scroll da página
        setTimeout(() => { modalImg.src = ""; }, 200);
    }

    // --- EVENTOS ---

    // 1. Clique nas thumbnails (Abre a modal)
    zoomableImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            updateModal(index);
            document.body.style.overflow = "hidden"; // Trava scroll da página
        });
    });

    // 2. Clique na imagem grande (Zoom)
    modalImg.addEventListener('click', toggleZoom);

    // 3. Navegação (Setas)
    if(nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let nextIndex = currentIndex + 1;
        if (nextIndex >= zoomableImages.length) nextIndex = 0;
        updateModal(nextIndex);
    });

    if(prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = zoomableImages.length - 1;
        updateModal(prevIndex);
    });

    // 4. Fechar (X ou Fundo)
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        // Se clicar fora da imagem e não estiver com zoom
        if (!isZoomed && (e.target === modal || e.target.classList.contains('modal-body') || e.target.classList.contains('modal-image-wrapper'))) {
            closeModal();
        }
        // Se estiver com zoom, clicar fora apenas reseta o zoom ou fecha (opcional, aqui fecha)
        else if (isZoomed && e.target !== modalImg) {
            closeModal();
        }
    });

    // 5. Teclado
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "Escape") closeModal();
            if (!isZoomed) {
                if (e.key === "ArrowRight") nextBtn.click();
                if (e.key === "ArrowLeft") prevBtn.click();
            }
        }
    });
});