const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const siteAnnouncement = document.querySelector('.announcement');
const siteHeader = document.querySelector('.site-header');
const siteHeaderSpacer = siteHeader ? document.createElement('div') : null;
if (siteHeaderSpacer) {
  siteHeaderSpacer.className = 'site-header-spacer';
  siteHeaderSpacer.setAttribute('aria-hidden', 'true');
  siteHeader.after(siteHeaderSpacer);
}
const closeOpenDropdowns = (except = null) => {
  navigation?.querySelectorAll('.nav-dropdown[open]').forEach((dropdown) => {
    if (dropdown !== except) dropdown.removeAttribute('open');
  });
};
navigation?.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
  dropdown.addEventListener('toggle', () => {
    if (dropdown.open) closeOpenDropdowns(dropdown);
  });
});
document.addEventListener('click', (event) => {
  if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeOpenDropdowns();
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeOpenDropdowns();
  if (navigation?.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
    if (menuButton && !menuButton.querySelector('span')) menuButton.textContent = '☰';
  }
});
const updateHeaderScrollState = () => {
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 12);
  const fixed = window.scrollY > 0;
  siteAnnouncement?.classList.toggle('is-fixed', fixed);
  siteHeader?.classList.toggle('is-fixed', fixed);
};
updateHeaderScrollState();
window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
document.querySelectorAll('.inner-hero').forEach((hero) => {
  const photo = hero.querySelector(':scope > img');
  if (photo?.src) hero.style.setProperty('--hero-photo-backdrop', `url("${photo.currentSrc || photo.src}")`);
});
const photoSections = [...document.querySelectorAll('main > section:not(.hero):not(.inner-hero)')].filter((section) => {
  const photo = section.querySelector('img[src]');
  if (!photo?.src) return false;
  section.style.setProperty('--scroll-photo-backdrop', `url("${photo.currentSrc || photo.src}")`);
  section.classList.add('scroll-photo-section');
  return true;
});
const replayHeroEntrance = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.body.classList.remove('hero-play');
  void document.body.offsetWidth;
  document.body.classList.add('hero-play');
};
replayHeroEntrance();
window.addEventListener('pageshow', (event) => { if (event.persisted) replayHeroEntrance(); });
navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const destination = new URL(link.href, location.href);
    const destinationPage = destination.pathname.split('/').pop() || 'index.html';
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    if (destinationPage === currentPage && !destination.hash) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      replayHeroEntrance();
    }
  });
});

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

const contactForm = document.querySelector('#contact-message-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = `Consulta web: ${data.get('topic')}`;
    const body = [`Nombre: ${data.get('name')}`, `Correo para responder: ${data.get('email')}`, '', `Consulta: ${data.get('message')}`].join('\n');
    const mailto = `mailto:alfarocolegioalfaro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#contact-form-status').textContent = 'Se abrirá tu correo. Revisa el mensaje y pulsa Enviar para completar la consulta.';
    window.location.href = mailto;
  });
}const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal, main > section:not(.hero):not(.inner-hero), .intro-layout, .values-row, .level-card, .high-school, .activity-card, .news-list article, .contact-card, .contact-side, .program-grid article, .gallery-item, .notice-grid article, .program-feature, .video-feature, .contact-detail-card, .photo-stack, .value-card, .offer, .life-image, .news-card, .section-heading, .contact-photo, .student-events-heading, .student-events .desfile-life-link, .activity-ideas > div, .contact-info-grid article');
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
  const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('photo-in-view', entry.isIntersecting));
  }, { threshold: 0.2 });
  photoSections.forEach((section) => photoObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
  photoSections.forEach((section) => section.classList.add('photo-in-view'));
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
    if (!autoplay) autoplay = window.setInterval(() => showSlide(activeSlide + 1), 3800);
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

const newsCollage = document.querySelector('[data-news-collage]');
if (newsCollage) {
  const slides = [...newsCollage.querySelectorAll('.news-collage-slide')];
  const dots = [...newsCollage.querySelectorAll('[data-collage-dot]')];
  const status = newsCollage.querySelector('[data-collage-status]');
  let active = 0;
  let timer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showNewsSlide = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === active);
      slide.setAttribute('aria-hidden', String(i !== active));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === active);
      dot.setAttribute('aria-pressed', String(i === active));
    });
    if (status) status.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  const stopNewsAutoplay = () => { window.clearInterval(timer); timer = undefined; };
  const startNewsAutoplay = () => {
    if (reducedMotion || timer || slides.length < 2) return;
    timer = window.setInterval(() => showNewsSlide(active + 1), 5500);
  };
  newsCollage.querySelector('[data-collage-prev]')?.addEventListener('click', () => showNewsSlide(active - 1));
  newsCollage.querySelector('[data-collage-next]')?.addEventListener('click', () => showNewsSlide(active + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showNewsSlide(i)));
  newsCollage.addEventListener('mouseenter', stopNewsAutoplay);
  newsCollage.addEventListener('mouseleave', startNewsAutoplay);
  newsCollage.addEventListener('focusin', stopNewsAutoplay);
  newsCollage.addEventListener('focusout', (event) => { if (!newsCollage.contains(event.relatedTarget)) startNewsAutoplay(); });
  showNewsSlide(0);
  startNewsAutoplay();
}

// El acceso permanece en mantenimiento hasta que el sistema esté listo.
const evaluationLinks = document.querySelectorAll('[data-evaluation-link]');
if (evaluationLinks.length) {
  const maintenanceDialog = document.createElement('dialog');
  maintenanceDialog.className = 'evaluation-maintenance-dialog';
  maintenanceDialog.setAttribute('aria-labelledby', 'evaluation-maintenance-title');
  const dialogContent = document.createElement('div');
  dialogContent.className = 'evaluation-maintenance-content';
  const dialogMark = document.createElement('span');
  dialogMark.className = 'evaluation-maintenance-mark';
  dialogMark.setAttribute('aria-hidden', 'true');
  dialogMark.textContent = '✦';
  const dialogTitle = document.createElement('h2');
  dialogTitle.id = 'evaluation-maintenance-title';
  dialogTitle.textContent = 'Estamos en mantenimiento';
  const dialogMessage = document.createElement('p');
  dialogMessage.textContent = 'El acceso a Evaluación de Exámenes de Grado estará disponible próximamente. Gracias por tu comprensión.';
  const closeButton = document.createElement('button');
  closeButton.className = 'evaluation-maintenance-close';
  closeButton.type = 'button';
  closeButton.textContent = 'Entendido';
  closeButton.addEventListener('click', () => maintenanceDialog.close());
  dialogContent.append(dialogMark, dialogTitle, dialogMessage, closeButton);
  maintenanceDialog.append(dialogContent);
  document.body.append(maintenanceDialog);

  evaluationLinks.forEach((link) => {
    link.title = 'El acceso estará disponible próximamente';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!maintenanceDialog.open) maintenanceDialog.showModal();
    });
  });
}
