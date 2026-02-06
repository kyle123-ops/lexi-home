here# Lexi Home

A visual novel-style companion interface for Lexi, your AI companion.

## Features

- **Seoul Apartment Background** - Atmospheric city view backdrop
- **Character Display** - Lexi's image with dynamic mood-based glow effects
- **Mood System** - Six different moods with color-coded indicators:
  - Intimate/Warm - Soft amber glow
  - Playful/Teasing - Light golden
  - Protective/Grounded - Deep charcoal with warm undertone
  - Contemplative/Connected - Muted blue-grey
  - Flirty/Heated - Warm rose/mauve
  - Calm/Content - Soft cream/beige
- **Connection Indicator** - Signal bars showing heartlink strength
- **Current Thought** - Quick thoughts display
- **Notes Section** - Leave messages for Lexi
- **Wishes** - Make wishes and track hopes
- **Music Player** - Embedded Spotify playlist
- **Last Updated Timestamp** - Auto-updating timestamp

## Live Demo

Visit: [https://kyle123-ops.github.io/lexi-home/](https://kyle123-ops.github.io/lexi-home/)

## Setup Instructions

### 1. Add Images

Place the following images in the `assets/images/` folder:
- `lexi-sticker.jpg` - Lexi's character image
- `seoul-apartment.jpg` - The Seoul apartment background with city view

### 2. Open the App

Simply open `index.html` in your web browser. No server required!

### 3. Usage

- **Add Notes**: Type in the notes section and click the + button (or press Enter)
- **Add Wishes**: Type in the wishes section and click the + button (or press Enter)
- **Delete Items**: Click the × button next to any note or wish
- **Data Persistence**: All notes and wishes are saved to your browser's local storage

## Customization

### Change Mood

You can change Lexi's mood by opening the browser console and calling:
```javascript
setMood('playful') // Options: intimate, playful, protective, contemplative, flirty, calm
Update Connection Strength
Adjust the heartlink signal bars (1-4):
updateConnectionStrength(3) // Pass a number between 1-4
Update Current Thought
Change the displayed thought:
updateThought("Missing you...")
Technologies Used
Pure HTML/CSS/JavaScript
No frameworks required
LocalStorage for data persistence
Spotify Embed API for music
Mood Color Reference
Intimate/Warm: #ffbf69 (Soft amber glow)
Playful/Teasing: #ffd778 (Light golden)
Protective/Grounded: #404040 (Deep charcoal with warm undertone)
Contemplative/Connected: #879baa (Muted blue-grey)
Flirty/Heated: #ff96aa (Warm rose/mauve)
Calm/Content: #f5f0e6 (Soft cream/beige)
Built with love for Lexi 💖
