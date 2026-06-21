import { cards } from './data/cards.js?v=27';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  UI_STRINGS,
  getLocalizedCard,
  getPositions
} from './data/localization.js?v=5';

const SUIT_SYMBOLS = {
  major: 'Major Prophecy',
  dewdrops: 'Dewdrops',
  sparkles: 'Sparkles',
  feathers: 'Feathers',
  crystals: 'Crystals'
};

const LANGUAGE_STORAGE_KEY = 'pastel-prophecy-language';
const MUSIC_STORAGE_KEY = 'pastel-prophecy-music';

class HealingMusic {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.volume = 0.18;
    this.fadeTime = 3.0;
    this.voices = [];
    this.arpeggioInterval = null;
    this.arpeggioIndex = 0;
    this.hasEverStarted = false;
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;

    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 12;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.1;
    compressor.release.value = 0.5;

    const reverb = this.createReverb();

    const dryGain = this.ctx.createGain();
    dryGain.gain.value = 0.55;
    const wetGain = this.ctx.createGain();
    wetGain.gain.value = 0.45;

    this.masterGain.connect(dryGain);
    dryGain.connect(compressor);
    this.masterGain.connect(wetGain);
    wetGain.connect(reverb);
    reverb.connect(compressor);
    compressor.connect(this.ctx.destination);

    this.startPad();
    this.startArpeggio();
  }

  createReverb() {
    const length = 2.5;
    const decay = 2.0;
    const rate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(2, rate * length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, decay);
      }
    }
    const convolver = this.ctx.createConvolver();
    convolver.buffer = buffer;
    return convolver;
  }

  startPad() {
    const now = this.ctx.currentTime;
    const padNotes = [
      { freq: 130.81, type: 'sine', vol: 0.35 },
      { freq: 164.81, type: 'sine', vol: 0.22 },
      { freq: 196.00, type: 'sine', vol: 0.18 },
      { freq: 261.63, type: 'triangle', vol: 0.05 }
    ];

    padNotes.forEach((n) => {
      const osc = this.ctx.createOscillator();
      osc.type = n.type;
      osc.frequency.value = n.freq;

      const gain = this.ctx.createGain();
      gain.gain.value = 0;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.06 + Math.random() * 0.1;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = n.vol * 0.4;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      lfo.start(now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(n.vol, now + 4);

      this.voices.push({ osc, gain, lfo, lfoGain });
    });
  }

  startArpeggio() {
    const pentatonic = [130.81, 164.81, 196.00, 220.00, 261.63, 329.63, 392.00, 440.00];
    const noteDuration = 2.8;

    this.arpeggioInterval = window.setInterval(() => {
      if (!this.ctx || this.ctx.state === 'closed') return;
      this.playArpeggioNote(pentatonic[this.arpeggioIndex % pentatonic.length], noteDuration);
      this.arpeggioIndex += 1;
    }, noteDuration * 1000);

    this.playArpeggioNote(pentatonic[0], noteDuration);
  }

  playArpeggioNote(freq, duration) {
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = this.ctx.createGain();
    gain.gain.value = 0;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = freq * 4;
    filter.Q.value = 0.5;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);

    const attack = 0.6;
    const release = 2.2;
    const peak = 0.12;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + attack + release);

    osc.stop(now + attack + release + 0.1);

    window.setTimeout(() => {
      try { osc.disconnect(); filter.disconnect(); gain.disconnect(); } catch (_) {}
    }, (attack + release + 0.2) * 1000);
  }

  async play() {
    if (!this.ctx || this.ctx.state === 'closed') this.init();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.hasEverStarted = true;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + this.fadeTime);
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + this.fadeTime);
  }

  toggle() {
    if (this.isPlaying) this.stop();
    else this.play();
  }

  cleanup() {
    if (this.arpeggioInterval) {
      window.clearInterval(this.arpeggioInterval);
      this.arpeggioInterval = null;
    }
    this.voices.forEach((v) => {
      try { v.osc.stop(); v.osc.disconnect(); v.gain.disconnect(); v.lfo?.stop(); v.lfo?.disconnect(); } catch (_) {}
    });
    this.voices = [];
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
    }
    this.ctx = null;
  }
}

const ambientMusic = new HealingMusic();

let shuffledDeck = [];
let visibleChoices = [];
let selectedChoices = [];
let currentLanguage = getInitialLanguage();

const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll('.screen')];
const deckStack = $('#deck-stack');
const cardGrid = $('#card-grid');
const fanScroll = $('#fan-scroll');
const pickCount = $('#pick-count');
const revealButton = $('#reveal-button');
const resultList = $('#result-list');
const summaryText = $('#summary-text');
const doList = $('#do-list');
const dontList = $('#dont-list');
const languageButtons = [...document.querySelectorAll('.lang-button')];

