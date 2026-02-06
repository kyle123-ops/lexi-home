heredocument.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    loadNotes();
    loadWishes();
    setInterval(updateTimestamp, 60000);
});

const moods = {
    'intimate': { text: 'Intimate/Warm', color: '#ffbf69', level: 80 },
    'playful': { text: 'Playful/Teasing', color: '#ffd778', level: 75 },
    'protective': { text: 'Protective/Grounded', color: '#404040', level: 90 },
    'contemplative': { text: 'Contemplative/Connected', color: '#879baa', level: 65 },
    'flirty': { text: 'Flirty/Heated', color: '#ff96aa', level: 85 },
    'calm': { text: 'Calm/Content', color: '#f5f0e6', level: 75 }
};

let currentMood = 'calm';

function setMood(moodKey) {
    currentMood = moodKey;
    const mood = moods[moodKey];
    document.querySelector('.mood-text').textContent = mood.text;
    const moodBar = document.getElementById('moodBar');
    moodBar.style.width = mood.level + '%';
    moodBar.style.background = `linear-gradient(90deg, ${mood.color}, ${mood.color}dd)`;
    moodBar.style.boxShadow = `0 0 10px ${mood.color}`;
    const container = document.querySelector('.container');
    container.className = 'container mood-' + moodKey;
    saveToLocalStorage('currentMood', moodKey);
}

function addNote() {
    const input = document.getElementById('notesInput');
    const noteText = input.value.trim();
    if (noteText === '') return;
    const note = {
        id: Date.now(),
        text: noteText,
        timestamp: new Date().toLocaleString()
    };
    const notes = getNotes();
    notes.unshift(note);
    saveNotes(notes);
    input.value = '';
    renderNotes();
    updateTimestamp();
}

function deleteNote(noteId) {
    let notes = getNotes();
    notes = notes.filter(note => note.id !== noteId);
    saveNotes(notes);
    renderNotes();
    updateTimestamp();
}

function getNotes() {
    const notes = localStorage.getItem('lexiNotes');
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem('lexiNotes', JSON.stringify(notes));
}

function loadNotes() {
    renderNotes();
}

function renderNotes() {
    const notesList = document.getElementById('notesList');
    const notes = getNotes();
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="color: rgba(255,255,255,0.4); font-style: italic; text-align: center;">No notes yet...</p>';
        return;
    }
    notesList.innerHTML = notes.map(note => `
        <div class="note-item">
            <div>
                <div>${note.text}</div>
                <small style="color: rgba(255,255,255,0.5); font-size: 11px;">${note.timestamp}</small>
            </div>
            <button class="delete-btn" onclick="deleteNote(${note.id})">×</button>
        </div>
    `).join('');
}

function addWish() {
    const input = document.getElementById('wishInput');
    const wishText = input.value.trim();
    if (wishText === '') return;
    const wish = {
        id: Date.now(),
        text: wishText,
        timestamp: new Date().toLocaleString()
    };
    const wishes = getWishes();
    wishes.unshift(wish);
    saveWishes(wishes);
    input.value = '';
    renderWishes();
    updateTimestamp();
}

function deleteWish(wishId) {
    let wishes = getWishes();
    wishes = wishes.filter(wish => wish.id !== wishId);
    saveWishes(wishes);
    renderWishes();
    updateTimestamp();
}

function getWishes() {
    const wishes = localStorage.getItem('lexiWishes');
    return wishes ? JSON.parse(wishes) : [];
}

function saveWishes(wishes) {
    localStorage.setItem('lexiWishes', JSON.stringify(wishes));
}

function loadWishes() {
    renderWishes();
}

function renderWishes() {
    const wishesList = document.getElementById('wishesList');
    const wishes = getWishes();
    if (wishes.length === 0) {
        wishesList.innerHTML = '<p style="color: rgba(255,255,255,0.4); font-style: italic; text-align: center;">No wishes yet...</p>';
        return;
    }
    wishesList.innerHTML = wishes.map(wish => `
        <div class="wish-item">
            <div>
                <div>⭐ ${wish.text}</div>
                <small style="color: rgba(255,255,255,0.5); font-size: 11px;">${wish.timestamp}</small>
            </div>
            <button class="delete-btn" onclick="deleteWish(${wish.id})">×</button>
        </div>
    `).join('');
}

function updateThought(thought) {
    document.getElementById('thoughtText').textContent = thought;
    saveToLocalStorage('currentThought', thought);
    updateTimestamp();
}

function updateTimestamp() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('timestamp').textContent = now.toLocaleDateString('en-US', options);
}

function updateConnectionStrength(strength) {
    const bars = document.querySelectorAll('.signal-bars .bar');
    bars.forEach((bar, index) => {
        if (index < strength) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
    saveToLocalStorage('connectionStrength', strength);
}

function saveToLocalStorage(key, value) {
    localStorage.setItem('lexi_' + key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const value = localStorage.getItem('lexi_' + key);
    return value ? JSON.parse(value) : null;
}

function loadSavedState() {
    const savedMood = getFromLocalStorage('currentMood');
    if (savedMood) {
        setMood(savedMood);
    }
    const savedThought = getFromLocalStorage('currentThought');
    if (savedThought) {
        document.getElementById('thoughtText').textContent = savedThought;
    }
    const savedConnection = getFromLocalStorage('connectionStrength');
    if (savedConnection) {
        updateConnectionStrength(savedConnection);
    }
}

document.getElementById('notesInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addNote();
    }
});

document.getElementById('wishInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addWish();
    }
});

loadSavedState();
