/* ============================================================
   Kana Night — main.js
   Global modes: kana | numbers | time | calendar
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

const YOON_ROWS = [
  { base:'ki',  cells:[{r:'kya',h:'きゃ',k:'キャ'},{r:'kyu',h:'きゅ',k:'キュ'},{r:'kyo',h:'きょ',k:'キョ'}] },
  { base:'shi', cells:[{r:'sha',h:'しゃ',k:'シャ'},{r:'shu',h:'しゅ',k:'シュ'},{r:'sho',h:'しょ',k:'ショ'}] },
  { base:'chi', cells:[{r:'cha',h:'ちゃ',k:'チャ'},{r:'chu',h:'ちゅ',k:'チュ'},{r:'cho',h:'ちょ',k:'チョ'}] },
  { base:'ni',  cells:[{r:'nya',h:'にゃ',k:'ニャ'},{r:'nyu',h:'にゅ',k:'ニュ'},{r:'nyo',h:'にょ',k:'ニョ'}] },
  { base:'hi',  cells:[{r:'hya',h:'ひゃ',k:'ヒャ'},{r:'hyu',h:'ひゅ',k:'ヒュ'},{r:'hyo',h:'ひょ',k:'ヒョ'}] },
  { base:'mi',  cells:[{r:'mya',h:'みゃ',k:'ミャ'},{r:'myu',h:'みゅ',k:'ミュ'},{r:'myo',h:'みょ',k:'ミョ'}] },
  { base:'ri',  cells:[{r:'rya',h:'りゃ',k:'リャ'},{r:'ryu',h:'りゅ',k:'リュ'},{r:'ryo',h:'りょ',k:'リョ'}] },
  { base:'gi',  cells:[{r:'gya',h:'ぎゃ',k:'ギャ'},{r:'gyu',h:'ぎゅ',k:'ギュ'},{r:'gyo',h:'ぎょ',k:'ギョ'}], dak:true },
  { base:'ji',  cells:[{r:'ja', h:'じゃ',k:'ジャ'},{r:'ju', h:'じゅ',k:'ジュ'},{r:'jo', h:'じょ',k:'ジョ'}], dak:true },
  { base:'di',  cells:[{r:'dya',h:'ぢゃ',k:'ヂャ'},{r:'dyu',h:'ぢゅ',k:'ヂュ'},{r:'dyo',h:'ぢょ',k:'ヂョ'}], dak:true },
  { base:'bi',  cells:[{r:'bya',h:'びゃ',k:'ビャ'},{r:'byu',h:'びゅ',k:'ビュ'},{r:'byo',h:'びょ',k:'ビョ'}], dak:true },
  { base:'pi',  cells:[{r:'pya',h:'ぴゃ',k:'ピャ'},{r:'pyu',h:'ぴゅ',k:'ピュ'},{r:'pyo',h:'ぴょ',k:'ピョ'}], dak:true },
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
  1:{k:'一',r:'ichi',  h:'いち'},
  2:{k:'二',r:'ni',    h:'に'},
  3:{k:'三',r:'san',   h:'さん'},
  4:{k:'四',r:'shi',   h:'し',   alt:{r:'yon',   h:'よん'}},
  5:{k:'五',r:'go',    h:'ご'},
  6:{k:'六',r:'roku',  h:'ろく'},
  7:{k:'七',r:'shichi',h:'しち', alt:{r:'nana',  h:'なな'}},  // FIXED: shichi first, nana second
  8:{k:'八',r:'hachi', h:'はち'},
  9:{k:'九',r:'ku',    h:'く',   alt:{r:'kyuu',  h:'きゅう'}},
};

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
  if (cfg.numMode === 'units')         { min=Math.max(min,0);      max=Math.min(max,9); }
  else if (cfg.numMode === 'tens')     { min=Math.max(min,10);     max=Math.min(max,99); }
  else if (cfg.numMode === 'hundreds') { min=Math.max(min,100);    max=Math.min(max,999); }
  else if (cfg.numMode === 'thousands'){ min=Math.max(min,1000);   max=Math.min(max,9999); }
  else if (cfg.numMode === 'large')    { min=Math.max(min,10000);  max=Math.min(max,999999); }
  if (min > max) min = max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — TIME DATA & ENGINE
   ═══════════════════════════════════════════════════════════ */

// Hour readings (strict: 4=よじ, 7=しちじ, 9=くじ)
const HOUR_READINGS = {
  0:  { k:'十二時', r:'juuniji',   h:'じゅうにじ',  ex:false },  // 12時 for midnight in 12h
  1:  { k:'一時',   r:'ichiji',    h:'いちじ',      ex:false },
  2:  { k:'二時',   r:'niji',      h:'にじ',        ex:false },
  3:  { k:'三時',   r:'sanji',     h:'さんじ',      ex:false },
  4:  { k:'四時',   r:'yoji',      h:'よじ',        ex:true  },  // よじ (not しじ)
  5:  { k:'五時',   r:'goji',      h:'ごじ',        ex:false },
  6:  { k:'六時',   r:'rokuji',    h:'ろくじ',      ex:false },
  7:  { k:'七時',   r:'shichiji',  h:'しちじ',      ex:true  },  // しちじ
  8:  { k:'八時',   r:'hachiji',   h:'はちじ',      ex:false },
  9:  { k:'九時',   r:'kuji',      h:'くじ',        ex:true  },  // くじ
  10: { k:'十時',   r:'juuji',     h:'じゅうじ',    ex:false },
  11: { k:'十一時', r:'juuichiji', h:'じゅういちじ',ex:false },
  12: { k:'十二時', r:'juuniji',   h:'じゅうにじ',  ex:false },
};

