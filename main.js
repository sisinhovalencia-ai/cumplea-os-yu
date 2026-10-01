/* ════════════════════════════════════════════════════════
   NUESTRA CONSTELACIÓN — main.js
   11 estrellas · un corazón que se enciende en orden
════════════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────────────────
   ════════  AQUÍ VAN LAS IMÁGENES Y LOS TEXTOS  ════════
   Cada objeto es una estrella/recuerdo, en el orden en que
   se van a encender. Las posiciones (x, y en % del marco) forman
   un corazón SIMÉTRICO: si mueves una estrella de un lado, mueve
   su espejo (x → 100 - x) para que no se deforme. Para poner tu foto, cambia el valor de
   "img" por el nombre de tu archivo (debe estar junto a
   este index.html). Si falta la foto, se muestra un espacio
   con un ícono — no rompe nada.
──────────────────────────────────────────────────────── */
const MEMORIES = [
  {
    roman: 'I',
    x: 10, y: 29,
    title: 'Donde todo empezó',
    caption: 'Me preguntaste por tu prima sin saber que, sin quererlo, te estaba encontrando a ti. 😌❤️',
    img: 'foto1.jpg', // la tienda
  },
  {
    roman: 'II',
    x: 30, y: 19,
    title: 'Llegaste tú',
    caption: 'Llegué cansado del trabajo y, de repente, ahí estabas — y el cansancio dejó de importar.',
    img: 'foto2.jpg', // la visita a la casa
  },
  {
    roman: 'III',
    x: 39, y: 31,
    title: 'Lo que nos hace reír',
    caption: 'Cada vez que te hago enojar, en el fondo sé que te ríes — como esa vez que te mandé el video manifestando, jajaja.',
    img: 'foto3.jpg', // el video manifestando
  },
  {
    roman: 'IV',
    x: 61, y: 31,
    title: 'Lo que aprendimos',
    caption: 'Hubo días en que me enojaba por todo, por gente que no merecía nuestro tiempo — y aun así, elegimos quedarnos.',
    img: 'foto4.jpg', // las peleas
  },
  {
    roman: 'V',
    x: 70, y: 19,
    title: 'Estar ahí',
    caption: 'En diciembre, en medio de algo difícil para ti y tu familia, nos tomamos esa foto — porque incluso en lo duro, quise estar a tu lado.',
    img: 'foto5.jpg', // diciembre, la foto juntos
  },
  {
    roman: 'VI',
    x: 90, y: 29,
    title: 'Algo que no se marchita',
    caption: 'Tulipanes eternos para tus 17 — porque así quiero que sea esto: algo que dure.',
    img: 'foto6.jpg', // los tulipanes eternos
  },
  {
    roman: 'VII',
    x: 85, y: 49,
    title: 'Lo de todos los días',
    caption: 'No hizo falta una fecha especial para que te volvieras parte de mi rutina — un mensaje en la mañana, una llamada antes de dormir, y ya. Así de simple, así de nuestro.',
    img: 'foto7.jpg',
  },
  {
    roman: 'VIII',
    x: 67, y: 63,
    title: 'Verte crecer',
    caption: 'Te he visto esforzarte por lo que quieres y salir adelante incluso cuando no era fácil — y cada vez me convenzo más de la persona tan fuerte en la que te has convertido.',
    img: 'foto8.jpg',
  },
  {
    roman: 'IX',
    x: 50, y: 81,
    title: 'Lo que todavía falta',
    caption: 'Nos quedan planes por cumplir y lugares por conocer juntos — y aunque no sé todo lo que viene, sí sé con quién quiero verlo pasar.',
    img: 'foto9.jpg',
  },
  {
    roman: 'X',
    x: 33, y: 63,
    title: 'Quién eres para mí',
    caption: 'Mi pequeña gigante: pequeña en estatura, pero con una fuerza que me sostiene incluso en mis peores días. Eso es lo que veo cuando te miro.',
    img: 'foto10.jpg',
  },
  {
    roman: 'XI',
    x: 15, y: 49,
    title: 'Hoy, tus XVIII',
    caption: 'Once estrellas, un cielo entero, y todavía sigo eligiéndote a ti. Feliz cumpleaños, mi amor — esto apenas empieza.',
    img: 'foto11.jpg',
  },
];

