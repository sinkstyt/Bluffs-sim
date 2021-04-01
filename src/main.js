import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './assets/audio/restaurant.mp3';
import './assets/audio/bell.mp3';
let song = new Audio("assets/audio/restaurant.mp3");
let bell = new Audio("assets/audio/bell.mp3");


$("#play").click(function(event) {
  event.preventDefault();
  song.volume = 0.5;
  song.play();
  song.loop = true;
  bell.currentTime = 0;
});
$("#pause").click(function(event) {
  event.preventDefault();
  song.pause();
});

$("#playbell").click(function(event) {
  event.preventDefault();
  bell.play();
  bell.loop = true;
  bell.currentTime = 0;
});
$("#pausebell").click(function(event) {
  event.preventDefault();
  bell.pause();
});


// Below here, experimenting with Web-Audio-API

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

// select our play button
const playButton = document.querySelector('button#api');

playButton.addEventListener('click', function() {

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // play or pause track depending on state
  if (this.dataset.playing === 'false') {
    audioElement.play();
    this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }

}, false);

audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

const gainNode = audioContext.createGain();

const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
  gainNode.gain.value = this.value;
}, false);

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
  panner.pan.value = this.value;
}, false);

track.connect(gainNode).connect(panner).connect(audioContext.destination);

//Spacialization
const audioCtx = new AudioContext();
const listener = audioCtx.listener;

//listener's position set to emulate someone looking into a room
const posX = window.innerWidth/2;
const posY = window.innerHeight/2;
const posZ = 300;

listener.positionX.value = posX;
listener.positionY.value = posY;
listener.positionZ.value = posZ-5;

//these values set the listener's location as centered in the image and slightly in front of the sound source
listener.forwardX.value = 0;
listener.forwardY.value = 0;
listener.forwardZ.value = -1;
listener.upX.value = 0;
listener.upY.value = 1;
listener.upZ.value = 0;