// Minute readings — each entry: { k, r, h, ex }
// Rules: 1,6,8,10=っ+ぷん; 3,4,7,9,11~59 regular; 0=ぜろふん or just 時
function minuteReading(m) {
  if (m === 0)  return { k:'',      r:'',           h:'',           ex:false }; // no suffix, just the hour
  if (m === 30) return { k:'三十分',r:'sanjuppun',  h:'さんじゅっぷん', ex:true, half:true }; // also 半
  const tens  = Math.floor(m / 10);
  const units = m % 10;

  // Minute counter suffix: ふん or ぷん
  // ぷん after: 1,6,8,10 (as last digit or round tens)
  const PPON = new Set([1,6,8,10]); // these get double-p: っぷん
  const FUN  = new Set([2,3,4,5,7,9,11]);

  // Determine suffix for full number
  // The rule applies to the last non-zero part
  const lastSig = (units !== 0) ? units : tens; // simplified: use units if present
  let suffix_r, suffix_h, suffix_k, isEx = false;
  if (PPON.has(m) || (units === 0 && PPON.has(tens))) {
    // Round tens: 10,20,...60,80,110...
    if (m === 10 || m === 60) { suffix_k='十分'; suffix_r='juppun'; suffix_h='じゅっぷん'; isEx=true; }
    else if (m === 20) { suffix_k='二十分'; suffix_r='nijuppun'; suffix_h='にじゅっぷん'; isEx=false; }
    else if (m === 50) { suffix_k='五十分'; suffix_r='gojuppun'; suffix_h='ごじゅっぷん'; isEx=false; }
  }

  // Build full minute string using compound
  let kFull='', rFull='', hFull='';
  let ex = false;

  if (m === 1)  return {k:'一分',  r:'ippun',      h:'いっぷん',    ex:true};
  if (m === 6)  return {k:'六分',  r:'roppun',     h:'ろっぷん',    ex:true};
  if (m === 8)  return {k:'八分',  r:'happun',     h:'はっぷん',    ex:true};
  if (m === 10) return {k:'十分',  r:'juppun',     h:'じゅっぷん',  ex:true};
  if (m === 16) return {k:'十六分',r:'juuroppun',  h:'じゅうろっぷん',ex:true};
  if (m === 18) return {k:'十八分',r:'juuhappun',  h:'じゅうはっぷん',ex:true};
  if (m === 20) return {k:'二十分',r:'nijuppun',   h:'にじゅっぷん', ex:false};
  if (m === 21) return {k:'二十一分',r:'nijuuippun',h:'にじゅういっぷん',ex:true};
  if (m === 26) return {k:'二十六分',r:'nijuuroppun',h:'にじゅうろっぷん',ex:true};
  if (m === 28) return {k:'二十八分',r:'nijuuhappun',h:'にじゅうはっぷん',ex:true};
  if (m === 30) return {k:'三十分', r:'sanjuppun', h:'さんじゅっぷん',ex:true, half:true};
  if (m === 31) return {k:'三十一分',r:'sanjuuippun',h:'さんじゅういっぷん',ex:true};
  if (m === 36) return {k:'三十六分',r:'sanjuuroppun',h:'さんじゅうろっぷん',ex:true};
  if (m === 38) return {k:'三十八分',r:'sanjuuhappun',h:'さんじゅうはっぷん',ex:true};
  if (m === 40) return {k:'四十分', r:'yonjuppun', h:'よんじゅっぷん',ex:false};
  if (m === 41) return {k:'四十一分',r:'yonjuuippun',h:'よんじゅういっぷん',ex:true};
  if (m === 46) return {k:'四十六分',r:'yonjuuroppun',h:'よんじゅうろっぷん',ex:true};
  if (m === 48) return {k:'四十八分',r:'yonjuuhappun',h:'よんじゅうはっぷん',ex:true};
  if (m === 50) return {k:'五十分', r:'gojuppun',  h:'ごじゅっぷん', ex:false};
  if (m === 51) return {k:'五十一分',r:'gojuuippun',h:'ごじゅういっぷん',ex:true};
  if (m === 56) return {k:'五十六分',r:'gojuuroppun',h:'ごじゅうろっぷん',ex:true};
  if (m === 58) return {k:'五十八分',r:'gojuuhappun',h:'ごじゅうはっぷん',ex:true};

  // General case: build from tens + units
  const TENS_K = ['','十','二十','三十','四十','五十'];
  const TENS_R = ['','juu','nijuu','sanjuu','yonjuu','gojuu'];
  const TENS_H = ['','じゅう','にじゅう','さんじゅう','よんじゅう','ごじゅう'];
  const UNIT_K = ['','一','二','三','四','五','六','七','八','九'];
  const UNIT_R = ['','ichi','ni','san','yon','go','roku','nana','hachi','kyuu'];
  const UNIT_H = ['','いち','に','さん','よん','ご','ろく','なな','はち','きゅう'];

  kFull = TENS_K[tens] + UNIT_K[units];
  rFull = TENS_R[tens] + UNIT_R[units];
  hFull = TENS_H[tens] + UNIT_H[units];

  // Suffix: ふん or ぷん
  // ぷん after: units 1,6,8 → already handled above
  // ふん otherwise
  const sfxK = 'ふん', sfxR = 'fun', sfxH = 'ふん';
  return { k: kFull+'分', r: rFull+sfxR, h: hFull+sfxH, ex: false };
}

/**
 * Main time formatter
 * Returns { displayTime, kanji, hira, romaji, exception, prefix }
 * prefix: null | { kanji:'午前', hira:'ごぜん', romaji:'gozen' } | { kanji:'午後', ... }
 */
function formatTime(hour24, minute, fmt12h, useGozenGogo) {
  let displayHour = hour24;
  let prefix = null;

  if (fmt12h) {
    const isPM = hour24 >= 12;
    displayHour = hour24 % 12 || 12;
    if (useGozenGogo) {
      prefix = isPM
        ? { kanji:'午後', hira:'ごご',   romaji:'gogo',  symbol:'🌞' }
        : { kanji:'午前', hira:'ごぜん', romaji:'gozen', symbol:'🌙' };
    }
  }

  // Special: noon / midnight
  if (hour24 === 12 && minute === 0) {
    const base = { kanji:'正午', hira:'しょうご', romaji:'shougo', exception:true };
    return { ...base, displayTime: fmt12h ? '12:00' : '12:00', prefix };
  }
  if (hour24 === 0 && minute === 0) {
    const base = { kanji:'真夜中', hira:'まよなか', romaji:'mayonaka', exception:true };
    return { ...base, displayTime: fmt12h ? '12:00 AM' : '0:00', prefix };
  }

  const hr = HOUR_READINGS[displayHour] || HOUR_READINGS[hour24 % 12 || 12];
  const min = minuteReading(minute);

  const paddedM = String(minute).padStart(2, '0');
  let dispStr = fmt12h
    ? `${displayHour}:${paddedM} ${hour24 >= 12 ? 'PM' : 'AM'}`
    : `${hour24}:${paddedM}`;

  const prefK = prefix ? prefix.kanji : '';
  const prefH = prefix ? prefix.hira  : '';
  const prefR = prefix ? prefix.romaji + ' ' : '';

  // 半 shorthand for 30 min
  const useHan = min.half;
  const minK = useHan ? '半' : min.k;
  const minH = useHan ? 'はん' : min.h;
  const minR = useHan ? ' han' : (min.r ? ' '+min.r : '');

  return {
    displayTime: dispStr,
    kanji:       prefK + hr.k + minK,
    hira:        prefH + hr.h + minH,
    romaji:      prefR + hr.r + minR.trim(),
    exception:   hr.ex || min.ex || false,
    prefix,
  };
}

// Special time phrases
const TIME_PHRASES = [
  { id:'shougo',   label:'正午 (Noon)',       kanji:'正午',   hira:'しょうご',   romaji:'shougo',       note:'12:00' },
  { id:'mayonaka', label:'真夜中 (Midnight)', kanji:'真夜中', hira:'まよなか',   romaji:'mayonaka',     note:'0:00'  },
  { id:'asa',      label:'朝 (Morning)',      kanji:'朝',     hira:'あさ',       romaji:'asa',          note:'morning' },
  { id:'hiru',     label:'昼 (Daytime)',      kanji:'昼',     hira:'ひる',       romaji:'hiru',         note:'daytime' },
  { id:'yugata',   label:'夕方 (Evening)',    kanji:'夕方',   hira:'ゆうがた',   romaji:'yugata',       note:'early evening' },
  { id:'yoru',     label:'夜 (Night)',        kanji:'夜',     hira:'よる',       romaji:'yoru',         note:'night' },
  { id:'gozen',    label:'午前 (AM)',         kanji:'午前',   hira:'ごぜん',     romaji:'gozen',        note:'before noon' },
  { id:'gogo',     label:'午後 (PM)',         kanji:'午後',   hira:'ごご',       romaji:'gogo',         note:'after noon' },
  { id:'ima',      label:'今 (Now)',          kanji:'今',     hira:'いま',       romaji:'ima',          note:'now' },
  { id:'nanji',    label:'何時？ (What time?)',kanji:'何時ですか',hira:'なんじですか',romaji:'nanji desu ka',note:'question' },
];

