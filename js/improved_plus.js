/*            Author: Richard Myatt
              Date: 2 June 2019

              An improved monophonic keyboard
*/


/*                   WEB SOUND API                     */

var osc, gainNode, audioContext, AudioContext;
var oscType = "sine";
var playing = false;

var notes = {
  "C4"   : 261.626,           // middle C
  "Csh4" : 277.183,
  "D4"   : 293.665,
  "Dsh4" : 311.127,
  "E4"   : 329.628,
  "F4"   : 349.228,
  "Fsh4" : 369.994,
  "G4"   : 391.995,
  "Gsh4" : 415.305,
  "A4"   : 400.000,
  "Ash4" : 466.164,
  "B4"   : 493.883,
  "C5"   : 523.251             // Tenor C
};

function initializeOscillator() {
  // establish the audio context
  AudioContext = window.AudioContext || windown.webkitAudioContext;
  audioContext = new AudioContext();

  osc          = audioContext.createOscillator();
  gainNode = audioContext.createGain();
  osc.type         = oscType;
  osc.frequency.value = 200;
  gainNode.gain.value = 0;
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  osc.start(0);
}

initializeOscillator();


/*               DOM REFERENCE AND EVENT LISTENERS            */

// obtain references to the dom
var keys = document.querySelector("#keyboard8");

// add mouse events
keys.addEventListener("mousedown", playNote);
keys.addEventListener("mouseup", endNote);
keys.addEventListener("mouseover", changeBg);
keys.addEventListener("mouseout", reset);

// add touch event listeners
keys.addEventListener("touchstart", touchPlayNote);
keys.addEventListener("touchend", touchEndNote);


/*                   EVENT HANDLERS                        */

function playNote(e) {
  var keyId = e.target.id;
  if(!playing) {
    osc.frequency.value = notes[e.target.id];
    gainNode.gain.value =1;

    e.target.style.fill = "yellow";
    playing = true;
  }
}

function endNote(e) {
  gainNode.gain.value = 0;
  if(e.target.id.length === 2) {
    e.target.style.fill = "#ffffef";
  } else {
    e.target.style.fill = "#222";
  }
  playing = false;
}

function changeBg(e) {
  if(e.target.id.length === 2) {
    e.target.style.fill = "#eee";
  } else {
    e.target.style.fill = "#666";
    e.target.style.stroke = "#666";
  }

}

function reset(e) {
  if(e.target.id.length === 2) {
    e.target.style.fill = "#ffffef";
  } else {
    e.target.style.fill = "#222";
    e.target.style.stroke = "#222";
  }
}

function touchPlayNote(e) {
  e.preventDefault();
  playNote(e);
}

function touchEndNote(e) {
  e.preventDefault();
  endNote(e);
}
