// 1. Get DOM elements
const audioPlayer = document.getElementById('audioPlayer');
const trackName = document.getElementById('trackName');
const playButton = document.getElementById('play');
const progressBar = document.getElementById('progress');
const timeDisplay = document.getElementById('time');

// 2. Playlist
const tracks = [
  { name: 'Sample Track 1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Sample Track 2', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Sample Track 3', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
];
let currentTrack = 0;

// 3. Load track
function loadTrack(index) {
  audioPlayer.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
  audioPlayer.load();
  progressBar.value = 0;
  updateTime();
}

// 4. Toggle play/pause
function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    playButton.textContent = 'Play';
  }
}

// 5. Next track
function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  togglePlay();
}

// 6. Previous track
function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  togglePlay();
}

// 7. Update progress and time
function updateTime() {
  const current = Math.floor(audioPlayer.currentTime);
  const duration = Math.floor(audioPlayer.duration || 0);
  const currentMins = Math.floor(current / 60);
  const currentSecs = current % 60;
  const durationMins = Math.floor(duration / 60);
  const durationSecs = duration % 60;
  timeDisplay.textContent = `${currentMins}:${String(currentSecs).padStart(2, '0')} / ${durationMins}:${String(durationSecs).padStart(2, '0')}`;
  progressBar.value = (current / duration) * 100 || 0;
}

// 8. Seek with progress bar
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

// 9. Event listeners
audioPlayer.addEventListener('timeupdate', updateTime);
audioPlayer.addEventListener('ended', nextTrack);

// 10. Initial load
loadTrack(currentTrack);