// El "--" separa párrafos en la escena final.
const FINAL_MESSAGE = 'Feliz cumpleaños, mi amor. Gracias por ser siempre tan linda conmigo y por todo lo que compartimos. -- De verdad deseo que la vida nos permita seguir construyendo esto mientras Dios así lo quiera. -- Quiero que nunca dudes de algo: te amo, y mi cariño por ti es real. Pase lo que pase, siempre voy a estar para ti. -- Se acabó todo Yu ahora si. Me hice mucho daño tratando de conseguir que me amaras de verdad';

/* ────────────────────────────────────────────────────────
   AJUSTES
──────────────────────────────────────────────────────── */
// Fecha real de inicio (AAAA-MM-DD) para que el contador se actualice solo.
// Si queda vacío (''), se mantiene el número fijo del HTML (1383).
const START_DATE = '';

// Segundos que dura cada recuerdo antes de pasar solo. 0 = solo manual.
const MEMORY_AUTO_ADVANCE_SECONDS = 8;

const STAR_ANTICIPATION_MS = 550;  // pulso antes de encenderse cada estrella
const STAR_GAP_MS          = 500;  // pausa entre un recuerdo y el siguiente
const MEMORY_FADE_MS       = 480;  // debe coincidir con la transición del CSS
const AUDIO_FADE_MS        = 2000; // entrada suave de la música
const AUDIO_VOLUME         = 1;

/* ────────────────────────────────────────────────────────
   ESTADO
──────────────────────────────────────────────────────── */
const S = {
  litCount: 0,   // cuántas estrellas se han encendido
  started: false,
  closing: false, // evita cerrar un recuerdo dos veces
};

/* ────────────────────────────────────────────────────────
   REFERENCIAS DOM
──────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const skyCanvas     = $('sky');
const skyCtx        = skyCanvas.getContext('2d');
const moodGlow      = $('mood-glow');
const intro         = $('intro');
const btnBegin      = $('btn-begin');
const counter       = $('counter');
const counterNum    = $('counter-num');
const btnMute       = $('btn-mute');
const icoOn         = $('ico-sound-on');
const icoOff        = $('ico-sound-off');
const constellation = $('constellation');
const hint          = $('hint');
const hintText      = $('hint-text');
const hintProgress  = $('hint-progress');
const starsLayer    = $('stars-layer');
const linesSvg      = $('lines');
const memoryScene   = $('memory-scene');
const memoryPhoto   = $('memory-photo');
const memoryPhotoFallback = $('memory-photo-fallback');
const memoryRoman   = $('memory-roman');
const memoryTitle   = $('memory-title');
const memoryCaption = $('memory-caption');
const memoryNext    = $('memory-next');
const finalScene    = $('final');
const finalVideo    = $('final-video');
const finalMessage  = $('final-message');
const btnReplay     = $('btn-replay');
const audio         = $('audio');
const introSky      = $('intro-sky');

const SVG_NS = 'http://www.w3.org/2000/svg';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ────────────────────────────────────────────────────────
   TEMPORIZADORES — todos pasan por aquí para poder
   cancelarlos juntos al reiniciar (evita que queden
   "fantasmas" de una vuelta anterior).
──────────────────────────────────────────────────────── */
const timers = new Set();

function later(fn, ms) {
  const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
  timers.add(id);
  return id;
}

function cancelTimer(id) {
  clearTimeout(id);
  timers.delete(id);
}

function clearAllTimers() {
  timers.forEach(clearTimeout);
  timers.clear();
}

/* ────────────────────────────────────────────────────────
   CIELO ANIMADO DE FONDO
──────────────────────────────────────────────────────── */
let bgStars = [];
let skyW = 0, skyH = 0, dpr = 1;
let skyRaf = 0;

function setupCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  skyW = window.innerWidth;
  skyH = window.innerHeight;
  skyCanvas.width  = Math.round(skyW * dpr);
  skyCanvas.height = Math.round(skyH * dpr);
  skyCanvas.style.width  = skyW + 'px';
  skyCanvas.style.height = skyH + 'px';
  skyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function seedBgStars() {
  const n = Math.floor((skyW * skyH) / 9000);
  bgStars = [];
  for (let i = 0; i < n; i++) {
    bgStars.push({
      x: Math.random() * skyW,
      y: Math.random() * skyH,
      r: 0.4 + Math.random() * 1.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      base: 0.25 + Math.random() * 0.5,
    });
  }
}

