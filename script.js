const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  if (!menuButton.querySelector('span')) menuButton.textContent = isOpen ? '☰' : '×';
  navigation.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    if (!menuButton.querySelector('span')) menuButton.textContent = '☰';
    navigation.classList.remove('open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal, .intro-layout, .values-row, .level-card, .high-school, .activity-card, .news-list article, .contact-card, .contact-side, .program-grid article, .gallery-item, .notice-grid article, .program-feature, .video-feature, .contact-detail-card, .photo-stack, .value-card, .offer, .life-image, .news-card, .section-heading, .contact-photo');
revealItems.forEach((item) => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Fotografía ampliada';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  });
});
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
};
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

const carousel = document.querySelector('.photo-hero');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.hero-photo')];
  const dots = [...carousel.querySelectorAll('.carousel-dots button')];
  let activeSlide = 0;
  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeSlide);
      dot.setAttribute('aria-pressed', String(i === activeSlide));
    });
  };
  carousel.querySelector('.carousel-prev')?.addEventListener('click', () => showSlide(activeSlide - 1));
  carousel.querySelector('.carousel-next')?.addEventListener('click', () => showSlide(activeSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  let autoplay;
  const startAutoplay = () => {
    if (!autoplay) autoplay = window.setInterval(() => showSlide(activeSlide + 1), 5000);
  };
  const stopAutoplay = () => {
    window.clearInterval(autoplay);
    autoplay = null;
  };
  startAutoplay();
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);
}

const currentPage = location.pathname.split('/').pop() || 'index.html';
const offerPages = ['inicial.html', 'basica-elemental.html', 'basica-media.html', 'basica-superior.html', 'bachillerato-ciencias.html', 'bachillerato-soporte-tecnico.html'];
const activePage = offerPages.includes(currentPage) ? 'oferta-educativa.html' : currentPage;
navigation?.querySelectorAll(`a[href="${activePage}"]`).forEach((link) => link.classList.add('active'));
navigation?.querySelectorAll(`a[href="${activePage}"]`).forEach((link) => link.setAttribute('aria-current', 'page'));
