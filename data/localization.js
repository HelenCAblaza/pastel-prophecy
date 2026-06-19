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
    yourPastelProphecy: 'คำทำนาย Pastel ของคุณ',
    beginButton: 'เริ่มคำทำนาย',
    beginAria: 'เริ่มคำทำนาย',
    startImageAlt: 'หน้าเริ่มต้นของ The Pastel Prophecy พร้อมยูนิคอร์น ปราสาท และปุ่มเริ่มคำทำนาย',
    stepOne: 'ขั้นแรก',
    stepTwo: 'ขั้นที่สอง',
    yourReading: 'คำทำนายของคุณ',
    wakeDeck: 'ปลุกสำรับไพ่',
    shuffleInstructionIdle: 'แตะเพื่อสับไพ่ แล้วปล่อยให้ไพ่ลอยพลิ้วเหมือนกลีบดอกไม้',
    shuffleInstructionBusy: 'สำรับไพ่กำลังหมุนวนอยู่ใต้แสงจันทร์…',
    shuffleButton: 'สับไพ่',
    chooseThree: 'เลือกไพ่สามใบ',
    fanScrollAria: 'ลากผ่านสำรับไพ่ที่แผ่ออก',
    revealButton: 'เผยคำทำนายของฉัน',
    summaryTitle: '3 ใบนี้เมื่ออ่านร่วมกัน',
    doTitle: 'ควรทำ (สำหรับไพ่ทั้ง 3 ใบ)',
    dontTitle: 'ไม่ควรทำ (สำหรับไพ่ทั้ง 3 ใบ)',
    drawAgain: 'จั่วใหม่อีกครั้ง',
    exportFooter: 'คำทำนายแสนอ่อนโยนสำหรับวันของคุณ',
    briefLabel: 'สรุปย่อ:',
    languageSelectorAria: 'เลือกภาษา',
    faceDownCard: (n) => `ไพ่คว่ำใบที่ ${n}`,
    selectedCardAria: (label) => `เลือกไพ่ตำแหน่ง${label}แล้ว แตะอีกครั้งเพื่อยกเลิก`,
    pickInstruction: (label, hint) => `เลือกไพ่${label}ของคุณ: ${hint}`,
    readyToReveal: 'ไพ่ทั้งสามใบของคุณกำลังเปล่งประกาย พร้อมจะเปิดคำทำนายแล้วหรือยัง?',
    positions: {
      heart: { label: 'หัวใจ', hint: 'สิ่งที่หัวใจของคุณกำลังรู้สึก' },
      path: { label: 'เส้นทาง', hint: 'ทิศทางที่พลังของคุณกำลังเคลื่อนไป' },
      magic: { label: 'เวทมนตร์', hint: 'พรที่กำลังโอบล้อมคุณอยู่' }
    },
    summary: (heart, path, magic) => `ไพ่หัวใจสะท้อนพลังของ${lowerFirst(heart.keyword)}ที่กำลังเกิดขึ้นภายในตัวคุณในขณะนี้ \u2014 ความรู้สึกที่ต้องการถูกมองเห็นและถูกโอบกอดด้วยความอ่อนโยน ไพ่เส้นทางชี้ทิศทางที่พลังของ${lowerFirst(path.keyword)}กำลังเคลื่อนไปและชวนให้คุณก้าวเดินด้วยความกล้าหาญอันนุ่มนวล ไพ่เวทมนตร์ห่อหุ้มคุณด้วยพรแห่ง${lowerFirst(magic.keyword)}อย่างเงียบ ๆ เตือนความจำว่าคุณไม่ได้อยู่ตามลำพัง เมื่ออ่านร่วมกัน ไพ่ทั้งสามใบนี้เล่าเรื่องราวที่เริ่มต้นด้วยความรู้สึกที่ซื่อตรง ดำเนินด้วยการก้าวเดินอย่างกล้าหาญ และถูกโอบอุ้มด้วยความเมตตาอันเงียบสงบ`,
    doLines: (heart, path, magic) => [
      `อนุญาตให้ตัวเองรู้สึกถึงพลังของ${lowerFirst(heart.keyword)}ตามที่เป็นอยู่โดยไม่ต้องรีบแก้ไขอะไรทันที`,
      `ก้าวเดินเล็ก ๆ ไปในทิศทางของ${lowerFirst(path.keyword)}ด้วยความกล้าหาญ`,
      `เชื่อใจว่าของขวัญอันอ่อนโยนของ${lowerFirst(magic.keyword)}อยู่ใกล้ตัวคุณเสมอ แม้ในวันที่ยังไม่ชัดเจน`
    ],
    dontLines: (heart, path, magic) => [
      `อย่าปิดกั้นความรู้สึกของ${lowerFirst(heart.keyword)}หรือตำหนิตัวเองที่ยังอยู่ตรงนี้`,
      `อย่าบังคับผลลัพธ์ก่อนที่${lowerFirst(path.keyword)}จะมีที่ว่างให้คลี่คลาย พยายามให้เวลาเป็นพันธมิตรของคุณ`,
      `อย่ามองข้ามความช่วยเหลือเงียบ ๆ ของ${lowerFirst(magic.keyword)}เพียงเพราะมันมาอย่างนุ่มนวล`
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
  'The Fool': { de: 'Der Narr', th: 'คนโง่' },
  'The Magician': { de: 'Der Magier', th: 'นักมายากล' },
  'The High Priestess': { de: 'Die Hohepriesterin', th: 'มหาปุโรหิตหญิง' },
  'The Empress': { de: 'Die Herrscherin', th: 'จักรพรรดินี' },
  'The Emperor': { de: 'Der Herrscher', th: 'จักรพรรดิ' },
  'The Hierophant': { de: 'Der Hierophant', th: 'มหาปุโรหิต' },
  'The Lovers': { de: 'Die Liebenden', th: 'คู่รัก' },
  'The Chariot': { de: 'Der Wagen', th: 'รถศึก' },
  'Strength': { de: 'Die Kraft', th: 'พละกำลัง' },
  'The Hermit': { de: 'Der Eremit', th: 'ฤๅษี' },
  'Wheel of Fortune': { de: 'Rad des Schicksals', th: 'วงล้อแห่งโชคชะตา' },
  'Justice': { de: 'Die Gerechtigkeit', th: 'ความยุติธรรม' },
  'The Hanged Man': { de: 'Der Gehängte', th: 'ชายแขวนคอ' },
  'Death': { de: 'Der Tod', th: 'ความตาย' },
  'Temperance': { de: 'Die Mäßigkeit', th: 'การปรับสมดุล' },
  'The Devil': { de: 'Der Teufel', th: 'ปีศาจ' },
  'The Tower': { de: 'Der Turm', th: 'หอคอย' },
  'The Star': { de: 'Der Stern', th: 'ดวงดาว' },
  'The Moon': { de: 'Der Mond', th: 'พระจันทร์' },
  'The Sun': { de: 'Die Sonne', th: 'พระอาทิตย์' },
  'Judgement': { de: 'Das Gericht', th: 'การพิพากษา' },
  'The World': { de: 'Die Welt', th: 'โลก' }
};