function buildTimeDeck(cfg) {
  const { timeFormat, timeStep, timeRange, showFront, includeSpecial } = cfg;
  const entries = [];

  // Hour bounds by range
  let hMin = 0, hMax = 23;
  if      (timeRange === 'morning') { hMin=5;  hMax=11; }
  else if (timeRange === 'day')     { hMin=12; hMax=17; }
  else if (timeRange === 'evening') { hMin=18; hMax=22; }
  else if (timeRange === 'night')   { hMin=23; hMax=27; } // wrap 23,0,1,2,3,4

  for (let h = hMin; h <= hMax; h++) {
    const hour24 = h % 24;
    for (let m = 0; m < 60; m += timeStep) {
      const fmt = formatTime(hour24, m, timeFormat === '12h', cfg.timeGozenGogo);
      entries.push({
        type: 'time',
        hour24, minute: m,
        ...fmt,
        showFront,
      });
    }
  }

  if (includeSpecial) {
    TIME_PHRASES.forEach(p => {
      entries.push({ type:'phrase', ...p, showFront });
    });
  }

  return entries;
}


/* ═══════════════════════════════════════════════════════════
   SECTION 3b — CALENDAR DATA
   ═══════════════════════════════════════════════════════════ */

/* ── Weekdays ── */
const WEEKDAYS = [
  { n:1, kanji:'月曜日', short:'月', emoji:'🌙', hira:'げつようび', romaji:'getsuyoubi', en:'Monday',    ru:'Понедельник' },
  { n:2, kanji:'火曜日', short:'火', emoji:'🔥', hira:'かようび',   romaji:'kayoubi',    en:'Tuesday',   ru:'Вторник'     },
  { n:3, kanji:'水曜日', short:'水', emoji:'💧', hira:'すいようび', romaji:'suiyoubi',   en:'Wednesday', ru:'Среда'       },
  { n:4, kanji:'木曜日', short:'木', emoji:'🌳', hira:'もくようび', romaji:'mokuyoubi',  en:'Thursday',  ru:'Четверг'     },
  { n:5, kanji:'金曜日', short:'金', emoji:'✨', hira:'きんようび', romaji:'kinyoubi',   en:'Friday',    ru:'Пятница'     },
  { n:6, kanji:'土曜日', short:'土', emoji:'🌍', hira:'どようび',   romaji:'doyoubi',    en:'Saturday',  ru:'Суббота'     },
  { n:7, kanji:'日曜日', short:'日', emoji:'☀️', hira:'にちようび', romaji:'nichiyoubi', en:'Sunday',    ru:'Воскресенье' },
];


/* ── Months ── */
const MONTHS = [
  { n:1,  kanji:'一月',  short:'1月',  hira:'いちがつ',    romaji:'ichigatsu',   en:'January',   ru:'Январь',    emoji:'🎍' },
  { n:2,  kanji:'二月',  short:'2月',  hira:'にがつ',      romaji:'nigatsu',     en:'February',  ru:'Февраль',   emoji:'❄️' },
  { n:3,  kanji:'三月',  short:'3月',  hira:'さんがつ',    romaji:'sangatsu',    en:'March',     ru:'Март',      emoji:'🌸' },
  { n:4,  kanji:'四月',  short:'4月',  hira:'しがつ',      romaji:'shigatsu',    en:'April',     ru:'Апрель',    emoji:'🌷' },
  { n:5,  kanji:'五月',  short:'5月',  hira:'ごがつ',      romaji:'gogatsu',     en:'May',       ru:'Май',       emoji:'🎏' },
  { n:6,  kanji:'六月',  short:'6月',  hira:'ろくがつ',    romaji:'rokugatsu',   en:'June',      ru:'Июнь',      emoji:'☔' },
  { n:7,  kanji:'七月',  short:'7月',  hira:'しちがつ',    romaji:'shichigatsu', en:'July',      ru:'Июль',      emoji:'🎆' },
  { n:8,  kanji:'八月',  short:'8月',  hira:'はちがつ',    romaji:'hachigatsu',  en:'August',    ru:'Август',    emoji:'🌻' },
  { n:9,  kanji:'九月',  short:'9月',  hira:'くがつ',      romaji:'kugatsu',     en:'September', ru:'Сентябрь',  emoji:'🍂' },
  { n:10, kanji:'十月',  short:'10月', hira:'じゅうがつ',  romaji:'juugatsu',    en:'October',   ru:'Октябрь',   emoji:'🎃' },
  { n:11, kanji:'十一月',short:'11月', hira:'じゅういちがつ',romaji:'juuichigatsu',en:'November', ru:'Ноябрь',   emoji:'🍁' },
  { n:12, kanji:'十二月',short:'12月', hira:'じゅうにがつ',romaji:'juunigatsu',  en:'December',  ru:'Декабрь',   emoji:'⛄' },
];

/* ── Month days 1–31 ── */
// Special readings: 1–10, 14, 20, 24
const DAY_SPECIAL = {
   1: { hira:'ついたち',    romaji:'tsuitachi',      ex:true  },
   2: { hira:'ふつか',      romaji:'futsuka',         ex:true  },
   3: { hira:'みっか',      romaji:'mikka',           ex:true  },
   4: { hira:'よっか',      romaji:'yokka',           ex:true  },
   5: { hira:'いつか',      romaji:'itsuka',          ex:true  },
   6: { hira:'むいか',      romaji:'muika',           ex:true  },
   7: { hira:'なのか',      romaji:'nanoka',          ex:true  },
   8: { hira:'ようか',      romaji:'youka',           ex:true  },
   9: { hira:'ここのか',    romaji:'kokonoka',        ex:true  },
  10: { hira:'とおか',      romaji:'tooka',           ex:true  },
  14: { hira:'じゅうよっか',romaji:'juuyokka',        ex:true  },
  20: { hira:'はつか',      romaji:'hatsuka',         ex:true  },
  24: { hira:'にじゅうよっか',romaji:'nijuuyokka',    ex:true  },
};

// Generate regular day reading (11–31, except 14,20,24)
const DAY_TENS_H = ['','じゅう','にじゅう','さんじゅう'];
const DAY_TENS_R = ['','juu',   'nijuu',   'sanjuu'];
const DAY_UNIT_H = ['','いち','に','さん','よん','ご','ろく','なな','はち','きゅう','とお'];
const DAY_UNIT_R = ['','ichi',  'ni',  'san',  'yon',  'go',  'roku', 'nana', 'hachi','kyuu','too'];

function dayReading(d) {
  if (DAY_SPECIAL[d]) {
    return { hira: DAY_SPECIAL[d].hira, romaji: DAY_SPECIAL[d].romaji, ex: DAY_SPECIAL[d].ex };
  }
  const tens  = Math.floor(d / 10);
  const units = d % 10;
  const h = DAY_TENS_H[tens] + DAY_UNIT_H[units] + 'にち';
  const r = DAY_TENS_R[tens] + DAY_UNIT_R[units] + 'nichi';
  return { hira: h, romaji: r, ex: false };
}

// Build full MONTH_DAYS array 1..31
const MONTH_DAYS = Array.from({length:31}, (_,i) => {
  const d = i+1;
  const rd = dayReading(d);
  return {
    n:      d,
    kanji:  d + '日',
    hira:   rd.hira,
    romaji: rd.romaji,
    ex:     rd.ex,
  };
});

/* ── Calendar easter eggs (day-of-month + real month check) ── */
const CAL_EASTER_EGGS = (() => {
  const now = new Date();
  const m = now.getMonth() + 1; // 1-based
  const eggs = {};
  if (m === 4)  eggs[3]  = '🎂 Поздравь с днём рождения @Able_ebg в телеграмме!';
  if (m === 12) eggs[8]  = '🎂 Поздравь с днём рождения @ISpa_Nec0 в телеграмме!';
  if (m === 4)  eggs[11] = '🎌 Поздравляю с днём анимешника!~';
  return eggs;
})();

