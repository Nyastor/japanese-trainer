# Kana Night — Japanese Practice Wallpaper

An interactive wallpaper for learning Japanese, set against a night view of Mount Fuji.  
Originally made for Wallpaper Engine.  
You can also open it in your browser:  
👉 https://able1337.github.io/japanese-trainer/

---

## Overview

Kana Night is a study-focused desktop wallpaper built for Wallpaper Engine.  
It turns your desktop into a passive Japanese learning tool — flashcards and reference tables appear on demand. The rest of the time, it's just a clean, beautiful wallpaper.

**No external libraries. Pure HTML / CSS / JavaScript.**

---

## What You Learn

- 🔤 **Kana** — Hiragana, Katakana, Dakuten, Yōon
- 🔢 **Numbers** — 0–999,999 in kanji, hiragana, romaji
- 🕐 **Time** — Hours, minutes, 午前 / 午後, special phrases
- 📅 **Calendar** — Weekdays, month days (1–31), months
- 📖 **Vocabulary** — Words grouped by lesson topic
- 🔀 **Verbs** — Conjugation in all basic polite forms

---

## Features

### Flashcards

- Click to reveal answer
- Random or sequential order
- Session stats: known cards and total attempts
- Again / Known flow for spaced repetition

### UI Language

- Switch between **RU** and **EN** interface at any time
- All labels, option names, table headers, and card hints update instantly

---

## Modes

### Kana Mode

- Hiragana, Katakana, or both (mixed or side-by-side)
- Optional Dakuten / Handakuten and Yōon (拗音)
- Reverse quiz — romaji prompt with multiple choice buttons
- Full kana reference table with hover highlight

---

### Numbers Mode

- Range presets: units / tens / hundreds / thousands / large (10k–999k)
- Dual readings: 4 (し / よん), 7 (しち / なな), 9 (く / きゅう)
- Irregular readings highlighted: 三百, 六百, 八百, 三千, 八千
- Configurable deck size and custom min/max range

---

### Time Mode

- 24h and 12h formats
- Step options: 1 / 5 / 10 / 15 / 30 minutes
- Range presets: full day, morning, day, evening, night
- 午前 🌙 / 午後 🌞 display with gozen / gogo
- Card front options: time digits, kanji, or hiragana
- Special phrases: 正午, 真夜中, 朝, 夕方, 夜…

---

### Calendar Mode

- Weekdays (月曜日…日曜日) with element emojis 🌙🔥💧🌳✨🌍☀️
- Month days 1–31 with all irregular readings (ついたち, はつか, よっか…)
- Months (一月…十二月) with seasonal emojis
- Combo modes: weekday + day-of-month, full date (month + day)
- Wraparound month ranges (e.g. October → March)
- Meaning display: English, Russian, or off
- Reference table: weekdays, calendar grid, two-column months

---

### Vocabulary Mode 📖

Flashcards for words grouped by lesson. Each card shows a word in your native language — click to reveal the Japanese reading (hiragana or katakana) and romaji.

**Reverse mode** (JP → Native): Japanese word on front, translation on reveal.

**Word groups:**
- Lesson 1 — People (pronouns, professions)
- Countries
- Lesson 2 — Everyday items
- Fruits
- Lesson 3 — Places (locations, buildings)
- Lesson 4 — Time expressions (today, tomorrow, months…)
- Family — own and polite forms

**Reference table** shows all words in the selected group with Japanese, romaji, and script type (ひらがな / カタカナ).

Words are stored in `vocab.csv` — a simple comma-separated file you can edit to add your own vocabulary as you progress through your textbook.

---

### Verbs Mode 🔀

Conjugation practice for Japanese verbs in the polite ます-form style.

Each card shows a verb meaning in your native language with a tense label — you recall the correct Japanese form.

**Tense forms (select any combination):**

| Form | Japanese | Meaning |
|---|---|---|
| Present / Future | Verb + ます | neutral statement or future intent |
| Past | Verb + ました | completed action |
| Negative present | Verb + ません | negation |
| Negative past | Verb + ませんでした | past negation |
| Let's… | Verb + ましょう | invitation / suggestion |

**Reverse mode** (JP → Native): Japanese verb form on front, meaning on reveal.

**Verb groups:**
- Lesson 4 — core daily verbs (wake up, sleep, work, study…)
- Lesson 5 — action and movement verbs (go, come, eat, drink, read…)

**Reference table** shows full conjugation for every verb across all five forms.

Verbs are stored in `verbs.csv` — add new verbs as you encounter them in your studies.

---

## Dictionary Files

Two plain-text CSV files serve as the word database. You can edit them in any text editor.

**`vocab.csv`** — vocabulary words:
```
# group, Russian, English, Japanese, romaji, script(h/k)
lesson1,Книга,Book,ほん,hon,h
countries,Япония,Japan,にほん,nihon,h
```

**`verbs.csv`** — verb stems:
```
# group, Russian, English, stem (before ます), romaji stem
lesson5,Читать,To read,よみ,yomi
lesson5,Пить,To drink,のみ,nomi
```

The app builds all conjugated forms automatically from the stem.

---

## UI / UX

- Auto-hiding topbar — appears on hover
- Persistent ☰ Settings hint at the top center
- Minimal dark glass-morphism interface
- Smooth card fade transitions
- UI language toggle (RU / EN) — switches all interface text instantly
- Wallpaper Engine property integration for all settings

---

## Easter Eggs 🥚

(Discover them yourself 👀)

---

## File Structure

```
index.html   — layout and controls
style.css    — styling
main.js      — logic, data, rendering
vocab.csv    — vocabulary word list (editable)
verbs.csv    — verb list (editable)
project.json — Wallpaper Engine property definitions
```

---

## Usage

### Wallpaper Engine

Add via **Wallpaper Editor**
→ Select `Create wallpaper`
→ Select `index.html`

Or install from the Steam Workshop:  
👉 https://steamcommunity.com/sharedfiles/filedetails/?id=3676193993

### Browser

Open `index.html` directly in any modern browser — no server required.  
👉 https://able1337.github.io/japanese-trainer/

### Controls

- Hover the top edge of the screen to open settings
- Click anywhere on the card to reveal the answer
- Use **Again / Known** to track progress
- Use **Tables** to view reference charts

---

## Tech

- Vanilla HTML / CSS / JavaScript — zero dependencies
- Wallpaper Engine Web-type wallpaper
- Tested at 1920×1080 and 2560×1440

---

## AI Usage

This project was partially developed with the assistance of AI tools.

AI was used for:
- brainstorming feature ideas
- refining UX concepts
- improving wording and documentation
- generating structured reference data patterns

---

## License

MIT — free to use, modify and redistribute.  
If you build something based on this, credit is appreciated.
