/* Todos los comportamientos son locales. No se necesitan peticiones ni servidor. */
'use strict';
document.body.classList.add('js-enabled');
const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* El navegador puede bloquear almacenamiento en file://. */ }
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
  themeButton.firstElementChild.textContent = theme === 'dark' ? '☀' : '☾';
}
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme.matches ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(savedTheme);
  try { localStorage.setItem('portfolio-theme', savedTheme); } catch { /* El tema sigue funcionando sin persistencia. */ }
});
systemTheme.addEventListener('change', event => { if (!savedTheme) setTheme(event.matches ? 'dark' : 'light'); });

// Menú móvil: clic, Escape y clic fuera para cerrar.
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navegacion');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  menuButton.firstElementChild.textContent = '☰';
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuButton.firstElementChild.textContent = open ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { const wasOpen = navigation.classList.contains('open'); closeMenu(); if (wasOpen) menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
window.matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);

// Filtrar sin reconstruir tarjetas: el HTML es la fuente del contenido.
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => { filter.classList.toggle('active', filter === button); filter.setAttribute('aria-pressed', String(filter === button)); });
  let count = 0;
  projects.forEach(project => { project.hidden = button.dataset.filter !== 'todos' && !project.dataset.category.split(' ').includes(button.dataset.filter); if (!project.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} proyectos mostrados.`;
}));

// Avisos explícitos para archivos y repositorios que aún no has añadido.
const notice = document.querySelector('#notice-dialog');
function showNotice(title, message) {
  document.querySelector('#notice-title').textContent = title;
  document.querySelector('#notice-message').textContent = message;
  if (typeof notice.showModal === 'function') notice.showModal(); else window.alert(`${title}: ${message}`);
}
document.querySelectorAll('[data-document]').forEach(link => {
  const path = link.dataset.document.trim();
  if (path) {
    link.href = path;
    if (link.dataset.documentLabel === 'Currículum') link.setAttribute('download', '');
    else { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  } else link.addEventListener('click', event => {
    event.preventDefault();
    showNotice(`${link.dataset.documentLabel}: pendiente`, 'Este portafolio contiene información de ejemplo. Añade tu PDF en assets/cv/ o assets/certificados/ y configura el atributo data-document de este enlace en index.html. Encontrarás los pasos en README.md.');
  });
});
document.querySelectorAll('[data-pending]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); showNotice('Enlace pendiente', link.dataset.pending); }));
document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => notice.close()));
notice.addEventListener('click', event => { if (event.target === notice) { const box = notice.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) notice.close(); } });

document.querySelector('#copy-email').addEventListener('click', async event => {
  const email = event.currentTarget.dataset.email;
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    status.textContent = 'Correo copiado.';
  } catch { status.textContent = `Copia el correo manualmente: ${email}`; }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Mejora progresiva: sin IntersectionObserver el contenido queda visible.
if ('IntersectionObserver' in window) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .06 });
    document.querySelectorAll('.reveal').forEach(section => { section.classList.add('reveal-ready'); revealObserver.observe(section); });
  }
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
