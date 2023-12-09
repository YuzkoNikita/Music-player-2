let now_playing = document.querySelector('.now-playing');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duraction');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.random-track');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        name: "Strangers",
        artist: "Kenya Grace",
        music :  "music/Kenya Grace - Strangers.mp3"
    },
    {
        name: "Sure Thing",
        artist: "Miguel",
        music :  "music/Miguel – Sure Thing (2).mp3"
    },
    {
        name: "Mentalitue",
        artist: "Baby Gang",
        music :  "music/Baby_Gang_Mentalitue.mp3"
    },
    {
        name: "I Want You",
        artist: "KAIZXKU",
        music :  "music/KAIZXKU feat. Junona Boys & lil asya - I Want You.mp3"
    },
    {
        name: "Cupid",
        artist: "Fifty Fifty",
        music :  "music/1677254464_fftfftcpd.mp3"
    },
    {
        name: "If We Ever Broke Up",
        artist: "Mae Stephens",
        music :  "music/Mae Stephens - If We Ever Broke Up (Official Video) (320 kbps).mp3"
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length; 

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
    randomIcon.innerHTML ='<img class="random-track-image" title="random" src="image/svg/icons8-перемешать-60-роз.png" alt="перемешать">';
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
    randomIcon.innerHTML ='<img class="random-track-image" title="random" src="image/svg/icons8-перемешать-60.png" alt="перемешать">';
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML ='<img class="playplay-track-image" src="image/svg/icons8-пластинка-80-роз.png" id="ctrIcon" alt="перпластинкаемешать">';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<img class="playpause-track-image" src="image/svg/icons8-пластинка-80.png" id="ctrIcon" alt="перпластинкаемешать">';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
    next_btn.innerHTML = '<img class="next-track-image" src="image/svg/icons8-вправо-в-квадрате-100.png" alt="перевправомешать">';
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}


window.onload = function() {
    window.setInterval(function() {
        var date = new Date();

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        var clock = hours + ":" + minutes + ":" + seconds;
        document.getElementById("clock").innerHTML = clock;
    }, 1000
    );
};