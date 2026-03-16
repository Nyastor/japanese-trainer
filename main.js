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

function buildKanaDeck(script, dakuten, yoon, rows) {
  const sel = rows && rows.size > 0 ? rows : null; // null = all
  const out = [];
  const add = e => {
    if (!e) return;
    if (script === 'hiragana' && !e.h) return;
    if (script === 'katakana' && !e.k) return;
    out.push(e);
  };
  if (!sel || sel.has('vowels')) VOWELS.forEach(add);
  MAIN_ROWS.forEach(r => {
    if (!sel || sel.has(r.c)) r.cells.forEach(add);
  });
  if (!sel || sel.has('n')) add(N_ENTRY);
  if (dakuten) DAKUTEN_ROWS.forEach(r => {
    if (!sel || sel.has(r.c)) r.cells.forEach(add);
  });
  if (yoon) {
    // Добавляем базовые слоги-источники йонов (き し ち に ひ み り + dakuten)
    const YOON_BASE_CELLS = {
      'ki': {r:'ki',h:'き',k:'キ'}, 'shi':{r:'si',h:'し',k:'シ',rl:'shi'},
      'chi':{r:'ti',h:'ち',k:'チ',rl:'chi'}, 'ni':{r:'ni',h:'に',k:'ニ'},
      'hi': {r:'hi',h:'ひ',k:'ヒ'}, 'mi':{r:'mi',h:'み',k:'ミ'},
      'ri': {r:'ri',h:'り',k:'リ'},
      'gi': {r:'gi',h:'ぎ',k:'ギ'}, 'ji':{r:'zi',h:'じ',k:'ジ',rl:'ji'},
      'di': {r:'di',h:'ぢ',k:'ヂ',tl:'di'},
      'bi': {r:'bi',h:'び',k:'ビ'}, 'pi':{r:'pi',h:'ぴ',k:'ピ'},
    };
    YOON_ROWS.forEach(row => {
      if (row.dak && !dakuten) return;
      if (sel && !sel.has('yoon_'+row.base)) return;
      // Базовый слог-источник
      const baseCell = YOON_BASE_CELLS[row.base];
      if (baseCell) add(baseCell);
      // Йон-тройка (kya/kyu/kyo…)
      row.cells.forEach(e => {
        if (!e) return;
        if (script === 'hiragana' && !e.h) return;
        if (script === 'katakana' && !e.k) return;
        out.push({ ...e, _yoonBase: row.base });
      });
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
  else if (cfg.numMode === 'large')    { min=Math.max(min,10000);  max=Math.min(max,99990000); }
  else if (cfg.numMode === 'oku')      { min=Math.max(min,100000000); max=Math.min(max,999999999); }
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

  if (m === 3)  return {k:'三分',  r:'sanpun',      h:'さんぷん',     ex:false};
  if (m === 13) return {k:'十三分', r:'juusanpun',   h:'じゅうさんぷん', ex:false};
  if (m === 23) return {k:'二十三分',r:'nijuusanpun', h:'にじゅうさんぷん',ex:false};
  if (m === 33) return {k:'三十三分',r:'sanjuusanpun',h:'さんじゅうさんぷん',ex:false};
  if (m === 43) return {k:'四十三分',r:'yonjuusanpun',h:'よんじゅうさんぷん',ex:false};
  if (m === 53) return {k:'五十三分',r:'gojuusanpun', h:'ごじゅうさんぷん', ex:false};
  if (m === 4)  return {k:'四分',  r:'yonpun',     h:'よんぷん',    ex:false};
  if (m === 14) return {k:'十四分',r:'juuyonpun',  h:'じゅうよんぷん',ex:false};
  if (m === 24) return {k:'二十四分',r:'nijuuyonpun',h:'にじゅうよんぷん',ex:false};
  if (m === 34) return {k:'三十四分',r:'sanjuuyonpun',h:'さんじゅうよんぷん',ex:false};
  if (m === 44) return {k:'四十四分',r:'yonjuuyonpun',h:'よんじゅうよんぷん',ex:false};
  if (m === 54) return {k:'五十四分',r:'gojuuyonpun', h:'ごじゅうよんぷん', ex:false};
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

/* ── Calendar easter eggs {month: {day: text}} ── */
const CAL_EASTER_EGGS = {
  4:  { 3:  '🎂 Поздравь с днём рождения @Able_ebg в телеграмме!',
        11: '🎌 Поздравляю с днём анимешника!~' },
  12: { 8:  '🎂 Поздравь с днём рождения @ISpa_Nec0 в телеграмме!' },
};

// Helper: get egg for a given month+day (month 1-based). Returns string or null.
function getCalEgg(monthN, dayN) {
  return (CAL_EASTER_EGGS[monthN] && CAL_EASTER_EGGS[monthN][dayN]) || null;
}

// Helper: range of months with wrap-around (e.g. Apr→Jan = Apr,May,...Dec,Jan)
function getMonthRange(minN, maxN) {
  if (minN <= maxN) {
    return MONTHS.filter(m => m.n >= minN && m.n <= maxN);
  }
  // wrap: minN..12 + 1..maxN
  return MONTHS.filter(m => m.n >= minN || m.n <= maxN);
}

/* ── Calendar deck builder ── */
function buildCalendarDeck(cfg) {
  const { calScope, calDayMin, calDayMax, calExOnly, calMonthMin, calMonthMax } = cfg;
  let entries = [];

  if (calScope === 'wd_days') {
    // Combo: weekday + day-of-month pairs (all combinations from filtered sets)
    const days = calExOnly
      ? MONTH_DAYS.filter(d => d.n >= calDayMin && d.n <= calDayMax && d.ex)
      : MONTH_DAYS.filter(d => d.n >= calDayMin && d.n <= calDayMax);
    WEEKDAYS.forEach(w => {
      days.forEach(d => {
        entries.push({ type:'combo_wd_day', weekday:w, day:d,
          kanji:  `${w.kanji} · ${d.kanji}`,
          hira:   `${w.hira} · ${d.hira}`,
          romaji: `${w.romaji} · ${d.romaji}`,
          en: `${w.en} · ${d.kanji}`,
          ru: `${w.ru} · ${d.kanji}`,
        });
      });
    });
    return entries;
  }

  if (calScope === 'days_months') {
    // Combo: month + day pairs (= full date like 5 марта = 三月五日)
    const days = calExOnly
      ? MONTH_DAYS.filter(d => d.n >= calDayMin && d.n <= calDayMax && d.ex)
      : MONTH_DAYS.filter(d => d.n >= calDayMin && d.n <= calDayMax);
    const months = getMonthRange(calMonthMin, calMonthMax);
    months.forEach(mo => {
      days.forEach(d => {
        entries.push({ type:'combo_day_mo', month:mo, day:d,
          kanji:  mo.kanji + d.kanji,
          hira:   mo.hira + ' ' + d.hira,
          romaji: mo.romaji + ' ' + d.romaji,
          en: `${mo.en} ${d.n}`,
          ru: `${d.n} ${mo.ru.toLowerCase()}`,
        });
      });
    });
    return entries;
  }

  const useWeekdays = ['weekdays','mixed'].includes(calScope);
  const useDays     = ['days','mixed'].includes(calScope);
  const useMonths   = ['months','mixed'].includes(calScope);

  if (useWeekdays) WEEKDAYS.forEach(w => entries.push({ type:'weekday', ...w }));
  if (useDays) {
    let days = MONTH_DAYS.filter(d => d.n >= calDayMin && d.n <= calDayMax);
    if (calExOnly) days = days.filter(d => d.ex);
    days.forEach(d => entries.push({ type:'day', ...d }));
  }
  if (useMonths) {
    getMonthRange(calMonthMin, calMonthMax).forEach(m => entries.push({ type:'month', ...m }));
  }
  return entries;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3b — VOCABULARY DATA
   ═══════════════════════════════════════════════════════════ */

/* Raw vocab data — mirrors vocab.csv embedded for offline use.
   Format per entry: { group, ru, en, jp, romaji, script }
   script: 'h' = hiragana, 'k' = katakana */
const VOCAB_DATA = [
  // lesson1
  {group:'lesson1',ru:'Я',en:'I',jp:'わたし',romaji:'watashi',script:'h'},
  {group:'lesson1',ru:'Ты',en:'You',jp:'あなた',romaji:'anata',script:'h'},
  {group:'lesson1',ru:'Тот человек',en:'That person',jp:'あのひと',romaji:'ano hito',script:'h'},
  {group:'lesson1',ru:'Тот человек (вежл.)',en:'That person (polite)',jp:'あのかた',romaji:'ano kata',script:'h'},
  {group:'lesson1',ru:'Кто?',en:'Who?',jp:'だれ',romaji:'dare',script:'h'},
  {group:'lesson1',ru:'Да',en:'Yes',jp:'はい',romaji:'hai',script:'h'},
  {group:'lesson1',ru:'Нет',en:'No',jp:'いいえ',romaji:'iie',script:'h'},
  {group:'lesson1',ru:'Книга',en:'Book',jp:'ほん',romaji:'hon',script:'h'},
  {group:'lesson1',ru:'Журнал',en:'Magazine',jp:'ざっし',romaji:'zasshi',script:'h'},
  {group:'lesson1',ru:'Словарь',en:'Dictionary',jp:'じしょ',romaji:'jisho',script:'h'},
  {group:'lesson1',ru:'Ручка',en:'Pen',jp:'ペン',romaji:'pen',script:'k'},
  {group:'lesson1',ru:'Карандаш',en:'Pencil',jp:'えんぴつ',romaji:'enpitsu',script:'h'},
  {group:'lesson1',ru:'Учитель',en:'Teacher',jp:'きょうし',romaji:'kyoushi',script:'h'},
  {group:'lesson1',ru:'Студент',en:'Student',jp:'がくせい',romaji:'gakusei',script:'h'},
  {group:'lesson1',ru:'Сотрудник фирмы',en:'Company employee',jp:'かいしゃいん',romaji:'kaishain',script:'h'},
  {group:'lesson1',ru:'Служащий банка',en:'Bank employee',jp:'ぎんこういん',romaji:'ginkouin',script:'h'},
  {group:'lesson1',ru:'Врач',en:'Doctor',jp:'いしゃ',romaji:'isha',script:'h'},
  {group:'lesson1',ru:'Исследователь',en:'Researcher',jp:'けんきゅうしゃ',romaji:'kenkyuusha',script:'h'},
  {group:'lesson1',ru:'Домохозяйка',en:'Housewife',jp:'しゅふ',romaji:'shufu',script:'h'},
  // countries
  {group:'countries',ru:'Япония',en:'Japan',jp:'にほん',romaji:'nihon',script:'h'},
  {group:'countries',ru:'Россия',en:'Russia',jp:'ロシア',romaji:'roshia',script:'k'},
  {group:'countries',ru:'Китай',en:'China',jp:'ちゅうごく',romaji:'chuugoku',script:'h'},
  {group:'countries',ru:'Южная Корея',en:'South Korea',jp:'かんこく',romaji:'kankoku',script:'h'},
  {group:'countries',ru:'Франция',en:'France',jp:'フランス',romaji:'furansu',script:'k'},
  {group:'countries',ru:'Италия',en:'Italy',jp:'イタリア',romaji:'itaria',script:'k'},
  {group:'countries',ru:'Германия',en:'Germany',jp:'ドイツ',romaji:'doitsu',script:'k'},
  {group:'countries',ru:'Америка',en:'America',jp:'アメリカ',romaji:'amerika',script:'k'},
  {group:'countries',ru:'Испания',en:'Spain',jp:'スペイン',romaji:'supein',script:'k'},
  {group:'countries',ru:'Англия',en:'England',jp:'イギリス',romaji:'igirisu',script:'k'},
  {group:'countries',ru:'Австралия',en:'Australia',jp:'オーストラリア',romaji:'oosutoraria',script:'k'},
  {group:'countries',ru:'Индия',en:'India',jp:'インド',romaji:'indo',script:'k'},
  // lesson2
  {group:'lesson2',ru:'Это (близко)',en:'This',jp:'これ',romaji:'kore',script:'h'},
  {group:'lesson2',ru:'То (у собеседника)',en:'That',jp:'それ',romaji:'sore',script:'h'},
  {group:'lesson2',ru:'Вон то',en:'That over there',jp:'あれ',romaji:'are',script:'h'},
  {group:'lesson2',ru:'Газета',en:'Newspaper',jp:'しんぶん',romaji:'shinbun',script:'h'},
  {group:'lesson2',ru:'Тетрадь',en:'Notebook',jp:'ノート',romaji:'nooto',script:'k'},
  {group:'lesson2',ru:'Записная книжка',en:'Datebook',jp:'てちょう',romaji:'techou',script:'h'},
  {group:'lesson2',ru:'Велосипед',en:'Bicycle',jp:'じてんしゃ',romaji:'jitensha',script:'h'},
  {group:'lesson2',ru:'Ключ',en:'Key',jp:'かぎ',romaji:'kagi',script:'h'},
  {group:'lesson2',ru:'Часы',en:'Watch/Clock',jp:'とけい',romaji:'tokei',script:'h'},
  {group:'lesson2',ru:'Зонт',en:'Umbrella',jp:'かさ',romaji:'kasa',script:'h'},
  {group:'lesson2',ru:'Сумка',en:'Bag',jp:'かばん',romaji:'kaban',script:'h'},
  {group:'lesson2',ru:'Кошелёк',en:'Wallet',jp:'さいふ',romaji:'saifu',script:'h'},
  {group:'lesson2',ru:'Обувь',en:'Shoes',jp:'くつ',romaji:'kutsu',script:'h'},
  {group:'lesson2',ru:'Шапка',en:'Hat',jp:'ぼうし',romaji:'boushi',script:'h'},
  {group:'lesson2',ru:'Компьютер',en:'Computer',jp:'コンピューター',romaji:'konpyuutaa',script:'k'},
  {group:'lesson2',ru:'Автомобиль',en:'Car',jp:'くるま',romaji:'kuruma',script:'h'},
  {group:'lesson2',ru:'Путешествие',en:'Travel',jp:'りょこう',romaji:'ryokou',script:'h'},
  {group:'lesson2',ru:'Мода',en:'Fashion',jp:'ファッション',romaji:'fasshon',script:'k'},
  {group:'lesson2',ru:'Музыка',en:'Music',jp:'おんがく',romaji:'ongaku',script:'h'},
  {group:'lesson2',ru:'Спорт',en:'Sport',jp:'スポーツ',romaji:'supootsu',script:'k'},
  // fruits
  {group:'fruits',ru:'Яблоко',en:'Apple',jp:'りんご',romaji:'ringo',script:'h'},
  {group:'fruits',ru:'Груша',en:'Pear',jp:'なし',romaji:'nashi',script:'h'},
  {group:'fruits',ru:'Арбуз',en:'Watermelon',jp:'すいか',romaji:'suika',script:'h'},
  {group:'fruits',ru:'Ананас',en:'Pineapple',jp:'パイナップル',romaji:'painappuru',script:'k'},
  {group:'fruits',ru:'Мандарин',en:'Mandarin',jp:'みかん',romaji:'mikan',script:'h'},
  {group:'fruits',ru:'Банан',en:'Banana',jp:'バナナ',romaji:'banana',script:'k'},
  {group:'fruits',ru:'Апельсин',en:'Orange',jp:'オレンジ',romaji:'orenji',script:'k'},
  {group:'fruits',ru:'Лимон',en:'Lemon',jp:'レモン',romaji:'remon',script:'k'},
  {group:'fruits',ru:'Хурма',en:'Persimmon',jp:'かき',romaji:'kaki',script:'h'},
  {group:'fruits',ru:'Виноград',en:'Grapes',jp:'ぶどう',romaji:'budou',script:'h'},
  // lesson3
  {group:'lesson3',ru:'Здесь',en:'Here',jp:'ここ',romaji:'koko',script:'h'},
  {group:'lesson3',ru:'Там',en:'There',jp:'そこ',romaji:'soko',script:'h'},
  {group:'lesson3',ru:'Вон там',en:'Over there',jp:'あそこ',romaji:'asoko',script:'h'},
  {group:'lesson3',ru:'Где?',en:'Where?',jp:'どこ',romaji:'doko',script:'h'},
  {group:'lesson3',ru:'Офис',en:'Office',jp:'じむしょ',romaji:'jimusho',script:'h'},
  {group:'lesson3',ru:'Аудитория',en:'Classroom',jp:'きょうしつ',romaji:'kyoushitsu',script:'h'},
  {group:'lesson3',ru:'Туалет',en:'Restroom',jp:'トイレ',romaji:'toire',script:'k'},
  {group:'lesson3',ru:'Столовая',en:'Cafeteria',jp:'しょくどう',romaji:'shokudou',script:'h'},
  {group:'lesson3',ru:'Переговорная',en:'Meeting room',jp:'かいぎしつ',romaji:'kaigishitsu',script:'h'},
  {group:'lesson3',ru:'Комната',en:'Room',jp:'へや',romaji:'heya',script:'h'},
  {group:'lesson3',ru:'Лифт',en:'Elevator',jp:'エレベーター',romaji:'erebeetaa',script:'k'},
  {group:'lesson3',ru:'Эскалатор',en:'Escalator',jp:'エスカレーター',romaji:'esukareetaa',script:'k'},
  {group:'lesson3',ru:'Компания',en:'Company',jp:'かいしゃ',romaji:'kaisha',script:'h'},
  {group:'lesson3',ru:'Дом',en:'Home',jp:'うち',romaji:'uchi',script:'h'},
  {group:'lesson3',ru:'Школа',en:'School',jp:'がっこう',romaji:'gakkou',script:'h'},
  {group:'lesson3',ru:'Университет',en:'University',jp:'だいがく',romaji:'daigaku',script:'h'},
  {group:'lesson3',ru:'Больница',en:'Hospital',jp:'びょういん',romaji:'byouin',script:'h'},
  {group:'lesson3',ru:'Банк',en:'Bank',jp:'ぎんこう',romaji:'ginkou',script:'h'},
  {group:'lesson3',ru:'Почта',en:'Post office',jp:'ゆうびんきょく',romaji:'yuubinkyoku',script:'h'},
  {group:'lesson3',ru:'Библиотека',en:'Library',jp:'としょかん',romaji:'toshokan',script:'h'},
  {group:'lesson3',ru:'Супермаркет',en:'Supermarket',jp:'スーパー',romaji:'suupaa',script:'k'},
  {group:'lesson3',ru:'Ресторан',en:'Restaurant',jp:'レストラン',romaji:'resutoran',script:'k'},
  {group:'lesson3',ru:'Вокзал/Станция',en:'Station',jp:'えき',romaji:'eki',script:'h'},
  {group:'lesson3',ru:'Спортзал',en:'Gym',jp:'ジム',romaji:'jimu',script:'k'},
  // lesson4
  {group:'lesson4',ru:'Сегодня',en:'Today',jp:'きょう',romaji:'kyou',script:'h'},
  {group:'lesson4',ru:'Завтра',en:'Tomorrow',jp:'あした',romaji:'ashita',script:'h'},
  {group:'lesson4',ru:'Послезавтра',en:'Day after tomorrow',jp:'あさって',romaji:'asatte',script:'h'},
  {group:'lesson4',ru:'Вчера',en:'Yesterday',jp:'きのう',romaji:'kinou',script:'h'},
  {group:'lesson4',ru:'Позавчера',en:'Day before yesterday',jp:'おととい',romaji:'ototoi',script:'h'},
  {group:'lesson4',ru:'Этот месяц',en:'This month',jp:'こんげつ',romaji:'kongetsu',script:'h'},
  {group:'lesson4',ru:'Следующий месяц',en:'Next month',jp:'らいげつ',romaji:'raigetsu',script:'h'},
  {group:'lesson4',ru:'Прошлый месяц',en:'Last month',jp:'せんげつ',romaji:'sengetsu',script:'h'},
  {group:'lesson4',ru:'Этот год',en:'This year',jp:'ことし',romaji:'kotoshi',script:'h'},
  {group:'lesson4',ru:'Следующий год',en:'Next year',jp:'らいねん',romaji:'rainen',script:'h'},
  {group:'lesson4',ru:'Прошлый год',en:'Last year',jp:'きょねん',romaji:'kyonen',script:'h'},
  {group:'lesson4',ru:'Каждое утро',en:'Every morning',jp:'まいあさ',romaji:'maiasa',script:'h'},
  {group:'lesson4',ru:'Каждый вечер',en:'Every evening',jp:'まいばん',romaji:'maiban',script:'h'},
  {group:'lesson4',ru:'Каждый день',en:'Every day',jp:'まいにち',romaji:'mainichi',script:'h'},
  // family_own
  {group:'family_own',ru:'Бабушка (своя)',en:'Grandmother (own)',jp:'そぼ',romaji:'sobo',script:'h'},
  {group:'family_own',ru:'Дедушка (свой)',en:'Grandfather (own)',jp:'そふ',romaji:'sofu',script:'h'},
  {group:'family_own',ru:'Мать (своя)',en:'Mother (own)',jp:'はは',romaji:'haha',script:'h'},
  {group:'family_own',ru:'Отец (свой)',en:'Father (own)',jp:'ちち',romaji:'chichi',script:'h'},
  {group:'family_own',ru:'Младшая сестра (своя)',en:'Younger sister (own)',jp:'いもうと',romaji:'imouto',script:'h'},
  {group:'family_own',ru:'Младший брат (свой)',en:'Younger brother (own)',jp:'おとうと',romaji:'otouto',script:'h'},
  {group:'family_own',ru:'Старшая сестра (своя)',en:'Older sister (own)',jp:'あね',romaji:'ane',script:'h'},
  {group:'family_own',ru:'Старший брат (свой)',en:'Older brother (own)',jp:'あに',romaji:'ani',script:'h'},
  {group:'family_own',ru:'Жена (своя)',en:'Wife (own)',jp:'つま',romaji:'tsuma',script:'h'},
  {group:'family_own',ru:'Муж (свой)',en:'Husband (own)',jp:'おっと',romaji:'otto',script:'h'},
  {group:'family_own',ru:'Дочь (своя)',en:'Daughter (own)',jp:'むすめ',romaji:'musume',script:'h'},
  {group:'family_own',ru:'Сын (свой)',en:'Son (own)',jp:'むすこ',romaji:'musuko',script:'h'},
  // family_other
  {group:'family_other',ru:'Бабушка (вежл.)',en:'Grandmother (polite)',jp:'おばあさん',romaji:'obaasan',script:'h'},
  {group:'family_other',ru:'Дедушка (вежл.)',en:'Grandfather (polite)',jp:'おじいさん',romaji:'ojiisan',script:'h'},
  {group:'family_other',ru:'Мать (вежл.)',en:'Mother (polite)',jp:'おかあさん',romaji:'okaasan',script:'h'},
  {group:'family_other',ru:'Отец (вежл.)',en:'Father (polite)',jp:'おとうさん',romaji:'otousan',script:'h'},
  {group:'family_other',ru:'Младшая сестра (вежл.)',en:'Younger sister (polite)',jp:'いもうとさん',romaji:'imoutosan',script:'h'},
  {group:'family_other',ru:'Младший брат (вежл.)',en:'Younger brother (polite)',jp:'おとうとさん',romaji:'otoutosan',script:'h'},
  {group:'family_other',ru:'Старшая сестра (вежл.)',en:'Older sister (polite)',jp:'おねえさん',romaji:'oneesan',script:'h'},
  {group:'family_other',ru:'Старший брат (вежл.)',en:'Older brother (polite)',jp:'おにいさん',romaji:'oniisan',script:'h'},
  {group:'family_other',ru:'Жена (вежл.)',en:'Wife (polite)',jp:'おくさん',romaji:'okusan',script:'h'},
  {group:'family_other',ru:'Муж (вежл.)',en:'Husband (polite)',jp:'ごしゅじん',romaji:'goshujin',script:'h'},
  {group:'family_other',ru:'Дочь (вежл.)',en:'Daughter (polite)',jp:'むすめさん',romaji:'musumesan',script:'h'},
  {group:'family_other',ru:'Сын (вежл.)',en:'Son (polite)',jp:'むすこさん',romaji:'musukosan',script:'h'},
  // ── Colors ──
  {group:'colors',ru:'Красный',en:'Red',jp:'あかい',romaji:'akai',script:'h'},
  {group:'colors',ru:'Синий',en:'Blue',jp:'あおい',romaji:'aoi',script:'h'},
  {group:'colors',ru:'Белый',en:'White',jp:'しろい',romaji:'shiroi',script:'h'},
  {group:'colors',ru:'Чёрный',en:'Black',jp:'くろい',romaji:'kuroi',script:'h'},
  {group:'colors',ru:'Жёлтый',en:'Yellow',jp:'きいろい',romaji:'kiiroi',script:'h'},
  {group:'colors',ru:'Зелёный',en:'Green',jp:'みどり',romaji:'midori',script:'h'},
  {group:'colors',ru:'Оранжевый',en:'Orange',jp:'オレンジ色',romaji:'orenji iro',script:'k'},
  {group:'colors',ru:'Розовый',en:'Pink',jp:'ピンク',romaji:'pinku',script:'k'},
  {group:'colors',ru:'Коричневый',en:'Brown',jp:'ちゃいろ',romaji:'chairo',script:'h'},
  {group:'colors',ru:'Серый',en:'Grey',jp:'グレー',romaji:'guree',script:'k'},
  {group:'colors',ru:'Фиолетовый',en:'Purple',jp:'むらさき',romaji:'murasaki',script:'h'},
  {group:'colors',ru:'Цвет',en:'Color',jp:'いろ',romaji:'iro',script:'h'},
  // ── Food & Drinks ──
  {group:'food',ru:'Рис варёный',en:'Cooked rice',jp:'ごはん',romaji:'gohan',script:'h'},
  {group:'food',ru:'Хлеб',en:'Bread',jp:'パン',romaji:'pan',script:'k'},
  {group:'food',ru:'Яйцо',en:'Egg',jp:'たまご',romaji:'tamago',script:'h'},
  {group:'food',ru:'Мясо',en:'Meat',jp:'にく',romaji:'niku',script:'h'},
  {group:'food',ru:'Рыба',en:'Fish',jp:'さかな',romaji:'sakana',script:'h'},
  {group:'food',ru:'Овощи',en:'Vegetables',jp:'やさい',romaji:'yasai',script:'h'},
  {group:'food',ru:'Суши',en:'Sushi',jp:'すし',romaji:'sushi',script:'h'},
  {group:'food',ru:'Рамен',en:'Ramen',jp:'ラーメン',romaji:'raamen',script:'k'},
  {group:'food',ru:'Вода',en:'Water',jp:'みず',romaji:'mizu',script:'h'},
  {group:'food',ru:'Чай',en:'Tea',jp:'おちゃ',romaji:'ocha',script:'h'},
  {group:'food',ru:'Кофе',en:'Coffee',jp:'コーヒー',romaji:'koohii',script:'k'},
  {group:'food',ru:'Сок',en:'Juice',jp:'ジュース',romaji:'juusu',script:'k'},
  {group:'food',ru:'Пиво',en:'Beer',jp:'ビール',romaji:'biiru',script:'k'},
  {group:'food',ru:'Молоко',en:'Milk',jp:'ぎゅうにゅう',romaji:'gyuunyuu',script:'h'},
  {group:'food',ru:'Завтрак',en:'Breakfast',jp:'あさごはん',romaji:'asagohan',script:'h'},
  {group:'food',ru:'Обед',en:'Lunch',jp:'ひるごはん',romaji:'hirugohan',script:'h'},
  {group:'food',ru:'Ужин',en:'Dinner',jp:'ばんごはん',romaji:'bangohan',script:'h'},
  {group:'food',ru:'Суп',en:'Soup',jp:'スープ',romaji:'suupu',script:'k'},
  {group:'food',ru:'Вкусный',en:'Delicious',jp:'おいしい',romaji:'oishii',script:'h'},
  // ── Body ──
  {group:'body',ru:'Голова',en:'Head',jp:'あたま',romaji:'atama',script:'h'},
  {group:'body',ru:'Лицо',en:'Face',jp:'かお',romaji:'kao',script:'h'},
  {group:'body',ru:'Глаза',en:'Eyes',jp:'め',romaji:'me',script:'h'},
  {group:'body',ru:'Нос',en:'Nose',jp:'はな',romaji:'hana',script:'h'},
  {group:'body',ru:'Рот',en:'Mouth',jp:'くち',romaji:'kuchi',script:'h'},
  {group:'body',ru:'Ухо',en:'Ear',jp:'みみ',romaji:'mimi',script:'h'},
  {group:'body',ru:'Зубы',en:'Teeth',jp:'は',romaji:'ha',script:'h'},
  {group:'body',ru:'Рука',en:'Hand/Arm',jp:'て',romaji:'te',script:'h'},
  {group:'body',ru:'Нога',en:'Leg/Foot',jp:'あし',romaji:'ashi',script:'h'},
  {group:'body',ru:'Спина',en:'Back',jp:'せなか',romaji:'senaka',script:'h'},
  {group:'body',ru:'Живот',en:'Stomach',jp:'おなか',romaji:'onaka',script:'h'},
  {group:'body',ru:'Тело',en:'Body',jp:'からだ',romaji:'karada',script:'h'},
  {group:'body',ru:'Волосы',en:'Hair',jp:'かみ',romaji:'kami',script:'h'},
  // ── Clothes ──
  {group:'clothes',ru:'Одежда',en:'Clothes',jp:'ふく',romaji:'fuku',script:'h'},
  {group:'clothes',ru:'Рубашка',en:'Shirt',jp:'シャツ',romaji:'shatsu',script:'k'},
  {group:'clothes',ru:'Брюки',en:'Trousers',jp:'ズボン',romaji:'zubon',script:'k'},
  {group:'clothes',ru:'Юбка',en:'Skirt',jp:'スカート',romaji:'sukaato',script:'k'},
  {group:'clothes',ru:'Платье',en:'Dress',jp:'ワンピース',romaji:'wanpiisu',script:'k'},
  {group:'clothes',ru:'Пальто',en:'Coat',jp:'コート',romaji:'kooto',script:'k'},
  {group:'clothes',ru:'Свитер',en:'Sweater',jp:'セーター',romaji:'seetaa',script:'k'},
  {group:'clothes',ru:'Носки',en:'Socks',jp:'くつした',romaji:'kutsushita',script:'h'},
  {group:'clothes',ru:'Обувь',en:'Shoes',jp:'くつ',romaji:'kutsu',script:'h'},
  {group:'clothes',ru:'Шапка',en:'Hat/Cap',jp:'ぼうし',romaji:'boushi',script:'h'},
  {group:'clothes',ru:'Галстук',en:'Tie',jp:'ネクタイ',romaji:'nekutai',script:'k'},
  {group:'clothes',ru:'Очки',en:'Glasses',jp:'めがね',romaji:'megane',script:'h'},
  // ── House ──
  {group:'house',ru:'Дверь',en:'Door',jp:'ドア',romaji:'doa',script:'k'},
  {group:'house',ru:'Окно',en:'Window',jp:'まど',romaji:'mado',script:'h'},
  {group:'house',ru:'Стол',en:'Desk/Table',jp:'つくえ',romaji:'tsukue',script:'h'},
  {group:'house',ru:'Стул',en:'Chair',jp:'いす',romaji:'isu',script:'h'},
  {group:'house',ru:'Кровать',en:'Bed',jp:'ベッド',romaji:'beddo',script:'k'},
  {group:'house',ru:'Телевизор',en:'TV',jp:'テレビ',romaji:'terebi',script:'k'},
  {group:'house',ru:'Холодильник',en:'Refrigerator',jp:'れいぞうこ',romaji:'reizouko',script:'h'},
  {group:'house',ru:'Ванная',en:'Bathroom',jp:'おふろ',romaji:'ofuro',script:'h'},
  {group:'house',ru:'Кухня',en:'Kitchen',jp:'だいどころ',romaji:'daidokoro',script:'h'},
  {group:'house',ru:'Гостиная',en:'Living room',jp:'リビング',romaji:'ribingu',script:'k'},
  {group:'house',ru:'Спальня',en:'Bedroom',jp:'しんしつ',romaji:'shinshitsu',script:'h'},
  {group:'house',ru:'Лестница',en:'Stairs',jp:'かいだん',romaji:'kaidan',script:'h'},
  // ── Transport ──
  {group:'transport',ru:'Поезд',en:'Train',jp:'でんしゃ',romaji:'densha',script:'h'},
  {group:'transport',ru:'Метро',en:'Subway',jp:'ちかてつ',romaji:'chikatetsu',script:'h'},
  {group:'transport',ru:'Автобус',en:'Bus',jp:'バス',romaji:'basu',script:'k'},
  {group:'transport',ru:'Такси',en:'Taxi',jp:'タクシー',romaji:'takushii',script:'k'},
  {group:'transport',ru:'Самолёт',en:'Airplane',jp:'ひこうき',romaji:'hikouki',script:'h'},
  {group:'transport',ru:'Корабль',en:'Ship',jp:'ふね',romaji:'fune',script:'h'},
  {group:'transport',ru:'Автомобиль',en:'Car',jp:'くるま',romaji:'kuruma',script:'h'},
  {group:'transport',ru:'Велосипед',en:'Bicycle',jp:'じてんしゃ',romaji:'jitensha',script:'h'},
  {group:'transport',ru:'Вокзал',en:'Station',jp:'えき',romaji:'eki',script:'h'},
  {group:'transport',ru:'Аэропорт',en:'Airport',jp:'くうこう',romaji:'kuukou',script:'h'},
  {group:'transport',ru:'Остановка',en:'Bus stop',jp:'バスてい',romaji:'basutei',script:'h'},
  // ── Adjectives い ──
  {group:'adj_i',ru:'Большой',en:'Big',jp:'おおきい',romaji:'ookii',script:'h'},
  {group:'adj_i',ru:'Маленький',en:'Small',jp:'ちいさい',romaji:'chiisai',script:'h'},
  {group:'adj_i',ru:'Высокий',en:'Tall/High',jp:'たかい',romaji:'takai',script:'h'},
  {group:'adj_i',ru:'Низкий',en:'Low/Short',jp:'ひくい',romaji:'hikui',script:'h'},
  {group:'adj_i',ru:'Длинный',en:'Long',jp:'ながい',romaji:'nagai',script:'h'},
  {group:'adj_i',ru:'Короткий',en:'Short',jp:'みじかい',romaji:'mijikai',script:'h'},
  {group:'adj_i',ru:'Дорогой',en:'Expensive',jp:'たかい',romaji:'takai',script:'h'},
  {group:'adj_i',ru:'Дешёвый',en:'Cheap',jp:'やすい',romaji:'yasui',script:'h'},
  {group:'adj_i',ru:'Новый',en:'New',jp:'あたらしい',romaji:'atarashii',script:'h'},
  {group:'adj_i',ru:'Старый',en:'Old',jp:'ふるい',romaji:'furui',script:'h'},
  {group:'adj_i',ru:'Горячий',en:'Hot',jp:'あつい',romaji:'atsui',script:'h'},
  {group:'adj_i',ru:'Холодный',en:'Cold',jp:'つめたい',romaji:'tsumetai',script:'h'},
  {group:'adj_i',ru:'Тёплый',en:'Warm',jp:'あたたかい',romaji:'atatakai',script:'h'},
  {group:'adj_i',ru:'Вкусный',en:'Delicious',jp:'おいしい',romaji:'oishii',script:'h'},
  {group:'adj_i',ru:'Трудный',en:'Difficult',jp:'むずかしい',romaji:'muzukashii',script:'h'},
  {group:'adj_i',ru:'Лёгкий',en:'Easy',jp:'やさしい',romaji:'yasashii',script:'h'},
  {group:'adj_i',ru:'Весёлый',en:'Fun',jp:'たのしい',romaji:'tanoshii',script:'h'},
  {group:'adj_i',ru:'Скучный',en:'Boring',jp:'つまらない',romaji:'tsumaranai',script:'h'},
  {group:'adj_i',ru:'Страшный',en:'Scary',jp:'こわい',romaji:'kowai',script:'h'},
  {group:'adj_i',ru:'Грустный',en:'Sad',jp:'かなしい',romaji:'kanashii',script:'h'},
  // ── Adjectives な ──
  {group:'adj_na',ru:'Удобный',en:'Convenient',jp:'べんりな',romaji:'benrina',script:'h'},
  {group:'adj_na',ru:'Нравится',en:'Liked',jp:'すきな',romaji:'sukina',script:'h'},
  {group:'adj_na',ru:'Не нравится',en:'Disliked',jp:'きらいな',romaji:'kiraina',script:'h'},
  {group:'adj_na',ru:'Знаменитый',en:'Famous',jp:'ゆうめいな',romaji:'yuumeina',script:'h'},
  {group:'adj_na',ru:'Спокойный',en:'Quiet',jp:'しずかな',romaji:'shizukana',script:'h'},
  {group:'adj_na',ru:'Шумный',en:'Noisy',jp:'にぎやかな',romaji:'nigiyakana',script:'h'},
  {group:'adj_na',ru:'Здоровый',en:'Healthy',jp:'げんきな',romaji:'genkina',script:'h'},
  {group:'adj_na',ru:'Важный',en:'Important',jp:'たいせつな',romaji:'taisetsuna',script:'h'},
  {group:'adj_na',ru:'Свободный',en:'Free/Available',jp:'ひまな',romaji:'himana',script:'h'},
  {group:'adj_na',ru:'Чистый',en:'Clean',jp:'きれいな',romaji:'kireina',script:'h'},
  {group:'adj_na',ru:'Добрый',en:'Kind',jp:'しんせつな',romaji:'shinsetsuna',script:'h'},
  // ── Questions ──
  {group:'questions',ru:'Что?',en:'What?',jp:'なに',romaji:'nani',script:'h'},
  {group:'questions',ru:'Кто?',en:'Who?',jp:'だれ',romaji:'dare',script:'h'},
  {group:'questions',ru:'Где?',en:'Where?',jp:'どこ',romaji:'doko',script:'h'},
  {group:'questions',ru:'Когда?',en:'When?',jp:'いつ',romaji:'itsu',script:'h'},
  {group:'questions',ru:'Почему?',en:'Why?',jp:'なぜ',romaji:'naze',script:'h'},
  {group:'questions',ru:'Как?',en:'How?',jp:'どう',romaji:'dou',script:'h'},
  {group:'questions',ru:'Сколько (цена)?',en:'How much?',jp:'いくら',romaji:'ikura',script:'h'},
  {group:'questions',ru:'Сколько (штук)?',en:'How many?',jp:'いくつ',romaji:'ikutsu',script:'h'},
  {group:'questions',ru:'Который час?',en:'What time?',jp:'なんじ',romaji:'nanji',script:'h'},
  {group:'questions',ru:'Какой?',en:'Which?',jp:'どの',romaji:'dono',script:'h'},
  {group:'questions',ru:'Сколько лет?',en:'How old?',jp:'なんさい',romaji:'nansai',script:'h'},
];

/* ── Verb data ──────────────────────────────────────────── */
/* stem_masu: the verb stem before ます
   Conjugation rules:
     ます   → stem + ます      (present/future affirmative)
     ました → stem + ました    (past affirmative)
     ません → stem + ません    (present/future negative)
     ませんでした → stem + ませんでした (past negative)
     ましょう → stem + ましょう (let's / invitation)
*/
const VERB_DATA = [
  // lesson4
  {group:'lesson4', ru:'Просыпаться',         en:'To wake up',            stem:'おき',         romaji_stem:'oki'},
  {group:'lesson4', ru:'Спать / Ложиться',     en:'To sleep / go to bed',  stem:'ね',           romaji_stem:'ne'},
  {group:'lesson4', ru:'Работать',             en:'To work',               stem:'はたらき',     romaji_stem:'hataraki'},
  {group:'lesson4', ru:'Отдыхать',             en:'To rest',               stem:'やすみ',       romaji_stem:'yasumi'},
  {group:'lesson4', ru:'Учиться / Заниматься', en:'To study',              stem:'べんきょうし', romaji_stem:'benkyoushi'},
  // lesson5
  {group:'lesson5', ru:'Идти / Ехать',         en:'To go',                 stem:'い',           romaji_stem:'i'},
  {group:'lesson5', ru:'Приходить',            en:'To come',               stem:'き',           romaji_stem:'ki'},
  {group:'lesson5', ru:'Возвращаться',         en:'To return',             stem:'かえり',       romaji_stem:'kaeri'},
  {group:'lesson5', ru:'Есть / Кушать',        en:'To eat',                stem:'たべ',         romaji_stem:'tabe'},
  {group:'lesson5', ru:'Пить',                 en:'To drink',              stem:'のみ',         romaji_stem:'nomi'},
  {group:'lesson5', ru:'Делать',               en:'To do',                 stem:'し',           romaji_stem:'shi'},
  {group:'lesson5', ru:'Смотреть / Видеть',    en:'To watch / see',        stem:'み',           romaji_stem:'mi'},
  {group:'lesson5', ru:'Слушать',              en:'To listen',             stem:'きき',         romaji_stem:'kiki'},
  {group:'lesson5', ru:'Читать',               en:'To read',               stem:'よみ',         romaji_stem:'yomi'},
  {group:'lesson5', ru:'Писать',               en:'To write',              stem:'かき',         romaji_stem:'kaki'},
  {group:'lesson5', ru:'Говорить',             en:'To speak',              stem:'はなし',       romaji_stem:'hanashi'},
  {group:'lesson5', ru:'Понимать',             en:'To understand',         stem:'わかり',       romaji_stem:'wakari'},
  {group:'lesson5', ru:'Покупать',             en:'To buy',                stem:'かい',         romaji_stem:'kai'},
  {group:'lesson5', ru:'Ждать',                en:'To wait',               stem:'まち',         romaji_stem:'machi'},
  {group:'lesson5', ru:'Встречаться',          en:'To meet',               stem:'あい',         romaji_stem:'ai'},
  {group:'lesson5', ru:'Начинать',en:'To begin',stem:'はじめ',romaji_stem:'hajime'},
  {group:'lesson5', ru:'Заканчивать',en:'To finish',stem:'おわり',romaji_stem:'owari'},
  // ── Motion ──
  {group:'verbs_motion',ru:'Входить',en:'To enter',stem:'はいり',romaji_stem:'hairi'},
  {group:'verbs_motion',ru:'Выходить',en:'To exit',stem:'で',romaji_stem:'de'},
  {group:'verbs_motion',ru:'Ехать (транспорт)',en:'To ride',stem:'のり',romaji_stem:'nori'},
  {group:'verbs_motion',ru:'Бежать',en:'To run',stem:'はしり',romaji_stem:'hashiri'},
  {group:'verbs_motion',ru:'Идти пешком',en:'To walk',stem:'あるき',romaji_stem:'aruki'},
  {group:'verbs_motion',ru:'Плавать',en:'To swim',stem:'およぎ',romaji_stem:'oyogi'},
  {group:'verbs_motion',ru:'Стоять',en:'To stand',stem:'たち',romaji_stem:'tachi'},
  {group:'verbs_motion',ru:'Сидеть',en:'To sit',stem:'すわり',romaji_stem:'suwari'},
  // ── Daily ──
  {group:'verbs_daily',ru:'Открывать',en:'To open',stem:'あけ',romaji_stem:'ake'},
  {group:'verbs_daily',ru:'Закрывать',en:'To close',stem:'しめ',romaji_stem:'shime'},
  {group:'verbs_daily',ru:'Включать',en:'To turn on',stem:'つけ',romaji_stem:'tsuke'},
  {group:'verbs_daily',ru:'Выключать',en:'To turn off',stem:'けし',romaji_stem:'keshi'},
  {group:'verbs_daily',ru:'Мыть',en:'To wash',stem:'あらい',romaji_stem:'arai'},
  {group:'verbs_daily',ru:'Готовить',en:'To cook',stem:'つくり',romaji_stem:'tsukuri'},
  {group:'verbs_daily',ru:'Убирать',en:'To clean',stem:'そうじし',romaji_stem:'souji shi'},
  {group:'verbs_daily',ru:'Звонить',en:'To call',stem:'でんわし',romaji_stem:'denwa shi'},
  {group:'verbs_daily',ru:'Показывать',en:'To show',stem:'みせ',romaji_stem:'mise'},
  {group:'verbs_daily',ru:'Давать',en:'To give',stem:'あげ',romaji_stem:'age'},
  {group:'verbs_daily',ru:'Получать',en:'To receive',stem:'もらい',romaji_stem:'morai'},
  {group:'verbs_daily',ru:'Брать',en:'To take',stem:'とり',romaji_stem:'tori'},
  {group:'verbs_daily',ru:'Класть',en:'To put/place',stem:'おき',romaji_stem:'oki'},
  {group:'verbs_daily',ru:'Надевать',en:'To put on',stem:'き',romaji_stem:'ki'},
  {group:'verbs_daily',ru:'Снимать одежду',en:'To take off',stem:'ぬぎ',romaji_stem:'nugi'},
  // ── Communication ──
  {group:'verbs_comm',ru:'Спрашивать',en:'To ask',stem:'きき',romaji_stem:'kiki'},
  {group:'verbs_comm',ru:'Отвечать',en:'To answer',stem:'こたえ',romaji_stem:'kotae'},
  {group:'verbs_comm',ru:'Думать',en:'To think',stem:'おもい',romaji_stem:'omoi'},
  {group:'verbs_comm',ru:'Знать',en:'To know',stem:'しり',romaji_stem:'shiri'},
  {group:'verbs_comm',ru:'Помнить',en:'To remember',stem:'おぼえ',romaji_stem:'oboe'},
  {group:'verbs_comm',ru:'Забывать',en:'To forget',stem:'わすれ',romaji_stem:'wasure'},
  {group:'verbs_comm',ru:'Встречаться',en:'To meet',stem:'あい',romaji_stem:'ai'},
  {group:'verbs_comm',ru:'Объяснять',en:'To explain',stem:'せつめいし',romaji_stem:'setsumei shi'},
];

/* Verb form definitions */
const VERB_FORMS = [
  { key:'pres', label:'Настоящее/Будущее', labelEn:'Present/Future',
    suffix:'ます', suffix_r:'masu', neg:false },
  { key:'past', label:'Прошедшее',         labelEn:'Past',
    suffix:'ました', suffix_r:'mashita', neg:false },
  { key:'neg_pres', label:'Настоящее отрицат.', labelEn:'Neg. Present',
    suffix:'ません', suffix_r:'masen', neg:true },
  { key:'neg_past', label:'Прошедшее отрицат.', labelEn:'Neg. Past',
    suffix:'ませんでした', suffix_r:'masen deshita', neg:true },
  { key:'let', label:'Давайте…',           labelEn:'Let\'s…',
    suffix:'ましょう', suffix_r:'mashou', neg:false },
];

function makeVerbForm(verb, formKey) {
  const f = VERB_FORMS.find(x => x.key === formKey);
  if (!f) return null;
  return {
    type: 'verb',
    verbKey: formKey,
    ru: verb.ru,
    en: verb.en,
    jp: verb.stem + f.suffix,
    romaji: verb.romaji_stem + f.suffix_r,
    script: 'h',
    formLabel: f.label,
    formLabelEn: f.labelEn,
    isNeg: f.neg,
  };
}

function buildVocabDeck(scope, order) {
  let words = scope === 'all' ? VOCAB_DATA : VOCAB_DATA.filter(w => w.group === scope);
  if (order === 'random') { words = [...words]; shuffle(words); }
  return words;
}

function buildVerbDeck(scope, forms, order) {
  let verbs = scope === 'all' ? VERB_DATA : VERB_DATA.filter(v => v.group === scope);
  const enabledForms = [];
  if (forms.pres)     enabledForms.push('pres');
  if (forms.past)     enabledForms.push('past');
  if (forms.neg_pres) enabledForms.push('neg_pres');
  if (forms.neg_past) enabledForms.push('neg_past');
  if (forms.let)      enabledForms.push('let');
  if (!enabledForms.length) enabledForms.push('pres'); // fallback

  let deck = [];
  verbs.forEach(v => {
    enabledForms.forEach(fk => {
      const card = makeVerbForm(v, fk);
      if (card) deck.push(card);
    });
  });
  if (order === 'random') shuffle(deck);
  return deck;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3c — i18n TRANSLATIONS
   ═══════════════════════════════════════════════════════════ */

const TRANSLATIONS = {
  ru: {
    // topbar labels
    mode:'Режим:', script:'Азбука:', order:'Порядок:', rows:'Ряды:',
    dakuten:'Дакутен', yoon:'Ёон',
    reverse_quiz:'Обратный квиз', choices:'Вариантов:',
    range:'Диапазон:', cards:'Карточек:', format:'Формат:', step:'Шаг:',
    front:'Фронт:', scope:'Охват:', meaning:'Перевод:', days:'Числа:',
    month_short:'Мес:', group:'Группа:', form:'Форма:', phrases:'Фразы',
    // option values
    hiragana:'Хирагана', katakana:'Катакана',
    both_mix:'Обе (микс)', both_together:'Обе (вместе)',
    sequential:'По порядку', random:'Случайный', mixed:'Микс',
    num_units:'0–9', num_tens:'10–99', num_hundreds:'100–999',
    num_thousands:'1000–9999', num_large:'10k–9999万', num_oku:'億 100M–999M',
    min_1:'1 мин', min_5:'5 мин', min_10:'10 мин', min_15:'15 мин', min_30:'30 мин',
    full_day:'Весь день', morning:'Утро (5–11)', daytime:'День (12–17)',
    evening:'Вечер (18–22)', night:'Ночь (23–4)',
    time_digits:'Цифры', weekdays:'Дни недели',
    month_days:'Числа месяца', months:'Месяцы', all:'Всё', meaning_opt:'Перевод',
    off:'Откл.',
    all_words:'Все слова', all_verbs:'Все глаголы',
    lesson1:'Урок 1 — Люди', countries:'Страны', lesson2:'Урок 2 — Предметы',
    fruits:'Фрукты', lesson3:'Урок 3 — Места', lesson4:'Урок 4',
    lesson5:'Урок 5', family_own:'Семья (своя)', family_other:'Семья (вежл.)',
    g_colors:'Цвета', g_food:'Еда и напитки', g_body:'Тело',
    g_clothes:'Одежда', g_house:'Дом и мебель', g_transport:'Транспорт',
    g_adj_i:'Прилаг. い', g_adj_na:'Прилаг. な', g_questions:'Вопросы',
    g_verbs_motion:'Движение', g_verbs_daily:'Повседневные', g_verbs_comm:'Общение',
    native_to_jp:'Родной → JP', jp_to_native:'JP → Родной',
    vpres:'Наст/Буд', vpast:'Прошедшее', vneg:'Отрицание',
    // mode names
    kana_mode:'Кана', numbers_mode:'Числа', time_mode:'Время',
    calendar_mode:'Календарь', vocab_mode:'📖 Слова', verbs_mode:'🔤 Глаголы',
    kanji_mode:'🈴 Кандзи N5', quiz_mode:'🎯 Квиз',
    sprint_mode:'⚡ Спринт', recall_mode:'✍️ Recall', sentences_mode:'🔀 Предложения',
    kf_kanji:'Кандзи → Значение', kf_meaning:'Значение → Кандзи',
    kf_on:'Он-ёми', kf_kun:'Кун-ёми',
    quiz_vocab:'Слова', quiz_kanji:'Кандзи', quiz_verbs:'Глаголы',
    s30:'30 сек', s60:'60 сек', s120:'2 мин',
    rec_romaji:'Ромаджи', rec_meaning:'Перевод',
    sent_reveal:'Показать ответ',
    tbl_kanji:'Таблица кандзи N5',
    // buttons
    again:'Повтор', known:'Знаю', reset:'Сброс',
    tables_btn:'Таблицы', flashcards_btn:'← Карточки',
    // stat bar
    stat_known:'Знаю', stat_attempts:'Попыток', stat_deck:'Карточек',
    // table titles
    tbl_hiragana:'Таблица хираганы', tbl_katakana:'Таблица катаканы',
    tbl_kana:'Таблица каны', tbl_numbers:'Таблица чисел — 数字',
    tbl_time:'Таблица времени — 時間', tbl_calendar:'Таблица — 曜日・日付',
    tbl_vocab:'Словарь', tbl_verbs:'Таблица глаголов',
    // vocab table columns
    col_native:'Русский', col_jp:'Японский', col_romaji:'Ромаджи', col_script:'Азбука',
    // verb table columns
    vcol_native:'Русский', vcol_pres:'Наст./Буд. (ます)',
    vcol_past:'Прошедшее (ました)', vcol_neg_pres:'Наст. отриц. (ません)',
    vcol_neg_past:'Прош. отриц. (ませんでした)', vcol_let:'Давайте (ましょう)',
    vcol_romaji:'Ромаджи (основа)',
    // verb form labels on cards
    vf_pres:'Настоящее / Будущее', vf_past:'Прошедшее',
    vf_neg_pres:'Настоящее отрицательное', vf_neg_past:'Прошедшее отрицательное',
    vf_let:'Давайте…',
    exc_badge:'⚠ 例外',
  },
  en: {
    mode:'Mode:', script:'Script:', order:'Order:', rows:'Rows:',
    dakuten:'Dakuten', yoon:'Yoon',
    reverse_quiz:'Reverse quiz', choices:'Choices:',
    range:'Range:', cards:'Cards:', format:'Format:', step:'Step:',
    front:'Front:', scope:'Scope:', meaning:'Meaning:', days:'Days:',
    month_short:'Mo:', group:'Group:', form:'Form:', phrases:'Phrases',
    hiragana:'Hiragana', katakana:'Katakana',
    both_mix:'Both (mix)', both_together:'Both (together)',
    sequential:'Sequential', random:'Random', mixed:'Mixed',
    num_units:'0–9', num_tens:'10–99', num_hundreds:'100–999',
    num_thousands:'1000–9999', num_large:'10k–9999万', num_oku:'億 100M–999M',
    min_1:'1 min', min_5:'5 min', min_10:'10 min', min_15:'15 min', min_30:'30 min',
    full_day:'Full day', morning:'Morning (5–11)', daytime:'Day (12–17)',
    evening:'Evening (18–22)', night:'Night (23–4)',
    time_digits:'Time digits', weekdays:'Weekdays',
    month_days:'Month days', months:'Months', all:'All', meaning_opt:'Meaning',
    off:'Off',
    all_words:'All words', all_verbs:'All verbs',
    lesson1:'Lesson 1 — People', countries:'Countries', lesson2:'Lesson 2 — Items',
    fruits:'Fruits', lesson3:'Lesson 3 — Places', lesson4:'Lesson 4',
    lesson5:'Lesson 5', family_own:'Family (own)', family_other:'Family (polite)',
    g_colors:'Colors', g_food:'Food & Drinks', g_body:'Body',
    g_clothes:'Clothes', g_house:'House & Furniture', g_transport:'Transport',
    g_adj_i:'Adj. い', g_adj_na:'Adj. な', g_questions:'Questions',
    g_verbs_motion:'Motion', g_verbs_daily:'Daily actions', g_verbs_comm:'Communication',
    native_to_jp:'Native → JP', jp_to_native:'JP → Native',
    vpres:'Pres/Future', vpast:'Past', vneg:'Negative',
    kana_mode:'Kana', numbers_mode:'Numbers', time_mode:'Time',
    calendar_mode:'Calendar', vocab_mode:'📖 Words', verbs_mode:'🔤 Verbs',
    kanji_mode:'🈴 Kanji N5', quiz_mode:'🎯 Quiz',
    sprint_mode:'⚡ Sprint', recall_mode:'✍️ Recall', sentences_mode:'🔀 Sentences',
    kf_kanji:'Kanji → Meaning', kf_meaning:'Meaning → Kanji',
    kf_on:'On-yomi', kf_kun:'Kun-yomi',
    quiz_vocab:'Words', quiz_kanji:'Kanji', quiz_verbs:'Verbs',
    s30:'30 sec', s60:'60 sec', s120:'2 min',
    rec_romaji:'Romaji', rec_meaning:'Translation',
    sent_reveal:'Show answer',
    tbl_kanji:'Kanji N5 table',
    again:'Again', known:'Known', reset:'Reset',
    tables_btn:'Tables', flashcards_btn:'← Flashcards',
    stat_known:'Known', stat_attempts:'Attempts', stat_deck:'Deck',
    tbl_hiragana:'Hiragana chart', tbl_katakana:'Katakana chart',
    tbl_kana:'Kana chart', tbl_numbers:'Numbers chart — 数字',
    tbl_time:'Time chart — 時間', tbl_calendar:'Calendar chart — 曜日・日付',
    tbl_vocab:'Vocabulary', tbl_verbs:'Verb conjugation table',
    col_native:'English', col_jp:'Japanese', col_romaji:'Romaji', col_script:'Script',
    vcol_native:'English', vcol_pres:'Pres./Future (ます)',
    vcol_past:'Past (ました)', vcol_neg_pres:'Neg. Present (ません)',
    vcol_neg_past:'Neg. Past (ませんでした)', vcol_let:'Let\'s (ましょう)',
    vcol_romaji:'Romaji (stem)',
    vf_pres:'Present / Future', vf_past:'Past',
    vf_neg_pres:'Negative Present', vf_neg_past:'Negative Past',
    vf_let:'Let\'s…',
    exc_badge:'⚠ Exception',
  },
};

function T(key) {
  return (TRANSLATIONS[state.uiLang] || TRANSLATIONS.ru)[key] || key;
}

/* Apply all data-i18n attributes in the DOM */
function applyI18n() {
  const lang = state.uiLang;
  const tr = TRANSLATIONS[lang] || TRANSLATIONS.ru;

  // ── Labels/spans with data-i18n ──────────────────────────
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (tr[k] !== undefined) el.textContent = tr[k];
  });

  // ── lblMode (no data-i18n, special case) ─────────────────
  const lblMode = document.getElementById('lblMode');
  if (lblMode) lblMode.textContent = tr.mode;

  // ── ALL <option> with data-i18n-opt ─────────────────────
  // This is the universal pass — covers every select in the app
  document.querySelectorAll('option[data-i18n-opt]').forEach(o => {
    const k = o.dataset.i18nOpt;
    if (tr[k] !== undefined) o.textContent = tr[k];
  });

  // ── Mode selector options (no data-i18n-opt, use modeMap) ─
  const modeMap = {
    kana: tr.kana_mode, numbers: tr.numbers_mode, time: tr.time_mode,
    calendar: tr.calendar_mode, vocab: tr.vocab_mode, verbs: tr.verbs_mode,
    kanji: tr.kanji_mode, quiz: tr.quiz_mode,
    sprint: tr.sprint_mode, recall: tr.recall_mode, sentences: tr.sentences_mode,
  };
  selGlobalMode.querySelectorAll('option').forEach(o => {
    if (modeMap[o.value]) o.textContent = modeMap[o.value];
  });

  // ── selVocabFront / selVerbFront (value-based, no data-i18n-opt) ──
  selVocabFront.querySelectorAll('option').forEach(o => {
    if (o.value === 'native') o.textContent = tr.native_to_jp;
    if (o.value === 'jp')     o.textContent = tr.jp_to_native;
  });
  selVerbFront.querySelectorAll('option').forEach(o => {
    if (o.value === 'native') o.textContent = tr.native_to_jp;
    if (o.value === 'jp')     o.textContent = tr.jp_to_native;
  });

  // ── Buttons ──────────────────────────────────────────────
  btnAgain.innerHTML    = '↩ ' + tr.again;
  btnKnown.innerHTML    = '✓ ' + tr.known;
  btnReset.innerHTML    = '↺ ' + tr.reset;
  btnTables.textContent = state.view === 'tables' ? tr.flashcards_btn : tr.tables_btn;

  // ── topHint ──────────────────────────────────────────────
  topHint.textContent = '☰ ' + tr.mode.replace(':','');

  updateStat();
  if (state.view === 'tables') renderTable();
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
  kanaRows: new Set(['vowels','k','s','t','n','h','m','y','r','w']),  // selected row groups
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

  // Vocabulary
  vocabScope:  'all',    // 'all' | group name
  vocabFront:  'native', // 'native' | 'jp'
  vocabOrder:  'random',

  // Verbs
  verbScope:    'all',
  verbFront:    'native', // 'native' | 'jp'
  verbOrder:    'random',
  verbForms: { pres:true, past:true, neg_pres:true, neg_past:true, let:false },

  // UI language
  uiLang: 'ru',

  // Kanji
  kanjiFront:'kanji', kanjiOrder:'random',

  // Quiz
  quizSource:'vocab', quizChoices:4,

  // Sprint
  sprintSource:'vocab', sprintTime:60,
  _sprintTimer:null, _sprintRunning:false,

  // Recall
  recallSource:'vocab', recallMode:'romaji',

  // Sentences
  sentVerbScope:'all',
  sentForms:{ pres:true, past:true, neg_pres:true, neg_past:true, let:false },

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
const kanaRowsWrap = $('kanaRowsWrap');
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
const selCalMeaning  = $('selCalMeaning');

// UI language
const selUiLang      = $('selUiLang');

// Kanji
const kanjiControls  = $('kanjiControls');
const selKanjiFront  = $('selKanjiFront');
const selKanjiOrder  = $('selKanjiOrder');

// Quiz
const quizControls   = $('quizControls');
const selQuizSource  = $('selQuizSource');
const selQuizChoices = $('selQuizChoices');
const quizView       = $('quizView');
const quizPrompt     = $('quizPrompt');
const quizChoicesGrid= $('quizChoicesGrid');
const btnQuizReset   = $('btnQuizReset');

// Sprint
const sprintControls = $('sprintControls');
const selSprintSource= $('selSprintSource');
const selSprintTime  = $('selSprintTime');
const sprintView     = $('sprintView');
const sprintScreen   = $('sprintScreen');
const sprintTimer    = $('sprintTimer');
const sprintCard     = $('sprintCard');
const btnSprintYes   = $('btnSprintYes');
const btnSprintNo    = $('btnSprintNo');
const sprintResult   = $('sprintResult');
const sprintResultInner = $('sprintResultInner');
const btnSprintAgain = $('btnSprintAgain');

// Recall
const recallControls = $('recallControls');
const selRecallSource= $('selRecallSource');
const selRecallMode  = $('selRecallMode');
const recallView     = $('recallView');
const recallPrompt   = $('recallPrompt');
const recallInput    = $('recallInput');
const btnRecallCheck = $('btnRecallCheck');
const recallFeedback = $('recallFeedback');
const btnRecallSkip  = $('btnRecallSkip');
const btnRecallReset = $('btnRecallReset');

// Sentences
const sentencesControls = $('sentencesControls');
const selSentVerbScope  = $('selSentVerbScope');
const optSentPres    = $('optSentPres');
const optSentPast    = $('optSentPast');
const optSentNeg     = $('optSentNeg');
const optSentLet     = $('optSentLet');
const sentencesView  = $('sentencesView');
const sentSubject    = $('sentSubject');
const sentVerb       = $('sentVerb');
const sentFormTag    = $('sentFormTag');
const sentAnswer     = $('sentAnswer');
const sentTiles      = $('sentTiles');
const btnSentReveal  = $('btnSentReveal');
const btnSentNext    = $('btnSentNext');
const btnSentReset   = $('btnSentReset');
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

// Vocab
const vocabControls  = $('vocabControls');
const selVocabScope  = $('selVocabScope');
const selVocabFront  = $('selVocabFront');
const selVocabOrder  = $('selVocabOrder');

// Verbs
const verbControls   = $('verbControls');
const selVerbScope   = $('selVerbScope');
const selVerbFront   = $('selVerbFront');
const selVerbOrder   = $('selVerbOrder');
const optVerbPres    = $('optVerbPres');
const optVerbPast    = $('optVerbPast');
const optVerbNeg     = $('optVerbNeg');
const optVerbLet     = $('optVerbLet');

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

selGlobalMode.addEventListener('change', () => { state.globalMode = selGlobalMode.value; syncModeUI(); restart(); applyI18n(); });

selUiLang.addEventListener('change', () => {
  state.uiLang = selUiLang.value;
  applyI18n();
});

selScript.addEventListener('change',  () => { state.script   = selScript.value;  restart(); });

// Kana row toggles
document.addEventListener('click', e => {
  const btn = e.target.closest('.kana-row-btn');
  if (!btn) return;
  const row = btn.dataset.row;
  if (state.kanaRows.has(row)) {
    // Don't allow deselecting if it's the last one
    if (state.kanaRows.size <= 1) return;
    state.kanaRows.delete(row);
    btn.classList.remove('active');
  } else {
    state.kanaRows.add(row);
    btn.classList.add('active');
  }
  restart();
});
selOrder.addEventListener('change',   () => { state.order    = selOrder.value;   restart(); });
optDakuten.addEventListener('change', () => {
  state.dakuten = optDakuten.checked;
  const dakRowsEl = $('kanaRowsDak');
  if (dakRowsEl) dakRowsEl.classList.toggle('hidden', !state.dakuten);
  // add/remove dakuten rows from selection
  const dakRows = ['g','z','d','b','p'];
  if (state.dakuten) {
    dakRows.forEach(r => state.kanaRows.add(r));
  } else {
    dakRows.forEach(r => state.kanaRows.delete(r));
  }
  restart();
});
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
selCalMeaning.addEventListener('change', () => { state.calMeaningLang= selCalMeaning.value;  showCard(); });
selCalMonthMin.addEventListener('change', () => { state.calMonthMin = parseInt(selCalMonthMin.value,10)||1;  restart(); });
selCalMonthMax.addEventListener('change', () => { state.calMonthMax = parseInt(selCalMonthMax.value,10)||12; restart(); });

selVocabScope.addEventListener('change',  () => { state.vocabScope = selVocabScope.value;  restart(); });
selVocabFront.addEventListener('change',  () => { state.vocabFront = selVocabFront.value;  showCard(); });
selVocabOrder.addEventListener('change',  () => { state.vocabOrder = selVocabOrder.value;  restart(); });

selVerbScope.addEventListener('change',  () => { state.verbScope = selVerbScope.value;  restart(); });
selVerbFront.addEventListener('change',  () => { state.verbFront = selVerbFront.value;  showCard(); });
selVerbOrder.addEventListener('change',  () => { state.verbOrder = selVerbOrder.value;  restart(); });
optVerbPres.addEventListener('change',   () => { state.verbForms.pres     = optVerbPres.checked;     restart(); });
optVerbPast.addEventListener('change',   () => { state.verbForms.past     = optVerbPast.checked;     restart(); });
optVerbNeg.addEventListener('change',    () => {
  state.verbForms.neg_pres = optVerbNeg.checked;
  state.verbForms.neg_past = optVerbNeg.checked;
  restart();
});
optVerbLet.addEventListener('change',    () => { state.verbForms.let  = optVerbLet.checked;      restart(); });

// Kanji
selKanjiFront.addEventListener('change', () => { state.kanjiFront = selKanjiFront.value; restart(); });
selKanjiOrder.addEventListener('change', () => { state.kanjiOrder = selKanjiOrder.value; restart(); });

// Quiz
selQuizSource.addEventListener('change',  () => { state.quizSource  = selQuizSource.value;  startQuiz(); });
selQuizChoices.addEventListener('change', () => { state.quizChoices = parseInt(selQuizChoices.value)||4; startQuiz(); });
btnQuizReset.addEventListener('click',    () => startQuiz());

// Sprint
selSprintSource.addEventListener('change',() => { state.sprintSource = selSprintSource.value; initSprint(); });
selSprintTime.addEventListener('change',  () => { state.sprintTime   = parseInt(selSprintTime.value)||60; initSprint(); });
btnSprintYes.addEventListener('click',    () => sprintAnswer(true));
btnSprintNo.addEventListener('click',     () => sprintAnswer(false));
btnSprintAgain.addEventListener('click',  () => initSprint());

// Recall
selRecallSource.addEventListener('change',() => { state.recallSource = selRecallSource.value; startRecall(); });
selRecallMode.addEventListener('change',  () => { state.recallMode   = selRecallMode.value;   startRecall(); });
btnRecallCheck.addEventListener('click',  () => checkRecall());
recallInput.addEventListener('keydown',   e => { if (e.key === 'Enter') checkRecall(); });
btnRecallSkip.addEventListener('click',   () => { state.attempts++; advanceRecall(); });
btnRecallReset.addEventListener('click',  () => startRecall());

// Sentences
selSentVerbScope.addEventListener('change',() => { state.sentVerbScope = selSentVerbScope.value; startSentences(); });
optSentPres.addEventListener('change', () => { state.sentForms.pres     = optSentPres.checked; startSentences(); });
optSentPast.addEventListener('change', () => { state.sentForms.past     = optSentPast.checked; startSentences(); });
optSentNeg.addEventListener('change',  () => { state.sentForms.neg_pres = optSentNeg.checked; state.sentForms.neg_past = optSentNeg.checked; startSentences(); });
optSentLet.addEventListener('change',  () => { state.sentForms.let      = optSentLet.checked; startSentences(); });
btnSentReveal.addEventListener('click', () => revealSentence());
btnSentNext.addEventListener('click',   () => nextSentence());
btnSentReset.addEventListener('click',  () => startSentences());

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
  const flashModes  = new Set(['kana','numbers','time','calendar','vocab','verbs','kanji','sentences']);
  const isFlash = flashModes.has(m);

  kanaControls.classList.toggle('hidden',      m !== 'kana');
  numControls.classList.toggle('hidden',       m !== 'numbers');
  timeControls.classList.toggle('hidden',      m !== 'time');
  calControls.classList.toggle('hidden',       m !== 'calendar');
  vocabControls.classList.toggle('hidden',     m !== 'vocab');
  verbControls.classList.toggle('hidden',      m !== 'verbs');
  kanjiControls.classList.toggle('hidden',     m !== 'kanji');
  quizControls.classList.toggle('hidden',      m !== 'quiz');
  sprintControls.classList.toggle('hidden',    true);  // Sprint hidden permanently
  recallControls.classList.toggle('hidden',    true);  // Recall hidden permanently
  sentencesControls.classList.toggle('hidden', m !== 'sentences');

  // Show/hide the main view containers
  flashView.classList.toggle('hidden',      !isFlash || state.view === 'tables');
  quizView.classList.toggle('hidden',       m !== 'quiz');
  sprintView.classList.toggle('hidden',     true);   // Sprint hidden permanently
  recallView.classList.toggle('hidden',     true);   // Recall hidden permanently
  tableView.classList.toggle('hidden',      !isFlash || state.view !== 'tables');

  // Tables button only makes sense for flash modes
  btnTables.classList.toggle('hidden', !isFlash);
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
    state.deck = buildKanaDeck(state.script, state.dakuten, state.yoon, state.kanaRows);
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
  } else if (state.globalMode === 'vocab') {
    state.deck = buildVocabDeck(state.vocabScope, state.vocabOrder);
    buildQueue();
    syncModeUI(); updateNumUI();
  } else if (state.globalMode === 'verbs') {
    state.deck = buildVerbDeck(state.verbScope, state.verbForms, state.verbOrder);
    buildQueue();
    syncModeUI(); updateNumUI();
  } else if (state.globalMode === 'kanji') {
    state.deck = buildKanjiDeck(state.kanjiFront, state.kanjiOrder);
    buildQueue();
    syncModeUI(); updateNumUI();
  } else if (state.globalMode === 'quiz') {
    syncModeUI();
    startQuiz();
    updateStat();
    return;
  } else if (state.globalMode === 'sprint') {
    syncModeUI();
    initSprint();
    updateStat();
    return;
  } else if (state.globalMode === 'recall') {
    syncModeUI();
    startRecall();
    updateStat();
    return;
  } else if (state.globalMode === 'sentences') {
    _sentDeck = buildSentDeck();
    _sentIdx = 0; _sentRevealed = false;
    state.known = 0; state.attempts = 0;
    syncModeUI();
    showSentence();
    updateStat();
    return;
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
                 || (state.globalMode === 'calendar' && state.calOrder === 'random')
                 || (state.globalMode === 'vocab' && state.vocabOrder === 'random')
                 || (state.globalMode === 'verbs' && state.verbOrder === 'random');
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

    if      (state.globalMode === 'kana')     renderKanaCard(entry);
    else if (state.globalMode === 'numbers')  renderNumberCard(entry);
    else if (state.globalMode === 'time')     renderTimeCard(entry);
    else if (state.globalMode === 'calendar') renderCalendarCard(entry);
    else if (state.globalMode === 'vocab')    renderVocabCard(entry);
    else if (state.globalMode === 'verbs')    renderVerbCard(entry);
    else if (state.globalMode === 'kanji')    renderKanjiCard(entry);

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
    const s = document.createElement('span'); s.className='easter-egg jackpot'; s.innerHTML='🎰 Jackpot!<br>ジャックポット！'; cardAnswer.appendChild(s);
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

  const lang    = state.calMeaningLang;
  const meaning = lang === 'en' ? entry.en : lang === 'ru' ? entry.ru : null;

  // ── COMBO types: wd_days и days_months ──
  if (entry.type === 'combo_wd_day' || entry.type === 'combo_day_mo') {
    // Front: всегда kanji (или по выбору, но kanji наиболее понятен для связки)
    let sFront = state.calShowFront;
    if (sFront === 'mixed') sFront = ['kanji','hira','romaji'][Math.floor(Math.random()*3)];
    if (sFront === 'meaning') sFront = 'kanji';

    if (sFront === 'kanji') {
      cardFront.classList.add('cal-combo-kanji');
      // Красивый двухстрочный фронт
      const line1 = document.createElement('span');
      const line2 = document.createElement('span');
      if (entry.type === 'combo_wd_day') {
        line1.textContent = entry.weekday.kanji;  // 火曜日
        line2.textContent = entry.day.kanji;       // 4日
      } else {
        line1.textContent = entry.month.kanji;     // 三月
        line2.textContent = entry.day.kanji;        // 5日
      }
      line1.className = 'combo-line-1';
      line2.className = 'combo-line-2';
      cardFront.append(line1, line2);
    } else if (sFront === 'hira') {
      cardFront.classList.add('cal-hira-prompt');
      cardFront.textContent = entry.hira;
    } else {
      cardFront.classList.add('cal-romaji-prompt');
      cardFront.textContent = entry.romaji;
    }

    // Answer
    cardAnswer.innerHTML = '';

    // 🥚 Easter egg for combo_day_mo (знаем и месяц и день)
    if (entry.type === 'combo_day_mo') {
      const egg = getCalEgg(entry.month.n, entry.day.n);
      if (egg) {
        const s = document.createElement('span'); s.className='easter-egg'; s.textContent=egg; cardAnswer.appendChild(s);
        return;
      }
    }

    const ansLines = [
      { cls:'ans-kanji',  text: entry.kanji,  skip: sFront==='kanji' },
      { cls:'ans-hira',   text: entry.hira,   skip: sFront==='hira' },
      { cls:'ans-romaji', text: entry.romaji, skip: sFront==='romaji' },
    ];
    if (meaning) ansLines.push({ cls:'ans-meaning', text: meaning, skip: sFront==='meaning' });
    ansLines.forEach(l => {
      if (l.skip || !l.text) return;
      const s = document.createElement('span'); s.className=l.cls; s.textContent=l.text; cardAnswer.appendChild(s);
    });
    return;
  }

  // ── Regular single entry ──
  let sFront = state.calShowFront;
  if (sFront === 'mixed') {
    const opts = ['kanji','hira','romaji'];
    if (meaning) opts.push('meaning');
    sFront = opts[Math.floor(Math.random() * opts.length)];
  }
  if (sFront === 'meaning' && !meaning) sFront = 'kanji';

  if (sFront === 'kanji') {
    cardFront.classList.add('cal-kanji-prompt');
    cardFront.textContent = entry.kanji;
  } else if (sFront === 'hira') {
    cardFront.classList.add('cal-hira-prompt');
    cardFront.textContent = entry.hira;
  } else if (sFront === 'romaji') {
    cardFront.classList.add('cal-romaji-prompt');
    cardFront.textContent = entry.romaji;
  } else {
    cardFront.classList.add('cal-meaning-prompt');
    cardFront.textContent = meaning;
  }

  cardAnswer.innerHTML = '';
  const lines = [
    { cls:'ans-kanji',  text: entry.kanji,  skip: sFront==='kanji'  },
    { cls:'ans-hira',   text: entry.hira,   skip: sFront==='hira'   },
    { cls:'ans-romaji', text: entry.romaji, skip: sFront==='romaji' },
    { cls:'ans-meaning',text: meaning,      skip: sFront==='meaning' || !meaning },
  ];
  lines.forEach(l => {
    if (l.skip || !l.text) return;
    const s = document.createElement('span'); s.className=l.cls; s.textContent=l.text; cardAnswer.appendChild(s);
  });

  if (entry.ex) {
    const badge = document.createElement('span');
    badge.className = 'exc-badge';
    badge.textContent = '⚠ 例外';
    cardAnswer.appendChild(badge);
  }

  // 🥚 Calendar easter eggs (одиночные day — проверяем реальный текущий месяц)
  if (entry.type === 'day') {
    const realMonth = new Date().getMonth() + 1;
    const egg = getCalEgg(realMonth, entry.n);
    if (egg) {
      cardAnswer.innerHTML = '';
      const s = document.createElement('span'); s.className='easter-egg'; s.textContent = egg; cardAnswer.appendChild(s);
    }
  }
}

/* ── Vocab card ── */
function renderVocabCard(entry) {
  actionsRow.classList.remove('hidden');
  choicesRow.classList.add('hidden');

  // front: 'native' (native lang → JP) or 'jp' (JP → native)
  const front = state.vocabFront;
  const isJpFront = front === 'jp';
  const nativeTxt = state.uiLang === 'en' ? entry.en : entry.ru;
  const otherTxt  = state.uiLang === 'en' ? entry.ru : entry.en;

  cardAnswer.innerHTML = '';
  cardFront.innerHTML  = '';

  if (!isJpFront) {
    // Front: native language word
    cardFront.classList.add('vocab-meaning-prompt');
    cardFront.textContent = nativeTxt;
    // Answer: Japanese + romaji
    const jpSpan = document.createElement('span');
    jpSpan.className = entry.script === 'k' ? 'ans-vocab-kata' : 'ans-vocab-hira';
    jpSpan.textContent = entry.jp;
    cardAnswer.appendChild(jpSpan);
    const romaSpan = document.createElement('span');
    romaSpan.className = 'ans-romaji';
    romaSpan.textContent = entry.romaji;
    cardAnswer.appendChild(romaSpan);
    // Show the other language too
    const otherSpan = document.createElement('span');
    otherSpan.className = 'ans-meaning';
    otherSpan.textContent = otherTxt;
    cardAnswer.appendChild(otherSpan);
  } else {
    // Front: Japanese word
    cardFront.classList.add(entry.script === 'k' ? 'vocab-kata-prompt' : 'vocab-hira-prompt');
    cardFront.textContent = entry.jp;
    // Answer: native meaning + romaji + other language
    const mainSpan = document.createElement('span');
    mainSpan.className = 'ans-vocab-meaning-main';
    mainSpan.textContent = nativeTxt;
    cardAnswer.appendChild(mainSpan);
    const romaSpan = document.createElement('span');
    romaSpan.className = 'ans-romaji';
    romaSpan.textContent = entry.romaji;
    cardAnswer.appendChild(romaSpan);
    const otherSpan = document.createElement('span');
    otherSpan.className = 'ans-meaning';
    otherSpan.textContent = otherTxt;
    cardAnswer.appendChild(otherSpan);
  }

  // Script badge
  if (entry.script === 'k') {
    const badge = document.createElement('span');
    badge.className = 'script-badge katakana-badge';
    badge.textContent = 'カタカナ';
    cardAnswer.appendChild(badge);
  }
}

/* ── Verb card ── */
function renderVerbCard(entry) {
  actionsRow.classList.remove('hidden');
  choicesRow.classList.add('hidden');

  // front: 'native' (native lang → JP) or 'jp' (JP → native)
  const front = state.verbFront;
  const isJpFront = front === 'jp';
  const nativeTxt = state.uiLang === 'en' ? entry.en : entry.ru;
  const otherTxt  = state.uiLang === 'en' ? entry.ru : entry.en;
  // Form label uses T() so it matches current UI language
  const formLabel = T('vf_' + entry.verbKey);

  cardAnswer.innerHTML = '';
  cardFront.innerHTML  = '';

  if (isJpFront) {
    // Front: Japanese verb form + form tag
    cardFront.classList.add('verb-jp-prompt');
    const verbSpan = document.createElement('span');
    verbSpan.className = 'verb-jp-main';
    verbSpan.textContent = entry.jp;
    const formTag = document.createElement('span');
    formTag.className = 'verb-form-tag';
    formTag.textContent = formLabel;
    cardFront.append(verbSpan, formTag);

    // Answer: native meaning + romaji + other lang
    const mainSpan = document.createElement('span');
    mainSpan.className = 'ans-vocab-meaning-main';
    mainSpan.textContent = nativeTxt;
    cardAnswer.appendChild(mainSpan);
    const romaSpan = document.createElement('span');
    romaSpan.className = 'ans-romaji';
    romaSpan.textContent = entry.romaji;
    cardAnswer.appendChild(romaSpan);
    const otherSpan = document.createElement('span');
    otherSpan.className = 'ans-meaning';
    otherSpan.textContent = otherTxt;
    cardAnswer.appendChild(otherSpan);
  } else {
    // Front: native meaning + form tag
    cardFront.classList.add('verb-meaning-prompt');
    const meanSpan = document.createElement('span');
    meanSpan.className = 'verb-meaning-main';
    meanSpan.textContent = nativeTxt;
    const formTag = document.createElement('span');
    formTag.className = 'verb-form-tag';
    formTag.textContent = formLabel;
    cardFront.append(meanSpan, formTag);

    // Answer: Japanese verb form + romaji + other lang
    const jpSpan = document.createElement('span');
    jpSpan.className = 'ans-vocab-hira';
    jpSpan.textContent = entry.jp;
    cardAnswer.appendChild(jpSpan);
    const romaSpan = document.createElement('span');
    romaSpan.className = 'ans-romaji';
    romaSpan.textContent = entry.romaji;
    cardAnswer.appendChild(romaSpan);
    const otherSpan = document.createElement('span');
    otherSpan.className = 'ans-meaning';
    otherSpan.textContent = otherTxt;
    cardAnswer.appendChild(otherSpan);
  }
}

/* ── Choice buttons (kana reverse) ── */
// Категории карточек для пула вариантов в обратном квизе:
// 'yoon'   — йоны: きゃ しゅ ちょ…                   (ромадзи 3+ символа, не x, не исключение)
// 'basic'  — всё остальное
// Базовые каны с 3-символьным ромадзи (shi, chi, tsu, fu — НЕ йоны):
const BASIC_LONG = new Set(['shi','chi','tsu','fu']);
function kanaCategory(e) {
  if (!e) return 'basic';
  if (e._yoonBase) return 'yoon_' + e._yoonBase;  // e.g. 'yoon_gi', 'yoon_ki'
  const r = kanaRomajiLabel(e);
  if (r.length >= 3 && !BASIC_LONG.has(r)) return 'yoon_unknown';
  return 'basic';
}

function buildChoiceButtons(entry) {
  const cat = kanaCategory(entry);
  // Варианты — только из той же базы (yoon_gi → только gya/gyu/gyo)
  let pool = state.deck.filter(e => e !== entry && kanaCategory(e) === cat);
  // Fallback 1: все йоны (если в базе только 2 карточки и choicesN > 3)
  if (pool.length < state.choicesN - 1 && cat.startsWith('yoon_')) {
    pool = state.deck.filter(e => e !== entry && kanaCategory(e).startsWith('yoon_'));
  }
  // Fallback 2: полный пул
  if (pool.length < state.choicesN - 1) pool = state.deck.filter(e => e !== entry);
  const shuf = [...pool]; shuffle(shuf);
  const picks = shuf.slice(0, state.choicesN - 1);
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
    if (state.globalMode === 'sentences') _sentRevealed = true;
    cardAnswer.classList.add('shown');
    state.attempts++;
    updateStat();
  } else {
    cardAnswer.classList.remove('shown');
    state.revealed = false;
    if (state.globalMode === 'sentences') _sentRevealed = false;
  }
}

function doAgain() {
  if (state.globalMode === 'sentences') {
    state.attempts++;
    // Push current item a few spots ahead so it comes back
    const cur = _sentDeck.splice(_sentIdx, 1)[0];
    const at  = Math.min(_sentIdx + 5, _sentDeck.length);
    _sentDeck.splice(at, 0, cur);
    _sentRevealed = false;
    showSentence();
    updateStat();
    return;
  }
  state.attempts++; pushAgain(); updateStat(); showCard();
}
function doKnown() {
  if (state.globalMode === 'sentences') {
    state.known++; state.attempts++;
    _sentIdx++;
    _sentRevealed = false;
    showSentence();
    updateStat();
    return;
  }
  state.known++; state.attempts++; advance(); updateStat(); showCard();
}

/* ═══════════════════════════════════════════════════════════
   SECTION 12 — VIEW TOGGLE
   ═══════════════════════════════════════════════════════════ */

function toggleView() {
  if (state.view === 'flash') {
    state.view = 'tables';
    flashView.classList.add('hidden');
    tableView.classList.remove('hidden');
    btnTables.textContent = T('flashcards_btn');
    renderTable();
  } else {
    state.view = 'flash';
    tableView.classList.add('hidden');
    flashView.classList.remove('hidden');
    btnTables.textContent = T('tables_btn');
    showCard();
  }
}

function applyStartView() {
  if (state.startView === 'tables') {
    state.view = 'tables';
    flashView.classList.add('hidden');
    tableView.classList.remove('hidden');
    btnTables.textContent = T('flashcards_btn');
  } else {
    state.view = 'flash';
    flashView.classList.remove('hidden');
    tableView.classList.add('hidden');
    btnTables.textContent = T('tables_btn');
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 13 — TABLE RENDER
   ═══════════════════════════════════════════════════════════ */

function renderTable() {
  if      (state.globalMode === 'kana')     renderKanaTable();
  else if (state.globalMode === 'numbers')  renderNumbersTable();
  else if (state.globalMode === 'time')     renderTimeTable();
  else if (state.globalMode === 'calendar') renderCalendarTable();
  else if (state.globalMode === 'vocab')    renderVocabTable();
  else if (state.globalMode === 'verbs')    renderVerbTable();
  else if (state.globalMode === 'kanji')    renderKanjiTable();
}

/* ── Kana table ── */
function renderKanaTable() {
  const showH = state.script !== 'katakana';
  const showK = state.script !== 'hiragana';
  tableTitle.textContent =
    state.script==='hiragana' ? T('tbl_hiragana') :
    state.script==='katakana' ? T('tbl_katakana') :
    T('tbl_kana');

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
  tableTitle.textContent = T('tbl_numbers');
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
  tableTitle.textContent = T('tbl_time');
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
  tableTitle.textContent = T('tbl_calendar');
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

  // ── Section 3: Months — 2 tables of 6 side by side ──
  const moDiv = document.createElement('div');
  moDiv.className = 'cal-section';
  const moTitle = document.createElement('div');
  moTitle.className = 'cal-section-title';
  moTitle.textContent = '月 Months';
  moDiv.appendChild(moTitle);

  const moRow = document.createElement('div');
  moRow.className = 'cal-mo-row';

  function buildMonthTable(moList) {
    const tbl = document.createElement('table');
    tbl.className = 'cal-wd-tbl cal-mo-tbl';
    const thead = tbl.createTHead();
    const hr = thead.insertRow();
    const cols = ['漢字','ひらがな','Romaji'];
    if (lang !== 'off') cols.push(lang === 'ru' ? 'Русский' : 'English');
    cols.forEach(t => { const th=document.createElement('th'); th.textContent=t; hr.appendChild(th); });
    const tbody = tbl.createTBody();
    moList.forEach(mo => {
      const tr = tbody.insertRow();
      const mCells = [`${mo.emoji} ${mo.kanji}（${mo.short}）`, mo.hira, mo.romaji];
      if (lang !== 'off') mCells.push(lang === 'ru' ? mo.ru : mo.en);
      mCells.forEach((txt,i) => {
        const td = tr.insertCell(); td.textContent = txt;
        if (i===0) td.classList.add('cal-wd-head');
      });
    });
    return tbl;
  }

  moRow.appendChild(buildMonthTable(MONTHS.slice(0,6)));
  moRow.appendChild(buildMonthTable(MONTHS.slice(6,12)));
  moDiv.appendChild(moRow);
  wrap.appendChild(moDiv);

  tableScroller.appendChild(wrap);
}

/* ═══════════════════════════════════════════════════════════
   SECTION 14 — HELPERS
   ═══════════════════════════════════════════════════════════ */

function updateStat() {
  statTxt.textContent = `${T('stat_known')}: ${state.known}  ·  ${T('stat_attempts')}: ${state.attempts}  ·  ${T('stat_deck')}: ${state.deck.length}`;
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

/* ── Vocab table ── */
function renderVocabTable() {
  const scope = state.vocabScope;
  const words = scope === 'all' ? VOCAB_DATA : VOCAB_DATA.filter(w => w.group === scope);

  // Group names for display — use T() so they switch with UI lang
  const GROUP_LABELS = {
    lesson1:      T('lesson1'),
    countries:    T('countries'),
    lesson2:      T('lesson2'),
    fruits:       T('fruits'),
    lesson3:      T('lesson3'),
    lesson4:      T('lesson4'),
    family_own:   T('family_own'),
    family_other: T('family_other'),
  };

  tableTitle.textContent = T('tbl_vocab') + ' — ' + (GROUP_LABELS[scope] || T('all_words'));
  tableScroller.innerHTML = '';

  // Group by group key when showing all
  const groups = scope === 'all'
    ? [...new Set(VOCAB_DATA.map(w => w.group))]
    : [scope];

  groups.forEach(g => {
    const groupWords = words.filter(w => w.group === g);
    if (!groupWords.length) return;

    if (scope === 'all') {
      const hdr = document.createElement('div');
      hdr.className = 'vocab-table-group-hdr';
      hdr.textContent = GROUP_LABELS[g] || g;
      tableScroller.appendChild(hdr);
    }

    const table = document.createElement('table');
    table.className = 'vocab-table';
    const thead = table.createTHead();
    const hr = thead.insertRow();
    [T('col_native'), T('col_jp'), T('col_romaji'), T('col_script')].forEach(t => {
      const th = document.createElement('th'); th.textContent = t; hr.appendChild(th);
    });
    const tbody = table.createTBody();
    groupWords.forEach(w => {
      const tr = tbody.insertRow();
      const nativeTxt = state.uiLang === 'en' ? w.en : w.ru;
      const cells = [nativeTxt, w.jp, w.romaji, w.script === 'k' ? 'カタカナ' : 'ひらがな'];
      cells.forEach((txt, i) => {
        const td = tr.insertCell();
        td.textContent = txt;
        if (i === 1) td.className = w.script === 'k' ? 'vocab-cell-kata' : 'vocab-cell-hira';
        if (i === 3) td.className = w.script === 'k' ? 'vocab-script-k' : 'vocab-script-h';
      });
    });
    tableScroller.appendChild(table);
  });
}

/* ── Verb table ── */
function renderVerbTable() {
  const scope = state.verbScope;
  const verbs = scope === 'all' ? VERB_DATA : VERB_DATA.filter(v => v.group === scope);

  tableTitle.textContent = T('tbl_verbs');
  tableScroller.innerHTML = '';

  const VERB_GROUP_LABELS = {
    lesson4:      { ru:'Урок 4 — Ежедневные',   en:'Lesson 4 — Daily routines' },
    lesson5:      { ru:'Урок 5 — Действия',      en:'Lesson 5 — Actions' },
    verbs_motion: { ru:'Движение',               en:'Motion' },
    verbs_daily:  { ru:'Повседневные действия',  en:'Daily actions' },
    verbs_comm:   { ru:'Общение',                en:'Communication' },
  };

  const colHeaders = [
    T('vcol_native'), T('vcol_pres'), T('vcol_past'),
    T('vcol_neg_pres'), T('vcol_neg_past'), T('vcol_let'), T('vcol_romaji'),
  ];

  const groups = scope === 'all'
    ? [...new Set(VERB_DATA.map(v => v.group))]
    : [scope];

  const wrap = document.createElement('div');
  wrap.className = 'verb-table-wrap';

  groups.forEach(g => {
    const groupVerbs = verbs.filter(v => v.group === g);
    if (!groupVerbs.length) return;

    // Group header when showing all
    if (scope === 'all') {
      const hdr = document.createElement('div');
      hdr.className = 'vocab-table-group-hdr';
      const lbl = VERB_GROUP_LABELS[g];
      hdr.textContent = lbl ? (state.uiLang === 'en' ? lbl.en : lbl.ru) : g;
      wrap.appendChild(hdr);
    }

    const table = document.createElement('table');
    table.className = 'verb-table';
    const thead = table.createTHead();
    const hr = thead.insertRow();
    colHeaders.forEach(t => {
      const th = document.createElement('th'); th.textContent = t; hr.appendChild(th);
    });

    const tbody = table.createTBody();
    groupVerbs.forEach(v => {
      const tr = tbody.insertRow();
      const nativeTxt = state.uiLang === 'en' ? v.en : v.ru;
      const cells = [
        nativeTxt,
        v.stem + 'ます',
        v.stem + 'ました',
        v.stem + 'ません',
        v.stem + 'ませんでした',
        v.stem + 'ましょう',
        v.romaji_stem + '-masu',
      ];
      cells.forEach((txt, i) => {
        const td = tr.insertCell();
        td.textContent = txt;
        if (i >= 1 && i <= 5) td.className = 'verb-cell-jp';
        if (i === 3 || i === 4) td.classList.add('verb-cell-neg');
      });
    });

    wrap.appendChild(table);
  });

  tableScroller.appendChild(wrap);
}

/* ═══════════════════════════════════════════════════════════
   SECTION NEW — KANJI MODE
   ═══════════════════════════════════════════════════════════ */

function buildKanjiDeck(front, order) {
  if (typeof KANJI_N5 === 'undefined') return [];
  let deck = KANJI_N5.map(k => ({ ...k, _front: front }));
  if (order === 'random') shuffle(deck);
  return deck;
}

function renderKanjiCard(entry) {
  actionsRow.classList.remove('hidden');
  choicesRow.classList.add('hidden');
  cardFront.innerHTML = '';
  cardAnswer.innerHTML = '';

  const front = entry._front;
  const nativeMeaning = state.uiLang === 'en' ? entry.meaning_en : entry.meaning_ru;

  if (front === 'kanji') {
    cardFront.classList.add('kanji-main-prompt');
    cardFront.textContent = entry.k;

    const mSpan = document.createElement('span'); mSpan.className = 'ans-vocab-meaning-main';
    mSpan.textContent = nativeMeaning; cardAnswer.appendChild(mSpan);
    const onSpan = document.createElement('span'); onSpan.className = 'ans-kanji-on';
    onSpan.textContent = '音: ' + entry.on; cardAnswer.appendChild(onSpan);
    const kunSpan = document.createElement('span'); kunSpan.className = 'ans-kanji-kun';
    kunSpan.textContent = '訓: ' + entry.kun; cardAnswer.appendChild(kunSpan);
    if (entry.ex && entry.ex.length) {
      const exDiv = document.createElement('div'); exDiv.className = 'ans-kanji-ex';
      entry.ex.slice(0,2).forEach(e => {
        const s = document.createElement('span'); s.className = 'ans-kanji-ex-item';
        const exMeaning = state.uiLang === 'en' ? e.en : e.ru;
        s.textContent = `${e.w}【${e.r}】— ${exMeaning}`;
        exDiv.appendChild(s);
      });
      cardAnswer.appendChild(exDiv);
    }
  } else if (front === 'meaning') {
    cardFront.classList.add('vocab-meaning-prompt');
    cardFront.textContent = nativeMeaning;

    const kSpan = document.createElement('span'); kSpan.className = 'kanji-main-answer';
    kSpan.textContent = entry.k; cardAnswer.appendChild(kSpan);
    const onSpan = document.createElement('span'); onSpan.className = 'ans-kanji-on';
    onSpan.textContent = '音: ' + entry.on; cardAnswer.appendChild(onSpan);
    const kunSpan = document.createElement('span'); kunSpan.className = 'ans-kanji-kun';
    kunSpan.textContent = '訓: ' + entry.kun; cardAnswer.appendChild(kunSpan);
  } else if (front === 'on') {
    cardFront.classList.add('vocab-hira-prompt');
    cardFront.textContent = entry.on;
    const kSpan = document.createElement('span'); kSpan.className = 'kanji-main-answer';
    kSpan.textContent = entry.k; cardAnswer.appendChild(kSpan);
    const mSpan = document.createElement('span'); mSpan.className = 'ans-vocab-meaning-main';
    mSpan.textContent = nativeMeaning; cardAnswer.appendChild(mSpan);
    const kunSpan = document.createElement('span'); kunSpan.className = 'ans-kanji-kun';
    kunSpan.textContent = '訓: ' + entry.kun; cardAnswer.appendChild(kunSpan);
  } else { // kun
    cardFront.classList.add('vocab-hira-prompt');
    cardFront.textContent = entry.kun;
    const kSpan = document.createElement('span'); kSpan.className = 'kanji-main-answer';
    kSpan.textContent = entry.k; cardAnswer.appendChild(kSpan);
    const mSpan = document.createElement('span'); mSpan.className = 'ans-vocab-meaning-main';
    mSpan.textContent = nativeMeaning; cardAnswer.appendChild(mSpan);
    const onSpan = document.createElement('span'); onSpan.className = 'ans-kanji-on';
    onSpan.textContent = '音: ' + entry.on; cardAnswer.appendChild(onSpan);
  }
}

function renderKanjiTable() {
  tableTitle.textContent = T('tbl_kanji');
  tableScroller.innerHTML = '';
  if (typeof KANJI_N5 === 'undefined') return;

  const table = document.createElement('table');
  table.className = 'vocab-table kanji-ref-table';
  table.style.tableLayout = 'auto';
  const thead = table.createTHead();
  const hr = thead.insertRow();
  const cols = ['漢字', T('col_native'), '音読み', '訓読み', '例'];
  cols.forEach(t => { const th = document.createElement('th'); th.textContent = t; hr.appendChild(th); });
  const tbody = table.createTBody();
  KANJI_N5.forEach(k => {
    const tr = tbody.insertRow();
    const nativeMeaning = state.uiLang === 'en' ? k.meaning_en : k.meaning_ru;
    const exText = k.ex.slice(0,2).map(e => `${e.w}【${e.r}】`).join('　');
    [k.k, nativeMeaning, k.on, k.kun, exText].forEach((txt, i) => {
      const td = tr.insertCell(); td.textContent = txt;
      if (i === 0) { td.className = 'kanji-ref-char'; }
      if (i === 2 || i === 3) { td.className = 'vocab-cell-hira'; td.style.fontSize = '14px'; }
    });
  });
  tableScroller.appendChild(table);
}

/* ═══════════════════════════════════════════════════════════
   SECTION NEW — QUIZ MODE (multiple choice)
   ═══════════════════════════════════════════════════════════ */

let _quizDeck = [], _quizIdx = 0, _quizCorrect = 0, _quizTotal = 0;

function buildQuizDeck() {
  const src = state.quizSource;
  if (src === 'vocab') {
    return VOCAB_DATA.map(w => ({
      front: w.jp,
      correct: state.uiLang === 'en' ? w.en : w.ru,
      pool: VOCAB_DATA.map(x => state.uiLang === 'en' ? x.en : x.ru),
    }));
  } else if (src === 'kanji' && typeof KANJI_N5 !== 'undefined') {
    return KANJI_N5.map(k => ({
      front: k.k,
      correct: state.uiLang === 'en' ? k.meaning_en : k.meaning_ru,
      pool: KANJI_N5.map(x => state.uiLang === 'en' ? x.meaning_en : x.meaning_ru),
    }));
  } else {
    // verbs — show stem+masu, pick meaning
    const forms = buildVerbDeck(state.verbScope || 'all', { pres:true }, 'random');
    return forms.map(v => ({
      front: v.jp,
      correct: state.uiLang === 'en' ? v.en : v.ru,
      pool: forms.map(x => state.uiLang === 'en' ? x.en : x.ru),
    }));
  }
}

function startQuiz() {
  _quizDeck = buildQuizDeck();
  shuffle(_quizDeck);
  _quizIdx = 0; _quizCorrect = 0; _quizTotal = 0;
  state.deck = _quizDeck; state.known = 0; state.attempts = 0;
  renderQuizCard();
}

function renderQuizCard() {
  if (!_quizDeck.length) return;
  if (_quizIdx >= _quizDeck.length) _quizIdx = 0;
  const item = _quizDeck[_quizIdx];
  const n = parseInt(state.quizChoices) || 4;

  quizPrompt.textContent = item.front;

  // Build choices: 1 correct + (n-1) random wrong
  const pool = [...new Set(item.pool)].filter(x => x !== item.correct);
  shuffle(pool);
  const choices = [item.correct, ...pool.slice(0, n - 1)];
  shuffle(choices);

  quizChoicesGrid.innerHTML = '';
  quizChoicesGrid.dataset.cols = n <= 4 ? '2' : '3';
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'quiz-choice';
    btn.textContent = ch;
    btn.addEventListener('click', () => {
      if (btn.dataset.locked) return;
      quizChoicesGrid.querySelectorAll('.quiz-choice').forEach(b => b.dataset.locked = '1');
      state.attempts++; _quizTotal++;
      if (ch === item.correct) {
        btn.classList.add('correct'); state.known++; _quizCorrect++;
        setTimeout(() => { _quizIdx++; renderQuizCard(); updateStat(); }, 700);
      } else {
        btn.classList.add('wrong');
        quizChoicesGrid.querySelectorAll('.quiz-choice').forEach(b => {
          if (b.textContent === item.correct) b.classList.add('correct');
        });
        setTimeout(() => { _quizIdx++; renderQuizCard(); updateStat(); }, 1200);
      }
      updateStat();
    });
    quizChoicesGrid.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════════════════
   SECTION NEW — SPRINT MODE
   ═══════════════════════════════════════════════════════════ */

let _sprintDeck = [], _sprintIdx = 0, _sprintYes = 0, _sprintNo = 0;

function buildSprintDeck() {
  const src = state.sprintSource;
  if (src === 'kanji' && typeof KANJI_N5 !== 'undefined') {
    return KANJI_N5.map(k => ({
      front: k.k,
      back: (state.uiLang === 'en' ? k.meaning_en : k.meaning_ru) + '\n' + k.on,
    }));
  } else if (src === 'verbs') {
    return buildVerbDeck('all', { pres:true }, 'random').map(v => ({
      front: state.uiLang === 'en' ? v.en : v.ru,
      back: v.jp,
    }));
  } else {
    return VOCAB_DATA.map(w => ({
      front: state.uiLang === 'en' ? w.en : w.ru,
      back: w.jp,
    }));
  }
}

function initSprint() {
  clearInterval(state._sprintTimer);
  state._sprintRunning = false;
  _sprintDeck = buildSprintDeck();
  shuffle(_sprintDeck);
  _sprintIdx = 0; _sprintYes = 0; _sprintNo = 0;
  state.known = 0; state.attempts = 0;

  let timeLeft = parseInt(state.sprintTime) || 60;
  sprintTimer.textContent = timeLeft;
  sprintTimer.className = 'sprint-timer';
  sprintResult.classList.add('hidden');
  sprintScreen.classList.remove('hidden');
  renderSprintCard();

  state._sprintRunning = true;
  state._sprintTimer = setInterval(() => {
    timeLeft--;
    sprintTimer.textContent = timeLeft;
    if (timeLeft <= 10) sprintTimer.classList.add('sprint-timer-warn');
    if (timeLeft <= 0) {
      clearInterval(state._sprintTimer);
      state._sprintRunning = false;
      endSprint();
    }
  }, 1000);
  updateStat();
}

function renderSprintCard() {
  if (!_sprintDeck.length) return;
  if (_sprintIdx >= _sprintDeck.length) { _sprintIdx = 0; shuffle(_sprintDeck); }
  sprintCard.innerHTML = '';
  const item = _sprintDeck[_sprintIdx];
  const front = document.createElement('div'); front.className = 'sprint-front'; front.textContent = item.front;
  const back  = document.createElement('div'); back.className  = 'sprint-back';  back.textContent = item.back;
  sprintCard.appendChild(front);
  sprintCard.appendChild(back);
}

function sprintAnswer(knew) {
  if (!state._sprintRunning) return;
  state.attempts++;
  if (knew) { state.known++; _sprintYes++; } else { _sprintNo++; }
  _sprintIdx++;
  renderSprintCard();
  updateStat();
}

function endSprint() {
  sprintScreen.classList.add('hidden');
  sprintResult.classList.remove('hidden');
  const pct = _sprintYes + _sprintNo > 0 ? Math.round(_sprintYes / (_sprintYes + _sprintNo) * 100) : 0;
  const label = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚';
  sprintResultInner.innerHTML =
    `<div class="sprint-score">${label} ${_sprintYes} / ${_sprintYes + _sprintNo}</div>` +
    `<div class="sprint-pct">${pct}%</div>` +
    `<div class="sprint-detail">${state.uiLang === 'en' ? 'Correct' : 'Верно'}: ${_sprintYes} &nbsp;·&nbsp; ${state.uiLang === 'en' ? 'Wrong' : 'Ошибки'}: ${_sprintNo}</div>`;
}

/* ═══════════════════════════════════════════════════════════
   SECTION NEW — RECALL MODE (type the answer)
   ═══════════════════════════════════════════════════════════ */

let _recallDeck = [], _recallIdx = 0;

function buildRecallDeck() {
  const src = state.recallSource;
  const mode = state.recallMode; // 'romaji' | 'meaning'
  if (src === 'kanji' && typeof KANJI_N5 !== 'undefined') {
    return KANJI_N5.map(k => ({
      prompt: k.k,
      answer: mode === 'romaji' ? k.on.split('・')[0].toLowerCase() : (state.uiLang === 'en' ? k.meaning_en : k.meaning_ru),
      hint: state.uiLang === 'en' ? k.meaning_en : k.meaning_ru,
    }));
  } else {
    return VOCAB_DATA.map(w => ({
      prompt: mode === 'romaji' ? (state.uiLang === 'en' ? w.en : w.ru) : w.jp,
      answer: mode === 'romaji' ? w.romaji : (state.uiLang === 'en' ? w.en : w.ru),
      hint: w.jp,
    }));
  }
}

function startRecall() {
  _recallDeck = buildRecallDeck();
  shuffle(_recallDeck);
  _recallIdx = 0;
  state.known = 0; state.attempts = 0;
  recallFeedback.textContent = '';
  recallFeedback.className = 'recall-feedback';
  recallInput.value = '';
  const ph = state.uiLang === 'en' ? 'Type your answer…' : 'Введите ответ…';
  recallInput.placeholder = ph;
  showRecallCard();
  updateStat();
}

function showRecallCard() {
  if (!_recallDeck.length) return;
  if (_recallIdx >= _recallDeck.length) { _recallIdx = 0; shuffle(_recallDeck); }
  const item = _recallDeck[_recallIdx];
  recallPrompt.textContent = item.prompt;
  recallInput.value = '';
  recallFeedback.textContent = '';
  recallFeedback.className = 'recall-feedback';
  recallInput.focus();
}

function checkRecall() {
  if (!_recallDeck.length) return;
  const item = _recallDeck[_recallIdx];
  const typed = recallInput.value.trim().toLowerCase();
  const expected = item.answer.toLowerCase();
  state.attempts++;

  if (typed === expected || expected.split('/').map(s=>s.trim()).includes(typed)) {
    recallFeedback.textContent = '✓  ' + item.answer;
    recallFeedback.className = 'recall-feedback recall-correct';
    state.known++;
    setTimeout(() => advanceRecall(), 800);
  } else {
    recallFeedback.textContent = '✗  ' + item.answer + (item.hint ? '  (' + item.hint + ')' : '');
    recallFeedback.className = 'recall-feedback recall-wrong';
    recallInput.select();
  }
  updateStat();
}

function advanceRecall() {
  _recallIdx++;
  showRecallCard();
}

/* ═══════════════════════════════════════════════════════════
   SECTION NEW — SENTENCES MODE
   ═══════════════════════════════════════════════════════════ */

const SUBJECTS = [
  { jp:'わたし',     romaji:'watashi',     ru:'Я',      en:'I' },
  { jp:'あなた',     romaji:'anata',       ru:'Ты',     en:'You' },
  { jp:'かれ',       romaji:'kare',        ru:'Он',     en:'He' },
  { jp:'かのじょ',   romaji:'kanojo',      ru:'Она',    en:'She' },
  { jp:'わたしたち', romaji:'watashitachi',ru:'Мы',     en:'We' },
  { jp:'せんせい',   romaji:'sensei',      ru:'Учитель',en:'Teacher' },
  { jp:'ともだち',   romaji:'tomodachi',   ru:'Друг',   en:'Friend' },
];

let _sentDeck = [], _sentIdx = 0, _sentRevealed = false;

function buildSentDeck() {
  const forms = buildVerbDeck(state.sentVerbScope, state.sentForms, 'random');
  if (!forms.length) return [];
  const deck = [];
  forms.forEach(v => {
    const subj = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    deck.push({ subject: subj, verbCard: v });
  });
  shuffle(deck);
  return deck;
}

function startSentences() {
  _sentDeck = buildSentDeck();
  _sentIdx = 0; _sentRevealed = false;
  state.known = 0; state.attempts = 0;
  showSentence();
  updateStat();
}

function showSentence() {
  if (!_sentDeck.length) return;
  if (_sentIdx >= _sentDeck.length) { _sentIdx = 0; shuffle(_sentDeck); }
  const item = _sentDeck[_sentIdx];
  _sentRevealed = false;
  state.revealed = false;

  card.classList.add('fading');
  setTimeout(() => {
    cardAnswer.classList.remove('shown');
    cardAnswer.innerHTML = '';
    cardFront.className  = 'card-face';
    cardFront.innerHTML  = '';

    const subjectNative = state.uiLang === 'en' ? item.subject.en : item.subject.ru;
    const verbNative    = state.uiLang === 'en' ? item.verbCard.en : item.verbCard.ru;
    const formLabel     = T('vf_' + item.verbCard.verbKey);

    // ── FRONT: 100% native language — no Japanese ──
    cardFront.classList.add('verb-meaning-prompt');

    // Subject (native only, smaller)
    const subjectEl = document.createElement('span');
    subjectEl.className = 'sent-subject-native';
    subjectEl.textContent = subjectNative;

    // Verb meaning (native)
    const verbEl = document.createElement('span');
    verbEl.className = 'verb-meaning-main';
    verbEl.textContent = verbNative;

    // Tense tag
    const tagEl = document.createElement('span');
    tagEl.className = 'verb-form-tag';
    tagEl.textContent = formLabel;

    cardFront.append(subjectEl, verbEl, tagEl);

    // ── ANSWER: full Japanese sentence + romaji + tile breakdown ──
    const fullJP = item.subject.jp + 'は ' + item.verbCard.jp;
    const fullR  = item.subject.romaji + ' wa ' + item.verbCard.romaji;

    const jpSpan = document.createElement('span');
    jpSpan.className = 'ans-vocab-hira';
    jpSpan.textContent = fullJP;
    cardAnswer.appendChild(jpSpan);

    const rSpan = document.createElement('span');
    rSpan.className = 'ans-romaji';
    rSpan.textContent = fullR;
    cardAnswer.appendChild(rSpan);

    // Tile breakdown
    const tilesDiv = document.createElement('div');
    tilesDiv.className = 'sent-tiles-inline';
    [
      { jp: item.subject.jp, r: item.subject.romaji, native: subjectNative },
      { jp: 'は', r: 'wa', native: '' },
      { jp: item.verbCard.jp, r: item.verbCard.romaji, native: verbNative },
    ].forEach(t => {
      const tile = document.createElement('div');
      tile.className = 'sent-tile';
      tile.innerHTML =
        `<span class="sent-tile-jp">${t.jp}</span>` +
        `<span class="sent-tile-r">${t.r}</span>` +
        (t.native ? `<span class="sent-tile-native">${t.native}</span>` : '');
      tilesDiv.appendChild(tile);
    });
    cardAnswer.appendChild(tilesDiv);

    choicesRow.classList.add('hidden');
    actionsRow.classList.remove('hidden');

    card.classList.remove('fading');
    updateStat();
  }, 160);
}

function revealSentence() {
  // No longer called directly — card click handles reveal via onCardClick
}

function nextSentence() {
  if (_sentRevealed) state.known++;
  _sentIdx++;
  _sentRevealed = false;
  showSentence();
  updateStat();
}

function init() {
  selGlobalMode.value   = state.globalMode;
  selUiLang.value       = state.uiLang;
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
  selCalMeaning.value   = state.calMeaningLang;
  selCalMonthMin.value  = state.calMonthMin;
  selCalMonthMax.value  = state.calMonthMax;
  selVocabScope.value   = state.vocabScope;
  selVocabFront.value   = state.vocabFront;
  selVocabOrder.value   = state.vocabOrder;
  selVerbScope.value    = state.verbScope;
  selVerbFront.value    = state.verbFront;
  selVerbOrder.value    = state.verbOrder;
  optVerbPres.checked   = state.verbForms.pres;
  optVerbPast.checked   = state.verbForms.past;
  optVerbNeg.checked    = state.verbForms.neg_pres;
  optVerbLet.checked    = state.verbForms.let;
  selKanjiFront.value   = state.kanjiFront;
  selKanjiOrder.value   = state.kanjiOrder;
  selQuizSource.value   = state.quizSource;
  selQuizChoices.value  = state.quizChoices;
  selSprintSource.value = state.sprintSource;
  selSprintTime.value   = state.sprintTime;
  selRecallSource.value = state.recallSource;
  selRecallMode.value   = state.recallMode;
  selSentVerbScope.value= state.sentVerbScope;
  optSentPres.checked   = state.sentForms.pres;
  optSentPast.checked   = state.sentForms.past;
  optSentNeg.checked    = state.sentForms.neg_pres;
  optSentLet.checked    = state.sentForms.let;

  updateTimeUI();
  syncModeUI();
  applyI18n();
  restart();
}

init();
applyStartView();
