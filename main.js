/* ============================================================
   Kana Night — main.js
   Global modes: kana | numbers
   ============================================================ */

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — KANA DATA
   ═══════════════════════════════════════════════════════════ */

const VOWELS = [
  { r:'a',  h:'あ', k:'ア' },
  { r:'i',  h:'い', k:'イ' },
  { r:'u',  h:'う', k:'ウ' },
  { r:'e',  h:'え', k:'エ' },
  { r:'o',  h:'お', k:'オ' },
];

const MAIN_ROWS = [
  { c:'k', cells:[{r:'ka',h:'か',k:'カ'},{r:'ki',h:'き',k:'キ'},{r:'ku',h:'く',k:'ク'},{r:'ke',h:'け',k:'ケ'},{r:'ko',h:'こ',k:'コ'}] },
  { c:'s', cells:[{r:'sa',h:'さ',k:'サ'},{r:'si',h:'し',k:'シ',rl:'shi'},{r:'su',h:'す',k:'ス'},{r:'se',h:'せ',k:'セ'},{r:'so',h:'そ',k:'ソ'}] },
  { c:'t', cells:[{r:'ta',h:'た',k:'タ'},{r:'ti',h:'ち',k:'チ',rl:'chi'},{r:'tu',h:'つ',k:'ツ',rl:'tsu'},{r:'te',h:'て',k:'テ'},{r:'to',h:'と',k:'ト'}] },
  { c:'n', cells:[{r:'na',h:'な',k:'ナ'},{r:'ni',h:'に',k:'ニ'},{r:'nu',h:'ぬ',k:'ヌ'},{r:'ne',h:'ね',k:'ネ'},{r:'no',h:'の',k:'ノ'}] },
  { c:'h', cells:[{r:'ha',h:'は',k:'ハ'},{r:'hi',h:'ひ',k:'ヒ'},{r:'fu',h:'ふ',k:'フ',rl:'fu'},{r:'he',h:'へ',k:'ヘ'},{r:'ho',h:'ほ',k:'ホ'}] },
  { c:'m', cells:[{r:'ma',h:'ま',k:'マ'},{r:'mi',h:'み',k:'ミ'},{r:'mu',h:'む',k:'ム'},{r:'me',h:'め',k:'メ'},{r:'mo',h:'も',k:'モ'}] },
  { c:'y', cells:[{r:'ya',h:'や',k:'ヤ'},null,{r:'yu',h:'ゆ',k:'ユ'},null,{r:'yo',h:'よ',k:'ヨ'}] },
  { c:'r', cells:[{r:'ra',h:'ら',k:'ラ'},{r:'ri',h:'り',k:'リ'},{r:'ru',h:'る',k:'ル'},{r:'re',h:'れ',k:'レ'},{r:'ro',h:'ろ',k:'ロ'}] },
  { c:'w', cells:[{r:'wa',h:'わ',k:'ワ'},null,null,null,{r:'wo',h:'を',k:'ヲ'}] },
];

const N_ENTRY = { r:'n', h:'ん', k:'ン' };

const DAKUTEN_ROWS = [
  { c:'g', cells:[{r:'ga',h:'が',k:'ガ'},{r:'gi',h:'ぎ',k:'ギ'},{r:'gu',h:'ぐ',k:'グ'},{r:'ge',h:'げ',k:'ゲ'},{r:'go',h:'ご',k:'ゴ'}] },
  { c:'z', cells:[{r:'za',h:'ざ',k:'ザ'},{r:'zi',h:'じ',k:'ジ',tl:'zi'},{r:'zu',h:'ず',k:'ズ'},{r:'ze',h:'ぜ',k:'ゼ'},{r:'zo',h:'ぞ',k:'ゾ'}] },
  { c:'d', cells:[{r:'da',h:'だ',k:'ダ'},{r:'di',h:'ぢ',k:'ヂ',tl:'di'},{r:'du',h:'づ',k:'ヅ',tl:'du'},{r:'de',h:'で',k:'デ'},{r:'do',h:'ど',k:'ド'}] },
  { c:'b', cells:[{r:'ba',h:'ば',k:'バ'},{r:'bi',h:'び',k:'ビ'},{r:'bu',h:'ぶ',k:'ブ'},{r:'be',h:'べ',k:'ベ'},{r:'bo',h:'ぼ',k:'ボ'}] },
  { c:'p', cells:[{r:'pa',h:'ぱ',k:'パ'},{r:'pi',h:'ぴ',k:'ピ'},{r:'pu',h:'ぷ',k:'プ'},{r:'pe',h:'ぺ',k:'ペ'},{r:'po',h:'ぽ',k:'ポ'}] },
];


