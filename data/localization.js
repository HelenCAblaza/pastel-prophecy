export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGE_OPTIONS = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'th', flag: '🇹🇭', label: 'ไทย' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' }
];

export const UI_STRINGS = {
  en: {
    locale: 'en-GB',
    appTitle: 'The Pastel Prophecy',
    yourPastelProphecy: 'Your Pastel Prophecy',
    beginButton: 'Begin the Prophecy',
    beginAria: 'Begin the prophecy',
    startImageAlt: 'The Pastel Prophecy start page with a unicorn, castle, and a Begin the Prophecy button',
    stepOne: 'step one',
    stepTwo: 'step two',
    yourReading: 'your reading',
    wakeDeck: 'Wake the deck',
    shuffleInstructionIdle: 'Tap shuffle and let the cards drift like little petals.',
    shuffleInstructionBusy: 'The deck is swirling through moonlight…',
    shuffleButton: 'Shuffle the Cards',
    chooseThree: 'Choose three cards',
    fanScrollAria: 'Drag across the fanned deck',
    revealButton: 'Reveal My Prophecy',
    summaryTitle: '3 Cards Together',
    doTitle: 'Do (for all 3 cards)',
    dontTitle: 'Don’t (for all 3 cards)',
    drawAgain: 'Draw Again',
    exportFooter: 'A soft little prophecy for your day',
    briefLabel: 'Brief:',
    languageSelectorAria: 'Choose language',
    musicToggleOn: 'Music on',
    musicToggleOff: 'Music off',
    faceDownCard: (n) => `Face-down card ${n}`,
    selectedCardAria: (label) => `${label} card selected. Tap again to deselect.`,
    pickInstruction: (label, hint) => `Pick your ${label} card: ${hint}.`,
    readyToReveal: 'Your three cards are glowing. Ready to reveal?',
    positions: {
      heart: { label: 'Heart', hint: 'what your heart is feeling' },
      path: { label: 'Path', hint: 'where your energy is moving' },
      magic: { label: 'Magic', hint: 'the blessing around you' }
    },
    summary: (heart, path, magic) => `A spirit of ${lowerFirst(heart.keyword)} is stirring in your heart right now \u2014 feelings that want to be seen and held with kindness. Your path carries the energy of ${lowerFirst(path.keyword)}, inviting you to move forward with gentle courage. Around you, a blessing of ${lowerFirst(magic.keyword)} quietly gathers, reminding you that you are not alone. Together, these three cards tell a story that begins with honest feeling, continues with brave movement, and is cradled by quiet grace.`,
    doLines: (heart, path, magic) => [
      `Let yourself feel the quality of ${lowerFirst(heart.keyword)} without rushing to fix anything.`,
      `Take one small, brave step toward ${lowerFirst(path.keyword)}.`,
      `Trust that the gentle gift of ${lowerFirst(magic.keyword)} is already near you, even on unclear days.`
    ],
    dontLines: (heart, path, magic) => [
      `Don\u2019t push away the feeling of ${lowerFirst(heart.keyword)} or judge yourself for being where you are.`,
      `Don\u2019t force outcomes before ${lowerFirst(path.keyword)} has room to unfold; let timing be your ally.`,
      `Don\u2019t overlook the quiet help of ${lowerFirst(magic.keyword)} just because it arrives gently.`
    ]
  },
  de: {
    locale: 'de-DE',
    appTitle: 'The Pastel Prophecy',
    yourPastelProphecy: 'Deine Pastel-Prophezeiung',
    beginButton: 'Beginne die Prophezeiung',
    beginAria: 'Beginne die Prophezeiung',
    startImageAlt: 'Startseite von The Pastel Prophecy mit Einhorn, Schloss und einem Button zum Beginn der Prophezeiung',
    stepOne: 'schritt eins',
    stepTwo: 'schritt zwei',
    yourReading: 'deine legung',
    wakeDeck: 'Wecke das Deck',
    shuffleInstructionIdle: 'Tippe auf Mischen und lass die Karten wie kleine Blütenblätter treiben.',
    shuffleInstructionBusy: 'Das Deck wirbelt durch das Mondlicht…',
    shuffleButton: 'Karten mischen',
    chooseThree: 'Wähle drei Karten',
    fanScrollAria: 'Streiche über das gefächerte Deck',
    revealButton: 'Meine Prophezeiung enthüllen',
    summaryTitle: '3 Karten zusammen',
    doTitle: 'Tun (f\u00fcr alle 3 Karten)',
    dontTitle: 'Nicht tun (f\u00fcr alle 3 Karten)',
    drawAgain: 'Neu ziehen',
    exportFooter: 'Eine sanfte kleine Prophezeiung f\u00fcr deinen Tag',
    briefLabel: 'Kurzdeutung:',
    languageSelectorAria: 'Sprache ausw\u00e4hlen',
    musicToggleOn: 'Musik an',
    musicToggleOff: 'Musik aus',
    faceDownCard: (n) => `Verdeckte Karte ${n}`,
    selectedCardAria: (label) => `${label}-Karte ausgewählt. Zum Abwählen erneut tippen.`,
    pickInstruction: (label, hint) => `Wähle deine ${label}-Karte: ${hint}.`,
    readyToReveal: 'Deine drei Karten leuchten. Bist du bereit für die Enthüllung?',
    positions: {
      heart: { label: 'Herz', hint: 'was dein Herz gerade fühlt' },
      path: { label: 'Weg', hint: 'wohin sich deine Energie bewegt' },
      magic: { label: 'Magie', hint: 'welcher Segen dich umgibt' }
    },
    summary: (heart, path, magic) => `In deinem Herzen spürst du gerade ${lowerFirst(heart.keyword)} \u2014 Gefühle, die gesehen und mit Güte gehalten werden möchten. Dein Weg trägt die Energie von ${lowerFirst(path.keyword)} und lädt dich ein, mit sanftem Mut voranzugehen. Um dich herum sammelt sich still der Segen von ${lowerFirst(magic.keyword)}, der dich daran erinnert, dass du nicht allein bist. Zusammen erzählen diese drei Karten eine Geschichte, die mit ehrlichem Fühlen beginnt, mit mutigem Gehen weitermacht und von stiller Anmut getragen wird.`,
    doLines: (heart, path, magic) => [
      `Gib dir Zeit, ${lowerFirst(heart.keyword)} zu spüren, ohne sofort alles reparieren zu müssen.`,
      `Gehe einen kleinen, mutigen Schritt in Richtung ${lowerFirst(path.keyword)}.`,
      `Vertraue darauf, dass das sanfte Geschenk von ${lowerFirst(magic.keyword)} bereits nah bei dir ist, auch an unklaren Tagen.`
    ],
    dontLines: (heart, path, magic) => [
      `Dränge ${lowerFirst(heart.keyword)} nicht weg und verurteile dich nicht für deinen jetzigen Stand.`,
      `Erzwinge keine Ergebnisse, bevor ${lowerFirst(path.keyword)} Raum hat, sich zu entfalten; lass die Zeit deine Verbündete sein.`,
      `Übersehe nicht die leise Hilfe von ${lowerFirst(magic.keyword)}, nur weil sie sanft zu dir kommt.`
    ]
  },
  th: {
    locale: 'th-TH',
    appTitle: 'The Pastel Prophecy',
    yourPastelProphecy: 'คำทำนายของคุณ',
    beginButton: 'เริ่มอ่านไพ่',
    beginAria: 'เริ่มอ่านไพ่',
    startImageAlt: 'หน้าเริ่มต้นของ The Pastel Prophecy มียูนิคอร์น ปราสาท และปุ่มเริ่มอ่านไพ่',
    stepOne: 'ขั้นแรก',
    stepTwo: 'ขั้นตอนต่อไป',
    yourReading: 'คำทำนายวันนี้',
    wakeDeck: 'ปลุกไพ่',
    shuffleInstructionIdle: 'แตะสับไพ่ แล้วปล่อยใจให้ลอยไปตามกลีบดอกไม้',
    shuffleInstructionBusy: 'ไพ่กำลังหมุนวนอยู่ใต้แสงจันทร์…',
    shuffleButton: 'สับไพ่',
    chooseThree: 'เลือกไพ่สามใบ',
    fanScrollAria: 'เลื่อนดูไพ่ที่แผ่กระจาย',
    revealButton: 'เปิดคำทำนาย',
    summaryTitle: 'เรื่องราวจากไพ่ทั้งสามใบ',
    doTitle: 'ลองทำดู',
    dontTitle: 'ระวังไว้',
    drawAgain: 'อ่านใหม่อีกครั้ง',
    exportFooter: 'คำทำนายอ่อนโยนสำหรับวันนี้',
    briefLabel: 'โดยสรุป:',
    languageSelectorAria: 'เลือกภาษา',
    musicToggleOn: 'เปิดเสียง',
    musicToggleOff: 'ปิดเสียง',
    faceDownCard: (n) => `ไพ่คว่ำใบที่ ${n}`,
    selectedCardAria: (label) => `เลือกไพ่ตำแหน่ง${label}แล้ว แตะอีกทีถ้าอยากเปลี่ยนใจ`,
    pickInstruction: (label, hint) => `เลือกไพ่${label} — ${hint}`,
    readyToReveal: 'ไพ่สามใบพร้อมแล้ว เปิดคำทำนายเลยไหม?',
    positions: {
      heart: { label: 'หัวใจ', hint: 'สิ่งที่หัวใจกำลังรู้สึกอยู่ตอนนี้' },
      path: { label: 'เส้นทาง', hint: 'ทิศทางที่กำลังจะไป' },
      magic: { label: 'เวทมนตร์', hint: 'พรที่กำลังอยู่รอบตัวคุณ' }
    },
    summary: (heart, path, magic) => `ไพ่หัวใจบอกว่าตอนนี้คุณกำลังเต็มไปด้วย${lowerFirst(heart.keyword)} — ความรู้สึกนี้อยากถูกมองเห็นและได้รับการเข้าใจ ไพ่เส้นทางชวนให้คุณก้าวไปข้างหน้าด้วยพลังของ${lowerFirst(path.keyword)} ไม่ต้องรีบ ค่อย ๆ ไปก็ได้ ส่วนไพ่เวทมนตร์คอยย้ำว่ามี${lowerFirst(magic.keyword)}อยู่รอบตัวคุณเสมอ แม้ในวันที่รู้สึกเหงา ไพ่ทั้งสามใบนี้เล่าเรื่องราวของความรู้สึกที่ซื่อตรง การก้าวเดินด้วยความกล้า และความเมตตาที่คอยโอบอุ้มคุณอยู่เสมอ`,
    doLines: (heart, path, magic) => [
      `ให้เวลาตัวเองรู้สึก${lowerFirst(heart.keyword)}ตามที่เป็น ไม่ต้องรีบแก้ไขอะไร`,
      `ก้าวเล็ก ๆ ไปในทิศทางของ${lowerFirst(path.keyword)} ไม่ต้องกลัว`,
      `เชื่อใจว่า${lowerFirst(magic.keyword)}อยู่ใกล้ตัวคุณเสมอ แม้ในวันที่ยังไม่เห็นชัด`
    ],
    dontLines: (heart, path, magic) => [
      `อย่าปิดกั้นความรู้สึก${lowerFirst(heart.keyword)} และอย่าโทษตัวเองที่ยังรู้สึกแบบนี้`,
      `อย่าบังคับให้${lowerFirst(path.keyword)}ต้องเป็นไปตามที่คิด ปล่อยให้มันคลี่คลายไปตามธรรมชาติ`,
      `อย่ามองข้าม${lowerFirst(magic.keyword)}เพียงเพราะมันมาแบบเงียบ ๆ`
    ]
  }
};

