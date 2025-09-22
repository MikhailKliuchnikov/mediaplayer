// DOM-elements variables

const btnPlay = document.querySelector(".btn-play");
const btnNext = document.querySelector(".btn-forward");
const btnPrev = document.querySelector(".btn-rewind");
const btnRepeat = document.querySelector(".btn-repeat");
const btnShuffle = document.querySelector(".btn-shuffle");

// Player buttons event listeners
// Unite them into a single function?

btnPlay.addEventListener("click", () => {
  if (audio.src === "") {
    loadTrack(currentIndex);
  }
  const icon = btnPlay.querySelector("span");
  if (audio.paused) {
    audio.play();
    icon.innerText = "pause";
    icon.className = "material-icons";
  } else {
    audio.pause();
    icon.innerText = "play_circle_filled";
    icon.className = "material-icons";
  }
});

btnPrev.addEventListener("click", () => {
  goPrev();
});
btnNext.addEventListener("click", () => {
  goNext();
});
btnRepeat.addEventListener("click", () => {
  if (repeatMode === "off") {
    repeatMode = "all";
  } else if (repeatMode === "all") {
    repeatMode = "one";
  } else {
    repeatMode = "off";
  }

  const repeatIcon = btnRepeat.querySelector("span");
  if (repeatMode === "all") {
    repeatIcon.innerText = "repeat";
    repeatIcon.style.color = "white";
  } else if (repeatMode === "one") {
    repeatIcon.innerText = "repeat_one";
    repeatIcon.style.color = "white";
  } else {
    repeatIcon.innerText = "repeat";
    repeatIcon.style.color = "gray";
  }
});
btnShuffle.addEventListener("click", () => {
  isShuffling = !isShuffling;
  if(isShuffling){
    btnShuffle.querySelector("span").style.color = "white";
  } else {
    btnShuffle.querySelector("span").style.color = "gray";
  }
});

// Global variables

let isShuffling = false;
let repeatMode = "off"; // "off" / "one" / "all"
const audio = document.getElementById("audio");
let currentIndex = 0;

// Load track funtion
function loadTrack(index) {
  currentIndex = index;
  const t = tracks[index];
  audio.src = t.source;

  document.querySelectorAll(".list-contain").forEach((el, i) => {
    if (i === index) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
  document.getElementById("active-thumb").src = t.cover;
  document.getElementById("active-songname").innerText = t.title;
  document.getElementById("active-artist").innerText = t.artist;
  audio.play();
}

// Create a song element function
function createSongEl(track) {
  let clone = document.getElementById("songTpl").content.cloneNode(true);

  let thumb = document.createElement("img");
  thumb.src = track.cover;
  clone.querySelector(".list-thumb").appendChild(thumb);

  clone.querySelector(".songname").innerText = track.title;
  clone.querySelector(".artist").innerText = track.artist;

  clone.querySelector(".list-contain").dataset.src = track.source;
  clone.querySelector(".list-contain").dataset.trackIndex = track.trackIndex;

  clone.querySelector(".list-contain").addEventListener("click", (e) => {
    const thisContainer = e.target.closest(".list-contain");
    loadTrack(Number(thisContainer.dataset.trackIndex));
  });
  document.querySelector(".list").appendChild(clone);
}

// Functions for player buttons

function goNext() {
  if (isShuffling) {
    let r;
    do {
      r = Math.floor(Math.random() * tracks.length);
    } while (r === currentIndex && tracks.length > 1);
    loadTrack(r);
  } else {
    const next = (currentIndex + 1) % tracks.length;
    loadTrack(next);
  }
  audio.play();
}

function goPrev() {
  const prev = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(prev);
  audio.play();
}

// When a song ends, repeat mode

audio.addEventListener("ended", () => {
  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === "all") {
    goNext();
  } 
});

// Playing time bar functionality

const timeElStart = document.querySelector(".time span:first-child");
const timeElEnd = document.querySelector(".time span:last-child");
const barContainer = document.querySelector(".timecontain");
const barFill = document.querySelector(".timeshow");

function formatTime(sec) {
  if (!Number.isFinite(sec)) {
    return "0:00";
  }
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
audio.addEventListener("loadedmetadata", () => {
  timeElEnd.textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  timeElStart.textContent = formatTime(audio.currentTime);
  const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
  barFill.style.width = `${ratio * 100}%`; // 
});
barContainer.addEventListener("click", (e) => {
  const rect = barContainer.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  if (audio.duration) {
    audio.currentTime = ratio * audio.duration;
  }
});

// What is loaded on page load

const tracks = [
  {
    title: "Specialz",
    artist: "Jujutsu Kaisen",
    source: "mp3/King_Gnu_-_SPECIALZ_English_cover_(mp3.pm).mp3",
    cover: "thumbs/specials.jpg",
  },
  {
    title: "Heavy is the crown",
    artist: "Linkin Park",
    source: "mp3/Heavy Is The Crown.mp3",
    cover: "thumbs/heavy_is_the_crown_thumb.jpg",
  },
  {
    title: "Awaken",
    artist: "League of Legends",
    source: "mp3/League of Legends - Awaken.mp3",
    cover: "thumbs/league class.jpeg",
  },
  {
    title: "Legends never die (remix)",
    artist: "League of Legends",
    source: "mp3/League of Legends - Legends Never Die - (Remix).mp3",
    cover: "thumbs/league class.jpeg",
  },
  {
    title: "Legends never die",
    artist: "League of Legends",
    source: "mp3/League of Legends - Legends Never Die.mp3",
    cover: "thumbs/league class.jpeg",
  },
  {
    title: "Rise - (remix)",
    artist: "League of Legends",
    source: "mp3/League of Legends - RISE - Remix.mp3",
    cover: "thumbs/rise.jpg",
  },
  {
    title: "Rise",
    artist: "League of Legends",
    source: "mp3/League of Legends - RISE.mp3",
    cover: "thumbs/rise.jpg",
  },
  {
    title: "Warriors",
    artist: "League of Legends",
    source: "mp3/League of Legends - Warriors.mp3",
    cover: "thumbs/league class.jpeg",
  },
  {
    title: "Where our blue is",
    artist: "Tatsuya Kitani",
    source:
      "mp3/Diego_Mitre_Music_-_Jujutsu_Kaisen_Season_2_OP_Ao_no_Sumika_Where_Our_Blue_Is_Orc_(mp3.pm).mp3",
    cover: "thumbs/WhereOurBlueIsNormal.jpg",
  },
];
tracks.forEach((track, index) => {
  track.trackIndex = index;
});
// Load by default
tracks.forEach((t) => {
  createSongEl(t);
});
loadTrack(0);