/* ── Yoon (拗音) data ── */
// Each row = the -i kana base; cells = [+ya, +yu, +yo]
const YOON_ROWS = [
  { base:'ki',  cells:[{r:'kya', h:'きゃ',k:'キャ'},{r:'kyu',h:'きゅ',k:'キュ'},{r:'kyo',h:'きょ',k:'キョ'}] },
  { base:'shi', cells:[{r:'sha', h:'しゃ',k:'シャ'},{r:'shu',h:'しゅ',k:'シュ'},{r:'sho',h:'しょ',k:'ショ'}] },
  { base:'chi', cells:[{r:'cha', h:'ちゃ',k:'チャ'},{r:'chu',h:'ちゅ',k:'チュ'},{r:'cho',h:'ちょ',k:'チョ'}] },
  { base:'ni',  cells:[{r:'nya', h:'にゃ',k:'ニャ'},{r:'nyu',h:'にゅ',k:'ニュ'},{r:'nyo',h:'にょ',k:'ニョ'}] },
  { base:'hi',  cells:[{r:'hya', h:'ひゃ',k:'ヒャ'},{r:'hyu',h:'ひゅ',k:'ヒュ'},{r:'hyo',h:'ひょ',k:'ヒョ'}] },
  { base:'mi',  cells:[{r:'mya', h:'みゃ',k:'ミャ'},{r:'myu',h:'みゅ',k:'ミュ'},{r:'myo',h:'みょ',k:'ミョ'}] },
  { base:'ri',  cells:[{r:'rya', h:'りゃ',k:'リャ'},{r:'ryu',h:'りゅ',k:'リュ'},{r:'ryo',h:'りょ',k:'リョ'}] },
  // Dakuten-based yoon
  { base:'gi',  cells:[{r:'gya', h:'ぎゃ',k:'ギャ'},{r:'gyu',h:'ぎゅ',k:'ギュ'},{r:'gyo',h:'ぎょ',k:'ギョ'}], dak:true },
  { base:'ji',  cells:[{r:'ja',  h:'じゃ',k:'ジャ'},{r:'ju', h:'じゅ',k:'ジュ'},{r:'jo', h:'じょ',k:'ジョ'}], dak:true },
  { base:'di',  cells:[{r:'dya', h:'ぢゃ',k:'ヂャ'},{r:'dyu',h:'ぢゅ',k:'ヂュ'},{r:'dyo',h:'ぢょ',k:'ヂョ'}], dak:true },
  { base:'bi',  cells:[{r:'bya', h:'びゃ',k:'ビャ'},{r:'byu',h:'びゅ',k:'ビュ'},{r:'byo',h:'びょ',k:'ビョ'}], dak:true },
  { base:'pi',  cells:[{r:'pya', h:'ぴゃ',k:'ピャ'},{r:'pyu',h:'ぴゅ',k:'ピュ'},{r:'pyo',h:'ぴょ',k:'ピョ'}], dak:true },
];

function kanaTableLabel(cell) { return cell ? (cell.tl || cell.rl || cell.r) : ''; }
function kanaRomajiLabel(cell) { return cell.rl || cell.r; }

