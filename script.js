import { cards } from './data/cards.js?v=27';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  UI_STRINGS,
  getLocalizedCard,
  getPositions
} from './data/localization.js?v=3';

const SUIT_SYMBOLS = {
  major: 'Major Prophecy',
  dewdrops: 'Dewdrops',
  sparkles: 'Sparkles',
  feathers: 'Feathers',
  crystals: 'Crystals'
};

const LANGUAGE_STORAGE_KEY = 'pastel-prophecy-language';

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
const exportCard = $('#reading-export-card');
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
  $('#download-button').textContent = ui.downloadReset;
  $('#again-button').textContent = ui.drawAgain;
}

function applyLanguage() {
  updateStaticText();
  updateLanguageButtons();

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
  buildExportCard(reading, summary, guidance);
  showScreen('result-screen');
}

function buildExportCard(reading, summary, guidance) {
  const ui = getUI();
  const date = new Date().toLocaleDateString(ui.locale, { year: 'numeric', month: 'long', day: 'numeric' });
  exportCard.innerHTML = `
    <h2>${escapeHtml(ui.appTitle)}</h2>
    <div class="export-date">${escapeHtml(date)}</div>
    <div class="export-three">
      ${reading.map(({ card, position }) => `
        <section class="export-item">
          <div class="reading-position">${escapeHtml(position.label)}</div>
          ${cardHTML(card)}
          <h3>${escapeHtml(card.name)}</h3>
          <p><strong>${escapeHtml(ui.briefLabel)}</strong> ${escapeHtml(card.shortMeaning)}</p>
          <p>${escapeHtml(card[position.key])}</p>
        </section>
      `).join('')}
    </div>
    <section class="export-summary">
      <h3>${escapeHtml(ui.summaryTitle)}</h3>
      <p>${escapeHtml(summary)}</p>
      <h3>${escapeHtml(ui.doTitle)}</h3>
      <ul>${guidance.do.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      <h3>${escapeHtml(ui.dontTitle)}</h3>
      <ul>${guidance.dont.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    </section>
    <div class="export-footer">${escapeHtml(ui.exportFooter)}</div>
  `;
}

async function downloadReadingImage() {
  const ui = getUI();
  const button = $('#download-button');
  button.disabled = true;
  button.textContent = ui.downloadBusy;
  try {
    const canvas = await html2canvas(exportCard, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      logging: false
    });
    const link = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    link.download = `the-pastel-prophecy-${stamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    button.textContent = ui.downloadDone;
    window.setTimeout(() => { button.textContent = getUI().downloadReset; }, 1400);
  } catch (error) {
    console.error(error);
    button.textContent = ui.downloadFailed;
  } finally {
    window.setTimeout(() => { button.disabled = false; }, 900);
  }
}

$('#begin-button').addEventListener('click', startReading);
$('#shuffle-button').addEventListener('click', shuffleDeck);
revealButton.addEventListener('click', revealReading);
$('#download-button').addEventListener('click', downloadReadingImage);
$('#again-button').addEventListener('click', startReading);

showScreen('home-screen');
bindFanInteractions();
bindLanguageSwitcher();
initializeDeckStack();
applyLanguage();
