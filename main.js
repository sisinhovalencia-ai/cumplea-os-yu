/* ════════════════════════════════════════════════════════
   NUESTRA CONSTELACIÓN — main.js
   6 estrellas · un corazón que se enciende en orden
════════════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────────────────
   ════════  AQUÍ VAN LAS IMÁGENES Y LOS TEXTOS  ════════
   Cada objeto es una estrella/recuerdo, en el orden en que
   se van a tocar. Para poner tu foto, cambia el valor de
   "img" por el nombre de tu archivo (debe estar junto a
   este index.html). Si no pones ninguna, se muestra un
   espacio en blanco con un ícono — no rompe nada.
──────────────────────────────────────────────────────── */
const MEMORIES = [
  {
    roman: 'I',
    x: 32, y: 33,
    title: 'Donde todo empezó',
    caption: 'Me preguntaste por tu prima sin saber que, sin quererlo, te estaba encontrando a ti. 😌❤️',
    img: 'foto1.jpg', // AQUÍ VA LA IMAGEN 1 — la tienda
  },
  {
    roman: 'II',
    x: 50, y: 28,
    title: 'Llegaste tú',
    caption: 'Llegué cansado del trabajo y, de repente, ahí estabas — y el cansancio dejó de importar.',
    img: 'foto2.jpg', // AQUÍ VA LA IMAGEN 2 — la visita a la casa
  },
  {
    roman: 'III',
    x: 68, y: 33,
    title: 'Lo que nos hace reír',
    caption: 'Cada vez que te hago enojar, en el fondo sé que te ríes — como esa vez que te mandé el video manifestando, jajaja.',
    img: 'foto3.jpg', // AQUÍ VA LA IMAGEN 3 — el video manifestando
  },
  {
    roman: 'IV',
    x: 74, y: 50,
    title: 'Lo que aprendimos',
    caption: 'Hubo días en que me enojaba por todo, por gente que no merecía nuestro tiempo — y aun así, elegimos quedarnos.',
    img: 'foto4.jpg', // AQUÍ VA LA IMAGEN 4 — las peleas
  },
  {
    roman: 'V',
    x: 50, y: 72,
    title: 'Estar ahí',
    caption: 'En diciembre, en medio de algo difícil para ti y tu familia, nos tomamos esa foto — porque incluso en lo duro, quise estar a tu lado.',
    img: 'foto5.jpg', // AQUÍ VA LA IMAGEN 5 — diciembre, la foto juntos
  },
  {
    roman: 'VI',
    x: 26, y: 50,
    title: 'Algo que no se marchita',
    caption: 'Tulipanes eternos para tus 17 — porque así quiero que sea esto: algo que dure.',
    img: 'foto6.jpg', // AQUÍ VA LA IMAGEN 6 — los tulipanes eternos
  },
];

const FINAL_MESSAGE = 'Feliz cumpleaños, mi amor. Gracias por ser siempre tan linda conmigo y por todo lo que compartimos. -- De verdad deseo que la vida nos permita seguir construyendo esto mientras Dios así lo quiera. -- Quiero que nunca dudes de algo: te amo, y mi cariño por ti es real. Pase lo que pase, siempre voy a estar para ti.';

/* ────────────────────────────────────────────────────────
   ESTADO
──────────────────────────────────────────────────────── */
const S = {
  litCount: 0,      // cuántas estrellas se han tocado
  started: false,
};