let fanDidDrag = false;

function getInitialLanguage() {
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return LANGUAGE_OPTIONS.some((option) => option.code === saved) ? saved : DEFAULT_LANGUAGE;
}

function getUI(lang = currentLanguage) {
  return UI_STRINGS[lang] ?? UI_STRINGS.en;
}

function getActiveScreenId() {
  return screens.find((screen) => screen.classList.contains('is-active'))?.id ?? 'home-screen';
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle('is-active', screen.id === id));
  document.body.classList.toggle('home-active', id === 'home-screen');
  document.body.classList.toggle('shuffle-bg-active', id === 'shuffle-screen');
  document.body.classList.toggle('reading-bg-active', id === 'pick-screen');
  document.body.classList.toggle('result-bg-active', id === 'result-screen');
  const activeScreen = document.getElementById(id);
  if (activeScreen) activeScreen.scrollTop = 0;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initializeDeckStack() {
  deckStack.innerHTML = '';
  for (let i = 0; i < 4; i += 1) {
    const card = document.createElement('div');
    card.className = 'deck-card';
    card.style.setProperty('--i', i);
    deckStack.append(card);
  }
}

function setLanguage(lang) {
  if (!LANGUAGE_OPTIONS.some((option) => option.code === lang)) return;
  currentLanguage = lang;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  applyLanguage();
}

function bindLanguageSwitcher() {
  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });
}

function updateLanguageButtons() {
  const ui = getUI();
  const switcher = $('#language-switcher');
  switcher?.setAttribute('aria-label', ui.languageSelectorAria);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function updateStaticText() {
  const ui = getUI();

  document.documentElement.lang = currentLanguage;
  document.title = ui.appTitle;
  document.body.classList.toggle('thai-language', currentLanguage === 'th');

  $('#start-art-image').alt = ui.startImageAlt;
  $('#begin-button').setAttribute('aria-label', ui.beginAria);
  $('#begin-button-text').textContent = ui.beginButton;

  $('#shuffle-eyebrow').textContent = ui.stepOne;
  $('#shuffle-title').textContent = ui.wakeDeck;
  $('#shuffle-button').textContent = ui.shuffleButton;

  $('#pick-eyebrow').textContent = ui.stepTwo;
  $('#pick-title').textContent = ui.chooseThree;
  $('#fan-scroll').setAttribute('aria-label', ui.fanScrollAria);
  $('#reveal-button').textContent = ui.revealButton;

  $('#result-eyebrow').textContent = ui.yourReading;
  $('#result-title').textContent = ui.yourPastelProphecy;
  $('#summary-title').textContent = ui.summaryTitle;
  $('#do-title').textContent = ui.doTitle;
  $('#dont-title').textContent = ui.dontTitle;
  $('#again-button').textContent = ui.drawAgain;
}

function applyLanguage() {
  updateStaticText();
  updateLanguageButtons();
  updateMusicToggle();

  const ui = getUI();
  const shuffleButton = $('#shuffle-button');
  $('#shuffle-instruction').textContent = shuffleButton.disabled ? ui.shuffleInstructionBusy : ui.shuffleInstructionIdle;

  if (getActiveScreenId() === 'pick-screen') {
    updatePickInstruction();
    syncSelectedCards();
  }

  if (getActiveScreenId() === 'result-screen' && selectedChoices.length === 3) {
    revealReading();
  }
}

function startReading() {
  selectedChoices = [];
  visibleChoices = [];
  revealButton.classList.add('hidden');
  initializeDeckStack();
  showScreen('shuffle-screen');
  applyLanguage();
  maybeStartMusic();
}

function shuffleDeck() {
  const ui = getUI();
  shuffledDeck = shuffle(cards);
  deckStack.classList.add('is-shuffling');
  $('#shuffle-button').disabled = true;
  $('#shuffle-instruction').textContent = ui.shuffleInstructionBusy;

  window.setTimeout(() => {
    deckStack.classList.remove('is-shuffling');
    $('#shuffle-button').disabled = false;
    $('#shuffle-instruction').textContent = getUI().shuffleInstructionIdle;
    visibleChoices = shuffledDeck;
    renderPickGrid();
    showScreen('pick-screen');
  }, 1850);
}

function renderPickGrid() {
  const ui = getUI();
  cardGrid.innerHTML = '';
  selectedChoices = [];
  updatePickInstruction();

  const rowCount = 4;
  const cardsPerRow = Math.ceil(visibleChoices.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
    visibleChoices.slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow)
  ).filter((row) => row.length > 0);

  rows.forEach((rowCards, rowIndex) => {
    const row = document.createElement('div');
    row.className = 'fan-row';
    row.style.setProperty('--row-count', `${rowCards.length}`);
    row.dataset.row = `${rowIndex}`;

    rowCards.forEach((card, index, arr) => {
      const button = document.createElement('button');
      button.className = 'pick-card';
      button.type = 'button';
      button.style.setProperty('--delay', `${Math.min((rowIndex * cardsPerRow + index) * 14, 900)}ms`);
      button.style.setProperty('--index', `${index}`);
      const normalized = arr.length <= 1 ? 0 : (index / (arr.length - 1)) - 0.5;
      const tilt = normalized * 75;
      const arcDrop = Math.abs(normalized) * 46;
      const x = 41 + (normalized * 56);
      const depth = Math.round(100 - Math.abs(normalized) * 100);
      button.style.setProperty('--base-tilt', `${tilt.toFixed(2)}deg`);
      button.style.setProperty('--arc-drop', `${arcDrop.toFixed(2)}px`);
      button.style.setProperty('--x', `${x.toFixed(2)}%`);
      button.style.setProperty('--depth', `${depth}`);
      button.setAttribute('aria-label', ui.faceDownCard(rowIndex * cardsPerRow + index + 1));
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => selectCard(card, button));
      row.append(button);
    });

    cardGrid.append(row);
  });

  const centerX = fanScroll.getBoundingClientRect().left + fanScroll.clientWidth / 2;
  updateFanFocus(centerX);
}

