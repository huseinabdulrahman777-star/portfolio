// ═══════════════════════════════════════════════════════
//  PORTFOLIO BUT RT – JAVASCRIPT
//  Navigation SPA + Typing effect + Sidebar mobile
// ═══════════════════════════════════════════════════════

/* ── NAVIGATION ── */
function navigateTo(sectionId) {
  // Désactiver toutes les sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  // Activer la section cible
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Mettre à jour le lien actif dans la nav
  const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Fermer la sidebar mobile
  closeSidebar();

  // Mettre à jour l'URL
  history.pushState(null, '', `#${sectionId}`);
}

// Interception des clics sur les liens internes
document.querySelectorAll('.nav-link[data-section]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    navigateTo(sectionId);
  });
});

// Boutons CTA dans le hero
document.querySelectorAll('[onclick]').forEach(el => {
  const onclickAttr = el.getAttribute('onclick');
  if (onclickAttr) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const match = onclickAttr.match(/navigateTo\(['"](.+)['"]\)/);
      if (match) navigateTo(match[1]);
    });
    el.removeAttribute('onclick');
  }
});

/* ── NAVIGATION AU CHARGEMENT ── */
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    navigateTo(hash);
  } else {
    navigateTo('accueil');
  }
  startTypingEffect();
  animateMasteryBars();
});

window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) navigateTo(hash);
});

/* ── SIDEBAR MOBILE ── */
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');

// Créer l'overlay
const overlay = document.createElement('div');
overlay.id = 'sidebar-overlay';
document.body.appendChild(overlay);

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
});

overlay.addEventListener('click', closeSidebar);

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  menuToggle.textContent = '☰';
}

/* ── TYPING EFFECT – ACCUEIL ── */
function startTypingEffect() {
  const subtitleEl = document.getElementById('typed-subtitle');
  if (!subtitleEl) return;

  const lines = [
    'Étudiant BUT Réseaux & Télécommunications',
    'Parcours Cybersécurité – S1/S2',
    'Passion : Réseaux · Sécurité · Code',
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let delay = 100;

  function type() {
    const current = lines[lineIdx];

    if (!deleting) {
      subtitleEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        delay = 2200; // pause avant de supprimer
      } else {
        delay = 60 + Math.random() * 40;
      }
    } else {
      subtitleEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        delay = 400;
      } else {
        delay = 30;
      }
    }
    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

/* ── MASTERY BARS ANIMATION ── */
function animateMasteryBars() {
  const bars = document.querySelectorAll('.mastery-fill');
  bars.forEach(bar => {
    const level = bar.style.getPropertyValue('--level');
    bar.style.setProperty('--level', '0%');
    setTimeout(() => {
      bar.style.setProperty('--level', level);
    }, 300);
  });
}

// Re-animer les barres quand on change de section
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(animateMasteryBars, 100);
  });
});

/* ── HIGHLIGHT SECTION ACTIVE AU SCROLL (optionnel) ── */
// Pour une navigation à page unique avec scroll natif, on pourrait
// utiliser IntersectionObserver mais avec le système SPA on
// gère manuellement via navigateTo().

/* ── CONSOLE EASTER EGG ── */
console.log(
  '%c Portfolio BUT RT – Cybersécurité\n%c Développé avec HTML · CSS · JS',
  'color: #00D4FF; font-size: 16px; font-weight: bold; font-family: monospace',
  'color: #1AFF8C; font-size: 12px; font-family: monospace'
);