/* ────────────────────────────────────────────────────────
   REFERENCIAS DOM
──────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const skyCanvas   = $('sky');
const skyCtx      = skyCanvas.getContext('2d');
const moodGlow    = $('mood-glow');
const intro       = $('intro');
const btnBegin    = $('btn-begin');
const counter     = $('counter');
const btnMute     = $('btn-mute');
const icoOn       = $('ico-sound-on');
const icoOff      = $('ico-sound-off');
const constellation = $('constellation');
const hint         = $('hint');
const hintText     = $('hint-text');
const hintProgress = $('hint-progress');
const starsLayer  = $('stars-layer');
const linesSvg    = $('lines');
const cardSheet   = $('card-sheet');
const cardScrim   = $('card-scrim');
const cardRoman   = $('card-roman');
const cardPhoto   = $('card-photo');
const cardPhotoFallback = $('card-photo-fallback');
const cardTitle   = $('card-title');
const cardCaption = $('card-caption');
const cardNext    = $('card-next');
const finalScene  = $('final');
const finalVideo  = $('final-video');
const finalMessage = $('final-message');
const btnReplay   = $('btn-replay');
const audio       = $('audio');

const SVG_NS = 'http://www.w3.org/2000/svg';

/* ────────────────────────────────────────────────────────
   CIELO ANIMADO DE FONDO (estrellas pequeñas, sin audio)
──────────────────────────────────────────────────────── */
let bgStars = [];

function resizeSky() {
  skyCanvas.width  = window.innerWidth;
  skyCanvas.height = window.innerHeight;
  seedBgStars();
}

function seedBgStars() {
  const n = Math.floor((skyCanvas.width * skyCanvas.height) / 9000);
  bgStars = [];
  for (let i = 0; i < n; i++) {
    bgStars.push({
      x: Math.random() * skyCanvas.width,
      y: Math.random() * skyCanvas.height,
      r: 0.4 + Math.random() * 1.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      base: 0.25 + Math.random() * 0.5,
    });
  }
}

function drawSky(t) {
  skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
  for (const s of bgStars) {
    const tw = s.base + 0.35 * Math.sin(t * s.speed + s.phase);
    skyCtx.globalAlpha = Math.max(0, Math.min(1, tw));
    skyCtx.fillStyle = '#fff6e0';
    skyCtx.beginPath();
    skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    skyCtx.fill();
  }
  skyCtx.globalAlpha = 1;
}

function skyLoop() {
  drawSky(performance.now() / 1000);
  requestAnimationFrame(skyLoop);
}

/* ────────────────────────────────────────────────────────
   COLOR DEL CIELO (de frío a cálido según el progreso)
──────────────────────────────────────────────────────── */
function lerp(a, b, t) { return a + (b - a) * t; }

function setMood(progress) {
  // progress: 0 (recién empezando) → 1 (las 6 estrellas encendidas)
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
  MEMORIES.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'star-pt' + (i === 0 ? ' next-up' : ' dim');
    el.style.left = m.x + '%';
    el.style.top  = m.y + '%';
    el.dataset.idx = i;

    const halo = document.createElement('div');
    halo.className = 'halo';

    const glyph = document.createElement('div');
    glyph.className = 'glyph';

    const roman = document.createElement('span');
    roman.className = 'roman';
    roman.textContent = m.roman;

    el.appendChild(halo);
    el.appendChild(glyph);
    el.appendChild(roman);
    el.addEventListener('click', () => onStarTap(i, el));
    starsLayer.appendChild(el);
  });
}

function onStarTap(i, el) {
  if (!el.classList.contains('next-up')) return; // solo se puede tocar la que sigue

  el.classList.remove('next-up', 'dim');
  el.classList.add('lit');

  if (i > 0) {
    drawConstLine(MEMORIES[i - 1], MEMORIES[i]);
  }

  S.litCount = i + 1;
  setMood(S.litCount / MEMORIES.length);
  updateHint(S.litCount);
  openCard(MEMORIES[i]);

  const nextEl = starsLayer.querySelector(`[data-idx="${i + 1}"]`);
  if (nextEl) {
    nextEl.classList.remove('dim');
    nextEl.classList.add('next-up');
  }
}