function buildKanaDeck(script, dakuten, yoon) {
  const out = [];
  const add = e => {
    if (!e) return;
    if (script === 'hiragana' && !e.h) return;
    if (script === 'katakana' && !e.k) return;
    out.push(e);
  };
  VOWELS.forEach(add);
  MAIN_ROWS.forEach(r => r.cells.forEach(add));
  add(N_ENTRY);
  if (dakuten) DAKUTEN_ROWS.forEach(r => r.cells.forEach(add));
  if (yoon) {
    YOON_ROWS.forEach(row => {
      // include dakuten-based yoon only if dakuten is also on
      if (row.dak && !dakuten) return;
      row.cells.forEach(add);
    });
  }
  return out;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — NUMBERS DATA
   ═══════════════════════════════════════════════════════════ */

const SPECIAL_READINGS = {
  300:  { k:'三百', r:'sanbyaku',  h:'さんびゃく' },
  600:  { k:'六百', r:'roppyaku',  h:'ろっぴゃく' },
  800:  { k:'八百', r:'happyaku',  h:'はっぴゃく' },
  3000: { k:'三千', r:'sanzen',    h:'さんぜん' },
  8000: { k:'八千', r:'hassen',    h:'はっせん' },
};

const NUM_ATOMS = {
  1:{k:'一',r:'ichi',    h:'いち'},
  2:{k:'二',r:'ni',      h:'に'},
  3:{k:'三',r:'san',     h:'さん'},
  4:{k:'四',r:'shi',     h:'し',    alt:{r:'yon',  h:'よん'}},
  5:{k:'五',r:'go',      h:'ご'},
  6:{k:'六',r:'roku',    h:'ろく'},
  7:{k:'七',r:'nana',    h:'なな',   alt:{r:'shichi',h:'しち'}},
  8:{k:'八',r:'hachi',   h:'はち'},
  9:{k:'九',r:'ku',      h:'く',    alt:{r:'kyuu', h:'きゅう'}},
};

// Digits that have two common readings — highlight in table
const DUAL_DIGITS = new Set([4, 7, 9]);

function numberToJapanese(n) {
  if (n === 0) return { kanji:'零', romaji:'rei', hiragana:'れい' };
  if (SPECIAL_READINGS[n]) {
    const s = SPECIAL_READINGS[n];
    return { kanji:s.k, romaji:s.r, hiragana:s.h };
  }

  let kanji='', romaji='', hiragana='';
  const units = [
    [100000000,'億','oku',   'おく'],
    [10000,    '万','man',   'まん'],
    [1000,     '千','sen',   'せん'],
    [100,      '百','hyaku', 'ひゃく'],
    [10,       '十','juu',   'じゅう'],
  ];

  let rem = n;
  for (const [val, kj, ro, hi] of units) {
    if (rem >= val) {
      const count = Math.floor(rem / val);
      rem %= val;
      const comboKey = count * val;
      if (count > 1 && SPECIAL_READINGS[comboKey]) {
        const sp = SPECIAL_READINGS[comboKey];
        kanji += sp.k; romaji += sp.r; hiragana += sp.h;
      } else {
        if (count > 1) {
          const a = NUM_ATOMS[count];
          kanji    += a.k;
          romaji   += a.r.split('/')[0];
          hiragana += a.h.split('・')[0];
        }
        kanji += kj; romaji += ro; hiragana += hi;
      }
    }
  }
  if (rem > 0) {
    const a = NUM_ATOMS[rem];
    kanji    += a.k;
    romaji   += a.r.split('/')[0];
    hiragana += a.h.split('・')[0];
  }
  return { kanji, romaji, hiragana };
}

function randomNumber(cfg) {
  let min = cfg.numMin, max = cfg.numMax;
  if (cfg.numMode === 'units')     { min=Math.max(min,0);    max=Math.min(max,9); }
  else if (cfg.numMode === 'tens')      { min=Math.max(min,10);   max=Math.min(max,99); }
  else if (cfg.numMode === 'hundreds')  { min=Math.max(min,100);  max=Math.min(max,999); }
  else if (cfg.numMode === 'thousands') { min=Math.max(min,1000); max=Math.min(max,9999); }
  if (min > max) min = max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — STATE
   ═══════════════════════════════════════════════════════════ */

const state = {
  globalMode: 'kana',
  startView:  'flash',
  view:       'flash',
  _weInitDone: false,

  // Kana
  script:   'hiragana',
  order:    'random',
  dakuten:  false,
  yoon:     false,
  reverse:  false,
  choicesN: 6,

  // Numbers
  numMode:         'mixed',
  numMin:          1,
  numMax:          9999,
  numDeckSize:     20,
  numShowKanji:    true,
  numShowRomaji:   true,
  numShowHiragana: true,

  // Session
  deck: [], queue: [], currentIdx: 0, current: null,
  known: 0, attempts: 0, revealed: false, locked: false,
};

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — DOM REFS
   ═══════════════════════════════════════════════════════════ */

const $ = id => document.getElementById(id);

const topbar     = $('topbar');
const topHotspot = $('topHotspot');
const statTxt    = $('statTxt');

const selGlobalMode = $('selGlobalMode');
const kanaControls  = $('kanaControls');
const numControls   = $('numControls');

const selScript    = $('selScript');
const selOrder     = $('selOrder');
const optDakuten   = $('optDakuten');
const optYoon      = $('optYoon');
const optReverse   = $('optReverse');
const choicesLabel = $('choicesLabel');
const choicesN     = $('choicesN');

const selNumMode   = $('selNumMode');
const numMinInput  = $('numMin');
const numMaxInput  = $('numMax');
const numDeckInput = $('numDeckSize');
const optNumKanji  = $('optNumKanji');
const optNumRomaji = $('optNumRomaji');
const optNumHira   = $('optNumHira');

const flashView  = $('flashView');
const card       = $('card');
const cardFront  = $('cardFront');
const cardAnswer = $('cardAnswer');
const choicesRow = $('choicesRow');
const actionsRow = $('actionsRow');
const btnAgain   = $('btnAgain');
const btnKnown   = $('btnKnown');
const btnReset   = $('btnReset');

const tableView     = $('tableView');
const tableScroller = $('tableScroller');
const tableTitle    = $('tableTitle');
const btnTables     = $('btnTables');

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — TOPBAR AUTO-HIDE
   ═══════════════════════════════════════════════════════════ */

let topHideTimer = null;
let _topVisible  = false;

function showTopbar() {
  clearTimeout(topHideTimer);
  if (!_topVisible) {
    topbar.classList.add('visible');
    _topVisible = true;
  }
  topHideTimer = setTimeout(hideTopbar, 8000);
}
function hideTopbar() {
  topbar.classList.remove('visible');
  _topVisible = false;
}

// Hotspot enter → show
topHotspot.addEventListener('mouseenter', showTopbar);

// While inside topbar → cancel hide timer (stay open indefinitely)
topbar.addEventListener('mouseenter', () => {
  clearTimeout(topHideTimer);
  if (!_topVisible) { topbar.classList.add('visible'); _topVisible = true; }
});

// Leave topbar → hide after 2s
topbar.addEventListener('mouseleave', () => {
  topHideTimer = setTimeout(hideTopbar, 2000);
});

// Mouse near top edge → show only if not yet visible (avoid fighting with mouseleave timer)
document.addEventListener('mousemove', e => {
  if (e.clientY < 56 && !_topVisible) showTopbar();
});

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — WE PROPERTY LISTENER
   ═══════════════════════════════════════════════════════════ */

function applyWEProperty(name, value) {
  switch (name) {
    case 'global_mode':      state.globalMode = value; selGlobalMode.value = value; break;
    case 'start_view':       state.startView  = value; break;
    case 'kana_script_mode': state.script = value; selScript.value = value; break;
    case 'deck_mode': {
      const m = {hira:'hiragana',kata:'katakana',both:'both_mix'};
      if (m[value]) { state.script = m[value]; selScript.value = m[value]; }
      break;
    }
    case 'default_dakuten':    state.dakuten  = !!value; optDakuten.checked  = !!value; break;
    case 'default_yoon':       state.yoon     = !!value; optYoon.checked     = !!value; break;
    case 'default_random_next':
    case 'default_random':     state.order    = value ? 'random':'sequential'; selOrder.value = state.order; break;
    case 'reverse_quiz':       state.reverse  = !!value; optReverse.checked  = !!value; break;
    case 'reverse_choices':    state.choicesN = parseInt(value,10)||6; choicesN.value = state.choicesN; break;
    case 'num_mode':           state.numMode  = value; selNumMode.value  = value; break;
    case 'num_min':            state.numMin   = parseInt(value,10)||0;    numMinInput.value  = state.numMin; break;
    case 'num_max':            state.numMax   = parseInt(value,10)||9999; numMaxInput.value  = state.numMax; break;
    case 'num_deck_size':      state.numDeckSize = parseInt(value,10)||20; numDeckInput.value = state.numDeckSize; break;
    case 'num_show_kanji':     state.numShowKanji    = !!value; optNumKanji.checked  = !!value; break;
    case 'num_show_romaji':    state.numShowRomaji   = !!value; optNumRomaji.checked = !!value; break;
    case 'num_show_hiragana':  state.numShowHiragana = !!value; optNumHira.checked   = !!value; break;
  }
}

window.wallpaperPropertyListener = {
  applyUserProperties: props => {
    const firstCall = !state._weInitDone;
    Object.entries(props).forEach(([k, v]) => applyWEProperty(k, v.value));
    if (firstCall) {
      state._weInitDone = true;
      applyStartView();
    }
    restart();
  }
};

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — CONTROL EVENT LISTENERS
   ═══════════════════════════════════════════════════════════ */

selGlobalMode.addEventListener('change', () => {
  state.globalMode = selGlobalMode.value;
  syncModeUI(); restart();
});

selScript.addEventListener('change',  () => { state.script   = selScript.value;  restart(); });
selOrder.addEventListener('change',   () => { state.order    = selOrder.value;   restart(); });
optDakuten.addEventListener('change', () => { state.dakuten  = optDakuten.checked; restart(); });
optYoon.addEventListener('change',    () => { state.yoon     = optYoon.checked;    restart(); });
optReverse.addEventListener('change', () => { state.reverse  = optReverse.checked; updateKanaUI(); showCard(); });
choicesN.addEventListener('change',   () => {
  state.choicesN = Math.max(2, Math.min(12, parseInt(choicesN.value)||6));
  updateKanaUI(); showCard();
});

selNumMode.addEventListener('change',  () => { state.numMode     = selNumMode.value; restart(); });
numMinInput.addEventListener('change', () => { state.numMin      = parseInt(numMinInput.value,10)||0; restart(); });
numMaxInput.addEventListener('change', () => { state.numMax      = parseInt(numMaxInput.value,10)||9999; restart(); });
numDeckInput.addEventListener('change',() => { state.numDeckSize = Math.max(1,parseInt(numDeckInput.value,10)||20); restart(); });
optNumKanji.addEventListener('change', () => { state.numShowKanji    = optNumKanji.checked;  showCard(); });
optNumRomaji.addEventListener('change',() => { state.numShowRomaji   = optNumRomaji.checked; showCard(); });
optNumHira.addEventListener('change',  () => { state.numShowHiragana = optNumHira.checked;   showCard(); });

btnAgain.addEventListener('click',  doAgain);
btnKnown.addEventListener('click',  doKnown);
btnReset.addEventListener('click',  restart);
btnTables.addEventListener('click', toggleView);
card.addEventListener('click', onCardClick);
card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') onCardClick(); });

/* ═══════════════════════════════════════════════════════════
   SECTION 8 — MODE UI SYNC
   ═══════════════════════════════════════════════════════════ */

function syncModeUI() {
  const isKana = state.globalMode === 'kana';
  kanaControls.classList.toggle('hidden', !isKana);
  numControls.classList.toggle('hidden',   isKana);
}

function updateKanaUI() {
  const rev = state.reverse;
  choicesRow.classList.toggle('hidden', !rev);
  actionsRow.classList.toggle('hidden', rev);
  choicesLabel.classList.toggle('hidden', !rev);
  choicesN.classList.toggle('hidden', !rev);
}

function updateNumUI() {
  choicesRow.classList.add('hidden');
  actionsRow.classList.remove('hidden');
  choicesLabel.classList.add('hidden');
  choicesN.classList.add('hidden');
}

/* ═══════════════════════════════════════════════════════════
   SECTION 9 — DECK / QUEUE
   ═══════════════════════════════════════════════════════════ */

function restart() {
  state.known    = 0;
  state.attempts = 0;

  if (state.globalMode === 'kana') {
    state.deck = buildKanaDeck(state.script, state.dakuten, state.yoon);
    buildQueue();
    syncModeUI();
    updateKanaUI();
  } else {
    state.deck = buildNumberDeck();
    buildQueue();
    syncModeUI();
    updateNumUI();
  }

  if (state.view === 'flash') showCard();
  else renderTable();
  updateStat();
}

function buildQueue() {
  state.queue = state.deck.map((_,i) => i);
  if (state.globalMode === 'kana' && state.order === 'random') shuffle(state.queue);
  state.currentIdx = 0;
}

function buildNumberDeck() {
  const size = state.numDeckSize;
  const nums = new Set();
  let tries = 0;
  while (nums.size < size && tries < size * 30) {
    nums.add(randomNumber(state));
    tries++;
  }
  return [...nums].map(n => ({ n, ...numberToJapanese(n) }));
}

function advance() {
  state.currentIdx++;
  if (state.currentIdx >= state.queue.length) buildQueue();
}

function pushAgain() {
  const cur = state.queue[state.currentIdx];
  const at  = Math.min(state.currentIdx + 6, state.queue.length);
  state.queue.splice(state.currentIdx, 1);
  state.queue.splice(at, 0, cur);
}

function currentEntry() { return state.deck[state.queue[state.currentIdx]]; }

/* ═══════════════════════════════════════════════════════════
   SECTION 10 — CARD DISPLAY
   ═══════════════════════════════════════════════════════════ */

function showCard() {
  if (!state.deck.length) return;
  const entry = currentEntry();
  state.current  = entry;
  state.revealed = false;
  state.locked   = false;

  card.classList.add('fading');
  setTimeout(() => {
    cardAnswer.classList.remove('shown');
    cardAnswer.innerHTML = '';
    choicesRow.innerHTML = '';
    cardFront.className  = 'card-face';
    cardFront.innerHTML  = '';

    if (state.globalMode === 'kana') renderKanaCard(entry);
    else                              renderNumberCard(entry);

    card.classList.remove('fading');
    updateStat();
  }, 160);
}

function renderKanaCard(entry) {
  if (state.reverse) {
    cardFront.classList.add('romaji-prompt');
    cardFront.textContent = kanaRomajiLabel(entry);
    actionsRow.classList.add('hidden');
    buildChoiceButtons(entry);
  } else {
    const s = state.script;
    if (s === 'both_together') {
      cardFront.classList.add('both-together');
      const h = document.createElement('span'); h.textContent = entry.h;
      const dot = document.createElement('span'); dot.className='sep-slash'; dot.textContent='・';
      const k = document.createElement('span'); k.textContent = entry.k;
      cardFront.append(h, dot, k);
    } else {
      cardFront.textContent = s==='katakana' ? entry.k
                            : s==='both_mix' ? (Math.random()<.5?entry.h:entry.k)
                            : entry.h;
    }
    cardAnswer.textContent = kanaRomajiLabel(entry);
    actionsRow.classList.remove('hidden');
  }
}

function renderNumberCard(entry) {
  cardFront.classList.add('number-prompt');
  cardFront.textContent = entry.n.toLocaleString();

  cardAnswer.innerHTML = '';
  if (state.numShowKanji) {
    const s = document.createElement('span');
    s.className = 'ans-kanji'; s.textContent = entry.kanji;
    cardAnswer.appendChild(s);
  }
  if (state.numShowRomaji) {
    const s = document.createElement('span');
    s.className = 'ans-romaji'; s.textContent = entry.romaji;
    cardAnswer.appendChild(s);
  }
  if (state.numShowHiragana) {
    const s = document.createElement('span');
    s.className = 'ans-hira'; s.textContent = entry.hiragana;
    cardAnswer.appendChild(s);
  }
  actionsRow.classList.remove('hidden');
}

function buildChoiceButtons(entry) {
  const pool = state.deck.filter(e => e !== entry);
  const shuf = [...pool]; shuffle(shuf);
  const picks = shuf.slice(0, state.choicesN-1);
  picks.push(entry); shuffle(picks);

  choicesRow.classList.remove('hidden');
  picks.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    const s = state.script;
    btn.textContent = s==='hiragana' ? ch.h : s==='katakana' ? ch.k : ch.h+' / '+ch.k;
    btn.dataset.romaji = ch.r;
    btn.addEventListener('click', () => onChoiceClick(btn, entry));
    choicesRow.appendChild(btn);
  });
}

