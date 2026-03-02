const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio')
const cover = document.getElementById('cover')
const play = document.getElementById('play-button')
const next = document.getElementById('next-button')
const previous = document.getElementById('previous-button')


const confiaNaTuaAmiguinha = {
    songName : 'Confia Na Tua Amiguinha',
    artist : 'Mc Don Juan',
    file : 'ConfiaNaTuaAmiguinha'

}

const romantico = {
    songName : 'Romântico',
    artist : 'Henrique e Juliano',
    file : 'Romântico'

}

const meuNovoMundo = {
    songName : 'Meu Novo Mundo',
    artist : 'Charlie Brown Jr',
    file : 'MeuNovoMundo'

}

// ------ Vou adicionar mais músicas aqui -------- //

let isPlaying =  false;
const playlist = [confiaNaTuaAmiguinha, meuNovoMundo, romantico]
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }

}

function initializeSong() {
    cover.src =  `Covers/${playlist[index].file}.png`;
    song.src = `Songs/${playlist[index].file}.mpeg`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
} 

function previousSong() {
    if (index === 0) {
        index = playlist.length -1;
    }
    else {
        index = index -1;

    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === playlist.length - 1) {
        index = 0
    }
    else {
        index = index +1;

    }
    initializeSong();
    playSong();
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);