function drawSky(t) {
  skyCtx.clearRect(0, 0, skyW, skyH);
  skyCtx.fillStyle = '#fff6e0';
  for (const s of bgStars) {
    const tw = s.base + 0.35 * Math.sin(t * s.speed + s.phase);
    skyCtx.globalAlpha = Math.max(0, Math.min(1, tw));
    skyCtx.beginPath();
    skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    skyCtx.fill();
  }
  skyCtx.globalAlpha = 1;
}

function skyLoop(now) {
  drawSky(now / 1000);
  skyRaf = requestAnimationFrame(skyLoop);
}

function startSky() {
  cancelAnimationFrame(skyRaf);
  if (reduceMotion.matches) { drawSky(0); return; } // cielo quieto
  skyRaf = requestAnimationFrame(skyLoop);
}

let resizeTimer = 0;
function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const widthChanged  = window.innerWidth !== skyW;
    const heightChanged = Math.abs(window.innerHeight - skyH) > 120; // ignora la barra del navegador móvil
    setupCanvas();
    if (widthChanged || heightChanged || !bgStars.length) seedBgStars();
    if (reduceMotion.matches) drawSky(0);
  }, 150);
}

/* ────────────────────────────────────────────────────────
   COLOR DEL CIELO (de frío a cálido según el progreso)
──────────────────────────────────────────────────────── */
function lerp(a, b, t) { return a + (b - a) * t; }

function setMood(progress) {
  const cool = [58, 77, 143];
  const warm = [232, 185, 101];
  const r = Math.round(lerp(cool[0], warm[0], progress));
  const g = Math.round(lerp(cool[1], warm[1], progress));
  const b = Math.round(lerp(cool[2], warm[2], progress));
  const alpha = 0.14 + progress * 0.1;
  moodGlow.style.background =
    `radial-gradient(circle at 50% 42%, rgba(${r},${g},${b},${alpha}), transparent 62%)`;
}

/* ────────────────────────────────────────────────────────
   CONTADOR DE DÍAS (opcional y dinámico)
──────────────────────────────────────────────────────── */
function updateCounterIfDynamic() {
  if (!START_DATE) return;
  const start = new Date(START_DATE + 'T00:00:00');
  if (isNaN(start.getTime())) return;
  const diffDays = Math.floor((Date.now() - start.getTime()) / 86400000);
  if (diffDays > 0) counterNum.textContent = diffDays;
}

/* ────────────────────────────────────────────────────────
   CONTORNO FANTASMA (vista previa tenue de toda la figura)
──────────────────────────────────────────────────────── */
function drawGhostOutline() {
  const pts = MEMORIES.map(m => `${m.x},${m.y}`).join(' L ');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', `M ${pts} Z`);
  path.setAttribute('class', 'ghostline');
  linesSvg.appendChild(path);
}

/* ────────────────────────────────────────────────────────
   GENERAR ESTRELLAS DE RECUERDOS
──────────────────────────────────────────────────────── */
function buildStars() {
  const frag = document.createDocumentFragment();
  MEMORIES.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'star-pt dim';
    el.style.left = m.x + '%';
    el.style.top  = m.y + '%';
    el.dataset.idx = i;
    el.setAttribute('aria-hidden', 'true'); // se enciende sola, no es interactiva

    const halo = document.createElement('div');
    halo.className = 'halo';

    const glyph = document.createElement('div');
    glyph.className = 'glyph';

    const roman = document.createElement('span');
    roman.className = 'roman';
    roman.textContent = m.roman;

    el.append(halo, glyph, roman);
    frag.appendChild(el);
  });
  starsLayer.appendChild(frag);
}

/* ────────────────────────────────────────────────────────
   ENCENDIDO AUTOMÁTICO DE ESTRELLAS
   Pulso de anticipación → se enciende → se abre su recuerdo.
   Al cerrarse el recuerdo, se enciende la siguiente.
──────────────────────────────────────────────────────── */
function lightStar(i) {
  if (!S.started || i < 0 || i >= MEMORIES.length) return;
  const el = starsLayer.querySelector(`[data-idx="${i}"]`);
  if (!el) return;

  el.classList.remove('dim');
  el.classList.add('next-up');

  later(() => {
    el.classList.remove('next-up');
    el.classList.add('lit');

    if (i > 0) drawConstLine(MEMORIES[i - 1], MEMORIES[i]);

    S.litCount = i + 1;
    setMood(S.litCount / MEMORIES.length);
    updateHint(S.litCount);
    openMemory(i);
  }, STAR_ANTICIPATION_MS);
}

