/* ════════════════════════════════════════════════════════
   NUESTRA CONSTELACIÓN — main.js
   11 estrellas · un corazón que se enciende en orden
════════════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────────────────
   ════════  AQUÍ VAN LAS IMÁGENES Y LOS TEXTOS  ════════
   Cada objeto es una estrella/recuerdo, en el orden en que
   se van a tocar. Para poner tu foto, cambia el valor de
   "img" por el nombre de tu archivo (debe estar junto a
   este index.html). Si no pones ninguna, se muestra un
   espacio en blanco con un ícono — no rompe nada.

   Las estrellas VII a XI ya tienen un texto propio, escrito
   siguiendo el mismo hilo narrativo que las primeras seis
   (de cómo empezó, a lo que construyeron, a este cumpleaños
   XVIII). Revísalos y ajusta cualquier detalle o fecha que
   quieras hacer más específico — son un punto de partida
   que puedes editar como texto plano, sin tocar nada más.
──────────────────────────────────────────────────────── */
const MEMORIES = [
  {
    roman: 'I',
    x: 22, y: 40,
    title: 'Donde todo empezó',
    caption: 'Me preguntaste por tu prima sin saber que, sin quererlo, te estaba encontrando a ti. 😌❤️',
    img: 'foto1.jpg', // AQUÍ VA LA IMAGEN 1 — la tienda
  },
  {
    roman: 'II',
    x: 28, y: 24,
    title: 'Llegaste tú',
    caption: 'Llegué cansado del trabajo y, de repente, ahí estabas — y el cansancio dejó de importar.',
    img: 'foto2.jpg', // AQUÍ VA LA IMAGEN 2 — la visita a la casa
  },
  {
    roman: 'III',
    x: 42, y: 20,
    title: 'Lo que nos hace reír',
    caption: 'Cada vez que te hago enojar, en el fondo sé que te ríes — como esa vez que te mandé el video manifestando, jajaja.',
    img: 'foto3.jpg', // AQUÍ VA LA IMAGEN 3 — el video manifestando
  },
  {
    roman: 'IV',
    x: 50, y: 30,
    title: 'Lo que aprendimos',
    caption: 'Hubo días en que me enojaba por todo, por gente que no merecía nuestro tiempo — y aun así, elegimos quedarnos.',
    img: 'foto4.jpg', // AQUÍ VA LA IMAGEN 4 — las peleas
  },
  {
    roman: 'V',
    x: 58, y: 20,
    title: 'Estar ahí',
    caption: 'En diciembre, en medio de algo difícil para ti y tu familia, nos tomamos esa foto — porque incluso en lo duro, quise estar a tu lado.',
    img: 'foto5.jpg', // AQUÍ VA LA IMAGEN 5 — diciembre, la foto juntos
  },
  {
    roman: 'VI',
    x: 72, y: 24,
    title: 'Algo que no se marchita',
    caption: 'Tulipanes eternos para tus 17 — porque así quiero que sea esto: algo que dure.',
    img: 'foto6.jpg', // AQUÍ VA LA IMAGEN 6 — los tulipanes eternos
  },
  {
    roman: 'VII',
    x: 78, y: 40,
    title: 'Lo de todos los días',
    caption: 'No hizo falta una fecha especial para que te volvieras parte de mi rutina — un mensaje en la mañana, una llamada antes de dormir, y ya. Así de simple, así de nuestro.',
    img: 'foto7.jpg', // AQUÍ VA LA IMAGEN 7 — cambia este texto y título
  },
  {
    roman: 'VIII',
    x: 74, y: 58,
    title: 'Verte crecer',
    caption: 'Te he visto esforzarte por lo que quieres y salir adelante incluso cuando no era fácil — y cada vez me convenzo más de la persona tan fuerte en la que te has convertido.',
    img: 'foto8.jpg', // AQUÍ VA LA IMAGEN 8 — cambia este texto y título
  },
  {
    roman: 'IX',
    x: 64, y: 72,
    title: 'Lo que todavía falta',
    caption: 'Nos quedan planes por cumplir y lugares por conocer juntos — y aunque no sé todo lo que viene, sí sé con quién quiero verlo pasar.',
    img: 'foto9.jpg', // AQUÍ VA LA IMAGEN 9 — cambia este texto y título
  },
  {
    roman: 'X',
    x: 50, y: 84,
    title: 'Quién eres para mí',
    caption: 'Mi pequeña gigante: pequeña en estatura, pero con una fuerza que me sostiene incluso en mis peores días. Eso es lo que veo cuando te miro.',
    img: 'foto10.jpg', // AQUÍ VA LA IMAGEN 10 — cambia este texto y título
  },
  {
    roman: 'XI',
    x: 36, y: 72,
    title: 'Hoy, tus XVIII',
    caption: 'Once estrellas, un cielo entero, y todavía sigo eligiéndote a ti. Feliz cumpleaños, mi amor — esto apenas empieza.',
    img: 'foto11.jpg', // AQUÍ VA LA IMAGEN 11 — cambia este texto y título
  },
];

