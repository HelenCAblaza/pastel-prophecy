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

class AmbientMusic {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filter = null;
    this.oscillators = [];
    this.isPlaying = false;
    this.volume = 0.08;
    this.fadeTime = 2.5;
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 600;
    this.filter.Q.value = 0.4;

    this.masterGain.connect(this.filter);
    this.filter.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    const voices = [
      { freq: 130.81, detune: 0, type: 'sine', vol: 0.5 },
      { freq: 164.81, detune: 3, type: 'sine', vol: 0.3 },
      { freq: 196.00, detune: -2, type: 'sine', vol: 0.25 },
      { freq: 261.63, detune: 0, type: 'triangle', vol: 0.06 }
    ];

    voices.forEach((v) => {
      const osc = this.ctx.createOscillator();
      osc.type = v.type;
      osc.frequency.value = v.freq;
      osc.detune.value = v.detune;

      const gain = this.ctx.createGain();
      gain.gain.value = v.vol;

      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.08 + Math.random() * 0.12;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = v.vol * 0.35;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      lfo.start(now);

      this.oscillators.push({ osc, gain, lfo, lfoGain });
    });
  }

  async play() {
    if (!this.ctx || this.ctx.state === 'closed') this.init();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, now + this.fadeTime);
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + this.fadeTime);
  }

  toggle() {
    if (this.isPlaying) this.stop();
    else this.play();
  }
}

const ambientMusic = new AmbientMusic();

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
  if (window.localStorage.getItem(MUSIC_STORAGE_KEY) === '1') {
    ambientMusic.play().then(updateMusicToggle).catch(() => {});
  }
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
