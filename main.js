// =======================================================
//  MODAL DE CERTIFICADOS — escopo global (onclick no HTML)
// =======================================================
window.openCertModal = function(src, alt) {
    const overlay = document.getElementById('certModalOverlay');
    const img = document.getElementById('certModalImg');
    if (!overlay || !img) return;
    img.src = src;
    img.alt = alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeCertModalDirect = function() {
    const overlay = document.getElementById('certModalOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
};

window.closeCertModal = function(e) {
    if (e.target === document.getElementById('certModalOverlay')) {
        window.closeCertModalDirect();
    }
};

// =======================================================
//  DOM CONTENT LOADED
// =======================================================
document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    let darkModeToggle;

    // --- DARK MODE ---
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

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
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
    injetarBotaoDarkMode();

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // --- BOTÃO VOLTAR ---
    function injetarBotaoVoltar() {
        const headerContainer = document.querySelector('.main-header .container');
        const path = window.location.pathname;
        const isEnglish = path.includes('/en/');
        if (path.endsWith('/') || path.endsWith('index.html')) return;
        if (headerContainer && !document.querySelector('.back-button')) {
            const backButton = document.createElement('a');
            backButton.href = 'index.html';
            backButton.className = 'back-button';
            const labelText = isEnglish ? 'Back to Home' : 'Voltar para a página inicial';
            backButton.setAttribute('aria-label', labelText);
            const icon = document.createElement('i');
            icon.className = 'fas fa-arrow-left';
            backButton.appendChild(icon);
            backButton.addEventListener('click', (e) => {
                if (document.referrer && document.referrer.includes(window.location.hostname)) {
                    e.preventDefault();
                    history.back();
                }
            });
            headerContainer.prepend(backButton);
        }
    }
    injetarBotaoVoltar();

    // --- OVERLAY MENU ---
    const btnMenu = document.getElementById('btn-menu-projetos');
    const btnFechar = document.getElementById('btn-fechar-overlay');
    const overlay = document.getElementById('project-overlay');
    const links = document.querySelectorAll('.menu-link');

    function toggleMenu() {
        if (!overlay) return;
        const estaAberto = overlay.classList.contains('active');
        if (estaAberto) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (btnMenu) btnMenu.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(); });
    if (btnFechar) btnFechar.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));

    // --- SCROLL OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.scroll-hidden').forEach((el) => observer.observe(el));

    // --- LOAD MORE PROJETOS ---
    const btnExpand = document.getElementById('btn-load-more-projects');
    const gridProjects = document.querySelector('.project-grid');
    const projectSection = document.getElementById('projects');
    if (btnExpand && gridProjects) {
        btnExpand.addEventListener('click', function () {
            const isOpen = gridProjects.classList.toggle('is-open');
            btnExpand.textContent = isOpen ? '-' : '+';
            if (!isOpen && projectSection) {
                const targetPos = projectSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    }

    // --- LOAD MORE CERTIFICAÇÕES ---
    const btnCerts = document.getElementById('btn-load-more-certs');
    const listCerts = document.querySelector('.courses-table');
    const certSection = document.getElementById('certifications');
    if (btnCerts && listCerts) {
        btnCerts.addEventListener('click', function () {
            const isOpen = listCerts.classList.toggle('is-open');
            btnCerts.textContent = isOpen ? '-' : '+';
            if (!isOpen && certSection) {
                const targetPos = certSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    }

    // --- FECHAR MODAL CERTIFICADO COM ESC ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const certOverlay = document.getElementById('certModalOverlay');
            if (certOverlay && certOverlay.classList.contains('open')) {
                window.closeCertModalDirect();
            }
        }
    });

    // --- MODAL CV ---
    const openCvBtn = document.getElementById('openCvModalBtn');
    const closeCvBtn = document.getElementById('closeCvModalBtn');
    const cvOverlay = document.getElementById('cvModalOverlay');
    if (openCvBtn && cvOverlay) {
        openCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cvOverlay.classList.add('visible');
        });
    }
    if (closeCvBtn && cvOverlay) {
        closeCvBtn.addEventListener('click', () => {
            cvOverlay.classList.remove('visible');
        });
    }
    if (cvOverlay) {
        cvOverlay.addEventListener('click', (e) => {
            if (e.target === cvOverlay) cvOverlay.classList.remove('visible');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') cvOverlay.classList.remove('visible');
        });
    }

    // =======================================================
    //  MODAL DE ZOOM COM ARRASTO CENTRALIZADO
    // =======================================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const modalWrapper = document.querySelector(".modal-image-wrapper");
    const modalTitle = document.getElementById("modalTitle");
    const modalCounter = document.getElementById("modalCounter");
    const closeBtn = document.querySelector(".modal-close");
    const prevBtn = document.querySelector(".modal-prev");
    const nextBtn = document.querySelector(".modal-next");
    const btnZoomIn = document.getElementById("btnZoomIn");
    const btnZoomOut = document.getElementById("btnZoomOut");

    const zoomableImages = Array.from(document.querySelectorAll('.zoomable-image'));
    let currentIndex = 0;
    let isZoomed = false;
    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
    let scale = 1;
    const ZOOM_STEP = 0.5;
    const MAX_ZOOM = 5;
    const MIN_ZOOM = 1;

    if (zoomableImages.length > 0) {

        function updateModal(index) {
            resetZoom();
            const img = zoomableImages[index];
            const src = img.getAttribute('data-zoom-src') || img.src;
            const title = img.alt || "Visualização";
            modalImg.src = src;
            if (modalTitle) modalTitle.textContent = title;
            if (modalCounter) modalCounter.textContent = `${index + 1} / ${zoomableImages.length}`;
            currentIndex = index;
        }

        function applyZoom(newScale) {
            scale = newScale;
            if (scale < MIN_ZOOM) scale = MIN_ZOOM;
            if (scale > MAX_ZOOM) scale = MAX_ZOOM;
            if (scale > 1) {
                isZoomed = true;
                modalImg.classList.add('is-zoomed');
            } else {
                resetZoom();
                return;
            }
            clampCoordinates();
            updateTransform();
        }

        function resetZoom() {
            isZoomed = false;
            scale = 1;
            translateX = 0;
            translateY = 0;
            isDragging = false;
            modalImg.classList.remove('is-zoomed');
            modalImg.classList.remove('is-dragging');
            modalImg.style.transform = '';
        }

        function clampCoordinates() {
            if (!modalWrapper) return;
            const containerRect = modalWrapper.getBoundingClientRect();
            const scaledWidth = modalImg.offsetWidth * scale;
            const scaledHeight = modalImg.offsetHeight * scale;
            let xLimit = (scaledWidth - containerRect.width) / 2;
            let yLimit = (scaledHeight - containerRect.height) / 2;
            if (xLimit < 0) xLimit = 0;
            if (yLimit < 0) yLimit = 0;
            if (translateX > xLimit) translateX = xLimit;
            if (translateX < -xLimit) translateX = -xLimit;
            if (translateY > yLimit) translateY = yLimit;
            if (translateY < -yLimit) translateY = -yLimit;
        }

        function updateTransform() {
            modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            setTimeout(() => { modalImg.src = ""; resetZoom(); }, 200);
        }

        zoomableImages.forEach((img, index) => {
            img.addEventListener('click', function () {
                modal.style.display = "flex";
                updateModal(index);
                document.body.style.overflow = "hidden";
            });
        });

        modalImg.addEventListener('click', (e) => {
            if (!isDragging && translateX === 0 && translateY === 0) {
                if (isZoomed) resetZoom();
                else applyZoom(1.8);
            }
        });

        modalImg.addEventListener('wheel', (e) => {
            if (!isZoomed && e.deltaY > 0) return;
            e.preventDefault();
            const direction = e.deltaY < 0 ? 1 : -1;
            applyZoom(scale + (direction * 0.2));
        });

        if (btnZoomIn) {
            btnZoomIn.addEventListener('click', (e) => { e.stopPropagation(); applyZoom(scale + ZOOM_STEP); });
        }
        if (btnZoomOut) {
            btnZoomOut.addEventListener('click', (e) => { e.stopPropagation(); applyZoom(scale - ZOOM_STEP); });
        }

        modalImg.addEventListener('mousedown', (e) => {
            if (!isZoomed) return;
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            modalImg.classList.add('is-dragging');
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            clampCoordinates();
            updateTransform();
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                modalImg.classList.remove('is-dragging');
            }
        });

        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let nextIndex = currentIndex + 1;
            if (nextIndex >= zoomableImages.length) nextIndex = 0;
            updateModal(nextIndex);
        });

        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = zoomableImages.length - 1;
            updateModal(prevIndex);
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-body')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (modal.style.display === "flex") {
                if (e.key === "Escape") closeModal();
                if (!isZoomed) {
                    if (e.key === "ArrowRight") if (nextBtn) nextBtn.click();
                    if (e.key === "ArrowLeft") if (prevBtn) prevBtn.click();
                }
            }
        });
    }

    // --- PROJETOS RECOMENDADOS ---
    const allProjects = [
        { href: "pagamentos.html", imgSrc: "images/thumbs/pagamentos.png", alt: "Projeto Pagamentos" },
        { href: "bolao.html", imgSrc: "images/thumbs/bolao_caixa.png", alt: "Projeto Bolão Lotérico" },
        { href: "yuca.html", imgSrc: "images/thumbs/yuca.png", alt: "Projeto Yuca" },
        { href: "vortigo.html", imgSrc: "images/thumbs/vortigo.webp", alt: "Projeto Vortigo" },
        { href: "cores.html", imgSrc: "images/thumbs/cores_caixa.png", alt: "Estudo de Cores das Modalidades" }
    ];

    async function injetarProjetosRecomendados() {
        const currentPage = window.location.pathname;
        const targetElement = document.querySelector('#contact') || document.querySelector('.main-footer');
        if (!targetElement) return;
        if (currentPage.endsWith('/') || currentPage.endsWith('index.html')) return;

        const projectsToShow = allProjects
            .filter(project => !currentPage.includes(project.href))
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        if (projectsToShow.length === 0) return;

        const section = document.createElement('section');
        section.className = 'recommended-projects';

        let cardsHTML = projectsToShow.map(project => `
            <a href="${project.href}" class="project-card" aria-label="Ver projeto: ${project.alt}">
                <div class="image-wrapper">
                    <img src="${project.imgSrc}" alt="${project.alt}" loading="lazy">
                </div>
            </a>
        `).join('');

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Outros Projetos</h2>
                <div class="portfolio-grid">
                    ${cardsHTML}
                </div>
            </div>
        `;

        targetElement.parentNode.insertBefore(section, targetElement);
    }
    injetarProjetosRecomendados();

});