/* ────────────────────────────────────────────────────────
   PASTILLA DE GUÍA (texto + progreso "I / XI")
──────────────────────────────────────────────────────── */
function updateHint(litCount) {
  if (litCount >= MEMORIES.length) {
    hint.classList.add('fade');
    return;
  }
  hintText.textContent = litCount === 0
    ? 'encendiendo el cielo…'
    : 'un recuerdo tras otro…';
  hintProgress.textContent =
    `${MEMORIES[litCount].roman} / ${MEMORIES[MEMORIES.length - 1].roman}`;
}

/* ────────────────────────────────────────────────────────
   LÍNEAS DE LA CONSTELACIÓN
──────────────────────────────────────────────────────── */
function drawConstLine(a, b) {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const line = document.createElementNS(SVG_NS, 'line');
  line.setAttribute('x1', a.x);
  line.setAttribute('y1', a.y);
  line.setAttribute('x2', b.x);
  line.setAttribute('y2', b.y);
  line.setAttribute('class', 'constline');
  line.style.strokeDasharray = len;
  line.style.strokeDashoffset = len;
  linesSvg.appendChild(line);
  requestAnimationFrame(() => {
    line.style.transition = 'stroke-dashoffset 900ms ease';
    line.style.strokeDashoffset = 0;
  });
}

function closeHeartLoop() {
  drawConstLine(MEMORIES[MEMORIES.length - 1], MEMORIES[0]);
}

/* ────────────────────────────────────────────────────────
   ESCENA DE RECUERDO — foto a pantalla completa, tipo cine
──────────────────────────────────────────────────────── */
let memoryPendingIdx = -1;
let memoryAutoTimer = 0;
let memoryRemainingMs = 0;
let memoryDeadline = 0;
let imgToken = 0;

function showPhoto() {
  memoryPhoto.style.display = 'block';
  memoryPhotoFallback.style.display = 'none';
}

function hidePhoto() {
  memoryPhoto.style.display = 'none';
  memoryPhotoFallback.style.display = 'flex';
}

function loadMemoryImage(m) {
  const token = ++imgToken;
  hidePhoto();
  memoryPhoto.alt = m.title;

  if (!m.img) {
    memoryPhoto.onload = memoryPhoto.onerror = null;
    memoryPhoto.removeAttribute('src');
    return;
  }

  // Los manejadores van ANTES del src para no perder el evento si la foto ya está en caché.
  memoryPhoto.onload  = () => { if (token === imgToken) showPhoto(); };
  memoryPhoto.onerror = () => { if (token === imgToken) hidePhoto(); };
  memoryPhoto.src = m.img;
  if (memoryPhoto.complete && memoryPhoto.naturalWidth > 0) showPhoto();
}

function preloadNextImage(i) {
  const next = MEMORIES[i + 1];
  if (next && next.img) new Image().src = next.img;
}

function scheduleAutoAdvance(ms) {
  cancelTimer(memoryAutoTimer);
  if (ms <= 0) return;
  memoryRemainingMs = ms;
  memoryDeadline = performance.now() + ms;
  memoryAutoTimer = later(closeMemory, ms);
}

function openMemory(i) {
  const m = MEMORIES[i];
  memoryPendingIdx = i;
  S.closing = false;

  memoryRoman.textContent = `estrella ${m.roman}`;
  memoryTitle.textContent = m.title;
  memoryCaption.textContent = m.caption;
  loadMemoryImage(m);
  preloadNextImage(i);

  memoryScene.classList.remove('hidden');
  requestAnimationFrame(() => {
    memoryScene.classList.add('open');
    memoryNext.focus({ preventScroll: true });
  });

  scheduleAutoAdvance(MEMORY_AUTO_ADVANCE_SECONDS * 1000);
}