function onChoiceClick(btn, entry) {
  if (state.locked) return;
  state.locked = true;
  state.attempts++;
  const correct = btn.dataset.romaji === entry.r;
  choicesRow.querySelectorAll('.choice').forEach(b => {
    if (b.dataset.romaji === entry.r) b.classList.add('correct');
    else if (b === btn && !correct)   b.classList.add('wrong');
  });
  setTimeout(() => {
    if (correct) { state.known++; advance(); }
    else          pushAgain();
    updateStat(); showCard();
  }, 1000);
}

function onCardClick() {
  if (state.reverse && state.globalMode==='kana') return;
  if (state.locked) return;
  if (!state.revealed) {
    state.revealed = true;
    cardAnswer.classList.add('shown');
    state.attempts++;
    updateStat();
  } else {
    cardAnswer.classList.remove('shown');
    state.revealed = false;
  }
}

function doAgain() {
  state.attempts++; pushAgain(); updateStat(); showCard();
}
function doKnown() {
  state.known++; state.attempts++; advance(); updateStat(); showCard();
}

/* ═══════════════════════════════════════════════════════════
   SECTION 11 — VIEW TOGGLE
   ═══════════════════════════════════════════════════════════ */

function toggleView() {
  if (state.view === 'flash') {
    state.view = 'tables';
    flashView.classList.add('hidden');
    tableView.classList.remove('hidden');
    btnTables.textContent = '← Flashcards';
    renderTable();
  } else {
    state.view = 'flash';
    tableView.classList.add('hidden');
    flashView.classList.remove('hidden');
    btnTables.textContent = 'Tables';
    showCard();
  }
}

