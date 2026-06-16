import { cards } from './data/cards.js?v=16';

const POSITIONS = [
  { key: 'heartMeaning', label: 'Heart', symbol: '♡', hint: 'what your heart is feeling' },
  { key: 'pathMeaning', label: 'Path', symbol: '✧', hint: 'where your energy is moving' },
  { key: 'magicMeaning', label: 'Magic', symbol: '☾', hint: 'the blessing around you' }
];

const SUIT_SYMBOLS = {
  major: '🦄',
  dewdrops: '💧',
  sparkles: '✨',
  feathers: '🪽',
  crystals: '💎'
};

let shuffledDeck = [];
let visibleChoices = [];
let selectedCards = [];

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

let isFanDragging = false;
let fanDragStartX = 0;
let fanStartScrollLeft = 0;
let fanDidDrag = false;

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle('is-active', screen.id === id));
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

function startReading() {
  selectedCards = [];
  visibleChoices = [];
  revealButton.classList.add('hidden');
  initializeDeckStack();
  showScreen('shuffle-screen');
}

function shuffleDeck() {
  shuffledDeck = shuffle(cards);
  deckStack.classList.add('is-shuffling');
  $('#shuffle-button').disabled = true;
  $('#shuffle-instruction').textContent = 'The deck is swirling through moonlight…';

  window.setTimeout(() => {
    deckStack.classList.remove('is-shuffling');
    $('#shuffle-button').disabled = false;
    $('#shuffle-instruction').textContent = 'Tap shuffle and let the cards drift like little petals.';
    // Show the full deck so users can truly pick from all 78 cards.
    visibleChoices = shuffledDeck;
    renderPickGrid();
    showScreen('pick-screen');
  }, 1850);
}

function renderPickGrid() {
  cardGrid.innerHTML = '';
  selectedCards = [];
  cardGrid.style.setProperty('--card-count', `${visibleChoices.length}`);
  updatePickInstruction();

  visibleChoices.forEach((card, index, arr) => {
    const button = document.createElement('button');
    button.className = 'pick-card';
    button.type = 'button';
    button.style.setProperty('--delay', `${Math.min(index * 14, 900)}ms`);
    button.style.setProperty('--index', `${index}`);
    const tilt = ((index / Math.max(1, arr.length - 1)) - 0.5) * 28;
    button.style.setProperty('--base-tilt', `${tilt.toFixed(2)}deg`);
    button.setAttribute('aria-label', `Face-down card ${index + 1}`);
    button.addEventListener('click', () => selectCard(card, button));
    cardGrid.append(button);
  });

  const centerLeft = Math.max(0, (cardGrid.scrollWidth - fanScroll.clientWidth) / 2);
  fanScroll.scrollLeft = centerLeft;
  updateFanFocus(fanScroll.getBoundingClientRect().left + fanScroll.clientWidth / 2);
}

function selectCard(card, element) {
  if (fanDidDrag) return;
  if (element.classList.contains('is-selected')) return;
  if (selectedCards.length >= 3) return;

  selectedCards.push(card);
  element.classList.add('is-selected');
  element.dataset.pick = selectedCards.length;
  element.setAttribute('aria-label', `${POSITIONS[selectedCards.length - 1].label} card selected`);
  updatePickInstruction();
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
  fanScroll.addEventListener('pointerdown', (event) => {
    isFanDragging = true;
    fanDidDrag = false;
    fanDragStartX = event.clientX;
    fanStartScrollLeft = fanScroll.scrollLeft;
    fanScroll.setPointerCapture(event.pointerId);
    updateFanFocus(event.clientX);
  });

  fanScroll.addEventListener('pointermove', (event) => {
    updateFanFocus(event.clientX);
    if (!isFanDragging) return;
    const delta = event.clientX - fanDragStartX;
    if (Math.abs(delta) > 6) fanDidDrag = true;
    fanScroll.scrollLeft = fanStartScrollLeft - delta;
  });

  const stopDrag = (event) => {
    if (isFanDragging && event?.pointerId !== undefined && fanScroll.hasPointerCapture(event.pointerId)) {
      fanScroll.releasePointerCapture(event.pointerId);
    }
    isFanDragging = false;
    window.setTimeout(() => { fanDidDrag = false; }, 0);
  };

  fanScroll.addEventListener('pointerup', stopDrag);
  fanScroll.addEventListener('pointercancel', stopDrag);
  fanScroll.addEventListener('pointerleave', () => {
    const centerX = fanScroll.getBoundingClientRect().left + fanScroll.clientWidth / 2;
    updateFanFocus(centerX);
  });
}