const SUIT_TRANSLATIONS = {
  major: { en: 'Major Arcana', de: 'Große Arkana', th: 'ไพ่เมเจอร์อาร์คานา' },
  dewdrops: { en: 'Cups', de: 'Kelche', th: 'ถ้วย' },
  sparkles: { en: 'Wands', de: 'Stäbe', th: 'ไม้เท้า' },
  feathers: { en: 'Swords', de: 'Schwerter', th: 'ดาบ' },
  crystals: { en: 'Pentacles', de: 'Münzen', th: 'เหรียญ' }
};

const RANK_TRANSLATIONS = {
  Ace: { en: 'Ace', de: 'Ass', th: 'เอซ' },
  Two: { en: 'Two', de: 'Zwei', th: 'สอง' },
  Three: { en: 'Three', de: 'Drei', th: 'สาม' },
  Four: { en: 'Four', de: 'Vier', th: 'สี่' },
  Five: { en: 'Five', de: 'Fünf', th: 'ห้า' },
  Six: { en: 'Six', de: 'Sechs', th: 'หก' },
  Seven: { en: 'Seven', de: 'Sieben', th: 'เจ็ด' },
  Eight: { en: 'Eight', de: 'Acht', th: 'แปด' },
  Nine: { en: 'Nine', de: 'Neun', th: 'เก้า' },
  Ten: { en: 'Ten', de: 'Zehn', th: 'สิบ' },
  Page: { en: 'Page', de: 'Bube', th: 'เด็กถือ' },
  Knight: { en: 'Knight', de: 'Ritter', th: 'อัศวิน' },
  Queen: { en: 'Queen', de: 'Königin', th: 'ราชินี' },
  King: { en: 'King', de: 'König', th: 'ราชา' },
  Major: { en: 'Major', de: 'Große Arkana', th: 'เมเจอร์' }
};