const KEYWORD_TRANSLATIONS = {
  'Abundance': { de: 'Fülle', th: 'ความอุดมสมบูรณ์' },
  'Alignment': { de: 'Ausrichtung', th: 'ความสอดคล้อง' },
  'Anxiety': { de: 'Angst', th: 'ความกังวล' },
  'Attachment': { de: 'Bindung', th: 'ความยึดติด' },
  'Awakening': { de: 'Erwachen', th: 'การตื่นรู้' },
  'Balance': { de: 'Balance', th: 'ความสมดุล' },
  'Bold action': { de: 'Mutiges Handeln', th: 'การลงมืออย่างกล้าหาญ' },
  'Burden': { de: 'Last', th: 'ภาระ' },
  'Celebration': { de: 'Feier', th: 'การเฉลิมฉลอง' },
  'Choices': { de: 'Entscheidungen', th: 'ทางเลือก' },
  'Clarity': { de: 'Klarheit', th: 'ความชัดเจน' },
  'Compassion': { de: 'Mitgefühl', th: 'ความเมตตา' },
  'Completion': { de: 'Vollendung', th: 'การบรรลุผล' },
  'Confidence': { de: 'Selbstvertrauen', th: 'ความมั่นใจ' },
  'Conflict': { de: 'Konflikt', th: 'ความขัดแย้ง' },
  'Contemplation': { de: 'Einkehr', th: 'การใคร่ครวญ' },
  'Craftsmanship': { de: 'Handwerkskunst', th: 'ความชำนาญ' },
  'Curiosity': { de: 'Neugier', th: 'ความใฝ่รู้' },
  'Determination': { de: 'Entschlossenheit', th: 'ความมุ่งมั่น' },
  'Diligence': { de: 'Fleiß', th: 'ความขยันมั่นเพียร' },
  'Discernment': { de: 'Urteilsvermögen', th: 'วิจารณญาณ' },
  'Drive': { de: 'Tatkraft', th: 'แรงผลักดัน' },
  'Emotional balance': { de: 'Emotionale Reife', th: 'สมดุลทางอารมณ์' },
  'Emotional fulfillment': { de: 'Emotionale Erfüllung', th: 'ความสมหวังทางอารมณ์' },
  'Emotional renewal': { de: 'Emotionale Erneuerung', th: 'การเยียวยาหัวใจครั้งใหม่' },
  'Ending': { de: 'Ende', th: 'จุดจบ' },
  'Enthusiasm': { de: 'Begeisterung', th: 'ความกระตือรือร้น' },
  'Expansion': { de: 'Expansion', th: 'การขยายตัว' },
  'Generosity': { de: 'Großzügigkeit', th: 'ความเอื้อเฟื้อ' },
  'Grief': { de: 'Trauer', th: 'ความโศกเศร้า' },
  'Hardship': { de: 'Entbehrung', th: 'ความยากลำบาก' },
  'Heartbreak': { de: 'Herzschmerz', th: 'อกหัก' },
  'Hope': { de: 'Hoffnung', th: 'ความหวัง' },
  'Inner knowing': { de: 'Innere Gewissheit', th: 'ญาณภายใน' },
  'Inner strength': { de: 'Innere Stärke', th: 'พลังภายใน' },
  'Inspiration': { de: 'Inspiration', th: 'แรงบันดาลใจ' },
  'Joy': { de: 'Freude', th: 'ความสุข' },
  'Joyful foundation': { de: 'Freudige Stabilität', th: 'รากฐานแห่งความสุข' },
  'Leap of faith': { de: 'Vertrauenssprung', th: 'การก้าวด้วยศรัทธา' },
  'Legacy': { de: 'Vermächtnis', th: 'มรดก' },
  'Manifestation': { de: 'Manifestation', th: 'การทำให้เป็นจริง' },
  'Momentum': { de: 'Schwung', th: 'แรงส่ง' },
  'Mystery': { de: 'Geheimnis', th: 'ความลึกลับ' },
  'Nostalgia': { de: 'Nostalgie', th: 'ความคิดถึงวันวาน' },
  'Open-hearted message': { de: 'Offenherzige Botschaft', th: 'ข้อความจากใจ' },
  'Opportunity': { de: 'Gelegenheit', th: 'โอกาส' },
  'Partnership': { de: 'Partnerschaft', th: 'การเป็นคู่' },
  'Patience': { de: 'Geduld', th: 'ความอดทน' },
  'Perseverance': { de: 'Durchhaltevermögen', th: 'ความมุ่งมั่นไม่ยอมแพ้' },
  'Planning': { de: 'Planung', th: 'การวางแผน' },
  'Practical nurture': { de: 'Praktische Fürsorge', th: 'การดูแลอย่างเป็นรูปธรรม' },
  'Reason': { de: 'Vernunft', th: 'เหตุผล' },
  'Recognition': { de: 'Anerkennung', th: 'การได้รับการยอมรับ' },
  'Reflection': { de: 'Innenschau', th: 'การทบทวนตนเอง' },
  'Resilience': { de: 'Widerstandskraft', th: 'ความแกร่งที่ฟื้นคืนได้' },
  'Rest': { de: 'Ruhe', th: 'การพักฟื้น' },
  'Restriction': { de: 'Einschränkung', th: 'การถูกจำกัด' },
  'Romantic pursuit': { de: 'Romantische Annäherung', th: 'การเดินหน้าความรัก' },
  'Satisfaction': { de: 'Zufriedenheit', th: 'ความพึงพอใจ' },
  'Security': { de: 'Sicherheit', th: 'ความมั่นคง' },
  'Self-sufficiency': { de: 'Unabhängigkeit', th: 'การพึ่งพาตนเอง' },
  'Stalemate': { de: 'Patt', th: 'ภาวะชะงักงัน' },
  'Strategy': { de: 'Strategie', th: 'กลยุทธ์' },
  'Structure': { de: 'Struktur', th: 'โครงสร้าง' },
  'Study': { de: 'Lernen', th: 'การเรียนรู้' },
  'Surrender': { de: 'Hingabe', th: 'การปล่อยวาง' },
  'Teamwork': { de: 'Zusammenarbeit', th: 'การทำงานร่วมกัน' },
  'Tradition': { de: 'Tradition', th: 'ขนบธรรมเนียม' },
  'Transformation': { de: 'Transformation', th: 'การเปลี่ยนผ่าน' },
  'Transition': { de: 'Übergang', th: 'การเคลื่อนผ่าน' },
  'Truth': { de: 'Wahrheit', th: 'ความจริง' },
  'Turning point': { de: 'Wendepunkt', th: 'จุดเปลี่ยน' },
  'Upheaval': { de: 'Umbruch', th: 'การสั่นคลอน' },
  'Vision': { de: 'Vision', th: 'วิสัยทัศน์' },
  'Walking away': { de: 'Loslassen', th: 'การเดินจากไป' }
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
    shortMeaning: `${localizedName} สื่อถึง${localizedKeyword} และเผยให้เห็นพลังที่กำลังทำงานอยู่ในชีวิตของคุณ`,
    heartMeaning: `ในตำแหน่งหัวใจ ${localizedName} บอกว่าพลังของ${localizedKeyword}กำลังแตะโลกภายในของคุณ และควรได้รับการรับฟังอย่างอ่อนโยน`,
    pathMeaning: `บนเส้นทางของคุณ ${localizedName} ชี้ไปที่${localizedKeyword} และชวนให้คุณเลือกก้าวต่อไปอย่างมีสติ`,
    magicMeaning: `ในฐานะไพ่พลังเวท ${localizedName} นำพรของ${localizedKeyword}มาห่อหุ้มและคอยหนุนคุณอย่างนุ่มนวล`
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

  const localizedName = card.name;
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
