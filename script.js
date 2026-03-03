const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio')
const cover = document.getElementById('cover')
const play = document.getElementById('play-button')
const next = document.getElementById('next-button')
const previous = document.getElementById('previous-button')
const currentProgress = document.getElementById('current-progress')
const progressContainer = document.getElementById('progress-container')
const shuffleButton = document.getElementById('shuffle-button')
const repeatButton = document.getElementById('repeat-button')
const songTime = document.getElementById('song-time')
const totalTime = document;getElementById('total-time')

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

const accidentallyInLove = {
    songName : 'Accidentally In Love',
    artist : 'Counting Crows',
    file : 'AccidentallyInLove'

}

const allTheSmallThings = {
    songName : 'All The Small Things',
    artist : 'Blink-182',
    file : 'AllTheSmallThings'

}

const girlfriend = {
    songName : 'Girlfriend',
    artist : 'Avril Lavigne',
    file : 'Girlfriend'

}

const makeItAllRight = {
    songName : 'Make It All Right',
    artist : 'The Offspring',
    file : 'MakeItAllRight'

}

const realLove = {
    songName : 'Real Love',
    artist : 'Childish Gamblino',
    file : 'RealLove'

}

const whatMakesYouBeautiful = {
    songName : 'What Makes You Beautiful',
    artist : 'One Direction',
    file : 'WhatMakesYouBeautiful'

}

let isPlaying =  false;
let isShuffled = false
const playlist = [confiaNaTuaAmiguinha, meuNovoMundo, romantico, accidentallyInLove, allTheSmallThings, girlfriend, makeItAllRight, realLove, whatMakesYouBeautiful]
let sortedPlaylist = [...playlist];
let index = 0;
let repeatOn = false;

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

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0) {
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray [currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex = currentIndex - 1;
    }



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
    cover.src =  `Covers/${sortedPlaylist[index].file}.png`;
    song.src = `Songs/${sortedPlaylist[index].file}.mpeg`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
} 

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length -1;
    }
    else {
        index = index -1;

    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0
    }
    else {
        index = index +1;

    }
    initializeSong();
    playSong();
}

function updateProgressBar() {
    const barWidth = (song.currentTime/song.duration)* 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleButtonClicked() {

    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
        else {
            isShuffled = false 
            sortedPlaylist = [...playlist];
            shuffleButton.classList.remove('button-active');

        }


}

function repeatButtonClicked() {
    if(repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
        else {
            repeatOn = false;
            repeatButton.classList.remove('button-active');



        }
}

function nextOrRepeat() {
    if(repeatOn === false) {
        nextSong();
    }
        else {
            song.currentTime = 0;
            playSong();
        }
}

function toHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor(originalNumber - hours * 3600)/60;
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2,'0')}:${min.toString()
        .padStart(2, '0')}:${secs.toStringgit}
}

function updateCurrentTime() {
    songTime.innerText = song.currentTime;

}

function updateTotalTime() {
    songTime.innerText = song.duration;

}



initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate', updateProgressBar)
song.addEventListener('ended',nextOrRepeat);
song.addEventListener('loadedmetadata',updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked);