function applyStartView() {
  if (state.startView === 'tables') {
    state.view = 'tables';
    flashView.classList.add('hidden');
    tableView.classList.remove('hidden');
    btnTables.textContent = '← Flashcards';
  } else {
    state.view = 'flash';
    flashView.classList.remove('hidden');
    tableView.classList.add('hidden');
    btnTables.textContent = 'Tables';
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 12 — TABLE RENDER
   ═══════════════════════════════════════════════════════════ */

function renderTable() {
  if (state.globalMode === 'kana') renderKanaTable();
  else                              renderNumbersTable();
}

/* ── Kana table ── */
function renderKanaTable() {
  const showH = state.script !== 'katakana';
  const showK = state.script !== 'hiragana';

  tableTitle.textContent =
    state.script==='hiragana' ? 'Hiragana chart' :
    state.script==='katakana' ? 'Katakana chart' :
    'Kana chart — Hiragana + Katakana';

  const dakCols = state.dakuten
    ? [...DAKUTEN_ROWS].reverse().map(r => ({ hd:r.c+'-', cells:r.cells, dak:true }))
    : [];

  const nCol = { hd:'n', cells:[null,null,N_ENTRY,null,null] };

  const mainCols = [...MAIN_ROWS].reverse().map(row => ({
    hd: row.c+'-',
    cells: row.cells.map(c => (!c||c.r==='wi'||c.r==='we') ? null : c),
  }));

  const vowelCol = { hd:'—', cells:VOWELS };
  const cols = [...dakCols, nCol, ...mainCols, vowelCol];
  const rowLabels = ['-a','-i','-u','-e','-o'];

  const table = document.createElement('table');
  table.className = 'kana-table';

  const thead = table.createTHead();
  const hr = thead.insertRow();
  cols.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col.hd;
    if (col.dak) th.classList.add('dak-head');
    hr.appendChild(th);
  });
  const cTh = document.createElement('th');
  cTh.className = 'corner-th';
  hr.appendChild(cTh);

  const tbody = table.createTBody();
  for (let vi = 0; vi < 5; vi++) {
    const tr = tbody.insertRow();
    cols.forEach(col => {
      const cell = col.cells[vi];
      const td = tr.insertCell();
      if (!cell) { td.className='empty'; return; }
      if (col.dak) td.classList.add('dak-cell');
      renderKanaCellTd(td, cell, showH, showK);
    });
    const lbl = tr.insertCell();
    lbl.className = 'row-head';
    lbl.textContent = rowLabels[vi];
  }

  tableScroller.innerHTML = '';
  tableScroller.appendChild(table);

  // Yoon section — appended below main table
  if (state.yoon) {
    const yoonDiv = document.createElement('div');
    yoonDiv.className = 'yoon-section';

    const yoonTitle = document.createElement('div');
    yoonTitle.className = 'yoon-title';
    yoonTitle.textContent = 'Yoon — 拗音';
    yoonDiv.appendChild(yoonTitle);

    // Split into base rows and dakuten-yoon rows
    const baseRows = YOON_ROWS.filter(r => !r.dak);
    const dakRows  = state.dakuten ? YOON_ROWS.filter(r => r.dak) : [];

    function renderYoonGrid(rows, extraClass) {
      const grid = document.createElement('div');
      grid.className = 'yoon-grid' + (extraClass ? ' ' + extraClass : '');

      rows.forEach(row => {
        const block = document.createElement('div');
        block.className = 'yoon-block' + (row.dak ? ' yoon-dak' : '');

        // Base label
        const baseLabel = document.createElement('div');
        baseLabel.className = 'yoon-base-label';
        baseLabel.textContent = row.base + '-';
        block.appendChild(baseLabel);

        // 3 cells: -ya / -yu / -yo
        ['ya','yu','yo'].forEach((suffix, ci) => {
          const cell = row.cells[ci];
          const td = document.createElement('div');
          td.className = 'yoon-cell' + (row.dak ? ' yoon-dak-cell' : '');
          if (showH && cell.h) {
            const sh = document.createElement('span'); sh.className='cell-h'; sh.textContent=cell.h; td.appendChild(sh);
          }
          if (showK && cell.k) {
            const sk = document.createElement('span'); sk.className='cell-k'; sk.textContent=cell.k; td.appendChild(sk);
          }
          const sr = document.createElement('span'); sr.className='cell-r'; sr.textContent=cell.r.toUpperCase(); td.appendChild(sr);
          block.appendChild(td);
        });

        grid.appendChild(block);
      });
      return grid;
    }

    yoonDiv.appendChild(renderYoonGrid(baseRows, ''));
    if (dakRows.length) {
      const dakTitle = document.createElement('div');
      dakTitle.className = 'yoon-sub-title';
      dakTitle.textContent = 'Dakuten yoon';
      yoonDiv.appendChild(dakTitle);
      yoonDiv.appendChild(renderYoonGrid(dakRows, 'yoon-grid-dak'));
    }

    tableScroller.appendChild(yoonDiv);
  }
}