const MAJOR_NAME_TRANSLATIONS = {
  'The Fool': { de: 'Der Narr', th: 'ผู้เริ่มต้น' },
  'The Magician': { de: 'Der Magier', th: 'นักมายากล' },
  'The High Priestess': { de: 'Die Hohepriesterin', th: 'มหาปุโรหิตหญิง' },
  'The Empress': { de: 'Die Herrscherin', th: 'จักรพรรดินี' },
  'The Emperor': { de: 'Der Herrscher', th: 'จักรพรรดิ' },
  'The Hierophant': { de: 'Der Hierophant', th: 'มหาปุโรหิต' },
  'The Lovers': { de: 'Die Liebenden', th: 'คู่รัก' },
  'The Chariot': { de: 'Der Wagen', th: 'ราชรถ' },
  'Strength': { de: 'Die Kraft', th: 'พลังภายใน' },
  'The Hermit': { de: 'Der Eremit', th: 'ผู้แสวงหา' },
  'Wheel of Fortune': { de: 'Rad des Schicksals', th: 'วงล้อแห่งโชคชะตา' },
  'Justice': { de: 'Die Gerechtigkeit', th: 'ความยุติธรรม' },
  'The Hanged Man': { de: 'Der Geh\u00e4ngte', th: 'การหยุดนิ่ง' },
  'Death': { de: 'Der Tod', th: 'การจากลา' },
  'Temperance': { de: 'Die M\u00e4\u00dfigkeit', th: 'ความพอดี' },
  'The Devil': { de: 'Der Teufel', th: 'ปีศาจ' },
  'The Tower': { de: 'Der Turm', th: 'หอคอย' },
  'The Star': { de: 'Der Stern', th: 'ดวงดาว' },
  'The Moon': { de: 'Der Mond', th: 'ดวงจันทร์' },
  'The Sun': { de: 'Die Sonne', th: 'ดวงอาทิตย์' },
  'Judgement': { de: 'Das Gericht', th: 'การตัดสินใจครั้งใหญ่' },
  'The World': { de: 'Die Welt', th: 'โลก' }
};