function closeMemory() {
  if (S.closing || memoryPendingIdx < 0) return;
  S.closing = true;
  cancelTimer(memoryAutoTimer);
  memoryScene.classList.remove('open');
  later(() => {
    memoryScene.classList.add('hidden');
    afterMemoryClosed();
  }, MEMORY_FADE_MS);
}

function afterMemoryClosed() {
  const idx = memoryPendingIdx;
  memoryPendingIdx = -1;
  S.closing = false;
  if (idx < 0) return;

  if (idx === MEMORIES.length - 1) {
    closeHeartLoop();
    later(showFinal, 1500);
  } else {
    later(() => lightStar(idx + 1), STAR_GAP_MS);
  }
}

/* ────────────────────────────────────────────────────────
   ESCENA FINAL
──────────────────────────────────────────────────────── */
function renderFinalMessage() {
  finalMessage.textContent = '';
  const parts = FINAL_MESSAGE.split(/\s*--\s*/).filter(Boolean);
  parts.forEach((part, i) => {
    if (i > 0) finalMessage.append(document.createElement('br'), document.createElement('br'));
    finalMessage.append(document.createTextNode(part));
  });
}

function showFinal() {
  renderFinalMessage();
  constellation.classList.add('hidden');
  counter.classList.add('hidden');
  finalScene.classList.remove('hidden');
  finalVideo.currentTime = 0;
  finalVideo.play().catch(() => { /* si no hay video puesto, no pasa nada */ });
}

/* ────────────────────────────────────────────────────────
   AUDIO
──────────────────────────────────────────────────────── */
let audioFadeRaf = 0;

function fadeAudioTo(target, ms) {
  cancelAnimationFrame(audioFadeRaf);
  if (reduceMotion.matches || ms <= 0) { audio.volume = target; return; }
  const from = audio.volume;
  const t0 = performance.now();
  const step = now => {
    const k = Math.min(1, (now - t0) / ms);
    audio.volume = from + (target - from) * k;
    if (k < 1) audioFadeRaf = requestAnimationFrame(step);
  };
  audioFadeRaf = requestAnimationFrame(step);
}

function startAudio() {
  audio.volume = 0;
  audio.play()
    .then(() => fadeAudioTo(AUDIO_VOLUME, AUDIO_FADE_MS))
    .catch(() => { audio.volume = AUDIO_VOLUME; /* se puede activar luego con el botón de música */ });
}

function syncMuteUI() {
  icoOn.style.display  = audio.muted ? 'none' : '';
  icoOff.style.display = audio.muted ? '' : 'none';
  btnMute.setAttribute('aria-pressed', String(audio.muted));
  btnMute.setAttribute('aria-label', audio.muted ? 'Activar música' : 'Silenciar música');
}

function toggleMute() {
  audio.muted = !audio.muted;
  // Si el navegador bloqueó el autoplay, este toque sirve para arrancar la música.
  if (!audio.muted && audio.paused && S.started) startAudio();
  syncMuteUI();
}

/* ────────────────────────────────────────────────────────
   INICIO / REINICIO
──────────────────────────────────────────────────────── */
function begin() {
  if (S.started) return;
  S.started = true;
  intro.classList.add('leaving');
  later(() => intro.classList.add('hidden'), 700);
  counter.classList.remove('hidden');
  btnMute.classList.remove('hidden');
  constellation.classList.remove('hidden');
  startAudio();
  later(() => lightStar(0), 900); // deja ver el cielo un instante antes de la primera estrella
}

function restart() {
  clearAllTimers();
  cancelAnimationFrame(audioFadeRaf);

  S.litCount = 0;
  S.started = false;
  S.closing = false;
  memoryPendingIdx = -1;
  imgToken++;
  setMood(0);

  linesSvg.textContent = '';
  starsLayer.textContent = '';
  buildStars();
  drawGhostOutline();
  updateHint(0);

  hint.classList.remove('fade');
  memoryScene.classList.remove('open');
  memoryScene.classList.add('hidden');
  finalScene.classList.add('hidden');
  constellation.classList.add('hidden');
  counter.classList.add('hidden');
  btnMute.classList.add('hidden');
  intro.classList.remove('hidden', 'leaving');

  audio.pause();
  audio.currentTime = 0;
  finalVideo.pause();
  finalVideo.currentTime = 0;

  updateCounterIfDynamic();
  btnBegin.focus({ preventScroll: true });
}

