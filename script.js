// Navbar shadow on scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Copy install command
function copyInstall(btn) {
    const text = document.getElementById('installCommand').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copied');
        }, 1800);
    });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));

// Hide navbar when footer bottom is visible
const bottomEl = document.getElementById('bottom');
if (bottomEl) {
    new IntersectionObserver(entries => {
        nav.classList.toggle('nav-hidden', entries[0].isIntersecting);
    }).observe(bottomEl);
}

// Close mobile nav on link click
document.querySelectorAll('#nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navCollapse = document.getElementById('nav');
        if (navCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navCollapse).hide();
        }
    });
});