/* ── Calendar deck builder ── */
function buildCalendarDeck(cfg) {
  const { calScope, calDayMin, calDayMax, calExOnly, calMonthMin, calMonthMax } = cfg;
  let entries = [];

  const useWeekdays = ['weekdays','mixed','wd_days'].includes(calScope);
  const useDays     = ['days','mixed','wd_days','days_months'].includes(calScope);
  const useMonths   = ['months','mixed','days_months'].includes(calScope);

  if (useWeekdays) WEEKDAYS.forEach(w => entries.push({ type:'weekday', ...w }));
  if (useDays) {
    let days = MONTH_DAYS.filter(d => d.n >= calDayMin && d.n <= calDayMax);
    if (calExOnly) days = days.filter(d => d.ex);
    days.forEach(d => entries.push({ type:'day', ...d }));
  }
  if (useMonths) {
    MONTHS.filter(m => m.n >= calMonthMin && m.n <= calMonthMax)
          .forEach(m => entries.push({ type:'month', ...m }));
  }
  return entries;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — STATE
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

  // Time
  timeFormat:     '24h',    // '24h' | '12h'
  timeStep:       5,        // minutes
  timeRange:      'full',   // 'full'|'morning'|'day'|'evening'|'night'
  showFront:      'time',   // 'time'|'kanji'|'hira'|'romaji'|'mixed'
  timeOrder:      'random', // 'random'|'sequential'
  timeGozenGogo:  false,
  includeSpecial: false,

  // Calendar
  calScope:    'mixed',   // 'weekdays'|'days'|'months'|'mixed'|'wd_days'|'days_months'
  calShowFront:'kanji',   // 'kanji'|'hira'|'romaji'|'meaning'|'mixed'
  calOrder:    'random',  // 'random'|'sequential'
  calDayMin:   1,
  calDayMax:   31,
  calExOnly:   false,
  calMeaningLang: 'en',   // 'en'|'ru'|'off'
  calMonthMin: 1,
  calMonthMax: 12,

  // Session
  deck: [], queue: [], currentIdx: 0, current: null,
  known: 0, attempts: 0, revealed: false, locked: false,
};

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — DOM REFS
   ═══════════════════════════════════════════════════════════ */

const $ = id => document.getElementById(id);

const topbar       = $('topbar');
const topHotspot   = $('topHotspot');
const topHint      = $('topHint');
const statTxt      = $('statTxt');

const selGlobalMode = $('selGlobalMode');
const kanaControls  = $('kanaControls');
const numControls   = $('numControls');
const timeControls  = $('timeControls');

// Kana
const selScript    = $('selScript');
const selOrder     = $('selOrder');
const optDakuten   = $('optDakuten');
const optYoon      = $('optYoon');
const optReverse   = $('optReverse');
const choicesLabel = $('choicesLabel');
const choicesN     = $('choicesN');

// Numbers
const selNumMode   = $('selNumMode');
const numMinInput  = $('numMin');
const numMaxInput  = $('numMax');
const numDeckInput = $('numDeckSize');
const optNumKanji  = $('optNumKanji');
const optNumRomaji = $('optNumRomaji');
const optNumHira   = $('optNumHira');

// Time
const selTimeFormat   = $('selTimeFormat');
const selTimeStep     = $('selTimeStep');
const selTimeRange    = $('selTimeRange');
const selShowFront    = $('selShowFront');
const selTimeOrder    = $('selTimeOrder');
const optGozenGogo    = $('optGozenGogo');
const gozenGogoWrap   = $('gozenGogoWrap');
const optSpecial      = $('optSpecial');

// Calendar
const calControls    = $('calControls');
const selCalScope    = $('selCalScope');
const selCalFront    = $('selCalFront');
const selCalOrder    = $('selCalOrder');
const selCalDayMin   = $('selCalDayMin');
const selCalDayMax   = $('selCalDayMax');
const optCalExOnly   = $('optCalExOnly');
const selCalMeaning  = $('selCalMeaning');
const selCalMonthMin = $('selCalMonthMin');
const selCalMonthMax = $('selCalMonthMax');

// Card / flash
const flashView  = $('flashView');
const card       = $('card');
const cardFront  = $('cardFront');
const cardAnswer = $('cardAnswer');
const choicesRow = $('choicesRow');
const actionsRow = $('actionsRow');
const btnAgain   = $('btnAgain');
const btnKnown   = $('btnKnown');
const btnReset   = $('btnReset');

// Table
const tableView     = $('tableView');
const tableScroller = $('tableScroller');
const tableTitle    = $('tableTitle');
const btnTables     = $('btnTables');

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — TOPBAR AUTO-HIDE + HINT
   ═══════════════════════════════════════════════════════════ */

let topHideTimer = null;
let _topVisible  = false;

function showTopbar() {
  clearTimeout(topHideTimer);
  if (!_topVisible) {
    topbar.classList.add('visible');
    topHint.classList.add('hidden');
    _topVisible = true;
  }
  topHideTimer = setTimeout(hideTopbar, 8000);
}
function hideTopbar() {
  topbar.classList.remove('visible');
  topHint.classList.remove('hidden');
  _topVisible = false;
}

topHotspot.addEventListener('mouseenter', showTopbar);
topHint.addEventListener('click', showTopbar);
topbar.addEventListener('mouseenter', () => {
  clearTimeout(topHideTimer);
  if (!_topVisible) { topbar.classList.add('visible'); _topVisible = true; }
});
topbar.addEventListener('mouseleave', () => {
  topHideTimer = setTimeout(hideTopbar, 2000);
});
document.addEventListener('mousemove', e => {
  if (e.clientY < 56 && !_topVisible) showTopbar();
});

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — WE PROPERTY LISTENER
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
    case 'time_format':        state.timeFormat   = value; selTimeFormat.value  = value; updateTimeUI(); break;
    case 'time_step':          state.timeStep     = parseInt(value,10)||5; selTimeStep.value = state.timeStep; break;
    case 'time_range':         state.timeRange    = value; selTimeRange.value   = value; break;
    case 'time_show_front':    state.showFront    = value; selShowFront.value   = value; break;
    case 'time_order':         state.timeOrder    = value; selTimeOrder.value   = value; break;
    case 'time_gozen_gogo':    state.timeGozenGogo = !!value; optGozenGogo.checked = !!value; break;
    case 'time_include_special': state.includeSpecial = !!value; optSpecial.checked = !!value; break;
    case 'cal_scope':        state.calScope      = value;          selCalScope.value   = value; break;
    case 'cal_show_front':   state.calShowFront  = value;          selCalFront.value   = value; break;
    case 'cal_order':        state.calOrder      = value;          selCalOrder.value   = value; break;
    case 'cal_day_min':      state.calDayMin     = parseInt(value,10)||1;  selCalDayMin.value  = state.calDayMin; break;
    case 'cal_day_max':      state.calDayMax     = parseInt(value,10)||31; selCalDayMax.value  = state.calDayMax; break;
    case 'cal_ex_only':      state.calExOnly     = !!value; optCalExOnly.checked = !!value; break;
    case 'cal_meaning_lang': state.calMeaningLang= value; selCalMeaning.value  = value; break;
    case 'cal_month_min':    state.calMonthMin   = parseInt(value,10)||1;  selCalMonthMin.value= state.calMonthMin; break;
    case 'cal_month_max':    state.calMonthMax   = parseInt(value,10)||12; selCalMonthMax.value= state.calMonthMax; break;
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
   SECTION 8 — CONTROL EVENT LISTENERS
   ═══════════════════════════════════════════════════════════ */

selGlobalMode.addEventListener('change', () => { state.globalMode = selGlobalMode.value; syncModeUI(); restart(); });