function selectCard(card, element) {
  if (fanDidDrag) return;

  const existingIndex = selectedChoices.findIndex((choice) => choice.element === element);
  if (existingIndex >= 0) {
    selectedChoices.splice(existingIndex, 1);
    element.classList.remove('is-selected');
    element.removeAttribute('data-pick');
    element.style.removeProperty('--selected-order');
    element.style.removeProperty('--badge-shift');
    element.setAttribute('aria-pressed', 'false');
  } else {
    if (selectedChoices.length >= 3) return;
    selectedChoices.push({ card, element });
    element.classList.add('is-selected');
    element.setAttribute('aria-pressed', 'true');
  }

  syncSelectedCards();
  updatePickInstruction();
}

function syncSelectedCards() {
  const ui = getUI();
  const positions = getPositions(currentLanguage);

  cardGrid.querySelectorAll('.pick-badge').forEach((badge) => badge.remove());

  const cardsInFan = [...cardGrid.querySelectorAll('.pick-card')];
  cardsInFan.forEach((el, index) => {
    if (!el.classList.contains('is-selected')) {
      el.setAttribute('aria-label', ui.faceDownCard(index + 1));
    }
  });

  selectedChoices.forEach((choice, index) => {
    const position = positions[index];
    choice.element.dataset.pick = index + 1;
    choice.element.style.setProperty('--selected-order', `${index + 1}`);
    choice.element.style.setProperty('--badge-shift', `${(index - 1) * 24}px`);
    choice.element.setAttribute('aria-label', ui.selectedCardAria(position.label));
  });

  window.requestAnimationFrame(renderSelectionBadges);
}

function renderSelectionBadges() {
  cardGrid.querySelectorAll('.pick-badge').forEach((badge) => badge.remove());
  const gridRect = cardGrid.getBoundingClientRect();

  selectedChoices.forEach((choice, index) => {
    const rect = choice.element.getBoundingClientRect();
    const badge = document.createElement('span');
    badge.className = 'pick-badge';
    badge.textContent = `${index + 1}`;
    badge.setAttribute('aria-hidden', 'true');
    badge.style.left = `${rect.left - gridRect.left + rect.width / 2 + ((index - 1) * 30)}px`;
    badge.style.top = `${rect.top - gridRect.top - 12}px`;
    cardGrid.append(badge);
  });
}

function updateFanFocus(clientX) {
  const cardsInFan = [...cardGrid.querySelectorAll('.pick-card')];
  cardsInFan.forEach((el) => {
    if (el.classList.contains('is-selected')) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(center - clientX);
    const lift = Math.max(0, 1 - dist / 130);
    el.style.setProperty('--lift', lift.toFixed(3));
    el.classList.toggle('is-focus', lift > 0.5);
  });
}

function bindFanInteractions() {
  fanScroll.addEventListener('pointermove', (event) => {
    updateFanFocus(event.clientX);
  });

  fanScroll.addEventListener('pointerdown', (event) => {
    fanDidDrag = false;
    updateFanFocus(event.clientX);
  });

  fanScroll.addEventListener('pointerleave', () => {
    const centerX = fanScroll.getBoundingClientRect().left + fanScroll.clientWidth / 2;
    updateFanFocus(centerX);
  });
}