/* ────────────────────────────────────────────────────────
   CONSTELACIÓN DE LA PORTADA: CAPRICORNIO
   Dibuja dentro de #intro-sky la constelación del signo de
   su cumpleaños. Las posiciones son aproximadas (ascensión
   recta y declinación proyectadas sobre el plano, con el este
   a la izquierda como en un mapa celeste; x → derecha, y → abajo).
   "outline" es el orden en que se traza el contorno.
──────────────────────────────────────────────────────── */
const CAPRICORNUS = {
  stars: {
    alpha:   { x: 12.76, y: 12.5, arm: 1.8 },  // Algedi (cuerno)
    beta:    { x: 12.0,  y: 14.8, arm: 1.9 },  // Dabih
    psi:     { x: 6.1,   y: 25.3, r: 0.5 },
    omega:   { x: 4.8,   y: 26.9, r: 0.5 },
    theta:   { x: 1.4,   y: 17.2, r: 0.55 },
    iota:    { x: -2.4,  y: 16.8, r: 0.5 },
    zeta:    { x: -3.55, y: 22.4, arm: 1.4 },
    gamma:   { x: -6.6,  y: 16.7, arm: 1.5 },  // Nashira
    epsilon: { x: -6.0,  y: 19.5, r: 0.5 },
    delta:   { x: -8.3,  y: 16.1, arm: 2.2, gold: true }, // Deneb Algedi (cola)
  },
  outline: ['alpha', 'theta', 'iota', 'gamma', 'delta', 'epsilon', 'zeta', 'omega', 'psi', 'beta', 'alpha'],
};

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildIntroSky() {
  if (!introSky) return;
  introSky.textContent = '';
  const rand = mulberry32(1383);
  const f = n => n.toFixed(2);
  const mk = (tag, attrs, parent) => {
    const el = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    (parent || introSky).appendChild(el);
    return el;
  };
  const glyph = (x, y, A) => {
    const w = A * 0.27;
    return `M${f(x)} ${f(y - A)} L${f(x + w)} ${f(y - w)} L${f(x + A)} ${f(y)} L${f(x + w)} ${f(y + w)} ` +
           `L${f(x)} ${f(y + A)} L${f(x - w)} ${f(y + w)} L${f(x - A)} ${f(y)} L${f(x - w)} ${f(y - w)} Z`;
  };

  // Escala y posición de la figura dentro del lienzo 100 × 180
  const K = 3.6, CX = 50, CY = 34, OX = 2.25, OY = 19.7;
  const pts = {};
  for (const id in CAPRICORNUS.stars) {
    const s = CAPRICORNUS.stars[id];
    pts[id] = { ...s, x: CX + (s.x - OX) * K, y: CY + (s.y - OY) * K };
  }
  const named = Object.values(pts);

  // 1) Resplandor azul de nebulosa detrás de la figura
  const defs = mk('defs', {});
  const grad = mk('radialGradient', { id: 'isky-neb' }, defs);
  mk('stop', { offset: '0',   'stop-color': '#5a7be8', 'stop-opacity': '0.32' }, grad);
  mk('stop', { offset: '0.6', 'stop-color': '#3a4d8f', 'stop-opacity': '0.15' }, grad);
  mk('stop', { offset: '1',   'stop-color': '#3a4d8f', 'stop-opacity': '0' }, grad);
  const hgrad = mk('radialGradient', { id: 'isky-halo-g' }, defs);
  mk('stop', { offset: '0', 'stop-color': '#e8b965', 'stop-opacity': '0.5' }, hgrad);
  mk('stop', { offset: '1', 'stop-color': '#e8b965', 'stop-opacity': '0' }, hgrad);
  mk('ellipse', { cx: 50, cy: 36, rx: 58, ry: 36, fill: 'url(#isky-neb)' });

  // 2) Polvo de estrellas (menos denso detrás del texto)
  const dust = mk('g', {});
  for (let i = 0; i < 160; i++) {
    const x = rand() * 100, y = rand() * 180;
    const inText = x > 14 && x < 86 && y > 64 && y < 150;
    if (inText && rand() < 0.8) continue;
    mk('circle', { cx: f(x), cy: f(y), r: f(0.1 + rand() * 0.14), class: 'isky-dust' }, dust);
  }

  // 3) Estrellas tenues del campo, alrededor de la constelación
  const field = [];
  for (let n = 0; n < 200 && field.length < 18; n++) {
    const x = 4 + rand() * 92, y = 3 + rand() * 63;
    if (named.some(s => Math.hypot(s.x - x, s.y - y) < 6)) continue;
    if (field.some(s => Math.hypot(s.x - x, s.y - y) < 7)) continue;
    field.push({ x, y });
  }
  const fieldG = mk('g', {});
  field.forEach(s => mk('circle', {
    cx: f(s.x), cy: f(s.y), r: f(0.22 + rand() * 0.2), class: 'isky-star field',
  }, fieldG));

  // 4) Contorno: el trazo recorre la figura, del cuerno a la cola y de vuelta
  const lines = mk('g', {});
  const ids = CAPRICORNUS.outline;
  for (let i = 0; i < ids.length - 1; i++) {
    const a = pts[ids[i]], b = pts[ids[i + 1]];
    const d = `M${f(a.x)} ${f(a.y)} L${f(b.x)} ${f(b.y)}`;
    ['isky-line glow', 'isky-line'].forEach(cls => {
      const p = mk('path', { d, pathLength: 1, class: cls }, lines);
      p.style.animationDelay = (1.0 + i * 0.45).toFixed(2) + 's';
    });
  }

  // 5) Las estrellas de Capricornio, encima de las líneas
  const starG = mk('g', {});
  starG.style.animation = 'isky-in 1.2s ease 0.4s backwards';
  named.forEach(s => {
    const cls = 'isky-star' + (s.gold ? ' gold' : '');
    let el;
    if (s.arm) {
      mk('circle', { cx: f(s.x), cy: f(s.y), r: f(s.arm * 2.6), class: 'isky-halo' }, starG);
      el = mk('path', { d: glyph(s.x, s.y, s.arm), class: cls + ' isky-tw' }, starG);
      el.style.animationDuration = (2.8 + rand() * 2.6).toFixed(2) + 's';
      el.style.animationDelay = (-rand() * 4).toFixed(2) + 's';
    } else {
      mk('circle', { cx: f(s.x), cy: f(s.y), r: s.r, class: cls }, starG);
    }
  });

  // 6) Nombre de la constelación, dentro del triángulo de la figura
  const label = mk('text', {
    x: 52, y: 36, 'text-anchor': 'middle',
    transform: 'rotate(-12 52 36)', class: 'isky-label',
  });
  label.textContent = 'CAPRICORNIO';
}

