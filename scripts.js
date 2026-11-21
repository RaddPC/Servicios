//* ============================================================
   ✏️ EDITA AQUÍ TUS DATOS (todo el sitio se actualiza solo)
   ============================================================ */
const CONFIG = {
  whatsapp: '573015122607',                       // número con código de país, sin + ni espacios
  social: {
    facebook:  'https://www.facebook.com/TU-PAGINA',
    instagram: 'https://www.instagram.com/TU-USUARIO',
    tiktok:    'https://www.tiktok.com/@TU-USUARIO'
  },
  empresa: {
    nombre:      'Radd PC',
    razon:       'Razón social: Radd PC (editar)',
    nit:         'NIT: 000.000.000-0 (editar)',
    direccion:   'Dirección, Ciudad, Colombia (editar)',
    horario:     'Lunes a sábado · 8:00 a.m. – 6:00 p.m.',
    email:       'contacto@tudominio.com',
    telefono:    '+57 301 512 2607',
    descripcion: 'Mantenimiento preventivo y correctivo de computadores para hogares y empresas. Rendimiento, análisis y diagnóstico definitivo.'
  },
  politicas: { privacidad: '#', terminos: '#', garantia: '#' }   // pon aquí los enlaces a tus políticas
};
/* ============================================================ */

(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const E = CONFIG.empresa;

  // Datos editables
  $$('[data-wa]').forEach(b => { b.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(b.dataset.wa)}`; b.target = '_blank'; b.rel = 'noopener'; });
  $$('[data-social]').forEach(a => a.href = CONFIG.social[a.dataset.social]);
  $$('[data-emp]').forEach(el => el.textContent = E[el.dataset.emp] || '');
  $$('[data-mail]').forEach(a => { a.href = 'mailto:' + E.email; a.textContent = E.email; });
  $$('[data-tel]').forEach(a => { a.href = 'tel:' + E.telefono.replace(/\s/g, ''); a.textContent = E.telefono; });
  $$('[data-pol]').forEach(a => a.href = CONFIG.politicas[a.dataset.pol]);
  $('#y').textContent = new Date().getFullYear();

  // Logo: si no existe images/logo.png muestra un monograma provisional
  const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='9' fill='%232f6bff'/%3E%3Ctext x='20' y='28' font-size='24' text-anchor='middle' fill='white' font-family='Arial' font-weight='700'%3ER%3C/text%3E%3C/svg%3E";
  $$('img[data-logo]').forEach(i => { const f = () => { i.onerror = null; i.src = FALLBACK; }; i.onerror = f; if (i.complete && !i.naturalWidth) f(); });

  // Imágenes de secciones: marcador si falta el archivo
  $$('.media img').forEach(i => { const f = () => { if (i.parentElement) { i.parentElement.classList.add('x'); i.remove(); } }; i.addEventListener('error', f); if (i.complete && !i.naturalWidth) f(); });

  // Menú móvil
  const burger = $('#burger'), menu = $('#menu');
  const toggle = v => { menu.classList.toggle('open', v); burger.setAttribute('aria-expanded', v); document.body.style.overflow = v ? 'hidden' : ''; };
  burger.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  menu.addEventListener('click', e => e.target.tagName === 'A' && toggle(false));
  addEventListener('scroll', () => $('#nav').classList.toggle('s', scrollY > 30), { passive: true });

  // Cursor que hace clic sobre los botones
  const fc = $('#fc'); let timers = [];
  const later = (f, t) => timers.push(setTimeout(f, t));
  const stop = btn => { timers.forEach(clearTimeout); timers = []; fc.style.opacity = 0; fc.classList.remove('click'); btn && btn.classList.remove('pressed'); };
  const demo = btn => {
    if (reduce) return; stop();
    const r = btn.getBoundingClientRect(), tx = r.left + r.width * .55, ty = r.top + r.height * .45;
    fc.style.transition = 'none'; fc.style.transform = `translate(${tx + 70}px,${ty + 60}px)`; void fc.offsetWidth; fc.style.transition = '';
    fc.style.opacity = 1; fc.style.transform = `translate(${tx}px,${ty}px)`;
    later(() => { fc.classList.add('click'); btn.classList.add('pressed'); }, 800);
    later(() => { fc.classList.remove('click'); btn.classList.remove('pressed'); }, 1050);
    later(() => { fc.style.opacity = 0; }, 1800);
  };
  const touch = matchMedia('(hover: none)').matches;
  $$('.pill, .wa-float').forEach(b => {
    if (!touch) { b.addEventListener('pointerenter', () => demo(b)); b.addEventListener('pointerleave', () => stop(b)); }
    b.addEventListener('focus', () => !touch && demo(b));
    b.addEventListener('blur', () => stop(b));
  });

  // Paneles: aparición, puntos laterales y demo de clic en móvil
  const panels = $$('.panel'), dots = $('#dots');
  panels.forEach(p => { const a = document.createElement('a'); a.href = '#' + p.id; a.setAttribute('aria-label', p.id); dots.appendChild(a); });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    [...dots.children].forEach((d, j) => d.classList.toggle('on', panels.indexOf(e.target) === j));
    const b = e.target.querySelector('.pill.solid');
    if (touch && b && !e.target.dataset.d) { e.target.dataset.d = 1; setTimeout(() => demo(b), 900); }
  }), { threshold: .05 });
  if ('IntersectionObserver' in window) panels.forEach(p => io.observe(p)); else panels.forEach(p => p.classList.add('in'));
  // Seguro extra: nunca dejar una sección oculta
  const reveal = () => panels.forEach(p => { const r = p.getBoundingClientRect(); if (r.top < innerHeight * .9 && r.bottom > 0) p.classList.add('in'); });
  addEventListener('scroll', reveal, { passive: true }); addEventListener('resize', reveal); reveal();
  setTimeout(() => panels.forEach(p => p.classList.add('in')), 3000);

  // Robot: leve movimiento con el mouse
  const robot = $('#robot');
  if (robot && !reduce) addEventListener('pointermove', e => {
    robot.style.transform = `translate(${(e.clientX / innerWidth - .5) * -18}px,${(e.clientY / innerHeight - .5) * -10}px)`;
  }, { passive: true });

  // Red de partículas del hero
  const cv = $('#net'), cx = cv.getContext('2d'); let W, H, pts = [];
  const size = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; pts = Array.from({ length: Math.min(70, W / 18 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 })); };
  const tick = () => {
    cx.clearRect(0, 0, W, H);
    pts.forEach((p, i) => {
      p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
      cx.fillStyle = 'rgba(56,214,255,.7)'; cx.fillRect(p.x, p.y, 1.6, 1.6);
      for (let j = i + 1; j < pts.length; j++) { const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 120) { cx.strokeStyle = `rgba(47,107,255,${.28 * (1 - d / 120)})`; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); } }
    });
    requestAnimationFrame(tick);
  };
  size(); addEventListener('resize', size); if (!reduce) tick();

  // Formulario → WhatsApp
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target), n = d.get('nombre').trim(), m = d.get('msg').trim();
    if (!n || !m) { $('#err').textContent = 'Completa tu nombre y el problema.'; return; }
    $('#err').textContent = '';
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Hola Radd PC, soy ${n}. Servicio: ${d.get('servicio')}. ${m}`)}`, '_blank', 'noopener');
  });
})();