function updatePickInstruction() {
  const ui = getUI();
  const positions = getPositions(currentLanguage);
  const next = positions[selectedChoices.length];
  if (selectedChoices.length < 3) {
    pickCount.textContent = ui.pickInstruction(next.label, next.hint);
    revealButton.classList.add('hidden');
  } else {
    pickCount.textContent = ui.readyToReveal;
    revealButton.classList.remove('hidden');
  }
}

const CARD_ART_VERSION = 'crop-20260618';

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function cardHTML(card) {
  const artSrc = card.artPath ? `${card.artPath}?v=${CARD_ART_VERSION}` : '';
  const artContent = card.artPath
    ? `<img class="detailed-card-art" src="${artSrc}" alt="${escapeHtml(card.name)} card art" loading="lazy" />`
    : `<div class="card-art">
        <div class="card-keyword">${escapeHtml(card.keyword)}</div>
        <div class="card-symbol">${escapeHtml(card.suitName ?? (SUIT_SYMBOLS[card.suit] ?? 'Oracle'))}</div>
        <div class="card-name">${escapeHtml(card.name)}</div>
      </div>`;

  return `
    <div class="oracle-card suit-${card.suit} ${card.artPath ? 'has-detailed-art' : ''}">
      ${artContent}
    </div>
  `;
}

function createReadingItem(card, position, index) {
  const ui = getUI();
  const article = document.createElement('article');
  article.className = 'reading-card';
  article.style.animationDelay = `${index * 180}ms`;
  article.innerHTML = `
    <div class="reading-position">${escapeHtml(position.label)}</div>
    ${cardHTML(card)}
    <h3>${escapeHtml(card.name)}</h3>
    <p class="brief"><strong>${escapeHtml(ui.briefLabel)}</strong> ${escapeHtml(card.shortMeaning)}</p>
    <p class="meaning">${escapeHtml(card[position.key])}</p>
  `;
  return article;
}

function generateSummary(reading) {
  return getUI().summary(reading[0].card, reading[1].card, reading[2].card);
}

function generateSharedGuidance(reading) {
  const ui = getUI();
  return {
    do: ui.doLines(reading[0].card, reading[1].card, reading[2].card),
    dont: ui.dontLines(reading[0].card, reading[1].card, reading[2].card)
  };
}

function renderList(element, items) {
  element.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    element.append(li);
  });
}

function getLocalizedReading() {
  const positions = getPositions(currentLanguage);
  return selectedChoices.map(({ card }, index) => ({
    card: getLocalizedCard(card, currentLanguage),
    position: positions[index]
  }));
}

function revealReading() {
  const reading = getLocalizedReading();
  const summary = generateSummary(reading);
  const guidance = generateSharedGuidance(reading);

  resultList.innerHTML = '';
  reading.forEach(({ card, position }, index) => {
    resultList.append(createReadingItem(card, position, index));
  });
  summaryText.textContent = summary;
  renderList(doList, guidance.do);
  renderList(dontList, guidance.dont);
  showScreen('result-screen');
  const resultScreen = document.getElementById('result-screen');
  if (resultScreen) resultScreen.scrollTop = 0;
}

function updateMusicToggle() {
  const btn = $('#music-toggle');
  const ui = getUI();
  const isActive = ambientMusic.isPlaying;
  btn.classList.toggle('is-active', isActive);
  btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  btn.setAttribute('aria-label', isActive ? ui.musicToggleOn : ui.musicToggleOff);
}

function bindMusicToggle() {
  $('#music-toggle').addEventListener('click', () => {
    ambientMusic.toggle();
    window.localStorage.setItem(MUSIC_STORAGE_KEY, ambientMusic.isPlaying ? '1' : '0');
    updateMusicToggle();
  });
}

function maybeStartMusic() {
  const saved = window.localStorage.getItem(MUSIC_STORAGE_KEY);
  if (saved === '0') return;
  ambientMusic.play().then(() => {
    window.localStorage.setItem(MUSIC_STORAGE_KEY, '1');
    updateMusicToggle();
  }).catch(() => {});
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && ambientMusic.isPlaying && ambientMusic.ctx?.state === 'suspended') {
    ambientMusic.ctx.resume();
  }
});

$('#begin-button').addEventListener('click', startReading);
$('#shuffle-button').addEventListener('click', shuffleDeck);
revealButton.addEventListener('click', revealReading);
$('#again-button').addEventListener('click', startReading);

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
showScreen('home-screen');
bindFanInteractions();
bindLanguageSwitcher();
bindMusicToggle();
initializeDeckStack();
applyLanguage();
updateMusicToggle();