function updatePickInstruction() {
  const next = POSITIONS[selectedCards.length];
  if (selectedCards.length < 3) {
    pickCount.textContent = `Pick your ${next.label} card: ${next.hint}.`;
    revealButton.classList.add('hidden');
  } else {
    pickCount.textContent = 'Your three cards are glowing. Ready to reveal?';
    revealButton.classList.remove('hidden');
  }
}

function cardHTML(card) {
  const artContent = card.artPath
    ? `<img class="detailed-card-art" src="${card.artPath}" alt="${card.name} watercolor card art" loading="lazy" />`
    : `<div class="card-art">
        <div class="card-keyword">${card.keyword}</div>
        <div class="card-symbol">${SUIT_SYMBOLS[card.suit] ?? '✦'}</div>
        <div class="card-name">${card.name}</div>
      </div>`;

  return `
    <div class="oracle-card suit-${card.suit} ${card.artPath ? 'has-detailed-art' : ''}">
      ${artContent}
    </div>
  `;
}

function createReadingItem(card, position, index) {
  const article = document.createElement('article');
  article.className = 'reading-card';
  article.style.animationDelay = `${index * 180}ms`;
  article.innerHTML = `
    <div class="reading-position">${position.symbol} ${position.label}</div>
    ${cardHTML(card)}
    <h3>${card.name}</h3>
    <p class="brief"><strong>Brief:</strong> ${card.shortMeaning}</p>
    <p class="meaning">${card[position.key]}</p>
  `;
  return article;
}

function generateSummary(reading) {
  const [heart, path, magic] = reading;
  const templates = [
    `Your heart is learning ${heart.card.keyword.toLowerCase()}, while your path moves through ${path.card.keyword.toLowerCase()}. The magic of ${magic.card.name} suggests that a gentle blessing arrives when you choose the next kind step.`,
    `${heart.card.name} softens your inner world, ${path.card.name} points your feet forward, and ${magic.card.name} sprinkles the reading with ${magic.card.keyword.toLowerCase()}. Let this prophecy be small, sweet, and doable today.`,
    `A pastel thread connects ${heart.card.keyword.toLowerCase()}, ${path.card.keyword.toLowerCase()}, and ${magic.card.keyword.toLowerCase()}. You do not need to rush the answer — the cards are asking you to follow the shimmer one step at a time.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateSharedGuidance(reading) {
  const [heart, path, magic] = reading;
  return {
    do: [
      `Take one tiny action inspired by ${path.card.name}.`,
      `Honor your feelings from ${heart.card.name} before making big decisions.`,
      `Stay open to small blessings and signs from ${magic.card.name}.`
    ],
    dont: [
      'Don’t force a final answer today — let clarity unfold gently.',
      'Don’t ignore your emotional needs while focusing only on productivity.',
      'Don’t compare your path to others; your timing is uniquely yours.'
    ]
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

function revealReading() {
  const reading = selectedCards.map((card, index) => ({ card, position: POSITIONS[index] }));
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
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  exportCard.innerHTML = `
    <h2>The Pastel Prophecy</h2>
    <div class="export-date">${date}</div>
    <div class="export-three">
      ${reading.map(({ card, position }) => `
        <section class="export-item">
          <div class="reading-position">${position.symbol} ${position.label}</div>
          ${cardHTML(card)}
          <h3>${card.name}</h3>
          <p><strong>Brief:</strong> ${card.shortMeaning}</p>
          <p>${card[position.key]}</p>
        </section>
      `).join('')}
    </div>
    <section class="export-summary">
      <h3>3 Cards Together</h3>
      <p>${summary}</p>
      <h3>Do (for all 3 cards)</h3>
      <ul>${guidance.do.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h3>Don’t (for all 3 cards)</h3>
      <ul>${guidance.dont.map((item) => `<li>${item}</li>`).join('')}</ul>
    </section>
    <div class="export-footer">A soft little prophecy for your day ✨</div>
  `;
}

async function downloadReadingImage() {
  const button = $('#download-button');
  button.disabled = true;
  button.textContent = 'Painting your prophecy…';
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
    button.textContent = 'Downloaded ✨';
    window.setTimeout(() => { button.textContent = 'Download My Prophecy'; }, 1400);
  } catch (error) {
    console.error(error);
    button.textContent = 'Download failed — try again';
  } finally {
    window.setTimeout(() => { button.disabled = false; }, 900);
  }
}

$('#begin-button').addEventListener('click', startReading);
$('#shuffle-button').addEventListener('click', shuffleDeck);
revealButton.addEventListener('click', revealReading);
$('#download-button').addEventListener('click', downloadReadingImage);
$('#again-button').addEventListener('click', startReading);

bindFanInteractions();
initializeDeckStack();
