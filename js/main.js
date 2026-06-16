// --------------- DARK MODE --------
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', currentTheme);
    
    darkToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// ------------------------NAVBAR DYNAMIQUE -------------------------
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 50) nav.classList.add('navbar-shrink');
        else nav.classList.remove('navbar-shrink');
    }
});

// ----------------BACK TO TOP ---------------
const backBtn = document.getElementById('backToTop');
if (backBtn) {
    window.addEventListener('scroll', () => {
        backBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });
}

// ===== COMPTEURS ANIMÉS =====
const counters = document.querySelectorAll('.counter');
if (counters.length) {
    const observerCount = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.dataset.target;
                let current = 0;
                const update = setInterval(() => {
                    if (current >= target) clearInterval(update);
                    else {
                        current += Math.ceil(target / 50);
                        el.innerText = current;
                    }
                }, 30);
                observerCount.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observerCount.observe(c));
}

// ===== FADE-IN AU SCROLL =====
const fadeElements = document.querySelectorAll('section, .bento-card, .category-card, .freelance-card');
if (fadeElements.length) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => {
        el.classList.add('fade-out');
        fadeObserver.observe(el);
    });
}

// ===== FILTRAGE DES FREELANCES =====
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');
    
    console.log('Filtres trouvés :', filterBtns.length);
    console.log('Cartes trouvées :', freelanceCards.length);
    
    if (filterBtns.length > 0 && freelanceCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-cat');
                console.log('Filtre sélectionné :', category);
                
                freelanceCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-cat') === category) {
                        card.style.display = 'block';
                        console.log('Afficher carte :', card.querySelector('h4')?.innerText);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    } else {
        console.log('Filtres ou cartes non trouvés !');
    }
});

// ===== ANNÉE DYNAMIQUE =====
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}