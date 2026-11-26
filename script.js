const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const siteAnnouncement = document.querySelector('.announcement');
const siteHeader = document.querySelector('.site-header');
if (location.protocol === 'file:') {
  document.querySelectorAll('.program-video iframe').forEach((player) => {
    const videoId = new URL(player.src).pathname.split('/').filter(Boolean).pop();
    if (!videoId) return;
    const link = document.createElement('a');
    link.className = 'local-video-fallback';
    link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Este reproductor requiere abrir la página desde un servidor. Ver video en YouTube ↗';
    player.replaceWith(link);
  });
}
const siteHeaderSpacer = siteHeader ? document.createElement('div') : null;
if (siteHeaderSpacer) {
  siteHeaderSpacer.className = 'site-header-spacer';
  siteHeaderSpacer.setAttribute('aria-hidden', 'true');
  siteHeader.after(siteHeaderSpacer);
}
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
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
const institutionPhotoSection = document.querySelector('.page-inicio #institucion');
const institutionPhotoScene = institutionPhotoSection?.querySelector('.institution-photo-scene');
const institutionPhotoEnd = document.querySelector('.page-inicio #oferta');
const updateInstitutionPhotoPin = () => {
  if (!institutionPhotoSection || !institutionPhotoScene || !institutionPhotoEnd) return;
  const scrollY = window.scrollY;
  const sectionTop = institutionPhotoSection.getBoundingClientRect().top + scrollY;
  const endTop = institutionPhotoEnd.getBoundingClientRect().top + scrollY;
  institutionPhotoScene.classList.toggle('is-photo-pinned', scrollY + window.innerHeight >= sectionTop && scrollY < endTop);
  institutionPhotoScene.classList.toggle('is-photo-ended', scrollY >= endTop);
};
if (institutionPhotoScene) {
  updateInstitutionPhotoPin();
  window.addEventListener('scroll', updateInstitutionPhotoPin, { passive: true });
  window.addEventListener('resize', updateInstitutionPhotoPin, { passive: true });
}
const facadeRevealSection = document.querySelector('.page-inicio #institucion');
const facadeRevealEnd = document.querySelector('.page-inicio #aprendizaje');
const facadeBackdrop = facadeRevealSection ? document.createElement('div') : null;
if (facadeBackdrop) {
  facadeBackdrop.className = 'facade-fixed-backdrop';
  facadeBackdrop.setAttribute('aria-hidden', 'true');
  document.body.prepend(facadeBackdrop);
}
const updateFacadeReveal = () => {
  if (!facadeRevealSection || !facadeRevealEnd || !facadeBackdrop) return;
  const scrollY = window.scrollY;
  const sectionTop = facadeRevealSection.getBoundingClientRect().top + scrollY;
  const sectionEnd = facadeRevealEnd.getBoundingClientRect().top + scrollY;
  const facadeIsVisible = scrollY + window.innerHeight > sectionTop && scrollY + window.innerHeight < sectionEnd;
  document.body.classList.toggle('facade-reveal-active', facadeIsVisible);
  facadeBackdrop.classList.toggle('is-visible', facadeIsVisible);
};
if (facadeRevealSection && facadeRevealEnd) {
  updateFacadeReveal();
  window.addEventListener('scroll', updateFacadeReveal, { passive: true });
  window.addEventListener('resize', updateFacadeReveal, { passive: true });
}
const middlePhotoStage = document.querySelector('.page-inicio .middle-photo-stage');
const middlePhotoEnd = document.querySelector('.page-inicio #vida');
const lifeBackdrop = middlePhotoStage ? document.createElement('div') : null;
if (lifeBackdrop) {
  lifeBackdrop.className = 'life-fixed-backdrop';
  lifeBackdrop.setAttribute('aria-hidden', 'true');
  document.body.prepend(lifeBackdrop);
}
const updateLifeReveal = () => {
  if (!middlePhotoStage || !middlePhotoEnd || !lifeBackdrop) return;
  const scrollY = window.scrollY;
  const sectionTop = middlePhotoStage.getBoundingClientRect().top + scrollY;
  const sectionEnd = middlePhotoEnd.getBoundingClientRect().top + scrollY;
  const active = scrollY + window.innerHeight > sectionTop && scrollY < sectionEnd;
  document.body.classList.toggle('middle-photo-active', active);
  lifeBackdrop.classList.toggle('is-visible', active);
};
if (middlePhotoStage && middlePhotoEnd) {
  updateLifeReveal();
  window.addEventListener('scroll', updateLifeReveal, { passive: true });
  window.addEventListener('resize', updateLifeReveal, { passive: true });
}
const photoSections = [...document.querySelectorAll('main > section:not(.hero):not(.inner-hero)')].filter((section) => {
  const photo = section.querySelector('img[src]');
  if (!photo?.src) return false;
  section.style.setProperty('--scroll-photo-backdrop', `url("${photo.currentSrc || photo.src}")`);
  section.classList.add('scroll-photo-section');
  return true;
});
if (document.body.classList.contains('page-inicio')) {
  photoSections.forEach((section) => section.classList.remove('scroll-photo-section'));
  photoSections.length = 0;
}
const studentPhotoStages = [...document.querySelectorAll('.page-vida-estudiantil .student-static-photo')];
studentPhotoStages.forEach((stage) => stage.style.setProperty('--student-stage-position', stage.dataset.photoPosition || 'center 42%'));
const studentPhotoBackdrop = studentPhotoStages.length ? document.createElement('div') : null;
if (studentPhotoBackdrop) {
  studentPhotoBackdrop.className = 'student-fixed-backdrop';
  studentPhotoBackdrop.setAttribute('aria-hidden', 'true');
  document.body.prepend(studentPhotoBackdrop);
}
const updateStudentStaticPhoto = () => {
  if (!studentPhotoBackdrop) return;
  const fixedHeaderHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 83;
  const photoTrigger = window.scrollY + fixedHeaderHeight + 18;
  const activeStage = studentPhotoStages.filter((stage) => {
    const stageTop = stage.getBoundingClientRect().top + window.scrollY;
    return stageTop <= photoTrigger && stageTop + stage.offsetHeight > photoTrigger;
  }).at(-1);
  const active = Boolean(activeStage);
  document.body.classList.toggle('has-student-fixed-photo', active);
  if (!activeStage) {
    studentPhotoBackdrop.style.removeProperty('--student-fixed-image');
    return;
  }
  const image = activeStage.style.getPropertyValue('--student-static-image');
  studentPhotoBackdrop.style.setProperty('--student-fixed-image', image);
  studentPhotoBackdrop.style.setProperty('--student-fixed-position', activeStage.dataset.photoPosition || 'center 22%');
  const compactPhotoSize = activeStage.dataset.photoSize;
  studentPhotoBackdrop.style.setProperty('--student-fixed-size', window.innerWidth <= 760 && compactPhotoSize ? compactPhotoSize : 'cover');
};
if (studentPhotoBackdrop) {
  updateStudentStaticPhoto();
  window.addEventListener('scroll', updateStudentStaticPhoto, { passive: true });
  window.addEventListener('resize', updateStudentStaticPhoto, { passive: true });
}
const pinBackdropSections = [
  { section: document.querySelector('.page-inicio .photo-only-stage'), end: document.querySelector('.page-inicio #vida'), reverseStart: document.querySelector('.page-inicio #oferta'), image: 'assets/feria-proyectos.jpg', endBeforeViewport: true },
  { section: document.querySelector('.page-inicio #contacto'), end: document.querySelector('.page-inicio .site-footer'), image: 'assets/feria-proyectos.jpg' }
].filter(({ section, end, image }) => {
  if (document.body.classList.contains('page-inicio') || !section || !end || !image) return false;
  section.style.setProperty('--pin-photo-url', `url("${image}")`);
  section.classList.add('pin-backdrop-section');
  return true;
});
let previousPinScrollY = window.scrollY;
const updatePinBackdrops = () => {
  const scrollY = window.scrollY;
  const scrollingDown = scrollY >= previousPinScrollY;
  previousPinScrollY = scrollY;
  pinBackdropSections.forEach((pin) => {
    const { section, end } = pin;
    const startTop = section.getBoundingClientRect().top + scrollY;
    const endTop = end.getBoundingClientRect().top + scrollY - (pin.endBeforeViewport ? window.innerHeight : 0);
    const startTopVisible = scrollY + window.innerHeight >= startTop;
    const reverseStartTop = pin.reverseStart ? pin.reverseStart.getBoundingClientRect().top + scrollY : startTop - window.innerHeight;
    const active = pin.reverseStart
      ? (scrollingDown ? startTopVisible && scrollY < endTop : scrollY >= reverseStartTop && scrollY < endTop)
      : startTopVisible && scrollY < endTop;
    section.classList.toggle('pin-backdrop-active', active);
  });
};
if (pinBackdropSections.length) {
  updatePinBackdrops();
  window.addEventListener('scroll', updatePinBackdrops, { passive: true });
  window.addEventListener('resize', updatePinBackdrops, { passive: true });
}
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
    if (destination.origin === location.origin && destinationPage === currentPage && !destination.hash) {
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

// Show the newest home-page story once per browser for each published news item.
(() => {
  const modal = document.querySelector('#breaking-news-modal');
  const latestCard = document.querySelector('#noticias .news-grid .news-card[href^="novedades.html"]');
  if (!modal || !latestCard) return;

  const title = latestCard.querySelector('h3')?.textContent.trim();
  const date = latestCard.querySelector('small')?.textContent.trim();
  const image = latestCard.querySelector('img');
  if (!title || !image) return;

  const showThrough = latestCard.dataset.showThrough;
  if (showThrough && Date.now() > new Date(`${showThrough}T23:59:59-05:00`).getTime()) return;

  const storyKey = `${latestCard.getAttribute('href')}|${title}|${date || ''}|${latestCard.dataset.version || ''}|${image.currentSrc || image.src}`;
  const storageKey = 'eloy-alfaro-seen-breaking-news-session';
  try {
    if (sessionStorage.getItem(storageKey) === storyKey) return;
    sessionStorage.setItem(storageKey, storyKey);
  } catch {
    // Still show the notice for this page load if browser storage is unavailable.
  }

  modal.querySelector('.breaking-news-date').textContent = date || 'COMUNICADO OFICIAL';
  modal.querySelector('#breaking-news-title').textContent = title;
  modal.querySelector('#breaking-news-description').textContent = latestCard.dataset.description || 'Conoce la información más reciente de nuestra comunidad educativa.';
  const modalImage = modal.querySelector('.breaking-news-image');
  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt || title;
  const newsLink = modal.querySelector('.breaking-news-link');
  newsLink.href = latestCard.href;

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('breaking-news-open');
  };
  modal.querySelectorAll('[data-breaking-close]').forEach((control) => control.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
  newsLink.addEventListener('click', closeModal);

  window.setTimeout(() => {
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('breaking-news-open');
    modal.querySelector('.breaking-news-close').focus();
  }, 450);
})();

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

const memoryCarousel = document.querySelector('[data-memory-carousel]');
if (memoryCarousel) {
  const track = memoryCarousel.querySelector('.history-gallery');
  const cards = [...track.querySelectorAll('.memory-card')];
  const dotsContainer = memoryCarousel.querySelector('.memory-carousel-dots');
  const status = memoryCarousel.querySelector('.memory-carousel-status');
  const toggle = memoryCarousel.querySelector('[data-memory-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let page = 0;
  let perPage = 4;
  let timer;
  let paused = reducedMotion;
  const getPerPage = () => window.innerWidth <= 760 ? 2 : window.innerWidth <= 1000 ? 3 : 4;
  const pageCount = () => Math.max(1, Math.ceil(cards.length / perPage));
  const render = () => {
    page = (page + pageCount()) % pageCount();
    track.style.transform = `translateX(-${page * 100}%)`;
    [...dotsContainer.children].forEach((dot, index) => {
      dot.classList.toggle('is-active', index === page);
      dot.setAttribute('aria-current', index === page ? 'true' : 'false');
    });
    if (status) status.textContent = `${String(page + 1).padStart(2, '0')} / ${String(pageCount()).padStart(2, '0')}`;
  };
  const buildDots = () => {
    perPage = getPerPage();
    dotsContainer.replaceChildren(...Array.from({length: pageCount()}, (_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Mostrar grupo de fotografías ${index + 1}`);
      dot.addEventListener('click', () => { page = index; render(); });
      return dot;
    }));
    render();
  };
  const stop = () => { window.clearInterval(timer); timer = undefined; };
  const start = () => {
    if (paused || reducedMotion || timer || pageCount() < 2) return;
    timer = window.setInterval(() => { page += 1; render(); }, 4800);
  };
  memoryCarousel.querySelector('[data-memory-prev]')?.addEventListener('click', () => { page -= 1; render(); });
  memoryCarousel.querySelector('[data-memory-next]')?.addEventListener('click', () => { page += 1; render(); });
  toggle?.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
    toggle.textContent = paused ? '▶' : 'Ⅱ';
    if (paused) stop(); else start();
  });
  memoryCarousel.addEventListener('mouseenter', stop);
  memoryCarousel.addEventListener('mouseleave', start);
  memoryCarousel.addEventListener('focusin', stop);
  memoryCarousel.addEventListener('focusout', (event) => { if (!memoryCarousel.contains(event.relatedTarget)) start(); });
  window.addEventListener('resize', () => { const next = getPerPage(); if (next !== perPage) buildDots(); });
  buildDots();
  if (toggle && reducedMotion) {
    toggle.setAttribute('aria-pressed', 'true');
    toggle.setAttribute('aria-label', 'Reanudar carrusel');
    toggle.textContent = '▶';
  }
  start();
}
const offerPages = ['inicial.html', 'basica-elemental.html', 'basica-media.html', 'basica-superior.html', 'bachillerato-ciencias.html', 'bachillerato-soporte-tecnico.html', 'primero-basica.html', 'segundo-basica.html', 'tercero-basica.html', 'cuarto-basica.html', 'quinto-basica.html', 'sexto-basica.html', 'septimo-basica.html', 'octavo-basica.html', 'noveno-basica.html', 'decimo-basica.html', 'primero-bachillerato-ciencias.html', 'segundo-bachillerato-ciencias.html', 'tercero-bachillerato-ciencias.html', 'primero-bachillerato-tecnico.html', 'segundo-bachillerato-tecnico.html', 'tercero-bachillerato-tecnico.html'];
const navigationLinks = [...(navigation?.querySelectorAll('a[href]') || [])];
const pageName = (pathname) => pathname.split('/').pop() || 'index.html';
const updateActiveNavigation = () => {
  navigationLinks.forEach((link) => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    link.closest('.nav-dropdown')?.classList.remove('has-active');
  });
  const currentName = pageName(location.pathname);
  const currentHash = location.hash;
  let activeLink = navigationLinks.find((link) => {
    const target = new URL(link.href, location.href);
    return pageName(target.pathname) === currentName && target.hash === currentHash;
  });
  // A generic navigation link should remain active when the destination
  // page is opened at a section anchor (for example, a news article).
  if (!activeLink) {
    activeLink = navigationLinks.find((link) => {
      const target = new URL(link.href, location.href);
      return pageName(target.pathname) === currentName && !target.hash;
    });
  }
  if (!activeLink && offerPages.includes(currentName)) {
    activeLink = navigationLinks.find((link) => pageName(new URL(link.href, location.href).pathname) === 'oferta-educativa.html');
  }
  if (!activeLink) return;
  activeLink.classList.add('active');
  activeLink.setAttribute('aria-current', 'page');
  activeLink.closest('.nav-dropdown')?.classList.add('has-active');
};
updateActiveNavigation();
window.addEventListener('hashchange', updateActiveNavigation);
navigation?.querySelectorAll('.nav-submenu a').forEach((link) => {
  link.addEventListener('click', () => {
    const dropdown = link.closest('.nav-dropdown');
    dropdown?.removeAttribute('open');
    dropdown?.classList.add('submenu-closing');
  });
});
navigation?.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.classList.remove('submenu-closing');
    dropdown.setAttribute('open', '');
  });
  dropdown.addEventListener('mouseleave', () => {
    dropdown.removeAttribute('open');
    dropdown.classList.remove('submenu-closing');
  });
  dropdown.addEventListener('pointerleave', () => dropdown.classList.remove('submenu-closing'));
});
const homeNavLink = navigation?.querySelector('a[href="index.html"]');
if (homeNavLink) {
  try {
    if (sessionStorage.getItem('nav-home-clicked') === '1') {
      homeNavLink.classList.add('home-clicked');
      sessionStorage.removeItem('nav-home-clicked');
    }
  } catch {}
  homeNavLink.addEventListener('click', () => {
    homeNavLink.classList.add('home-clicked');
    try { sessionStorage.setItem('nav-home-clicked', '1'); } catch {}
  });
}
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

// Contadores informativos y visitas estimadas para el sitio estático.
(() => {
  const impactNodes = [...document.querySelectorAll('[data-impact-number]')];
  const impactFrames = new WeakMap();
  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const node = entry.target;
      const previousFrame = impactFrames.get(node);
      if (previousFrame) cancelAnimationFrame(previousFrame);
      if (!entry.isIntersecting) {
        node.textContent = '0';
        impactFrames.delete(node);
        return;
      }
      const target = Number(node.dataset.impactNumber);
      if (!Number.isFinite(target)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.textContent = new Intl.NumberFormat('es-EC').format(target);
        return;
      }
      node.textContent = '0';
      const duration = 2200;
      let startTime = 0;
      const tick = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = new Intl.NumberFormat('es-EC').format(Math.round(target * eased));
        if (progress < 1) impactFrames.set(node, requestAnimationFrame(tick));
        else impactFrames.delete(node);
      };
      impactFrames.set(node, requestAnimationFrame(tick));
    });
  }, { threshold: 0.3 });
  impactNodes.forEach((node) => {
    node.textContent = '0';
    impactObserver.observe(node);
  });
  const visitNodes = [...document.querySelectorAll('[data-site-visits]')];
  if (!visitNodes.length) return;
  const namespace = 'ueeloyalfaro-web';
  const counterKey = 'visitas-totales';
  const baseUrl = `https://counterapi.com/api/${namespace}/view/${counterKey}`;
  const date = new Date();
  const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  let shouldIncrement = !['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  try {
    const lastCounted = localStorage.getItem('ueea-visit-counted-day');
    if (lastCounted === today) shouldIncrement = false;
    else if (shouldIncrement) localStorage.setItem('ueea-visit-counted-day', today);
  } catch (_) { /* Si el navegador bloquea el almacenamiento, cuenta esta visita. */ }
  const url = shouldIncrement ? baseUrl : `${baseUrl}?readOnly=true`;
  fetch(url, { cache: 'no-store' })
    .then((response) => { if (!response.ok) throw new Error('No se pudo cargar el contador'); return response.json(); })
    .then((data) => {
      const value = Number(data.value);
      if (!Number.isFinite(value)) throw new Error('Respuesta de contador inválida');
      const formatted = new Intl.NumberFormat('es-EC').format(value);
      visitNodes.forEach((node) => { node.textContent = formatted; });
    })
    .catch(() => visitNodes.forEach((node) => { node.textContent = '—'; }));
})();

