const FINAL_MESSAGE = 'Feliz cumpleaños, mi amor. Gracias por ser siempre tan linda conmigo y por todo lo que compartimos. -- De verdad deseo que la vida nos permita seguir construyendo esto mientras Dios así lo quiera. -- Quiero que nunca dudes de algo: te amo, y mi cariño por ti es real. Pase lo que pase, siempre voy a estar para ti.';

/* ────────────────────────────────────────────────────────
   CONTADOR DE DÍAS
   El número que aparece por defecto es el que ya pusiste en
   el HTML (1383). Si quieres que se actualice solo cada día,
   escribe aquí la fecha real de inicio en formato AAAA-MM-DD
   y el contador la reemplazará automáticamente. Si lo dejas
   vacío (''), se queda el número fijo de siempre.
──────────────────────────────────────────────────────── */
const START_DATE = '';

/* ────────────────────────────────────────────────────────
   AUTO-AVANCE DE LA ESCENA DE RECUERDO
   Cada recuerdo (foto + texto) pasa solo después de estos
   segundos, sin que sea necesario tocar "Continuar". Si
   quieres que sea manual otra vez, deja el valor en 0.
──────────────────────────────────────────────────────── */
const MEMORY_AUTO_ADVANCE_SECONDS = 8;

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
const counterNum  = $('counter-num');
const btnMute     = $('btn-mute');
const icoOn       = $('ico-sound-on');
const icoOff      = $('ico-sound-off');
const constellation = $('constellation');
const hint         = $('hint');
const hintText     = $('hint-text');
const hintProgress = $('hint-progress');
const starsLayer  = $('stars-layer');
const linesSvg    = $('lines');
const memoryScene    = $('memory-scene');
const memoryPhoto    = $('memory-photo');
const memoryPhotoFallback = $('memory-photo-fallback');
const memoryRoman    = $('memory-roman');
const memoryTitle    = $('memory-title');
const memoryCaption  = $('memory-caption');
const memoryNext     = $('memory-next');
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
  // progress: 0 (recién empezando) → 1 (todas las estrellas encendidas)
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
  MEMORIES.forEach((m, i) => {
    const el = document.createElement('div');
    el.className = 'star-pt dim';
    el.style.left = m.x + '%';
    el.style.top  = m.y + '%';
    el.dataset.idx = i;
    el.setAttribute('aria-hidden', 'true'); // ya no es interactiva: se enciende sola

    const halo = document.createElement('div');
    halo.className = 'halo';

    const glyph = document.createElement('div');
    glyph.className = 'glyph';

    const roman = document.createElement('span');
    roman.className = 'roman';
    roman.textContent = m.roman;
    roman.setAttribute('aria-hidden', 'true');

    el.appendChild(halo);
    el.appendChild(glyph);
    el.appendChild(roman);
    starsLayer.appendChild(el);
  });
}

