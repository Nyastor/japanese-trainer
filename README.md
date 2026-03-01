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

---

## Features

### Flashcards

- Click to reveal answer (kanji → hiragana → romaji → meaning)
- Random or sequential order
- Session stats: known cards and total attempts
- Again / Known flow for spaced repetition

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
- Dual readings:
  - 4 (し / よん)
  - 7 (しち / なな)
  - 9 (く / きゅう)
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
- Combo modes:
  - Weekday + day-of-month
  - Full date (month + day)
- Wraparound month ranges (e.g. October → March)
- Meaning display: English, Russian, or off
- Reference table: weekdays, calendar grid, two-column months

---

## UI / UX

- Auto-hiding topbar — appears on hover
- Persistent ☰ Settings hint in the center top
- Minimal dark glass-morphism interface
- Smooth card fade transitions
- Wallpaper Engine property integration for all settings

---

## Easter Eggs 🥚

(Discover them yourself 👀)

---

## File Structure
index.html — layout and controls
style.css — styling
main.js — logic, data, rendering
project.json — Wallpaper Engine property definitions

---

## Usage

### Wallpaper Engine

Add via **Wallpaper Editor**
 -> Select `Create wallpaper`
   -> Select `index.html`

Or install from the Steam Workshop:  
👉 https://steamcommunity.com/sharedfiles/filedetails/?id=3676193993

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
