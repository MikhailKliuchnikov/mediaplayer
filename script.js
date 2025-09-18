// DOM-elements variables

const btnPlay = document.querySelector('.btn-play');
const btnNext = document.querySelector('.btn-forward');
const btnPrev = document.querySelector('.btn-rewind');
const btnRepeat = document.querySelector('.btn-repeat');
const btnShuffle = document.querySelector('.btn-shuffle');

// Global variables 

let isShuffling = false;
let repeatMode = 'off'; // "off" / "one" / "all"

const tracks = [
    {
        title: 'Specialz',
        artist: 'Jujutsu Kaisen',
        source: "mp3/SPECIALZ__King_Gnu__Jujutsu_Kaisen_Season__OP_FULL_version.mp3",
        cover: "thumbs/specials.jpg"
    }, 
    {
        title: 'Heavy is the crown',
        artist: 'Linkin Park',
        source: "mp3/Heavy Is The Crown.mp3",
        cover: "thumbs/heavy_is_the_crown_thumb.jpg"
    },
    {
        title: 'Awaken',
        artist: 'League of Legends',
        source: "mp3/League of Legends - Awaken.mp3",
        cover: "thumbs/league class.jpeg"
    },
    {
        title: 'Legends never die (remix)',
        artist: 'League of Legends',
        source: "mp3/League of Legends - Legends Never Die - (Remix).mp3",
        cover: "thumbs/league class.jpeg"
    },
    {
        title: 'Legends never die',
        artist: 'League of Legends',
        source: "mp3/League of Legends - Legends Never Die.mp3",
        cover: "thumbs/league class.jpeg"
    },
    {
        title: 'Rise - (remix)',
        artist: 'League of Legends',
        source: "mp3/League of Legends - RISE - Remix.mp3",
        cover: "thumbs/rise.jpg"
    },
    {
        title: 'Rise',
        artist: 'League of Legends',
        source: "mp3/League of Legends - RISE.mp3",
        cover: "thumbs/rise.jpg"
    },
    {
        title: 'Warriors',
        artist: 'League of Legends',
        source: "mp3/League of Legends - Warriors.mp3",
        cover: "thumbs/league class.jpeg"
    },
]

const audio = document.getElementById('audio');
let currentIndex = 0;

function loadTrack(index){
    currentIndex = index;
    const t = tracks[index];
    audio.src = t.source;
    // TODO Update the "now playing" UI here
    // Highlight the active .list-contain here
}