function renderKanaCellTd(td, cell, showH, showK) {
  if (showH && cell.h) { const s=document.createElement('span'); s.className='cell-h'; s.textContent=cell.h; td.appendChild(s); }
  if (showK && cell.k) { const s=document.createElement('span'); s.className='cell-k'; s.textContent=cell.k; td.appendChild(s); }
  const r=document.createElement('span'); r.className='cell-r'; r.textContent=kanaTableLabel(cell).toUpperCase(); td.appendChild(r);
}

/* ── Numbers table ── */
// Numbers that have irregular/special readings — highlight them
const SPECIAL_SET = new Set(Object.keys(SPECIAL_READINGS).map(Number));

function renderNumbersTable() {
  tableTitle.textContent = 'Numbers chart — 数字';

  const COLS = [
    { label:'UNITS',     sub:'一〜九',  mult:1    },
    { label:'TENS',      sub:'十〜九十', mult:10   },
    { label:'HUNDREDS',  sub:'百〜九百', mult:100  },
    { label:'THOUSANDS', sub:'千〜九千', mult:1000 },
  ];

  const table = document.createElement('table');
  table.className = 'num-table';

  // Header
  const thead = table.createTHead();
  const hr = thead.insertRow();
  const cTh = document.createElement('th');
  cTh.textContent = '#'; hr.appendChild(cTh);
  COLS.forEach(col => {
    const th = document.createElement('th');
    th.innerHTML = col.label + '<br><span class="th-jp">' + col.sub + '</span>';
    hr.appendChild(th);
  });

  // Helper: build compact cell HTML
  // Layout: arabic (top-right tiny) | kanji + { romaji / hira } on one row
  // For dual-reading digits (4,7,9) and their multiples: show both variants stacked
  function numCellHTML(n, jap, altJap) {
    const isSpecial = SPECIAL_SET.has(n);
    const isDual    = !!altJap;
    const cls = [isSpecial ? 'num-special' : '', isDual ? 'num-dual' : ''].filter(Boolean).join(' ');

    let textHTML;
    if (isDual) {
      // Two reading rows separated by a slash line
      textHTML =
        `<span class="num-text">` +
          `<span class="num-romaji">${jap.romaji}</span>` +
          `<span class="num-hira">${jap.hiragana}</span>` +
        `</span>` +
        `<span class="num-divider">/</span>` +
        `<span class="num-text">` +
          `<span class="num-romaji">${altJap.romaji}</span>` +
          `<span class="num-hira">${altJap.hiragana}</span>` +
        `</span>`;
    } else {
      textHTML =
        `<span class="num-text">` +
          `<span class="num-romaji">${jap.romaji}</span>` +
          `<span class="num-hira">${jap.hiragana}</span>` +
        `</span>`;
    }

    return (
      `<span class="num-arabic">${n.toLocaleString()}</span>` +
      `<span class="num-inline${cls ? ' '+cls : ''}">` +
        `<span class="num-kanji">${jap.kanji}</span>` +
        textHTML +
      `</span>`
    );
  }

  // Body rows 1-9
  const tbody = table.createTBody();
  for (let d = 1; d <= 9; d++) {
    const tr = tbody.insertRow();
    const rh = tr.insertCell(); rh.className='row-head'; rh.textContent=d;
    COLS.forEach(col => {
      const n = d * col.mult;
      const td = tr.insertCell();
      td.className = 'num-cell';

      const isSpecial = SPECIAL_SET.has(n);
      const isDual    = DUAL_DIGITS.has(d);   // 4x, 7x, 9x multiples get alt reading
      if (isSpecial) td.classList.add('num-cell-special');
      if (isDual)    td.classList.add('num-cell-dual');

      // Build primary Japanese (use atom's first reading for dual digits)
      let jap = numberToJapanese(n);
      let altJap = null;

      if (isDual) {
        const atom = NUM_ATOMS[d];
        if (col.mult === 1) {
          // pure digit: show both atom readings
          jap    = { kanji: atom.k, romaji: atom.r,     hiragana: atom.h };
          altJap = {               romaji: atom.alt.r,  hiragana: atom.alt.h };
        } else {
          // compound: e.g. 40 = よんじゅう / しじゅう
          // primary uses alt reading (more common for 40/70/90),
          // secondary uses first reading
          const primaryAtom  = { r: atom.alt.r,  h: atom.alt.h };
          const secondaryAtom = { r: atom.r,      h: atom.h };
          const suffix = numberToJapanese(col.mult); // 十/百/千
          jap    = {
            kanji:    atom.k + suffix.kanji,
            romaji:   primaryAtom.r   + suffix.romaji,
            hiragana: primaryAtom.h   + suffix.hiragana,
          };
          altJap = {
            romaji:   secondaryAtom.r + suffix.romaji,
            hiragana: secondaryAtom.h + suffix.hiragana,
          };
        }
      }

      td.innerHTML = numCellHTML(n, jap, altJap);
    });
  }

  // Row 0
  const tr0 = tbody.insertRow();
  tr0.classList.add('zero-row');
  const rh0 = tr0.insertCell(); rh0.className='row-head'; rh0.textContent='0';
  const td0 = tr0.insertCell(); td0.className='num-cell'; td0.colSpan=4;
  const jap0 = numberToJapanese(0);
  td0.innerHTML = numCellHTML(0, jap0, null);

  // Large numbers row: 万 / 億
  const trB = tbody.insertRow();
  trB.classList.add('big-row');
  const rhB = trB.insertCell(); rhB.className='row-head'; rhB.textContent='×';
  [[10000,'万','man','まん'],[100000000,'億','oku','おく']].forEach(([n,k,r,h]) => {
    const td = trB.insertCell(); td.className='num-cell';
    td.innerHTML = numCellHTML(n, {kanji:k, romaji:r, hiragana:h}, null);
  });
  trB.insertCell().className='empty';
  trB.insertCell().className='empty';

  tableScroller.innerHTML = '';
  tableScroller.appendChild(table);
}

/* ═══════════════════════════════════════════════════════════
   SECTION 13 — HELPERS
   ═══════════════════════════════════════════════════════════ */

function updateStat() {
  statTxt.textContent = `Known: ${state.known}  ·  Attempts: ${state.attempts}  ·  Deck: ${state.deck.length}`;
}

function shuffle(arr) {
  for (let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 14 — BOOT
   ═══════════════════════════════════════════════════════════ */

function init() {
  selGlobalMode.value   = state.globalMode;
  selScript.value       = state.script;
  selOrder.value        = state.order;
  optDakuten.checked    = state.dakuten;
  optYoon.checked       = state.yoon;
  optReverse.checked    = state.reverse;
  choicesN.value        = state.choicesN;
  selNumMode.value      = state.numMode;
  numMinInput.value     = state.numMin;
  numMaxInput.value     = state.numMax;
  numDeckInput.value    = state.numDeckSize;
  optNumKanji.checked   = state.numShowKanji;
  optNumRomaji.checked  = state.numShowRomaji;
  optNumHira.checked    = state.numShowHiragana;

  syncModeUI();
  restart();
}

init();
applyStartView();