selScript.addEventListener('change',  () => { state.script   = selScript.value;  restart(); });
selOrder.addEventListener('change',   () => { state.order    = selOrder.value;   restart(); });
optDakuten.addEventListener('change', () => { state.dakuten  = optDakuten.checked; restart(); });
optYoon.addEventListener('change',    () => { state.yoon     = optYoon.checked;    restart(); });
optReverse.addEventListener('change', () => { state.reverse  = optReverse.checked; updateKanaUI(); showCard(); });
choicesN.addEventListener('change',   () => { state.choicesN = Math.max(2,Math.min(12,parseInt(choicesN.value)||6)); updateKanaUI(); showCard(); });

selNumMode.addEventListener('change',  () => { state.numMode     = selNumMode.value; restart(); });
numMinInput.addEventListener('change', () => { state.numMin      = parseInt(numMinInput.value,10)||0; restart(); });
numMaxInput.addEventListener('change', () => { state.numMax      = parseInt(numMaxInput.value,10)||9999; restart(); });
numDeckInput.addEventListener('change',() => { state.numDeckSize = Math.max(1,parseInt(numDeckInput.value,10)||20); restart(); });
optNumKanji.addEventListener('change', () => { state.numShowKanji    = optNumKanji.checked;  showCard(); });
optNumRomaji.addEventListener('change',() => { state.numShowRomaji   = optNumRomaji.checked; showCard(); });
optNumHira.addEventListener('change',  () => { state.numShowHiragana = optNumHira.checked;   showCard(); });

selTimeFormat.addEventListener('change', () => { state.timeFormat   = selTimeFormat.value; updateTimeUI(); restart(); });
selTimeStep.addEventListener('change',   () => { state.timeStep     = parseInt(selTimeStep.value,10)||5; restart(); });
selTimeRange.addEventListener('change',  () => { state.timeRange    = selTimeRange.value; restart(); });
selShowFront.addEventListener('change',  () => { state.showFront    = selShowFront.value; showCard(); });
selTimeOrder.addEventListener('change',  () => { state.timeOrder    = selTimeOrder.value; restart(); });
optGozenGogo.addEventListener('change',  () => { state.timeGozenGogo = optGozenGogo.checked; restart(); });
optSpecial.addEventListener('change',    () => { state.includeSpecial = optSpecial.checked; restart(); });

selCalScope.addEventListener('change',   () => { state.calScope      = selCalScope.value;    restart(); });
selCalFront.addEventListener('change',   () => { state.calShowFront  = selCalFront.value;    showCard(); });
selCalOrder.addEventListener('change',   () => { state.calOrder      = selCalOrder.value;    restart(); });
selCalDayMin.addEventListener('change',  () => { state.calDayMin     = parseInt(selCalDayMin.value,10)||1;  restart(); });
selCalDayMax.addEventListener('change',  () => { state.calDayMax     = parseInt(selCalDayMax.value,10)||31; restart(); });
optCalExOnly.addEventListener('change',  () => { state.calExOnly     = optCalExOnly.checked; restart(); });
selCalMeaning.addEventListener('change', () => { state.calMeaningLang= selCalMeaning.value;  showCard(); });
selCalMonthMin.addEventListener('change', () => { state.calMonthMin = parseInt(selCalMonthMin.value,10)||1;  restart(); });
selCalMonthMax.addEventListener('change', () => { state.calMonthMax = parseInt(selCalMonthMax.value,10)||12; restart(); });

btnAgain.addEventListener('click',  doAgain);
btnKnown.addEventListener('click',  doKnown);
btnReset.addEventListener('click',  restart);
btnTables.addEventListener('click', toggleView);
card.addEventListener('click', onCardClick);
card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') onCardClick(); });

/* ═══════════════════════════════════════════════════════════
   SECTION 9 — MODE UI SYNC
   ═══════════════════════════════════════════════════════════ */

function syncModeUI() {
  const m = state.globalMode;
  kanaControls.classList.toggle('hidden', m !== 'kana');
  numControls.classList.toggle('hidden',  m !== 'numbers');
  timeControls.classList.toggle('hidden', m !== 'time');
  calControls.classList.toggle('hidden',  m !== 'calendar');
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

function updateTimeUI() {
  // Show gozen/gogo only when 12h selected
  gozenGogoWrap.classList.toggle('hidden', state.timeFormat !== '12h');
}

/* ═══════════════════════════════════════════════════════════
   SECTION 10 — DECK / QUEUE
   ═══════════════════════════════════════════════════════════ */

function restart() {
  state.known    = 0;
  state.attempts = 0;

  if (state.globalMode === 'kana') {
    state.deck = buildKanaDeck(state.script, state.dakuten, state.yoon);
    buildQueue();
    syncModeUI(); updateKanaUI();
  } else if (state.globalMode === 'numbers') {
    state.deck = buildNumberDeck();
    buildQueue();
    syncModeUI(); updateNumUI();
  } else if (state.globalMode === 'time') {
    state.deck = buildTimeDeck(state);
    buildQueue();
    syncModeUI(); updateNumUI();
  } else if (state.globalMode === 'calendar') {
    state.deck = buildCalendarDeck(state);
    buildQueue();
    syncModeUI(); updateNumUI();
  }

  if (state.view === 'flash') showCard();
  else renderTable();
  updateStat();
}

function buildQueue() {
  state.queue = state.deck.map((_,i) => i);
  const doShuffle = (state.globalMode === 'kana' && state.order === 'random')
                 || (state.globalMode === 'numbers')
                 || (state.globalMode === 'time' && state.timeOrder === 'random')
                 || (state.globalMode === 'calendar' && state.calOrder === 'random');
  if (doShuffle) shuffle(state.queue);
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
   SECTION 11 — CARD DISPLAY
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

    if      (state.globalMode === 'kana')    renderKanaCard(entry);
    else if (state.globalMode === 'numbers') renderNumberCard(entry);
    else if (state.globalMode === 'time')    renderTimeCard(entry);
    else if (state.globalMode === 'calendar') renderCalendarCard(entry);

    card.classList.remove('fading');
    updateStat();
  }, 160);
}

/* ── Kana card ── */
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

/* ── Number card ── */
function renderNumberCard(entry) {
  cardFront.classList.add('number-prompt');
  cardFront.textContent = entry.n.toLocaleString();
  cardAnswer.innerHTML = '';
  // 🥚 Easter egg: 777
  if (entry.n === 777) {
    const s = document.createElement('span'); s.className='easter-egg jackpot'; s.textContent='🎰 Джекпот!'; cardAnswer.appendChild(s);
    actionsRow.classList.remove('hidden'); return;
  }
  if (state.numShowKanji)    { const s=document.createElement('span'); s.className='ans-kanji';  s.textContent=entry.kanji;    cardAnswer.appendChild(s); }
  if (state.numShowRomaji)   { const s=document.createElement('span'); s.className='ans-romaji'; s.textContent=entry.romaji;   cardAnswer.appendChild(s); }
  if (state.numShowHiragana) { const s=document.createElement('span'); s.className='ans-hira';   s.textContent=entry.hiragana; cardAnswer.appendChild(s); }
  actionsRow.classList.remove('hidden');
}

