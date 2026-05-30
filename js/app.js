/**
 * portfolio-bts - Fichier logique applicative (app.js)
 * Gère l'affichage dynamique, le filtrage des projets, le sélecteur d'option (SISR/SLAM),
 * le mode sombre, et l'interactivité globale du site de façon performante et fluide.
 */

document.addEventListener('DOMContentLoaded', () => {
    // État de l'application
    const state = {
        selectedOption: 'sisr',
        activeFilter: 'all',
        theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    };

    // --- SÉLECTEURS DOM ---
    const themeToggle = document.getElementById('theme-toggle');
    const optionSisrBtn = document.getElementById('btn-option-sisr');
    const optionSlamBtn = document.getElementById('btn-option-slam');
    const btsOptionLabel = document.getElementById('hero-option-label');
    const aboutOptionText = document.getElementById('about-option-text');
    
    const skillsContainer = document.getElementById('skills-container');
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    // --- INITIALISATION ---
    initTheme();
    renderPersonalInfo();
    renderOptionUI();
    renderSkills();
    renderProjects();
    renderVeille();
    setupEventListeners();
    setupScrollAnimations();

    // --- GESTION DU THÈME ---
    function initTheme() {
        if (state.theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.checked = false;
        }
    }

    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        initTheme();
    }

    // --- RENDU DES INFORMATIONS PERSONNELLES ---
    function renderPersonalInfo() {
        const info = portfolioData.personalInfo;
        
        // Titres & Hero
        document.title = `Portfolio | ${info.firstName} ${info.lastName}`;
        document.getElementById('brand-name').textContent = `${info.firstName} ${info.lastName}`;
        document.getElementById('hero-title').textContent = `${info.firstName} ${info.lastName}`;
        document.getElementById('hero-subtitle').textContent = info.subtitle;
        document.getElementById('about-description').textContent = info.aboutText;
        
        // Liens sociaux & Contact
        document.getElementById('contact-email').textContent = info.email;
        document.getElementById('contact-email').href = `mailto:${info.email}`;
        document.getElementById('social-github').href = info.github;
        document.getElementById('social-linkedin').href = info.linkedin;
        
        // Pied de page
        document.getElementById('footer-name').textContent = `${info.firstName} ${info.lastName}`;
        document.getElementById('footer-year').textContent = new Date().getFullYear();
    }

    // --- GESTION DES OPTIONS BTS (SISR) ---
    function renderOptionUI() {
        const btsLabel = document.getElementById('hero-option-label');
        const aboutText = document.getElementById('about-option-text');
        if (btsLabel) btsLabel.textContent = "Option SISR (Solutions d'Infrastructure, Systèmes et Réseaux)";
        if (aboutText) {
            aboutText.innerHTML = "Je me spécialise dans l'option <strong>SISR (Solutions d'Infrastructure, Systèmes et Réseaux)</strong> afin de maîtriser l'administration des serveurs, la conception d'architectures réseaux fiables et sécurisées, ainsi que le déploiement de services interconnectés essentiels à l'activité des entreprises.";
        }
    }

    // --- RENDU DES COMPÉTENCES (SKILLS) ---
    function renderSkills() {
        if (!skillsContainer) return;
        skillsContainer.innerHTML = '';

        const blocs = portfolioData.competences;
        
        // 1. Rendu du Bloc 1 (Commun)
        const bloc1Section = createSkillBlocElement(blocs.bloc1);
        skillsContainer.appendChild(bloc1Section);

        // 2. Rendu du Bloc 2 (SISR)
        const optionBlocData = blocs.sisr;
        const bloc2Section = createSkillBlocElement(optionBlocData, 'option-bloc-fade');
        skillsContainer.appendChild(bloc2Section);
        
        // Lancer l'animation des barres de progression après un court délai
        setTimeout(animateProgressBars, 100);
    }

    function createSkillBlocElement(blocData, extraClass = '') {
        const div = document.createElement('div');
        div.className = `skills-block ${extraClass}`;
        
        let skillsHTML = `
            <div class="skills-block-header">
                <h3>${blocData.title}</h3>
                <p class="skills-block-desc">${blocData.description}</p>
            </div>
            <div class="skills-list">
        `;
        
        blocData.skills.forEach(skill => {
            skillsHTML += `
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                    <div class="skill-bar-bg" title="${skill.detail}">
                        <div class="skill-bar-fill" data-level="${skill.level}"></div>
                    </div>
                    <span class="skill-detail-text">${skill.detail}</span>
                </div>
            `;
        });
        
        skillsHTML += `</div>`;
        div.innerHTML = skillsHTML;
        return div;
    }

    function animateProgressBars() {
        const fills = document.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
            const level = fill.getAttribute('data-level');
            fill.style.width = `${level}%`;
        });
    }

    // --- RENDU ET FILTRAGE DES PROJETS ---
    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';

        // Filtrer les projets
        const filteredProjects = portfolioData.projects.filter(project => {
            if (state.activeFilter === 'all') {
                // Afficher tout ou filtrer les projets réseau si SISR, ou dév si SLAM
                return true;
            } else if (state.activeFilter === 'common') {
                return project.category === 'common';
            } else if (state.activeFilter === 'slam') {
                return project.category === 'slam';
            } else if (state.activeFilter === 'sisr') {
                return project.category === 'sisr';
            }
            return true;
        });

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = `<div class="no-projects">Aucun projet ne correspond à cette catégorie.</div>`;
            return;
        }

        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = `project-card visible`;
            card.dataset.id = project.id;
            
            // Un badge de couleur pour la catégorie
            let categoryBadge = "";
            if (project.category === 'common') categoryBadge = `<span class="badge badge-common">Tronc Commun</span>`;
            else if (project.category === 'slam') categoryBadge = `<span class="badge badge-slam">Option SLAM</span>`;
            else if (project.category === 'sisr') categoryBadge = `<span class="badge badge-sisr">Option SISR</span>`;

            // Utilisation d'un dégradé stylisé moderne en guise d'image si non fournie ou fallback élégant
            const cardStyle = `background: linear-gradient(135deg, var(--card-gradient-start, #eef2f3), var(--card-gradient-end, #8e9eab));`;
            
            // Balises de tags
            const tagsHTML = project.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join(' ');

            card.innerHTML = `
                <div class="project-card-image-fallback" style="${cardStyle}">
                    <span class="project-icon-placeholder">${project.category === 'slam' ? '💻' : project.category === 'sisr' ? '⚙️' : '📁'}</span>
                    ${categoryBadge}
                </div>
                <div class="project-card-content">
                    <span class="project-context">${project.context}</span>
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-desc">${project.description}</p>
                    <div class="project-card-footer">
                        <div class="project-tags">${tagsHTML}</div>
                        <button class="project-btn-more">Voir les détails →</button>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openProjectModal(project));
            projectsGrid.appendChild(card);
        });
    }

    function handleFilterChange(e) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        state.activeFilter = e.target.getAttribute('data-filter');
        renderProjects();
    }

    // --- MODAL DE DÉTAIL DES PROJETS ---
    function openProjectModal(project) {
        if (!projectModal) return;
        
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-context').textContent = project.context;
        
        let catText = "Tronc Commun (1ère année)";
        if (project.category === 'slam') catText = "Option SLAM (Développement)";
        else if (project.category === 'sisr') catText = "Option SISR (Réseau & Système)";
        document.getElementById('modal-category').textContent = catText;
        
        document.getElementById('modal-description').textContent = project.longDescription;
        
        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = `#${tag}`;
            tagsContainer.appendChild(span);
        });

        // Compétences associées
        const skillsContainerModal = document.getElementById('modal-skills-linked');
        skillsContainerModal.innerHTML = '';
        project.skillsLinked.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsContainerModal.appendChild(li);
        });

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement arrière-plan
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- RENDU DE LA VEILLE TECHNOLOGIQUE ---
    function renderVeille() {
        const data = portfolioData.veille;
        
        document.getElementById('veille-subject').textContent = data.subject;
        document.getElementById('veille-definition').textContent = data.definition;
        document.getElementById('veille-why').textContent = data.whyChosen;
        
        // Axes de la veille
        const axesContainer = document.getElementById('veille-axes');
        if (axesContainer) {
            axesContainer.innerHTML = '';
            data.axes.forEach(axe => {
                const item = document.createElement('div');
                item.className = 'veille-axe-card';
                item.innerHTML = `
                    <h4>${axe.title}</h4>
                    <p>${axe.description}</p>
                `;
                axesContainer.appendChild(item);
            });
        }
        
        // Outils de la veille
        const toolsContainer = document.getElementById('veille-tools');
        if (toolsContainer) {
            toolsContainer.innerHTML = '';
            data.tools.forEach(tool => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${tool.name} :</strong> ${tool.usage}`;
                toolsContainer.appendChild(li);
            });
        }

        // Articles / Sources
        const articlesContainer = document.getElementById('veille-articles');
        if (articlesContainer) {
            articlesContainer.innerHTML = '';
            data.articles.forEach(article => {
                const item = document.createElement('div');
                item.className = 'veille-article-item';
                item.innerHTML = `
                    <div class="article-source-tag">${article.source}</div>
                    <h5>${article.title}</h5>
                    <p>${article.summary}</p>
                `;
                articlesContainer.appendChild(item);
            });
        }
    }

    // --- CONFIGURATION DES ÉCOUTEURS D'ÉVÉNEMENTS ---
    function setupEventListeners() {
        // Toggle Thème
        if (themeToggle) {
            themeToggle.addEventListener('change', toggleTheme);
        }
        
        // Filtres Projets
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilterChange);
        });
        
        // Fermeture Modal
        if (modalClose) {
            modalClose.addEventListener('click', closeProjectModal);
        }
        if (projectModal) {
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) closeProjectModal();
            });
        }
        
        // Formulaire de contact (Simulation d'envoi très propre)
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Petite animation de chargement
                submitBtn.disabled = true;
                submitBtn.textContent = "Envoi en cours...";
                
                setTimeout(() => {
                    submitBtn.style.backgroundColor = "var(--success-color, #2ec4b6)";
                    submitBtn.textContent = "Message envoyé !";
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = "";
                    }, 3000);
                }, 1200);
            });
        }

        // Fermeture de modal avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeProjectModal();
        });
    }

    // --- ANIMATIONS D'APPARITION AU DÉFILEMENT (Scroll Reveal) ---
    function setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.section-header, .about-grid, .skills-block, .project-card, .veille-grid, .contact-card');
        
        const revealOnScroll = () => {
            const triggerBottom = window.innerHeight * 0.85;
            
            revealElements.forEach(el => {
                const elTop = el.getBoundingClientRect().top;
                
                if (elTop < triggerBottom) {
                    el.classList.add('revealed');
                }
            });
        };
        
        // Ajouter la classe de transition initiale
        revealElements.forEach(el => {
            el.classList.add('scroll-reveal');
        });
        
        window.addEventListener('scroll', revealOnScroll);
        // Lancer une fois au démarrage
        revealOnScroll();
    }
});
