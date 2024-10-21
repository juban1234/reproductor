import { playlists } from './playlists.js';

let currentSongIndex = 0; // Índice de la canción actual
let audioElement; // Declarar audioElement globalmente

function playList(audio) {
    const containerAlbun = document.createElement('div');
    containerAlbun.classList.add('container-album');

    const imgAlbun = document.createElement('img');
    imgAlbun.classList.add('player__img');
    imgAlbun.src = audio.img;
    imgAlbun.alt = audio.title;

    const artisAlbum = document.createElement('h2');
    artisAlbum.textContent = audio.artist;

    const cancionAlbum = document.createElement('h3');
    cancionAlbum.textContent = audio.title;

    audioElement = document.createElement('audio'); // Crear audioElement
    const sourceElement = document.createElement('source');
    sourceElement.src = audio.song;
    sourceElement.type = 'audio/mpeg';
    audioElement.appendChild(sourceElement);
    audioElement.controls = true;

    // Contenedor de controles
    const controls = document.createElement('div');
    controls.classList.add('controls');

    // Crear controles con iconos
    const playerControls = document.createElement('div');
    playerControls.classList.add('player_controls');

    const playButton = document.createElement('i');
    playButton.classList.add('bx', 'bx-play');
    playButton.addEventListener('click', () => audioElement.play());

    const pauseButton = document.createElement('i');
    pauseButton.classList.add('bx', 'bx-pause');
    pauseButton.addEventListener('click', () => audioElement.pause());

    const stopButton = document.createElement('i');
    stopButton.classList.add('bx', 'bx-stop');
    stopButton.addEventListener('click', () => {
        audioElement.pause();
        audioElement.currentTime = 0;
    });

    const rewindButton = document.createElement('i');
    rewindButton.classList.add('bx', 'bx-rewind');
    rewindButton.addEventListener('click', () => audioElement.currentTime -= 10);

    const forwardButton = document.createElement('i');
    forwardButton.classList.add('bx', 'bx-fast-forward');
    forwardButton.addEventListener('click', () => audioElement.currentTime += 10);

    // Botones de anterior y siguiente canción
    const prevButton = document.createElement('i');
    prevButton.classList.add('bx', 'bx-chevron-left');
    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlists.length) % playlists.length;
        loadSong(currentSongIndex);
    });

    const nextButton = document.createElement('i');
    nextButton.classList.add('bx', 'bx-chevron-right');
    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlists.length;
        loadSong(currentSongIndex);
    });

    // Agregar botones a los controles
    playerControls.appendChild(prevButton);
    playerControls.appendChild(rewindButton);
    playerControls.appendChild(playButton);
    playerControls.appendChild(stopButton);
    playerControls.appendChild(pauseButton);
    playerControls.appendChild(forwardButton);
    playerControls.appendChild(nextButton);

    controls.appendChild(playerControls);

    // Agregar todos los elementos al contenedor del álbum
    containerAlbun.appendChild(imgAlbun);
    containerAlbun.appendChild(artisAlbum);
    containerAlbun.appendChild(cancionAlbum);
    containerAlbun.appendChild(audioElement);
    containerAlbun.appendChild(controls);

    // Limpiar el contenedor antes de agregar la nueva canción
    const container = document.getElementById('container-album');
    container.innerHTML = ''; // Eliminar contenido anterior
    container.appendChild(containerAlbun);
}

// Función para cargar la canción
function loadSong(index) {
    const audioData = playlists[index];
    playList(audioData);
}

function albunes() {
    loadSong(currentSongIndex); // Cargar solo la primera canción al inicio
}

window.addEventListener('DOMContentLoaded', albunes);