const KEYWORD_TRANSLATIONS = {
  'Abundance': { de: 'Fülle', th: 'ความอุดมสมบูรณ์' },
  'Alignment': { de: 'Ausrichtung', th: 'ความลงตัว' },
  'Anxiety': { de: 'Angst', th: 'ความวิตกังวล' },
  'Attachment': { de: 'Bindung', th: 'ความยึดติด' },
  'Awakening': { de: 'Erwachen', th: 'การตื่นรู้' },
  'Balance': { de: 'Balance', th: 'ความสมดุล' },
  'Bold action': { de: 'Mutiges Handeln', th: 'การลงมืออย่างกล้าหาญ' },
  'Burden': { de: 'Last', th: 'ภาระหนัก' },
  'Celebration': { de: 'Feier', th: 'การฉลอง' },
  'Choices': { de: 'Entscheidungen', th: 'ทางเลือก' },
  'Clarity': { de: 'Klarheit', th: 'ความกระจ่าง' },
  'Compassion': { de: 'Mitgefühl', th: 'ความเห็นใจ' },
  'Completion': { de: 'Vollendung', th: 'การสำเร็จ' },
  'Confidence': { de: 'Selbstvertrauen', th: 'ความมั่นใจ' },
  'Conflict': { de: 'Konflikt', th: 'ความขัดแย้ง' },
  'Contemplation': { de: 'Einkehr', th: 'การนิ่งคิด' },
  'Craftsmanship': { de: 'Handwerkskunst', th: 'ทักษะวิชา' },
  'Curiosity': { de: 'Neugier', th: 'ความอยากรู้' },
  'Determination': { de: 'Entschlossenheit', th: 'ความมุ่งมั่น' },
  'Diligence': { de: 'Fleiß', th: 'ความขยัน' },
  'Discernment': { de: 'Urteilsvermögen', th: 'สติปัญญา' },
  'Drive': { de: 'Tatkraft', th: 'แรงผลักดัน' },
  'Emotional balance': { de: 'Emotionale Reife', th: 'อารมณ์ที่สมดุล' },
  'Emotional fulfillment': { de: 'Emotionale Erfüllung', th: 'ความสมหวังในหัวใจ' },
  'Emotional renewal': { de: 'Emotionale Erneuerung', th: 'การเยี่ยวยาหัวใจ' },
  'Ending': { de: 'Ende', th: 'การจบ' },
  'Enthusiasm': { de: 'Begeisterung', th: 'ความกระตื้นร้อน' },
  'Expansion': { de: 'Expansion', th: 'การขยายขอบเขต' },
  'Generosity': { de: 'Großzügigkeit', th: 'ความใจกว้าง' },
  'Grief': { de: 'Trauer', th: 'ความเสียใจ' },
  'Hardship': { de: 'Entbehrung', th: 'ความลำบาก' },
  'Heartbreak': { de: 'Herzschmerz', th: 'อกหัก' },
  'Hope': { de: 'Hoffnung', th: 'ความหวัง' },
  'Inner knowing': { de: 'Innere Gewissheit', th: 'สัญชาตญาณภายใน' },
  'Inner strength': { de: 'Innere Stärke', th: 'พลังภายใน' },
  'Inspiration': { de: 'Inspiration', th: 'แรงบันดาลใจ' },
  'Joy': { de: 'Freude', th: 'ความยินดี' },
  'Joyful foundation': { de: 'Freudige Stabilität', th: 'รากแห่งความสุข' },
  'Leap of faith': { de: 'Vertrauenssprung', th: 'การกระโดดด้วยหัวใจ' },
  'Legacy': { de: 'Vermächtnis', th: 'มรดก' },
  'Manifestation': { de: 'Manifestation', th: 'การสร้างจากความอธิษฐาน' },
  'Momentum': { de: 'Schwung', th: 'แรงหนึ่ง' },
  'Mystery': { de: 'Geheimnis', th: 'ความลึกลับ' },
  'Nostalgia': { de: 'Nostalgie', th: 'ความคิดถึง' },
  'Open-hearted message': { de: 'Offenherzige Botschaft', th: 'ข้อความจากหัวใจ' },
  'Opportunity': { de: 'Gelegenheit', th: 'โอกาส' },
  'Partnership': { de: 'Partnerschaft', th: 'ความร่วมมือ' },
  'Patience': { de: 'Geduld', th: 'ความอดทน' },
  'Perseverance': { de: 'Durchhaltevermögen', th: 'ความอดทนไม่ยอมแพ้' },
  'Planning': { de: 'Planung', th: 'การวางแผน' },
  'Practical nurture': { de: 'Praktische Fürsorge', th: 'การดูแลที่ลงมือ' },
  'Reason': { de: 'Vernunft', th: 'เหตุผล' },
  'Recognition': { de: 'Anerkennung', th: 'การได้รับรู้' },
  'Reflection': { de: 'Innenschau', th: 'การทบทวนตน' },
  'Resilience': { de: 'Widerstandskraft', th: 'ความยืดหยุ่น' },
  'Rest': { de: 'Ruhe', th: 'การพักผ่อน' },
  'Restriction': { de: 'Einschränkung', th: 'การถูกจำกัด' },
  'Romantic pursuit': { de: 'Romantische Annäherung', th: 'การตามหาความรัก' },
  'Satisfaction': { de: 'Zufriedenheit', th: 'ความพอใจ' },
  'Security': { de: 'Sicherheit', th: 'ความปลอดภัย' },
  'Self-sufficiency': { de: 'Unabhängigkeit', th: 'การพึ่งพาของตน' },
  'Stalemate': { de: 'Patt', th: 'ทางตัน' },
  'Strategy': { de: 'Strategie', th: 'กลยุทธ์' },
  'Structure': { de: 'Struktur', th: 'โครงสร้าง' },
  'Study': { de: 'Lernen', th: 'การศึกษา' },
  'Surrender': { de: 'Hingabe', th: 'การยอมรับ' },
  'Teamwork': { de: 'Zusammenarbeit', th: 'การทำงานร่วมกัน' },
  'Tradition': { de: 'Tradition', th: 'ขนบธรรมเนียม' },
  'Transformation': { de: 'Transformation', th: 'การเปลี่ยนแปลง' },
  'Transition': { de: 'Übergang', th: 'ช่วงเวลา' },
  'Truth': { de: 'Wahrheit', th: 'ความจริง' },
  'Turning point': { de: 'Wendepunkt', th: 'จุดเปลี่ยน' },
  'Upheaval': { de: 'Umbruch', th: 'ความปั่นปวน' },
  'Vision': { de: 'Vision', th: 'วิสัยทัศน์' },
  'Walking away': { de: 'Loslassen', th: 'การเดินจาก' }
};