/* ────────────────────────────────────────────────────────
   PASTILLA DE GUÍA (texto + progreso "I / VI")
──────────────────────────────────────────────────────── */
function updateHint(litCount) {
  if (litCount >= MEMORIES.length) {
    hint.classList.add('fade');
    return;
  }
  hintText.textContent = litCount === 0
    ? 'toca la primera estrella'
    : 'sigue con la siguiente';
  hintProgress.textContent = `${MEMORIES[litCount].roman} / ${MEMORIES[MEMORIES.length - 1].roman}`;
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
   TARJETA DE RECUERDO
──────────────────────────────────────────────────────── */
let cardPendingIdx = -1;

function openCard(m) {
  cardPendingIdx = MEMORIES.indexOf(m);
  cardRoman.textContent = m.roman;
  cardTitle.textContent = m.title;
  cardCaption.textContent = m.caption;

  cardPhoto.style.display = 'none';
  cardPhotoFallback.style.display = 'flex';
  if (m.img) {
    cardPhoto.src = m.img;
  } else {
    cardPhoto.removeAttribute('src');
  }
  cardPhoto.onload = () => {
    cardPhoto.style.display = 'block';
    cardPhotoFallback.style.display = 'none';
  };
  cardPhoto.onerror = () => {
    cardPhoto.style.display = 'none';
    cardPhotoFallback.style.display = 'flex';
  };

  cardSheet.classList.remove('hidden');
  requestAnimationFrame(() => cardSheet.classList.add('open'));
}

function closeCard() {
  cardSheet.classList.remove('open');
  setTimeout(() => {
    cardSheet.classList.add('hidden');
    afterCardClosed();
  }, 480);
}

function afterCardClosed() {
  const wasLast = cardPendingIdx === MEMORIES.length - 1;
  cardPendingIdx = -1;
  if (wasLast) {
    closeHeartLoop();
    setTimeout(showFinal, 1500);
  }
}

/* ────────────────────────────────────────────────────────
   ESCENA FINAL
──────────────────────────────────────────────────────── */
function showFinal() {
  finalMessage.textContent = FINAL_MESSAGE;
  constellation.classList.add('hidden');
  counter.classList.add('hidden');
  finalScene.classList.remove('hidden');
  finalVideo.currentTime = 0;
  finalVideo.play().catch(() => { /* si no hay video puesto, no pasa nada */ });
}

/* ────────────────────────────────────────────────────────
   AUDIO
──────────────────────────────────────────────────────── */
function startAudio() {
  audio.play().catch(() => { /* el usuario puede activarlo luego con el botón de música */ });
}

function toggleMute() {
  audio.muted = !audio.muted;
  icoOn.style.display  = audio.muted ? 'none' : '';
  icoOff.style.display = audio.muted ? '' : 'none';
}

/* ────────────────────────────────────────────────────────
   INICIO / REINICIO
──────────────────────────────────────────────────────── */
function begin() {
  if (S.started) return;
  S.started = true;
  intro.classList.add('leaving');
  setTimeout(() => intro.classList.add('hidden'), 700);
  counter.classList.remove('hidden');
  btnMute.classList.remove('hidden');
  constellation.classList.remove('hidden');
  startAudio();
}

function restart() {
  S.litCount = 0;
  S.started = false;
  setMood(0);

  linesSvg.innerHTML = '';
  starsLayer.innerHTML = '';
  buildStars();
  drawGhostOutline();
  updateHint(0);

  hint.classList.remove('fade');
  finalScene.classList.add('hidden');
  constellation.classList.add('hidden');
  counter.classList.add('hidden');
  btnMute.classList.add('hidden');
  intro.classList.remove('hidden', 'leaving');

  audio.pause();
  audio.currentTime = 0;
  finalVideo.pause();
  finalVideo.currentTime = 0;
}

/* ────────────────────────────────────────────────────────
   ARRANQUE
──────────────────────────────────────────────────────── */
function init() {
  resizeSky();
  window.addEventListener('resize', resizeSky);
  skyLoop();
  setMood(0);

  buildStars();
  drawGhostOutline();
  updateHint(0);

  btnBegin.addEventListener('click', begin);
  btnMute.addEventListener('click', toggleMute);
  cardNext.addEventListener('click', closeCard);
  cardScrim.addEventListener('click', closeCard);
  btnReplay.addEventListener('click', restart);
}

document.addEventListener('DOMContentLoaded', init);