/* ────────────────────────────────────────────────────────
   EVENTOS GLOBALES
──────────────────────────────────────────────────────── */
// Con la pestaña oculta: se pausa el cielo y el temporizador del recuerdo.
function onVisibilityChange() {
  if (document.hidden) {
    cancelAnimationFrame(skyRaf);
    if (memoryAutoTimer && timers.has(memoryAutoTimer)) {
      memoryRemainingMs = Math.max(0, memoryDeadline - performance.now());
      cancelTimer(memoryAutoTimer);
    }
  } else {
    startSky();
    if (memoryPendingIdx >= 0 && !S.closing && MEMORY_AUTO_ADVANCE_SECONDS > 0) {
      scheduleAutoAdvance(memoryRemainingMs || 1000);
    }
  }
}

// Teclado: Esc o → pasan al siguiente recuerdo.
function onKeyDown(e) {
  if (memoryScene.classList.contains('hidden')) return;
  if (e.key === 'Escape' || e.key === 'ArrowRight') {
    e.preventDefault();
    closeMemory();
  }
}

/* ────────────────────────────────────────────────────────
   ARRANQUE
──────────────────────────────────────────────────────── */
function init() {
  setupCanvas();
  seedBgStars();
  startSky();
  buildIntroSky();
  setMood(0);

  updateCounterIfDynamic();
  buildStars();
  drawGhostOutline();
  updateHint(0);
  syncMuteUI();

  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibilityChange);
  document.addEventListener('keydown', onKeyDown);
  reduceMotion.addEventListener('change', startSky);

  btnBegin.addEventListener('click', begin);
  btnMute.addEventListener('click', toggleMute);
  memoryNext.addEventListener('click', closeMemory);
  btnReplay.addEventListener('click', restart);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
   }