function lowerFirst(text) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : '';
}

function getMinorCardName(card, lang) {
  const rank = RANK_TRANSLATIONS[card.rank]?.[lang] ?? card.rank;
  const suit = SUIT_TRANSLATIONS[card.suit]?.[lang] ?? card.suitName;

  if (lang === 'de') {
    return `${rank} der ${suit}`;
  }

  if (lang === 'th') {
    if (card.rank === 'Page') return `${rank}${suit}`;
    return `${rank}แห่ง${suit}`;
  }

  return card.name;
}

function getLocalizedName(card, lang) {
  if (lang === 'en') return card.name;
  if (card.suit === 'major') return MAJOR_NAME_TRANSLATIONS[card.name]?.[lang] ?? card.name;
  return getMinorCardName(card, lang);
}

function getLocalizedKeyword(card, lang) {
  if (lang === 'en') return card.keyword;
  return KEYWORD_TRANSLATIONS[card.keyword]?.[lang] ?? card.keyword;
}

function buildLocalizedMeanings(card, lang, localizedName, localizedKeyword) {
  if (lang === 'en') {
    return {
      shortMeaning: card.shortMeaning,
      heartMeaning: card.heartMeaning,
      pathMeaning: card.pathMeaning,
      magicMeaning: card.magicMeaning
    };
  }

  if (lang === 'de') {
    return {
      shortMeaning: `${localizedName} steht für ${localizedKeyword} und zeigt, welche Energie gerade in deinem Leben wirksam ist.`,
      heartMeaning: `In deiner Herzposition zeigt ${localizedName}, dass das Thema ${localizedKeyword} gerade deine innere Welt berührt und achtsam gefühlt werden möchte.`,
      pathMeaning: `Auf deinem Weg weist ${localizedName} auf das Thema ${localizedKeyword} hin und bittet dich, den nächsten Schritt bewusst zu wählen.`,
      magicMeaning: `Als magische Karte bringt ${localizedName} eine sanfte Segenskraft mit sich und verstärkt das Thema ${localizedKeyword}.`
    };
  }

  return {
    shortMeaning: `${localizedName} สื่อถึง${localizedKeyword} พลังนี้กำลังเคลื่อนไหวในชีวิตของคุณตอนนี้`,
    heartMeaning: `ในตำแหน่งหัวใจ ${localizedName} บอกว่าตอนนี้คุณกำลังรู้สึกถึง${localizedKeyword}อยู่ลึกลับ ให้เวลาตัวเองได้รับรู้ความรู้สึกนี้อย่างอ่อนโยน`,
    pathMeaning: `บนเส้นทางชีวิต ${localizedName} ชวนให้คุณก้าวไปข้างหน้าด้วย${localizedKeyword} ไม่ต้องรีบ เดินไปตามจังหวะของตัวเอง`,
    magicMeaning: `ไพ่ใบนี้เป็นพรแห่ง${localizedKeyword} คอยอยู่เคียงข้างและหนุนนำคุณอย่างเงียบ ๆ`
  };
}

export function getPositions(lang) {
  const ui = UI_STRINGS[lang] ?? UI_STRINGS.en;
  return [
    { key: 'heartMeaning', label: ui.positions.heart.label, hint: ui.positions.heart.hint },
    { key: 'pathMeaning', label: ui.positions.path.label, hint: ui.positions.path.hint },
    { key: 'magicMeaning', label: ui.positions.magic.label, hint: ui.positions.magic.hint }
  ];
}

export function getLocalizedCard(card, lang = DEFAULT_LANGUAGE) {
  if (lang === 'en') return card;

  const localizedName = getLocalizedName(card, lang);
  const localizedKeyword = getLocalizedKeyword(card, lang);
  const meanings = buildLocalizedMeanings(card, lang, localizedName, localizedKeyword);

  return {
    ...card,
    name: localizedName,
    keyword: localizedKeyword,
    suitName: SUIT_TRANSLATIONS[card.suit]?.[lang] ?? card.suitName,
    rank: RANK_TRANSLATIONS[card.rank]?.[lang] ?? card.rank,
    ...meanings
  };
}
