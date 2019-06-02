var osc, gainNode, audioContext, AudioContext;
var oscType = "sine";
var playing = false;
var keypressed;
//var firstTime = false;  // has a key been pressed
//var keyref, targetLength;

var notes = {
  "C4"   : 261.626,           // magSq()iddle C
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

// obtaine references to the dom
var keyc4 = document.querySelector("#C4");
var keyd4 = document.querySelector("#D4");
var keye4 = document.querySelector("#E4");
var keyf4 = document.querySelector("#F4");
var keyg4 = document.querySelector("#G4");
var keya4 = document.querySelector("#A4");
var keyb4 = document.querySelector("#B4");
var keyc5 = document.querySelector("#C5");

var keycsh4 = document.querySelector("#Csh4");
var keydsh4 = document.querySelector("#Dsh4");
var keyfsh4 = document.querySelector("#Fsh4");
var keygsh4 = document.querySelector("#Gsh4");
var keyash4 = document.querySelector("#Ash4");

// add mousedown and mouseup event listeners
keyc4.addEventListener("mousedown", playNote);
keyc4.addEventListener("mouseup", endNote);
keyd4.addEventListener("mousedown", playNote);
keyd4.addEventListener("mouseup", endNote);
keye4.addEventListener("mousedown", playNote);
keye4.addEventListener("mouseup", endNote);
keyf4.addEventListener("mousedown", playNote);
keyf4.addEventListener("mouseup", endNote);
keyg4.addEventListener("mousedown", playNote);
keyg4.addEventListener("mouseup", endNote);
keya4.addEventListener("mousedown", playNote);
keya4.addEventListener("mouseup", endNote);
keyb4.addEventListener("mousedown", playNote);
keyb4.addEventListener("mouseup", endNote);
keyc5.addEventListener("mousedown", playNote);
keyc5.addEventListener("mouseup", endNote);

keycsh4.addEventListener("mousedown", playNote);
keycsh4.addEventListener("mouseup", endNote);
keydsh4.addEventListener("mousedown", playNote);
keydsh4.addEventListener("mouseup", endNote);
keyfsh4.addEventListener("mousedown", playNote);
keyfsh4.addEventListener("mouseup", endNote);
keygsh4.addEventListener("mousedown", playNote);
keygsh4.addEventListener("mouseup", endNote);
keyash4.addEventListener("mousedown", playNote);
keyash4.addEventListener("mouseup", endNote);

// add mouse over and mouseout event listeners
keyc4.addEventListener("mouseover", changeBg);
keyc4.addEventListener("mouseout", reset);
keyd4.addEventListener("mouseover", changeBg);
keyd4.addEventListener("mouseout", reset);
keye4.addEventListener("mouseover", changeBg);
keye4.addEventListener("mouseout", reset);
keyf4.addEventListener("mouseover", changeBg);
keyf4.addEventListener("mouseout", reset);
keyg4.addEventListener("mouseover", changeBg);
keyg4.addEventListener("mouseout", reset);
keya4.addEventListener("mouseover", changeBg);
keya4.addEventListener("mouseout", reset);
keyb4.addEventListener("mouseover", changeBg);
keyb4.addEventListener("mouseout", reset);
keyc5.addEventListener("mouseover", changeBg);
keyc5.addEventListener("mouseout", reset);

keycsh4.addEventListener("mouseover", changeBg);
keycsh4.addEventListener("mouseout", reset);
keydsh4.addEventListener("mouseover", changeBg);
keydsh4.addEventListener("mouseout", reset);
keyfsh4.addEventListener("mouseover", changeBg);
keyfsh4.addEventListener("mouseout", reset);
keygsh4.addEventListener("mouseover", changeBg);
keygsh4.addEventListener("mouseout", reset);
keyash4.addEventListener("mouseover", changeBg);
keyash4.addEventListener("mouseout", reset);

// add touch event listeners
keyc4.addEventListener("touchstart", touchPlayNote);
keyc4.addEventListener("touchend", touchEndNote);
keyd4.addEventListener("touchstart", touchPlayNote);
keyd4.addEventListener("touchend", touchEndNote);
keye4.addEventListener("touchstart", touchPlayNote);
keye4.addEventListener("touchend", touchEndNote);
keyf4.addEventListener("touchstart", touchPlayNote);
keyf4.addEventListener("touchend", touchEndNote);
keyg4.addEventListener("touchstart", touchPlayNote);
keyg4.addEventListener("touchend", touchEndNote);
keya4.addEventListener("touchstart", touchPlayNote);
keya4.addEventListener("touchend", touchEndNote);
keyb4.addEventListener("touchstart", touchPlayNote);
keyb4.addEventListener("touchend", touchEndNote);
keyc5.addEventListener("touchstart", playNote);
keyc5.addEventListener("touchend", touchEndNote);

keycsh4.addEventListener("touchstart", touchPlayNote);
keycsh4.addEventListener("touchend", touchEndNote);
keydsh4.addEventListener("touchstart", touchPlayNote);
keydsh4.addEventListener("touchend", touchEndNote);
keyfsh4.addEventListener("touchstart", touchPlayNote);
keyfsh4.addEventListener("touchend", touchEndNote);
keygsh4.addEventListener("touchstart", touchPlayNote);
keygsh4.addEventListener("touchend", touchEndNote);
keyash4.addEventListener("touchstart", touchPlayNote);
keyash4.addEventListener("touchend", touchEndNote);



function playNote(e) {
  if(!playing) {
    osc.frequency.value = notes[e.target.id];
    gainNode.gain.value =1;

    var ki = getKeyInfo(e);

    ki[0].style.fill = "yellow";
    playing = true;
  }
}

function endNote(e) {
  gainNode.gain.value = 0;
  var ki = getKeyInfo(e);
  if(ki[1] === 5) {
    ki[0].style.fill = "#ffffef";
  } else {
    ki[0].style.fill = "#222";
  }
  playing = false;
}

function touchPlayNote(e) {
  e.preventDefault();
  playNote(e);
}

function touchEndNote(e) {
  e.preventDefault();
  endNote(e);
}

function changeBg(e) {
  var ki = getKeyInfo(e);
  if(ki[1] === 5) {
    ki[0].style.fill = "#eee";
  } else {
    ki[0].style.fill = "#666";
    ki[0].style.stroke = "#666";
  }

}

function reset(e) {
  var ki = getKeyInfo(e);
  if(ki[1] === 5) {
    ki[0].style.fill = "#ffffef";
  } else {
    ki[0].style.fill = "#222";
    ki[0].style.stroke = "#222";
  }

}

function getKeyInfo(e) {
  keyref = "key" + e.target.id.toLowerCase();
  targetLength = keyref.length;
  keyref = eval(keyref);
  return [keyref, targetLength];
}


/*
var vm = new Vue({
  el: "#keyboard",
  data: {
    oscType: "sine",
    oscGain: 1
  },
  methods: {
    playNote: function(e) {
      osc.frequency.value = notes[e.target.id];
      gainNode.gain.value =1;
    },
    endNote: function() {
      gainNode.gain.value =0;
    }
  },
  // initialize the app
  created: function() {
    // establish the audio context
    AudioContext = window.AudioContext || windown.webkitAudioContext;
    audioContext = new AudioContext();

    osc      = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    osc.type         = this.oscType;
    osc.frequency.value = 200;
    gainNode.gain.value = 0;
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    osc.start(0);
  }
});
*/
