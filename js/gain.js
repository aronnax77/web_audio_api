/*              Author: Richard Myatt
                Date: 3 April 2019

                Using the web audio api this is an illustration of how the
                addition of a 'gain' node will allow the volume to be adjusted.
*/

var audioContext, osc, gainNode;
var oscType = "sine";

var AudioContext = window.AudioContext || windown.webkitAudioContext;
audioContext = new AudioContext();

osc = audioContext.createOscillator();
gainNode = audioContext.createGain();
osc.type = oscType;
osc.frequency.setValueAtTime(440, audioContext.currentTime);
osc.connect(gainNode);
gainNode.connect(audioContext.destination);
gainNode.gain.value = 0;
osc.start(audioContext.currentTime);

function changeVol() {
  gainNode.gain.value = volume.value;
}

var volume = document.querySelector("#vol");
volume.addEventListener("change", changeVol);