/* ── Time card ── */
function renderTimeCard(entry) {
  actionsRow.classList.remove('hidden');

  // Determine front content
  let frontText = '';
  let frontClass = 'time-prompt';

  if (entry.type === 'phrase') {
    // Special phrase card: front=kanji, answer=hira+romaji
    cardFront.classList.add('time-kanji-prompt');
    const prefSpan = document.createElement('span');
    prefSpan.className = 'time-prefix-symbol';
    prefSpan.textContent = '';
    const mainSpan = document.createElement('span');
    mainSpan.textContent = entry.kanji;
    cardFront.append(mainSpan);

    const h = document.createElement('span'); h.className='ans-hira';   h.textContent = entry.hira;   cardAnswer.appendChild(h);
    const r = document.createElement('span'); r.className='ans-romaji'; r.textContent = entry.romaji; cardAnswer.appendChild(r);
    const n = document.createElement('span'); n.className='ans-note';   n.textContent = entry.note;   cardAnswer.appendChild(n);
    return;
  }

  // Regular time entry
  const sFront = state.showFront === 'mixed'
    ? ['time','kanji','hira'][Math.floor(Math.random()*3)]
    : state.showFront;

  let prefix = entry.prefix;

  if (sFront === 'time') {
    cardFront.classList.add('time-digital');
    if (prefix) {
      const ps = document.createElement('span'); ps.className='time-prefix-symbol'; ps.textContent=prefix.symbol+' '; cardFront.appendChild(ps);
    }
    const ts = document.createElement('span'); ts.textContent = entry.displayTime; cardFront.appendChild(ts);
  } else if (sFront === 'kanji') {
    cardFront.classList.add('time-kanji-prompt');
    cardFront.textContent = entry.kanji;
  } else if (sFront === 'hira') {
    cardFront.classList.add('time-hira-prompt');
    cardFront.textContent = entry.hira;
  } else {
    // fallback to hira if unknown front type
    cardFront.classList.add('time-hira-prompt');
    cardFront.textContent = entry.hira;
  }

  // Answer: show what's NOT on the front + all lines
  cardAnswer.innerHTML = '';

  // Always show all representations in answer
  const lines = [
    { cls:'ans-time-dig',  text: entry.displayTime, skip: sFront==='time' },
    { cls:'ans-kanji',     text: entry.kanji,        skip: sFront==='kanji' },
    { cls:'ans-hira',      text: entry.hira,          skip: sFront==='hira' },
    { cls:'ans-romaji',    text: entry.romaji,        skip: false },
  ];
  lines.forEach(l => {
    if (l.skip || !l.text) return;
    const s = document.createElement('span');
    s.className = l.cls;
    s.textContent = l.text;
    cardAnswer.appendChild(s);
  });

  // Exception badge
  if (entry.exception) {
    const badge = document.createElement('span');
    badge.className = 'exc-badge';
    badge.textContent = '⚠ 例外';
    cardAnswer.appendChild(badge);
  }

  // 🥚 Easter egg: 20:31
  if (entry.type === 'time' && entry.hour24 === 20 && entry.minute === 31) {
    cardAnswer.innerHTML = '';
    const s = document.createElement('span');
    s.className = 'easter-egg';
    s.textContent = '✨ прибыл Годжу Сатору.';
    cardAnswer.appendChild(s);
  }
}


/* ── Calendar card ── */
function renderCalendarCard(entry) {
  actionsRow.classList.remove('hidden');

  const lang  = state.calMeaningLang;  // 'en'|'ru'|'off'
  const meaning = lang === 'en'  ? entry.en
                : lang === 'ru'  ? entry.ru
                : null;

  // ── EASTER EGGS ──
  // Day 3 April
  if (entry.type === 'day' && entry._monthCtx === 3 && entry.n === 3) {
    // можно расширить через контекст месяца; пасхалка на 3 апреля через deck entry
  }

  // Resolve front type
  let sFront = state.calShowFront;
  if (sFront === 'mixed') {
    const opts = ['kanji','hira','romaji'];
    if (meaning) opts.push('meaning');
    sFront = opts[Math.floor(Math.random() * opts.length)];
  }
  if (sFront === 'meaning' && !meaning) sFront = 'kanji';

  // Front content
  if (sFront === 'kanji') {
    cardFront.classList.add('cal-kanji-prompt');
    cardFront.textContent = entry.kanji;
  } else if (sFront === 'hira') {
    cardFront.classList.add('cal-hira-prompt');
    cardFront.textContent = entry.hira;
  } else if (sFront === 'romaji') {
    cardFront.classList.add('cal-romaji-prompt');
    cardFront.textContent = entry.romaji;
  } else { // meaning
    cardFront.classList.add('cal-meaning-prompt');
    cardFront.textContent = meaning;
  }

  // Answer: all representations not shown on front
  cardAnswer.innerHTML = '';
  const lines = [
    { cls:'ans-kanji',  text: entry.kanji,  skip: sFront==='kanji'   },
    { cls:'ans-hira',   text: entry.hira,   skip: sFront==='hira'    },
    { cls:'ans-romaji', text: entry.romaji, skip: sFront==='romaji'  },
    { cls:'ans-meaning',text: meaning,      skip: sFront==='meaning' || !meaning },
  ];
  lines.forEach(l => {
    if (l.skip || !l.text) return;
    const s = document.createElement('span');
    s.className = l.cls;
    s.textContent = l.text;
    cardAnswer.appendChild(s);
  });

  if (entry.ex) {
    const badge = document.createElement('span');
    badge.className = 'exc-badge';
    badge.textContent = '⚠ 例外';
    cardAnswer.appendChild(badge);
  }

  // 🥚 Calendar easter eggs (month days)
  if (entry.type === 'day') {
    const egg = CAL_EASTER_EGGS[entry.n];
    if (egg) {
      cardAnswer.innerHTML = '';
      const s = document.createElement('span'); s.className='easter-egg'; s.textContent = egg; cardAnswer.appendChild(s);
    }
  }
}

/* ── Choice buttons (kana reverse) ── */
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

function doAgain() { state.attempts++; pushAgain(); updateStat(); showCard(); }
function doKnown() { state.known++; state.attempts++; advance(); updateStat(); showCard(); }

/* ═══════════════════════════════════════════════════════════
   SECTION 12 — VIEW TOGGLE
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
   SECTION 13 — TABLE RENDER
   ═══════════════════════════════════════════════════════════ */