/* ────────────────────────────────────────────────────────
   ENCENDIDO AUTOMÁTICO DE ESTRELLAS
   Cada estrella se enciende sola, una tras otra: primero un
   breve pulso de anticipación (STAR_ANTICIPATION_MS), luego
   se enciende y se abre su recuerdo. Cuando ese recuerdo se
   cierra (solo o por el temporizador), se enciende la
   siguiente automáticamente. No hace falta tocar nada.
──────────────────────────────────────────────────────── */
const STAR_ANTICIPATION_MS = 550;  // pulso antes de encenderse
const STAR_GAP_MS = 500;           // pausa entre un recuerdo y el siguiente

function lightStar(i) {
  const el = starsLayer.querySelector(`[data-idx="${i}"]`);
  if (!el) return;

  el.classList.remove('dim');
  el.classList.add('next-up'); // breve destello de anticipación

  setTimeout(() => {
    el.classList.remove('next-up');
    el.classList.add('lit');

    if (i > 0) {
      drawConstLine(MEMORIES[i - 1], MEMORIES[i]);
    }

    S.litCount = i + 1;
    setMood(S.litCount / MEMORIES.length);
    updateHint(S.litCount);
    openMemory(MEMORIES[i]);
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
   ESCENA DE RECUERDO — foto a pantalla completa, tipo cine
──────────────────────────────────────────────────────── */
let memoryPendingIdx = -1;
let memoryAutoTimer = null;

function openMemory(m) {
  memoryPendingIdx = MEMORIES.indexOf(m);
  memoryRoman.textContent = `estrella ${m.roman}`;
  memoryTitle.textContent = m.title;
  memoryCaption.textContent = m.caption;

  memoryPhoto.style.display = 'none';
  memoryPhotoFallback.style.display = 'flex';
  memoryPhoto.alt = m.title;
  if (m.img) {
    memoryPhoto.src = m.img;
  } else {
    memoryPhoto.removeAttribute('src');
  }
  memoryPhoto.onload = () => {
    memoryPhoto.style.display = 'block';
    memoryPhotoFallback.style.display = 'none';
  };
  memoryPhoto.onerror = () => {
    memoryPhoto.style.display = 'none';
    memoryPhotoFallback.style.display = 'flex';
  };

  memoryScene.classList.remove('hidden');
  requestAnimationFrame(() => memoryScene.classList.add('open'));

  clearTimeout(memoryAutoTimer);
  if (MEMORY_AUTO_ADVANCE_SECONDS > 0) {
    memoryAutoTimer = setTimeout(closeMemory, MEMORY_AUTO_ADVANCE_SECONDS * 1000);
  }
}

function closeMemory() {
  clearTimeout(memoryAutoTimer);
  memoryScene.classList.remove('open');
  setTimeout(() => {
    memoryScene.classList.add('hidden');
    afterMemoryClosed();
  }, 480);
}

function afterMemoryClosed() {
  const wasLast = memoryPendingIdx === MEMORIES.length - 1;
  const justClosedIdx = memoryPendingIdx;
  memoryPendingIdx = -1;
  if (wasLast) {
    closeHeartLoop();
    setTimeout(showFinal, 1500);
  } else {
    setTimeout(() => lightStar(justClosedIdx + 1), STAR_GAP_MS);
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
  setTimeout(() => lightStar(0), 900); // deja ver el cielo un instante antes de la primera estrella
}

function restart() {
  clearTimeout(memoryAutoTimer);
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

  updateCounterIfDynamic();
  buildStars();
  drawGhostOutline();
  updateHint(0);

  btnBegin.addEventListener('click', begin);
  btnMute.addEventListener('click', toggleMute);
  memoryNext.addEventListener('click', closeMemory);
  btnReplay.addEventListener('click', restart);
}

document.addEventListener('DOMContentLoaded', init);
