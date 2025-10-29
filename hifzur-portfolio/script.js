// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');
if (navToggleButton && navMenu) {
	navToggleButton.addEventListener('click', () => {
		const expanded = navToggleButton.getAttribute('aria-expanded') === 'true';
		navToggleButton.setAttribute('aria-expanded', String(!expanded));
		navMenu.classList.toggle('open');
	});
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', e => {
		const href = (link.getAttribute('href') || '').trim();
		if (href.length > 1) {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
			if (navMenu && navMenu.classList.contains('open')) {
				navMenu.classList.remove('open');
				navToggleButton?.setAttribute('aria-expanded', 'false');
			}
		}
	});
});

// Skills: animate in on scroll (left-to-right)
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('in-view');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card[data-animate="slide-in"]').forEach(el => observer.observe(el));

// Portfolio slider: one card per view
const track = document.querySelector('.slider-track');
const prev = document.querySelector('.slider .prev');
const next = document.querySelector('.slider .next');

function scrollByCard(direction) {
    if (!track) return;
    const card = track.querySelector('.project-card');
    const gap = 16; // must match CSS gap
    const width = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * width, behavior: 'smooth' });
}

prev?.addEventListener('click', () => scrollByCard(-1));
next?.addEventListener('click', () => scrollByCard(1));

// Header shadow on scroll
const header = document.querySelector('.site-header');
const addShadowOnScroll = () => {
	if (!header) return;
	if (window.scrollY > 4) {
		header.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
	} else {
		header.style.boxShadow = 'none';
	}
};
addShadowOnScroll();
window.addEventListener('scroll', addShadowOnScroll, { passive: true });