function renderTable() {
  if      (state.globalMode === 'kana')    renderKanaTable();
  else if (state.globalMode === 'numbers') renderNumbersTable();
  else if (state.globalMode === 'time')    renderTimeTable();
  else if (state.globalMode === 'calendar') renderCalendarTable();
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
  const cTh = document.createElement('th'); cTh.className='corner-th'; hr.appendChild(cTh);

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
    const lbl = tr.insertCell(); lbl.className='row-head'; lbl.textContent=rowLabels[vi];
  }

  tableScroller.innerHTML = '';
  tableScroller.appendChild(table);

  // Yoon section
  if (state.yoon) {
    const yoonDiv = document.createElement('div');
    yoonDiv.className = 'yoon-section';
    const yoonTitle = document.createElement('div');
    yoonTitle.className = 'yoon-title';
    yoonTitle.textContent = 'Yoon — 拗音';
    yoonDiv.appendChild(yoonTitle);

    const baseRows = YOON_ROWS.filter(r => !r.dak);
    const dakRows  = state.dakuten ? YOON_ROWS.filter(r => r.dak) : [];

    function renderYoonGrid(rows) {
      const grid = document.createElement('div');
      grid.className = 'yoon-grid';
      rows.forEach(row => {
        const block = document.createElement('div');
        block.className = 'yoon-block' + (row.dak ? ' yoon-dak' : '');
        const baseLabel = document.createElement('div');
        baseLabel.className = 'yoon-base-label';
        baseLabel.textContent = row.base+'-';
        block.appendChild(baseLabel);
        ['ya','yu','yo'].forEach((_,ci) => {
          const cell = row.cells[ci];
          const td = document.createElement('div');
          td.className = 'yoon-cell' + (row.dak ? ' yoon-dak-cell' : '');
          if (showH && cell.h) { const s=document.createElement('span'); s.className='cell-h'; s.textContent=cell.h; td.appendChild(s); }
          if (showK && cell.k) { const s=document.createElement('span'); s.className='cell-k'; s.textContent=cell.k; td.appendChild(s); }
          const sr=document.createElement('span'); sr.className='cell-r'; sr.textContent=cell.r.toUpperCase(); td.appendChild(sr);
          block.appendChild(td);
        });
        grid.appendChild(block);
      });
      return grid;
    }

    yoonDiv.appendChild(renderYoonGrid(baseRows));
    if (dakRows.length) {
      const dT = document.createElement('div'); dT.className='yoon-sub-title'; dT.textContent='Dakuten yoon'; yoonDiv.appendChild(dT);
      yoonDiv.appendChild(renderYoonGrid(dakRows));
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
const SPECIAL_SET = new Set(Object.keys(SPECIAL_READINGS).map(Number));

function renderNumbersTable() {
  tableTitle.textContent = 'Numbers chart — 数字';
  const COLS = [
    { label:'UNITS',     sub:'一〜九',  mult:1 },
    { label:'TENS',      sub:'十〜九十',mult:10 },
    { label:'HUNDREDS',  sub:'百〜九百',mult:100 },
    { label:'THOUSANDS', sub:'千〜九千',mult:1000 },
  ];
  const table = document.createElement('table');
  table.className = 'num-table';
  const thead = table.createTHead();
  const hr = thead.insertRow();
  const cTh = document.createElement('th'); cTh.textContent='#'; hr.appendChild(cTh);
  COLS.forEach(col => {
    const th = document.createElement('th');
    th.innerHTML = col.label+'<br><span class="th-jp">'+col.sub+'</span>';
    hr.appendChild(th);
  });

  function numCellHTML(n, jap, altJap) {
    const isSpecial = SPECIAL_SET.has(n);
    const isDual    = !!altJap;
    const cls = [isSpecial?'num-special':'', isDual?'num-dual':''].filter(Boolean).join(' ');
    let textHTML = isDual
      ? `<span class="num-text"><span class="num-romaji">${jap.romaji}</span><span class="num-hira">${jap.hiragana}</span></span><span class="num-divider">/</span><span class="num-text"><span class="num-romaji">${altJap.romaji}</span><span class="num-hira">${altJap.hiragana}</span></span>`
      : `<span class="num-text"><span class="num-romaji">${jap.romaji}</span><span class="num-hira">${jap.hiragana}</span></span>`;
    return `<span class="num-arabic">${n.toLocaleString()}</span><span class="num-inline${cls?' '+cls:''}""><span class="num-kanji">${jap.kanji}</span>${textHTML}</span>`;
  }

  const tbody = table.createTBody();
  for (let d = 1; d <= 9; d++) {
    const tr = tbody.insertRow();
    const rh = tr.insertCell(); rh.className='row-head'; rh.textContent=d;
    COLS.forEach(col => {
      const n = d * col.mult;
      const td = tr.insertCell(); td.className='num-cell';
      const isSpecial = SPECIAL_SET.has(n);
      const isDual    = DUAL_DIGITS.has(d);
      if (isSpecial) td.classList.add('num-cell-special');
      if (isDual)    td.classList.add('num-cell-dual');
      let jap = numberToJapanese(n), altJap = null;
      if (isDual) {
        const atom = NUM_ATOMS[d];
        if (col.mult === 1) {
          jap    = { kanji:atom.k, romaji:atom.r,     hiragana:atom.h };
          altJap = {               romaji:atom.alt.r,  hiragana:atom.alt.h };
        } else {
          const suffix = numberToJapanese(col.mult);
          jap    = { kanji:atom.k+suffix.kanji, romaji:atom.r+suffix.romaji,     hiragana:atom.h+suffix.hiragana };
          altJap = {                             romaji:atom.alt.r+suffix.romaji, hiragana:atom.alt.h+suffix.hiragana };
        }
      }
      td.innerHTML = numCellHTML(n, jap, altJap);
    });
  }
  const tr0 = tbody.insertRow(); tr0.classList.add('zero-row');
  const rh0=tr0.insertCell(); rh0.className='row-head'; rh0.textContent='0';
  const td0=tr0.insertCell(); td0.className='num-cell'; td0.colSpan=4;
  td0.innerHTML = numCellHTML(0, numberToJapanese(0), null);

  const trB = tbody.insertRow(); trB.classList.add('big-row');
  const rhB=trB.insertCell(); rhB.className='row-head'; rhB.textContent='×';
  [[10000,'万','man','まん'],[100000000,'億','oku','おく']].forEach(([n,k,r,h]) => {
    const td=trB.insertCell(); td.className='num-cell';
    td.innerHTML = numCellHTML(n,{kanji:k,romaji:r,hiragana:h},null);
  });
  trB.insertCell().className='empty'; trB.insertCell().className='empty';

  tableScroller.innerHTML = '';
  tableScroller.appendChild(table);
}

/* ── Time table ── */
function renderTimeTable() {
  tableTitle.textContent = 'Time chart — 時間';
  tableScroller.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'time-table-wrap';

  // ── Section 1: Hours ──
  const hoursDiv = document.createElement('div');
  hoursDiv.className = 'time-section';
  const hoursTitle = document.createElement('div');
  hoursTitle.className = 'time-section-title';
  hoursTitle.textContent = '〜時 Hours';
  hoursDiv.appendChild(hoursTitle);

  const hoursTable = document.createElement('table');
  hoursTable.className = 'time-tbl';
  const hthead = hoursTable.createTHead();
  const hhr = hthead.insertRow();
  ['#','漢字','ひらがな','Romaji'].forEach(t => {
    const th = document.createElement('th'); th.textContent=t; hhr.appendChild(th);
  });
  const htbody = hoursTable.createTBody();
  for (let h = 1; h <= 12; h++) {
    const info = HOUR_READINGS[h];
    const tr = htbody.insertRow();
    if (info.ex) tr.classList.add('time-row-ex');
    [h+'時', info.k, info.h, info.r].forEach((txt,i) => {
      const td = tr.insertCell(); td.textContent = txt;
      if (i===0) td.className='row-head';
    });
  }
  hoursDiv.appendChild(hoursTable);

  // ── Section 2: Minutes ──
  const minsDiv = document.createElement('div');
  minsDiv.className = 'time-section';
  const minsTitle = document.createElement('div');
  minsTitle.className = 'time-section-title';
  minsTitle.textContent = '〜分 Minutes';
  minsDiv.appendChild(minsTitle);

  const minsTable = document.createElement('table');
  minsTable.className = 'time-tbl';
  const mthead = minsTable.createTHead();
  const mhr = mthead.insertRow();
  ['#','漢字','ひらがな','Romaji'].forEach(t => {
    const th = document.createElement('th'); th.textContent=t; mhr.appendChild(th);
  });
  const mtbody = minsTable.createTBody();

  // Show minutes by step (5 min or custom), always include 1,6,8,10 as exceptions
  const KEY_MINS = new Set([0,1,2,3,4,5,6,7,8,9,10,15,20,25,30,40,45,50,55]);
  [...KEY_MINS].sort((a,b)=>a-b).forEach(m => {
    if (m === 0) return; // skip 0
    const info = minuteReading(m);
    const tr = mtbody.insertRow();
    if (info.ex) tr.classList.add('time-row-ex');
    [m+'分', info.k, info.h, info.r].forEach((txt,i) => {
      const td = tr.insertCell(); td.textContent = txt;
      if (i===0) td.className='row-head';
    });
    // 30分 — also note 半
    if (m === 30) {
      const note = mtbody.insertRow();
      note.classList.add('time-row-note');
      const td = note.insertCell(); td.colSpan=4;
      td.textContent = '※ 30分 can also be written as 半 (はん han) — e.g. 三時半 = sanji han';
    }
  });
  minsDiv.appendChild(minsTable);

  // ── Section 3: Special phrases ──
  const phraseDiv = document.createElement('div');
  phraseDiv.className = 'time-section';
  const phraseTitle = document.createElement('div');
  phraseTitle.className = 'time-section-title';
  phraseTitle.textContent = '表現 Special Phrases';
  phraseDiv.appendChild(phraseTitle);

  const phraseTable = document.createElement('table');
  phraseTable.className = 'time-tbl';
  const pthead = phraseTable.createTHead();
  const phr = pthead.insertRow();
  ['漢字','ひらがな','Romaji','Note'].forEach(t => {
    const th = document.createElement('th'); th.textContent=t; phr.appendChild(th);
  });
  const ptbody = phraseTable.createTBody();
  TIME_PHRASES.forEach(p => {
    const tr = ptbody.insertRow();
    [p.kanji, p.hira, p.romaji, p.note].forEach(txt => {
      const td = tr.insertCell(); td.textContent = txt||'';
    });
  });
  phraseDiv.appendChild(phraseTable);

  wrap.appendChild(hoursDiv);
  wrap.appendChild(minsDiv);
  wrap.appendChild(phraseDiv);
  tableScroller.appendChild(wrap);
}


/* ── Calendar table ── */
function renderCalendarTable() {
  tableTitle.textContent = 'Calendar chart — 曜日・日付';
  tableScroller.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'cal-table-wrap';

  // ── Section 1: Weekdays ──
  const wdDiv = document.createElement('div');
  wdDiv.className = 'cal-section';
  const wdTitle = document.createElement('div');
  wdTitle.className = 'cal-section-title';
  wdTitle.textContent = '曜日 Weekdays';
  wdDiv.appendChild(wdTitle);

  const wdTable = document.createElement('table');
  wdTable.className = 'cal-wd-tbl';
  const wdThead = wdTable.createTHead();
  const wdHr = wdThead.insertRow();
  const lang = state.calMeaningLang;
  const wdCols = ['漢字 (short)','ひらがな','Romaji'];
  if (lang !== 'off') wdCols.push(lang === 'ru' ? 'Русский' : 'English');
  wdCols.forEach(t => { const th=document.createElement('th'); th.textContent=t; wdHr.appendChild(th); });

  const wdTbody = wdTable.createTBody();
  WEEKDAYS.forEach(w => {
    const tr = wdTbody.insertRow();
    const cells = [`${w.emoji} ${w.kanji}（${w.short}）`, w.hira, w.romaji];
    if (lang !== 'off') cells.push(lang === 'ru' ? w.ru : w.en);
    cells.forEach((txt,i) => {
      const td = tr.insertCell(); td.textContent = txt;
      if (i===0) td.classList.add('cal-wd-head');
    });
  });
  wdDiv.appendChild(wdTable);
  wrap.appendChild(wdDiv);

  // ── Section 2: Month days calendar grid ──
  const mdDiv = document.createElement('div');
  mdDiv.className = 'cal-section cal-section-wide';
  const mdTitle = document.createElement('div');
  mdTitle.className = 'cal-section-title';
  mdTitle.textContent = '日付 Month days (1〜31)';
  mdDiv.appendChild(mdTitle);

  // Build 7-col calendar grid. Day 1 starts on column matching its weekday label.
  // We use a fixed layout: row 0 = header (日月火水木金土), then fill days left-to-right
  const calGrid = document.createElement('div');
  calGrid.className = 'cal-day-grid';

  // Header row Пн–Вс (Monday first, Sunday last)
  const DOW_LABELS = ['月','火','水','木','金','土','日'];
  DOW_LABELS.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'cal-dow-hd';
    cell.textContent = d;
    calGrid.appendChild(cell);
  });

  // Determine which column day 1 falls on (use day 1 = Tuesday historically → we just
  // fill from column 0 for simplicity since no specific year is implied)
  // Start col = 0 (Monday). Layout: Mon–Sun
  const startCol = 0; // fill from col 0 (Monday)
  // Empty cells before day 1
  for (let i = 0; i < startCol; i++) {
    const emp = document.createElement('div');
    emp.className = 'cal-day-cell cal-day-empty';
    calGrid.appendChild(emp);
  }

  MONTH_DAYS.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell' + (d.ex ? ' cal-day-ex' : '');

    const numSpan = document.createElement('span');
    numSpan.className = 'cal-day-num';
    numSpan.textContent = d.n + '日';
    cell.appendChild(numSpan);

    const hiraSpan = document.createElement('span');
    hiraSpan.className = 'cal-day-hira';
    hiraSpan.textContent = d.hira;
    cell.appendChild(hiraSpan);

    const romaSpan = document.createElement('span');
    romaSpan.className = 'cal-day-roma';
    romaSpan.textContent = d.romaji;
    cell.appendChild(romaSpan);

    calGrid.appendChild(cell);
  });

  mdDiv.appendChild(calGrid);
  wrap.appendChild(mdDiv);

  // ── Section 3: Months ──
  const moDiv = document.createElement('div');
  moDiv.className = 'cal-section';
  const moTitle = document.createElement('div');
  moTitle.className = 'cal-section-title';
  moTitle.textContent = '月 Months';
  moDiv.appendChild(moTitle);

  const moTable = document.createElement('table');
  moTable.className = 'cal-wd-tbl cal-mo-tbl';
  const moThead = moTable.createTHead();
  const moHr = moThead.insertRow();
  const moCols = ['#','漢字','ひらがな','Romaji'];
  if (lang !== 'off') moCols.push(lang === 'ru' ? 'Русский' : 'English');
  moCols.forEach(t => { const th=document.createElement('th'); th.textContent=t; moHr.appendChild(th); });

  const moTbody = moTable.createTBody();
  MONTHS.forEach(mo => {
    const tr = moTbody.insertRow();
    const mCells = [`${mo.emoji} ${mo.kanji}（${mo.short}）`, mo.hira, mo.romaji];
    if (lang !== 'off') mCells.push(lang === 'ru' ? mo.ru : mo.en);
    mCells.forEach((txt,i) => {
      const td = tr.insertCell(); td.textContent = txt;
      if (i===0) td.classList.add('cal-wd-head');
    });
  });
  moDiv.appendChild(moTable);
  wrap.appendChild(moDiv);

  tableScroller.appendChild(wrap);
}

/* ═══════════════════════════════════════════════════════════
   SECTION 14 — HELPERS
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
   SECTION 15 — BOOT
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
  selTimeFormat.value   = state.timeFormat;
  selTimeStep.value     = state.timeStep;
  selTimeRange.value    = state.timeRange;
  selShowFront.value    = state.showFront;
  selTimeOrder.value    = state.timeOrder;
  optGozenGogo.checked  = state.timeGozenGogo;
  optSpecial.checked    = state.includeSpecial;
  selCalScope.value     = state.calScope;
  selCalFront.value     = state.calShowFront;
  selCalOrder.value     = state.calOrder;
  selCalDayMin.value    = state.calDayMin;
  selCalDayMax.value    = state.calDayMax;
  optCalExOnly.checked  = state.calExOnly;
  selCalMeaning.value   = state.calMeaningLang;
  selCalMonthMin.value  = state.calMonthMin;
  selCalMonthMax.value  = state.calMonthMax;

  updateTimeUI();
  syncModeUI();
  restart();
}

init();
applyStartView();
