/*            Author: Richard Myatt
              Date: 5 April 2019

              Improved monophonic keyboard.
*/

//alert("Please note that this code has been tested on both Firefox and Chrome where it works without error but still raises an error on sololearn main page and app.  For this reason I have included a link to the code on github pages at https://aronnax77.github.io/web_audio_api/improved_keyboard.html");

var osc, gainNode, audioContext, AudioContext;
var oscType = "sine";
var playing = false;
var keypressed;
var firstTime = false;  // has a key been pressed

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

// obtaine a reference to the svg in the dom
s = Snap("#monophonic");

// add a background -->
var bg = s.rect(0, 0, "100%", "100%", 5, 5);
bg.attr({
  fill: "#333"
});

// add a decorative red line
decLine = s.line(10, 14, 210, 14);
decLine.attr({
  stroke: "red",
  "stroke-width": 3
});

Snap.load("https://cdn.jsdelivr.net/gh/aronnax77/web_audio_api/svg/octave_keyboard_revised.svg", onSVGLoaded);

function onSVGLoaded(data) {

  let fragment = data.select("#keys");
  fragment.attr({transform: "translate(10, 15)"});

  fragment.mousedown(playNote);
  fragment.mouseup(stopNote);

  fragment.mouseover(highlight);
  fragment.mouseout(restore);

  fragment.touchstart(touchPlayNote);
  fragment.touchend(touchStopNote);

  s.append(fragment);
}

function printOut() {
  console.log("hi");
}

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

function playNote(ev) {
  if(!firstTime) {
    initializeOscillator();
    firstTime = true;
  }
  osc.frequency.value = notes[ev.target.id];
  gainNode.gain.value = 1;
  let el = s.select("#" + ev.target.id);
  el.animate({fill: "yellow"}, 50);
  playing = true;
}

function stopNote(ev) {
  gainNode.gain.value = 0;
  let id = ev.target.id;
  let el = s.select("#" + id);
  if(id.length === 2) {
    el.animate({fill: "#ffffef"}, 50);
  } else {
    el.animate({fill: "#222"}, 50);
  }

  playing = false;
}

var touchPlayNote = function(ev) {
  if(!playing) {
    ev.preventDefault();
    keypressed = ev.target.id;
    ev.target.style.fill = "yellow";
    playNote(ev);
  }
};

var touchStopNote = function(ev) {
  if(playing && (ev.target.id === keypressed)) {
    ev.preventDefault();
    stopNote(ev);
  }
};

function highlight(ev) {
  let id = ev.target.id;
  let el = s.select("#" + id);
  if(id.length === 2) {
    el.animate({fill: "#eee"}, 50);
  } else {
    el.animate({fill: "#666", stroke: "#666"}, 50);
  }
}

function restore(ev) {
  let id = ev.target.id;
  let el = s.select("#" + id);
  if(id.length === 2) {
    el.animate({fill: "##ffffef"}, 50);
  } else {
    el.animate({fill: "#222", stroke: "#000"}, 50);
  }
}
