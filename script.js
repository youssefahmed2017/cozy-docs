// ── Navbar shadow on scroll ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Sidebar toggle ──
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const toggleBtn      = document.getElementById('sidebarToggle');
const layout         = document.getElementById('docsLayout');
const MOBILE_BP      = 992;

function isMobile() { return window.innerWidth < MOBILE_BP; }

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleSidebar() {
    if (isMobile()) {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    } else {
        layout.classList.toggle('sidebar-collapsed');
    }
}

toggleBtn.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on mobile when a nav link is clicked
sidebar.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', () => { if (isMobile()) closeSidebar(); });
});

// On resize: reset mobile state if switching to desktop
window.addEventListener('resize', () => {
    if (!isMobile()) {
        closeSidebar();
        document.body.style.overflow = '';
    }
});

// ── Copy install command (hero + sidebar strip) ──
function copyInstall(btn) {
    const text = document.getElementById('installCommand')?.innerText || 'pip install cozy-kit';
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1800);
    });
}

// ── Copy code blocks ──
function copyCode(btn) {
    const pre = btn.closest('.code-card').querySelector('.code-body');
    const text = pre.innerText || pre.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i>';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1800);
    });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

// ── Active sidebar link tracking ──
const sectionIds = [
    'intro','modules','installation','quickstart','key-concepts',
    'greeting','timer','text-editor','text-customizations','cozy-ui','details',
    'cli','settings','examples','faq'
];

const sidebarLinks = {};

sectionIds.forEach(id => {
    const link = document.querySelector(
        `.nav-link-item[data-section="${id}"]`
    );

    if (link) {
        sidebarLinks[id] = link;
    }
});

function updateActiveSection() {
    let bestSection = null;
    let bestDistance = Infinity;

    sectionIds.forEach(id => {
        const el = document.getElementById(id);

        if (!el) return;

        const rect = el.getBoundingClientRect();

        // Ignore sections completely below the viewport
        if (rect.top > window.innerHeight) return;

        const distance = Math.abs(rect.top);

        if (distance < bestDistance) {
            bestDistance = distance;
            bestSection = id;
        }
    });

    document.querySelectorAll('.nav-link-item.active')
        .forEach(link => link.classList.remove('active'));

    if (bestSection && sidebarLinks[bestSection]) {
        sidebarLinks[bestSection].classList.add('active');
    }
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

updateActiveSection();

// ── Theme toggle ──
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const DARK_ICON  = 'bi-moon-stars-fill';
const LIGHT_ICON = 'bi-sun-fill';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.classList.replace(DARK_ICON, LIGHT_ICON);
        } else {
            themeIcon.classList.replace(LIGHT_ICON, DARK_ICON);
        }
    }
    localStorage.setItem('ck-theme', theme);
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// Apply saved theme on load
(function () {
    const saved = localStorage.getItem('ck-theme') || 'dark';
    applyTheme(saved);
})();
